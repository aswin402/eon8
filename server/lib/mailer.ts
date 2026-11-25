import nodemailer, { type Transporter } from 'nodemailer';
import { env, envFlag } from './env.ts';

let transporter: Transporter | null | undefined;

export function isMailConfigured(): boolean {
  return Boolean(env('SMTP_HOST') && env('MAIL_FROM'));
}

function getTransporter(): Transporter | null {
  if (transporter !== undefined) return transporter;
  if (!isMailConfigured()) {
    transporter = null;
    return transporter;
  }
  const port = Number(env('SMTP_PORT', '587'));
  transporter = nodemailer.createTransport({
    host: env('SMTP_HOST'),
    port,
    secure: env('SMTP_SECURE') ? envFlag('SMTP_SECURE') : port === 465,
    auth: env('SMTP_USER') ? { user: env('SMTP_USER'), pass: env('SMTP_PASS') } : undefined,
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 20_000,
  });
  return transporter;
}

export type MailResult = { status: 'sent' } | { status: 'skipped'; reason: string } | { status: 'failed'; error: string };

export async function sendMail(message: {
  to: string[];
  subject: string;
  text: string;
  replyTo?: string;
}): Promise<MailResult> {
  if (message.to.length === 0) return { status: 'skipped', reason: 'No recipients are set (Admin > Settings > Leads).' };
  const tx = getTransporter();
  if (!tx) return { status: 'skipped', reason: 'SMTP is not configured (SMTP_HOST, MAIL_FROM).' };
  try {
    await tx.sendMail({
      from: env('MAIL_FROM'),
      to: message.to.join(', '),
      subject: message.subject.replace(/[\r\n]+/g, ' ').slice(0, 200),
      text: message.text,
      replyTo: message.replyTo,
    });
    return { status: 'sent' };
  } catch (err) {
    return { status: 'failed', error: (err as Error).message.slice(0, 500) };
  }
}
