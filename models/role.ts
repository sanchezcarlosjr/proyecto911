import mongoose from "mongoose";

interface IRole extends mongoose.Document {
    name: string;
    permissions: mongoose.Types.ObjectId[];
}

interface RoleModel extends mongoose.Model<IRole> {
    findByName(name: string): Promise<IRole>;
}

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
                default: [],
            }
        ]
    },
    {
        statics: {
            findByName(name) {
                return this.findOne({ name: new RegExp(name, "i") });
            },
        },
    }
);

export default mongoose.model<IRole, RoleModel>('Role', roleSchema);
