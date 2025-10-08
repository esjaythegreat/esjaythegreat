export default {
  register({ strapi }: any) {
    // Make Koa trust X-Forwarded-* (needed behind Cloudflare/Caddy)
    strapi.server.app.proxy = true;
  },
  bootstrap() {},
};
