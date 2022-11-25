import Role from "../models/role";

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
        const role = await (Role as any).findByName(name);
        return role;
    },
    getPermissions: async (name: string) => {
        const role = await (Role as any).findByName(name);
        return role.permissions;
    },
    addPermission: async (name: string, permission: string) => {
        const role = await (Role as any).findByName(name);
        role.permissions.push(permission);
        await role.save();
        return role;
    },
    removePermission: async (name: string, permission: string) => {
        const role = await (Role as any).findByName(name);
        role.permissions = role.permissions.filter((p: string) => p !== permission);
        await role.save();
        return role;
    },
};