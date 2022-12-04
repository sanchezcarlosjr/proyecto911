import Role from "../models/role";
import Permission from "../models/permission";

export default {
    createRole: async (name: string, permissions: string[]) => {
        const role = new Role({
            name,
            permissions,
        });
        await role.save();
        return role;
    },
    getRole: async (name: string) => {
        const role = await Role.findByName(name);
        return role;
    },
    getPermissions: async (name: string) => {
        const role = await Role.findByName(name);
        return role.permissions;
    },
    addPermission: async (name: string, permissionName: string) => {
        const role = await Role.findByName(name);
        const permission = await Permission.findByName(permissionName);
        role.permissions.push(permission._id);
        await role.save();
        return role;
    },
    removePermission: async (name: string, permissionName: string) => {
        const role = await Role.findByName(name);
        const permission = await Permission.findByName(permissionName);
        role.permissions = role.permissions.filter((p) => p !== permission._id);
        await role.save();
        return role;
    },
};