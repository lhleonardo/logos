Meteor.startup(function () {
  if (Meteor.users.find().count() == 0) {
    var user = {
      username: "lhleonardo",
      email: "lhleonardo@hotmail.com",
      password: "admin",
      profile: {
        fiel: '5q4srYEFPy528Pr9d'
        
      }
    };
    var id;
    id = Accounts.createUser(user);
    console.log('user criado');

    Roles.addUsersToRoles(id, ['admin'], Roles.GLOBAL_GROUP);
  }
});
