import type { IncomingMessage, ServerResponse } from 'node:http';
import { handleCmsApiRequest } from './cmsApi.ts';
import { isDatabaseConfigured, ready } from './lib/db.ts';
import { HttpError, assertSameOrigin, sendJson } from './lib/http.ts';
import { handleLeadsApi } from './leadsApi.ts';
import { handleRedirectsApi } from './redirectsApi.ts';
import { handleSeoApi, invalidateHeadCaches } from './seoApi.ts';
import { handleSettingsApi } from './settingsApi.ts';
import { handleUsersApi } from './usersApi.ts';

/**
 * Handles every /api/* request. Returns false for other paths so the caller
 * can serve pages and files.
 */
export async function handleApiRequest(req: IncomingMessage, res: ServerResponse): Promise<boolean> {
  const rawUrl = req.url || '/';
  if (!rawUrl.startsWith('/api/') && rawUrl !== '/api') return false;

  try {
    let url: URL;
    try {
      url = new URL(rawUrl, 'http://localhost');
    } catch {
      throw new HttpError(400, 'Malformed URL.');
    }

    if (url.pathname === '/api/health') {
      let database = 'not-configured';
      if (isDatabaseConfigured()) {
        database = await ready().then(
          () => 'ok',
          () => 'unavailable'
        );
      }
      sendJson(res, database === 'unavailable' ? 503 : 200, { ok: database !== 'unavailable', database });
      return true;
    }

    assertSameOrigin(req);

    if (await handleCmsApiRequest(req, res, url)) return true;
    if (await handleLeadsApi(req, res, url)) return true;
    if (await handleSettingsApi(req, res, url)) {
      if ((req.method || 'GET').toUpperCase() !== 'GET') invalidateHeadCaches();
      return true;
    }
    if (await handleSeoApi(req, res, url)) return true;
    if (await handleRedirectsApi(req, res, url)) return true;
    if (await handleUsersApi(req, res, url)) return true;

    throw new HttpError(404, `Unknown API endpoint: ${req.method} ${url.pathname}`);
  } catch (err) {
    if (res.headersSent) {
      res.end();
      return true;
    }
    if (err instanceof HttpError) {
      sendJson(res, err.status, { error: err.message });
    } else {
      console.error('[api] unexpected error', err);
      sendJson(res, 500, { error: 'Something went wrong on the server. Please try again.' });
    }
    return true;
  }
}
