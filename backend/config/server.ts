// backend/config/server.ts
export default ({ env }) => ({
  url: env('PUBLIC_URL'),
  proxy: true,
  host: '0.0.0.0',
  port: 1337,
  app: { keys: env.array('APP_KEYS') },
});

