import mongoose, { Schema } from 'mongoose';
import mongooseLeanDefaults from 'mongoose-lean-defaults';
import mongooseLeanVirtuals from 'mongoose-lean-virtuals';

import { hashPassword } from '../../tools/security.tools';

const User = new Schema(
    {
        name: String,
        email: { type: String, index: true, unique: true, required: true },
        password: { type: String, select: false, required: true },
        locale: { type: String, default: 'fr_FR' },
        verified: { type: Boolean, default: false },
        gender: { type: String, enum: ['female', 'male', 'non-binary'], default: 'non-binary' },
    },
    {
        toJSON: { getters: true, virtuals: true },
        toObject: { getters: true, virtuals: true },
        timestamps: true,
    },
);

User.pre('save', function (next) {
    if (this.password && this.isModified('password')) {
        this.password = hashPassword(this.password);
    }

    return next();
});

User.index({ createdAt: 1 });
User.index({ updatedAt: 1 });

User.plugin(mongooseLeanVirtuals);
User.plugin(mongooseLeanDefaults);

export default mongoose.model('User', User);
