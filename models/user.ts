import mongoose from "mongoose";

interface IUser extends mongoose.Document {
    email: string;
    salt: string;
    hash: string;
    role: mongoose.Types.ObjectId;
}

interface UserModel extends mongoose.Model<IUser> {
    findByEmail: (email: string) => Promise<IUser>;
    can: (action: string) => boolean;
}

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

export default mongoose.model<IUser, UserModel>('User', userSchema);
