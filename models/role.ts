import { Document, Model, Schema, Types, model } from "mongoose";

interface IRole extends Document {
    name: string;
    permissions: Types.ObjectId[];
}

interface RoleModel extends Model<IRole> {
    findByName(name: string): Promise<IRole>;
}

const roleSchema = new Schema(
    {
        name: {
            type: String,
            unique: true,
            required: true,
        },
        permissions: [
            {
                type: Schema.Types.ObjectId,
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

export default model<IRole, RoleModel>('Role', roleSchema);
