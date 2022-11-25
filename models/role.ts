import mongoose from "mongoose";

const roleSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            unique: true,
            required: true,
        },
        permissions: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Permission",
            }
        ]
    },
);

export default mongoose.models.Role || mongoose.model('Role', roleSchema);
