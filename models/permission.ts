import mongoose from "mongoose";

interface IPermission extends mongoose.Document {
    name: string;
}

interface PermissionModel extends mongoose.Model<IPermission> {
    findByName(name: string): Promise<IPermission>;
}

const permissionSchema = new mongoose.Schema(
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

export default mongoose.model<IPermission, PermissionModel>('Permission', permissionSchema);