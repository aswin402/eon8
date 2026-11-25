import fs from 'node:fs';
import path from 'node:path';
import pg from 'pg';
import { env, ROOT_DIR } from './env.ts';
import { HttpError } from './http.ts';

const MIGRATIONS_DIR = path.join(ROOT_DIR, 'server', 'migrations');

let pool: pg.Pool | null = null;
let readyPromise: Promise<void> | null = null;

export function isDatabaseConfigured(): boolean {
  return Boolean(env('DATABASE_URL'));
}

function getPool(): pg.Pool {
  if (!isDatabaseConfigured()) {
    throw new HttpError(
      503,
      'The database is not configured. Set DATABASE_URL (see .env.example) and start PostgreSQL.'
    );
  }
  if (!pool) {
    pool = new pg.Pool({
      connectionString: env('DATABASE_URL'),
      max: Number(env('DATABASE_POOL_MAX', '10')),
      idleTimeoutMillis: 30_000,
      connectionTimeoutMillis: 5_000,
      ssl: env('DATABASE_SSL') === 'require' ? { rejectUnauthorized: false } : undefined,
    });
    // An idle connection dropped by PostgreSQL (restart, network blip) emits
    // 'error' on the pool; without a listener Node would crash the process.
    pool.on('error', (err) => console.error('[db] idle connection error:', err.message));
  }
  return pool;
}

/** Anything that can run a query: the pool helper below or a transaction client. */
export interface Queryable {
  query<R extends pg.QueryResultRow = pg.QueryResultRow>(text: string, params?: unknown[]): Promise<pg.QueryResult<R>>;
}

export async function query<R extends pg.QueryResultRow = pg.QueryResultRow>(
  text: string,
  params: unknown[] = []
): Promise<pg.QueryResult<R>> {
  await ready();
  return getPool().query<R>(text, params);
}

export async function transaction<T>(fn: (client: pg.PoolClient) => Promise<T>): Promise<T> {
  await ready();
  const client = await getPool().connect();
  try {
    await client.query('BEGIN');
    const result = await fn(client);
    await client.query('COMMIT');
    return result;
  } catch (err) {
    await client.query('ROLLBACK').catch(() => undefined);
    throw err;
  } finally {
    client.release();
  }
}

async function runMigrations(): Promise<void> {
  const client = await getPool().connect();
  try {
    // One server at a time applies migrations.
    await client.query('SELECT pg_advisory_lock(80080808)');
    await client.query(
      `CREATE TABLE IF NOT EXISTS schema_migrations (
         name text PRIMARY KEY,
         applied_at timestamptz NOT NULL DEFAULT now()
       )`
    );
    const applied = new Set(
      (await client.query<{ name: string }>('SELECT name FROM schema_migrations')).rows.map(
        (r) => r.name
      )
    );
    const files = fs
      .readdirSync(MIGRATIONS_DIR)
      .filter((f) => f.endsWith('.sql'))
      .sort();
    for (const file of files) {
      if (applied.has(file)) continue;
      const sql = fs.readFileSync(path.join(MIGRATIONS_DIR, file), 'utf-8');
      await client.query('BEGIN');
      try {
        await client.query(sql);
        await client.query('INSERT INTO schema_migrations (name) VALUES ($1)', [file]);
        await client.query('COMMIT');
        console.log(`[db] applied migration ${file}`);
      } catch (err) {
        await client.query('ROLLBACK');
        throw new Error(`Migration ${file} failed: ${(err as Error).message}`, { cause: err });
      }
    }
  } finally {
    await client.query('SELECT pg_advisory_unlock(80080808)').catch(() => undefined);
    client.release();
  }
}

const startupHooks: Array<(db: Queryable) => Promise<void>> = [];

/**
 * Registers work to run once after migrations (seeding, one-time imports).
 * Hooks must use the `db` they are given: `query()` and `transaction()` wait
 * for startup to finish, so calling them from a hook would never return.
 * Each hook runs in its own transaction.
 */
export function onDatabaseReady(hook: (db: Queryable) => Promise<void>): void {
  startupHooks.push(hook);
}

async function runStartupHooks(): Promise<void> {
  const client = await getPool().connect();
  try {
    for (const hook of startupHooks) {
      await client.query('BEGIN');
      try {
        await hook(client);
        await client.query('COMMIT');
      } catch (err) {
        await client.query('ROLLBACK').catch(() => undefined);
        throw err;
      }
    }
  } finally {
    client.release();
  }
}

/** Connects, applies pending migrations and runs startup hooks once per process. */
export function ready(): Promise<void> {
  if (!isDatabaseConfigured()) {
    return Promise.reject(
      new HttpError(
        503,
        'The database is not configured. Set DATABASE_URL (see .env.example) and start PostgreSQL.'
      )
    );
  }
  readyPromise ??= (async () => {
    await runMigrations();
    await runStartupHooks();
  })().catch((err) => {
    readyPromise = null; // let the next request retry, e.g. after PostgreSQL starts
    console.error('[db] startup failed:', (err as Error).message);
    throw new HttpError(503, 'The database is unavailable. Check that PostgreSQL is running.');
  });
  return readyPromise;
}

export async function closeDatabase(): Promise<void> {
  if (pool) await pool.end();
  pool = null;
  readyPromise = null;
}
