import express from 'express';
import compression from 'compression';
import path from 'path';

const app = express();
app.use(compression());

app.use('/api/', routes);
app.use('/', express.static(path.join(`${__dirname}/../web/`)));

module.exports = app;
