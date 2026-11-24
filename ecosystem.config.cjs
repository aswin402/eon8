module.exports = {
  apps: [
    {
      name: 'eon8-web',
      script: 'server/prodServer.ts',
      interpreter: 'node',
      cwd: __dirname,
      instances: 1,
      exec_mode: 'fork',
      autorestart: true,
      max_memory_restart: '512M',
      watch: false,
      env: {
        NODE_ENV: 'production',
        PORT: 4173,
        TRUST_PROXY: 'true',
      },
      error_file: './logs/eon8-error.log',
      out_file: './logs/eon8-out.log',
      merge_logs: true,
      time: true,
    },
  ],
};
