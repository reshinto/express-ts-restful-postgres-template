export default {
  authenticate: { login: "/login" },
  group: {
    groups: "/groups",
    groupId: "/groups/:id",
    create: "/groups/create",
  },
  user: {
    users: "/users",
    userId: "/users/:id",
    create: "/users/create",
    search: "/users/search/:login",
  },
  userGroup: {
    usergroup: "/usergroup",
    addUsers: "/usergroup/addusers",
  },
};
