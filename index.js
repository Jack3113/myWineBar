import mongoose from 'mongoose';

import app from './server';
import config from './configuration.json';

mongoose.connect(config.mongoUri, {
    keepAlive: true,
    keepAliveInitialDelay: 300000,
    socketTimeoutMS: 30000,
    autoReconnect: true,
    reconnectInterval: 1000,
    useNewUrlParser: true,
});

app.listen(config.port, () => {
    console.log(`The server is listening on port ${config.port}`);
});
