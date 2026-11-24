import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const currentDir = path.dirname(fileURLToPath(import.meta.url));
export const ROOT_DIR = path.resolve(currentDir, '..', '..');

let cachedDotEnv: Record<string, string> | null = null;

function parseDotEnv(): Record<string, string> {
  const map: Record<string, string> = {};
  const envPath = path.join(ROOT_DIR, '.env');
  if (!fs.existsSync(envPath)) return map;
  try {
    for (const line of fs.readFileSync(envPath, 'utf-8').split(/\r?\n/)) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const eq = trimmed.indexOf('=');
      if (eq <= 0) continue;
      const key = trimmed.slice(0, eq).trim();
      let value = trimmed.slice(eq + 1).trim();
      if (
        (value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))
      ) {
        value = value.slice(1, -1);
      }
      map[key] = value;
    }
  } catch {
    // An unreadable .env behaves like an empty one.
  }
  return map;
}

/** Reads a setting from the process environment first, then from the project's .env file. */
export function env(key: string, fallback = ''): string {
  const fromProcess = process.env[key];
  if (fromProcess && fromProcess.trim()) return fromProcess.trim();
  cachedDotEnv ??= parseDotEnv();
  const fromFile = cachedDotEnv[key];
  if (fromFile && fromFile.trim()) return fromFile.trim();
  return fallback;
}

export function envFlag(key: string): boolean {
  return ['1', 'true', 'yes', 'on'].includes(env(key).toLowerCase());
}

export const isProduction = (): boolean => env('NODE_ENV') === 'production';

/** The hidden admin route; the client and the server must agree on it. */
export const adminPath = (): string => env('VITE_ADMIN_PATH', '/admin-dashboard');
