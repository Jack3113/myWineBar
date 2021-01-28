export default {
    port: process.env.PORT,
    mongoUri: process.env.MONGODB_ADDON_URI,
    dsnSentry: process.env.SENTRY_DSN,
    jwtSecret: process.env.JWT_SECRET,
    cookieSecret: process.env.COOKIE_SECRET,
    env: process.env.NODE_ENV,
};
