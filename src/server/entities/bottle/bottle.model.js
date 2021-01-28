import mongoose, { Schema } from 'mongoose';
import mongooseLeanDefaults from 'mongoose-lean-defaults';
import mongooseLeanVirtuals from 'mongoose-lean-virtuals';

const Bottle = new Schema(
    {
        name: { type: String, required: true },
        castle: String,
        year: Number,
        wineDress: { type: String, index: true },
        type: { type: String, required: true, index: true },
        isWine: { type: Boolean, default: true, index: true },
        description: String,
        grapeVariety: String,
        country: String, // ISO 3166 Alpha-2
        quantity: { type: Number, default: 1 },
        bar: { ref: 'Bar', type: Schema.Types.ObjectId, index: true },
        awards: [String],
        terroir: String,
        photo: String,
        isOrganic: Boolean,
        abv: Number,
        tastingSuggestions: String,
        ean13: String,
    },
    {
        toJSON: { getters: true, virtuals: true },
        toObject: { getters: true, virtuals: true },
        timestamps: true,
    },
);

Bottle.index({ createdAt: 1 });
Bottle.index({ updatedAt: 1 });

Bottle.plugin(mongooseLeanVirtuals);
Bottle.plugin(mongooseLeanDefaults);

export default mongoose.model('Bottle', Bottle);
