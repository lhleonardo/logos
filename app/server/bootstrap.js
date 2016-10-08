Meteor.startup(function () {
  if (Meteor.users.find().count() == 0) {
    var user = {
      username: "lhleonardo",
      email: "lhleonardo@hotmail.com",
      password: "leonardo"
    };

    Accounts.createUser(user);

    console.log('user criado');
  }

});
