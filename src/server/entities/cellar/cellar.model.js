import mongoose, { Schema } from 'mongoose';
import mongooseLeanDefaults from 'mongoose-lean-defaults';
import mongooseLeanVirtuals from 'mongoose-lean-virtuals';

const Cellar = new Schema(
    {
        name: String,
        creator: { ref: 'User', type: Schema.Types.ObjectId, index: true },
        owners: [{ ref: 'User', type: Schema.Types.ObjectId }],
        isDefault: { type: Boolean, index: true },
    },
    {
        toJSON: { getters: true, virtuals: true },
        toObject: { getters: true, virtuals: true },
        timestamps: true,
    },
);

Cellar.virtual('bottles', {
    ref: 'Bottle',
    localField: '_id',
    foreignField: 'cellar',
    justOne: false,
    options: { sort: { updatedAt: -1 } },
});

Cellar.index({ createdAt: 1 });
Cellar.index({ updatedAt: 1 });

Cellar.plugin(mongooseLeanVirtuals);
Cellar.plugin(mongooseLeanDefaults);

export default mongoose.model('Cellar', Cellar);
