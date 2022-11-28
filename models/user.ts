import { Document, Model, Schema, Types, HydratedDocument, model } from "mongoose";

interface IUser extends Document {
    email: string;
    salt: string;
    hash: string;
    role: Types.ObjectId;
}

interface IUserMethods {
    can: (action: string) => boolean;
}

interface UserModel extends Model<IUser, {}, IUserMethods> {
    findByEmail: (email: string) => Promise<HydratedDocument<IUser, IUserMethods>>;
}

const userSchema = new Schema(
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
            type: Schema.Types.ObjectId,
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

export default model<IUser, UserModel>('User', userSchema);
