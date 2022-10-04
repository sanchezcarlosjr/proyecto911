import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            unique: true,
            required: true,
        },
        salt: {
            type: String,
            unique: true,
            required: true,
        },
        hash: {
            type: String,
            unique: true,
            required: true,
        },
    },
    {
        timestamps: true,
        statics: {
            findByEmail(email) {
                return this.find({ email: new RegExp(email, "i") });
            },
        },
    }
);

export default mongoose.models.User || mongoose.model('User', userSchema);