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
        role: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Role",
            required: true,
        }
    },
    {
        timestamps: true,
        statics: {
            findByEmail(email) {
                return this.find({ email: new RegExp(email, "i") });
            },
        },
        methods: {
            can(permission: string) {
                this.populate({
                    path: "role",
                    populate: {
                        path: "permissions",
                        model: "Permission",
                    },
                });
                return (this as any).permissions.some((p: any) => p.name === permission);
            },
        }
    }
);

export default mongoose.models.User || mongoose.model('User', userSchema);
