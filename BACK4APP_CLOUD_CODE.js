// This code must be deployed to Back4App Cloud Code (main.js)

Parse.Cloud.define("createAdmin", async (request) => {
    const { email, full_name, role, password, is_active } = request.params;

    // Only super_admin or admin can create users? 
    // You might want to check request.user here.

    const user = new Parse.User();
    user.set("username", email); // Use email as username
    user.set("email", email);
    user.set("password", password);
    user.set("full_name", full_name);
    user.set("role", role);
    user.set("is_active", is_active);

    // Set ACLs if needed, e.g., only Public Read, or only Admin Read

    await user.save(null, { useMasterKey: true });
    return "User created";
});

Parse.Cloud.define("updateAdmin", async (request) => {
    const { userId, email, full_name, role, password } = request.params;

    const query = new Parse.Query(Parse.User);
    const user = await query.get(userId, { useMasterKey: true });

    if (email) {
        user.set("email", email);
        user.set("username", email);
    }
    if (full_name) user.set("full_name", full_name);
    if (role) user.set("role", role);
    if (password) user.set("password", password);

    await user.save(null, { useMasterKey: true });
    return "User updated";
});

Parse.Cloud.define("deleteAdmin", async (request) => {
    const { userId } = request.params;

    const query = new Parse.Query(Parse.User);
    const user = await query.get(userId, { useMasterKey: true });

    await user.destroy({ useMasterKey: true });
    return "User deleted";
});

Parse.Cloud.define("toggleAdminActive", async (request) => {
    const { userId, isActive } = request.params;

    const query = new Parse.Query(Parse.User);
    const user = await query.get(userId, { useMasterKey: true });

    user.set("is_active", isActive);
    await user.save(null, { useMasterKey: true });
    return "User status updated";
});
