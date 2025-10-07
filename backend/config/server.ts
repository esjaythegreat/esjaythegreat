export default ({ env }) => ({
  url: env('STRAPI_ADMIN_BACKEND_URL'),
  proxy: true,
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  app: {
    keys: env.array('APP_KEYS'),
  },
});
