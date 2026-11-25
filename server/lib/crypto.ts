import crypto from 'node:crypto';
import { env } from './env.ts';

/**
 * Field-level encryption for personal data stored in the database (lead names,
 * emails, phone numbers, messages...). AES-256-GCM with a random 12-byte IV per
 * value; the stored text is
 *
 *   enc:v1:<base64url iv>:<base64url auth tag>:<base64url ciphertext>
 *
 * Key: DATA_ENCRYPTION_KEY, 32 bytes as 64 hex characters (`openssl rand -hex 32`)
 * or base64 (`openssl rand -base64 32`). DATA_ENCRYPTION_KEY_OLD (optional) is
 * only used to read values written with a previous key, so the key can be
 * rotated: set the new key, move the old one to DATA_ENCRYPTION_KEY_OLD and
 * restart; the leads startup hook re-encrypts old values with the new key.
 *
 * Without DATA_ENCRYPTION_KEY values are stored as plain text (development).
 * Values without the enc:v1: prefix are always read as plain text, so rows saved
 * before encryption was switched on keep working.
 */

const PREFIX = 'enc:v1:';
const ENCRYPTED_RE = /^enc:v1:([A-Za-z0-9_-]{16}):([A-Za-z0-9_-]{22}):([A-Za-z0-9_-]*)$/;
/** Shown instead of a value that no configured key can decrypt. */
export const UNREADABLE = '[encrypted - check DATA_ENCRYPTION_KEY]';

interface Keys {
  current: Buffer | null;
  old: Buffer | null;
}
let cachedKeys: Keys | null = null;
let warnedUnreadable = false;

function parseKey(name: string, raw: string): Buffer {
  const value = raw.trim();
  if (/^[0-9a-fA-F]{64}$/.test(value)) return Buffer.from(value, 'hex');
  if (/^[A-Za-z0-9+/_-]+={0,2}$/.test(value)) {
    const bytes = Buffer.from(value, 'base64');
    if (bytes.length === 32) return bytes;
  }
  throw new Error(
    `${name} is invalid: it must be 32 bytes, written as 64 hex characters (create one with ` +
      '"openssl rand -hex 32") or as base64 of 32 bytes. Fix the value in .env and restart the server.'
  );
}

function keys(): Keys {
  if (cachedKeys) return cachedKeys;
  const current = env('DATA_ENCRYPTION_KEY');
  const old = env('DATA_ENCRYPTION_KEY_OLD');
  const parsed: Keys = {
    current: current ? parseKey('DATA_ENCRYPTION_KEY', current) : null,
    old: old ? parseKey('DATA_ENCRYPTION_KEY_OLD', old) : null,
  };
  cachedKeys = parsed;
  return parsed;
}

/** True when DATA_ENCRYPTION_KEY is set. Throws a readable error if the key is malformed. */
export function isEncryptionEnabled(): boolean {
  return keys().current !== null;
}

/** True when DATA_ENCRYPTION_KEY_OLD is set (key rotation in progress). */
export function hasOldEncryptionKey(): boolean {
  return keys().old !== null;
}

/** True for values in the enc:v1: format (whether or not they can be decrypted). */
export function isEncrypted(value: string | null | undefined): boolean {
  return typeof value === 'string' && ENCRYPTED_RE.test(value);
}

/** Encrypts a value. null, undefined and '' are returned unchanged; without a key the value is returned as is. */
export function encryptField<T extends string | null | undefined>(value: T): T {
  if (value === null || value === undefined || value === '') return value;
  const key = keys().current;
  if (!key || isEncrypted(value)) return value;
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
  const ciphertext = Buffer.concat([cipher.update(value, 'utf8'), cipher.final()]);
  const tag = cipher.getAuthTag();
  return `${PREFIX}${iv.toString('base64url')}:${tag.toString('base64url')}:${ciphertext.toString('base64url')}` as T;
}

function decryptWith(key: Buffer, m: RegExpMatchArray): string | null {
  try {
    const decipher = crypto.createDecipheriv('aes-256-gcm', key, Buffer.from(m[1], 'base64url'));
    decipher.setAuthTag(Buffer.from(m[2], 'base64url'));
    return Buffer.concat([decipher.update(Buffer.from(m[3], 'base64url')), decipher.final()]).toString('utf8');
  } catch {
    return null;
  }
}

/**
 * Decrypts a value and reports which key opened it: 'plain' (not encrypted),
 * 'current', 'old' (DATA_ENCRYPTION_KEY_OLD) or 'none' (no key can read it).
 */
export function openField(value: string): { value: string; key: 'plain' | 'current' | 'old' | 'none' } {
  const m = value.match(ENCRYPTED_RE);
  if (!m) return { value, key: 'plain' };
  const { current, old } = keys();
  const withCurrent = current ? decryptWith(current, m) : null;
  if (withCurrent !== null) return { value: withCurrent, key: 'current' };
  const withOld = old ? decryptWith(old, m) : null;
  if (withOld !== null) return { value: withOld, key: 'old' };
  return { value: UNREADABLE, key: 'none' };
}

/**
 * Decrypts a value written by encryptField. Plain-text values (no enc:v1: prefix)
 * are returned unchanged. A value no configured key can open is returned as
 * UNREADABLE (and logged once) instead of failing the whole request.
 */
export function decryptField<T extends string | null | undefined>(value: T): T {
  if (value === null || value === undefined || value === '') return value;
  const opened = openField(value);
  if (opened.key === 'none' && !warnedUnreadable) {
    warnedUnreadable = true;
    console.error(
      '[crypto] Some stored values cannot be decrypted: DATA_ENCRYPTION_KEY is missing or is not the key they were written with ' +
        '(set the previous key as DATA_ENCRYPTION_KEY_OLD when rotating keys).'
    );
  }
  return opened.value as T;
}
