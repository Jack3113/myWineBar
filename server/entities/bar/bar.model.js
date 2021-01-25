const { Schema } = require('mongoose');

const Bar = new Schema({
    name: String,
    creator: { ref: 'User' },
    owners: [{ ref: 'User' }],
});

module.exports = Bar;
