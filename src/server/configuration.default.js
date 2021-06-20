export default {
    port: process.env.PORT,
    mongoUri: process.env.MONGODB_ADDON_URI,
    dsnSentry: process.env.SENTRY_DSN,
    jwtSecret: process.env.JWT_SECRET,
    cookieSecret: process.env.COOKIE_SECRET,
    env: process.env.NODE_ENV,
    s3: {
        host: process.env.CELLAR_ADDON_HOST,
        keyID: process.env.CELLAR_ADDON_KEY_ID,
        keySecret: process.env.CELLAR_ADDON_KEY_SECRET,
    },
};
