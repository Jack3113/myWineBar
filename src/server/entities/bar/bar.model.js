import mongoose, { Schema } from 'mongoose';
import mongooseLeanDefaults from 'mongoose-lean-defaults';
import mongooseLeanVirtuals from 'mongoose-lean-virtuals';

const Bar = new Schema(
    {
        name: String,
        creator: { ref: 'User' },
        owners: [{ ref: 'User' }],
    },
    {
        toJSON: { getters: true, virtuals: true },
        toObject: { getters: true, virtuals: true },
        timestamps: true,
    },
);

Bar.index({ createdAt: 1 });
Bar.index({ updatedAt: 1 });

Bar.plugin(mongooseLeanVirtuals);
Bar.plugin(mongooseLeanDefaults);

export default mongoose.model('Bar', Bar);
