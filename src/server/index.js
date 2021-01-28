import * as Sentry from '@sentry/node';
import bodyParser from 'body-parser';
import compression from 'compression';
import express from 'express';
import helmet from 'helmet';
import path from 'path';
import session from 'express-session';

import routes from './entities';
import configuration from './configuration.js';

const sessionConfig = {
    secret: configuration.cookieSecret,
    resave: true,
    saveUninitialized: true,
    cookie: { secure: true },
};
const app = express();

Sentry.init({
    dsn: configuration.dsnSentry,
    environment: process.env.NODE_ENV,
    version: process.env.npm_package_version,
});

app.use(Sentry.Handlers.requestHandler());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

if (configuration.env !== 'local') {
    app.set('trust proxy', 1);
    sessionConfig.cookie = { secure: true };
}
app.use(session(sessionConfig));

app.use(helmet());
app.use(compression());

app.use('/api/', routes);
app.use('/', express.static(path.join(`${__dirname}/../web/`)));

app.use(Sentry.Handlers.errorHandler());

export default app;
