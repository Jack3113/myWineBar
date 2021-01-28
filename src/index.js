import mongoose from 'mongoose';

import app from './server';
import config from './server/configuration.js';

mongoose.connect(config.mongoUri, {
    keepAlive: true,
    keepAliveInitialDelay: 300000,
    socketTimeoutMS: 30000,
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true,
});

app.listen(config.port, () => {
    console.log(`The server is listening on port ${config.port}`);
});
