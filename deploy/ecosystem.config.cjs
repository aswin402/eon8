// PM2 process file, for running the site on a VPS without Docker.
//   npm ci && npm run build
//   pm2 start deploy/ecosystem.config.cjs && pm2 save && pm2 startup
// Settings come from the project's .env file.
module.exports = {
  apps: [
    {
      name: 'eon8-web',
      cwd: __dirname + '/..',
      script: 'server/prodServer.ts',
      interpreter: 'node',
      instances: 1, // one process: rate limits and caches are in memory
      exec_mode: 'fork',
      env: { NODE_ENV: 'production', PORT: '4173', TRUST_PROXY: '1' },
      max_memory_restart: '600M',
      kill_timeout: 10000,
      out_file: 'logs/web.out.log',
      error_file: 'logs/web.err.log',
      time: true,
    },
  ],
};
