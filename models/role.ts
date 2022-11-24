import mongoose from "mongoose";

const roleSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            unique: true,
            required: true,
        },
        permissions: {
            type: [String],
            required: false,
        }
    },
    {}
);

export default mongoose.models.Role || mongoose.model('User', roleSchema);
