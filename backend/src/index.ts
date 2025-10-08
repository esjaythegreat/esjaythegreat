export default {
  register({ strapi }: any) {
    // Make Koa trust X-Forwarded-* (needed behind Cloudflare/Caddy)
    strapi.server.app.proxy = true;

    // --- TEMP DEBUG: hit /api/_proxydebug to see what Strapi receives ---
    strapi.server.app.use(async (ctx, next) => {
      if (ctx.path === '/api/_proxydebug') {
        ctx.body = {
          secure: ctx.secure,
          protocol: ctx.protocol,
          href: ctx.href,
          headers: {
            'x-forwarded-proto': ctx.get('x-forwarded-proto'),
            'x-forwarded-host': ctx.get('x-forwarded-host'),
            'x-forwarded-port': ctx.get('x-forwarded-port'),
            'x-forwarded-ssl': ctx.get('x-forwarded-ssl'),
          },
        };
        return;
      }
      await next();
    });
    // -------------------------------------------------------------------
  },
  bootstrap() {},
};
