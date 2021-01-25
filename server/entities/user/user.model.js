import { Schema } from 'mongoose';

const User = new Schema({
    name: String,
    email: String,
    password: String,
});

module.exports = User;