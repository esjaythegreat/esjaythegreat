export default ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET'),
    sessions: {
      accessTokenLifespan: env.int('ADMIN_ACCESS_TTL', 1800),          // 30 min
      maxRefreshTokenLifespan: env.int('ADMIN_REFRESH_TTL_MAX', 2592000), // 30 days
      idleRefreshTokenLifespan: env.int('ADMIN_REFRESH_TTL_IDLE', 604800), // 7 days
      maxSessionLifespan: env.int('ADMIN_SESSION_TTL_MAX', 2592000),      // 30 days
      idleSessionLifespan: env.int('ADMIN_SESSION_TTL_IDLE', 3600),       // 1 hour
    },
  },
  apiToken: {
    salt: env('API_TOKEN_SALT'),
  },
  transfer: {
    token: {
      salt: env('TRANSFER_TOKEN_SALT'),
    },
  },
  secrets: {
    encryptionKey: env('ENCRYPTION_KEY'),
  },
  flags: {
    nps: env.bool('FLAG_NPS', true),
    promoteEE: env.bool('FLAG_PROMOTE_EE', true),
  },
});
