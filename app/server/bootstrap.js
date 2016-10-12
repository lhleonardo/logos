Meteor.startup(function () {
  if (Meteor.users.find().count() == 0) {
    var user = {
      username: "lhleonardo",
      email: "lhleonardo@hotmail.com",
      password: "admin",
      profile: {
        fiel: "jMij7EgLGRbcQiaM3"
      }
    };
    var id;
    id = Accounts.createUser(user);
    console.log('user criado');

    Roles.addUsersToRoles(id, ['admin'], Roles.GLOBAL_GROUP);
  }
});
