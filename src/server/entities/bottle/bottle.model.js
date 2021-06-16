import mongoose, { Schema } from 'mongoose';
import mongooseLeanDefaults from 'mongoose-lean-defaults';
import mongooseLeanVirtuals from 'mongoose-lean-virtuals';

const Bottle = new Schema(
    {
        name: { type: String, required: true },
        abv: Number,
        awards: String,
        castle: String,
        category: String,
        cellar: { ref: 'Cellar', type: Schema.Types.ObjectId, index: true },
        composition: String,
        conservation: String,
        containsSulfites: Boolean,
        country: String, // ISO 3166 Alpha-2
        createdBy: { ref: 'User', type: Schema.Types.ObjectId, index: true },
        description: String,
        ean13: String,
        isOrganic: Boolean,
        notes: String,
        photo: String,
        quantity: { type: Number, default: 1 },
        tastingSuggestions: String,
        terroir: String,
        type: {
            type: String,
            enum: ['cider', 'wine', 'beer', 'liqueur', 'spirit', 'other'],
            required: true,
            index: true,
        },
        wineColor: { type: String, enum: ['red', 'white', 'rose', 'gray', 'yellow', 'tawny', 'orange'], index: true },
        year: Number,
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
