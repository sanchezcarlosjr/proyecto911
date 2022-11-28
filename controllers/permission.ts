import Permission from "../models/permission";

export default {
    createPermission: async (name: string) => {
        const permission = new Permission({
            name,
        });
        await permission.save();
        return permission;
    },
    getPermission: async (id: string) => {
        const permission = await Permission.findById(id);
        return permission;
    },
    updatePermission: async (id: string, name: string) => {
        const permission = await Permission.findById(id);
        if (!permission) {
            throw new Error("Permission not found");
        }
        permission.name = name;
        await permission.save();
        return permission;
    },
    deletePermission: async (id: string) => {
        const permission = await Permission.findById(id);
        if (!permission) {
            throw new Error("Permission not found");
        }
        await permission.remove();
        return permission;
    },
};