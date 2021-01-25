const { Schema } = require('mongoose');

const Bottle = new Schema({
    name: { type: String, required: true },
    castle: String,
    year: Number,
    wineDress: String,
    type: { type: String, required: true },
    isWine: { type: Boolean, default: true },
    description: String,
    grapeVariety: String,
    country: String,
    quantity: { type: Number, default: 1 },
    bar: { ref: 'Bar', type: Schema.Types.ObjectId },
});

module.exports = Bottle;
