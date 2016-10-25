UsersController = RouteController.extend({

  layoutTemplate: 'MasterLayout',

  subscriptions: function() {
    if (Roles.userIsInRole(Meteor.user(), ['admin'], Roles.GLOBAL_GROUP)) {
      this.subscribe('fieis');
      this.subscribe('users');
    }
  },

  create: function() {
    this.render('CreateUsuario', {});
  },

  list: function() {
    this.render('ListUsuario', {});
  },

  onBeforeAction: function () {

    if (!Meteor.userId()) {
      this.redirect('login');
      this.stop();
    }

    console.log("User: " + Meteor.user());
    console.log("Roles: " + Meteor.user().roles);
    var auth = Roles.userIsInRole(Meteor.user(), ['admin'], Roles.GLOBAL_GROUP);
    console.log("Autenticado? " + auth);

    if (auth) {
        this.next();
    } else {
      this.redirect('Unauthorized');
      this.stop();
    }
  },

  action: function () {
    this.render();
  }
});
