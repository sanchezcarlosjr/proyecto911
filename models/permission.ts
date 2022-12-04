import { Document, Model, Schema, Types, model } from "mongoose";

interface IPermission extends Document {
    name: string;
}

interface PermissionModel extends Model<IPermission> {
    findByName(name: string): Promise<IPermission>;
}

const permissionSchema = new Schema(
    {
        name: {
            type: String,
            unique: true,
            required: true,
        },
    },
    {
        statics: {
            findByName(name) {
                return this.findOne({ name: new RegExp(name, "i") });
            },
        },
    }
);

export default model<IPermission, PermissionModel>('Permission', permissionSchema);