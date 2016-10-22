FieisController = RouteController.extend({
  layoutTemplate: 'MasterLayout',

  subscriptions: function() {
    if (Roles.userIsInRole(Meteor.userId(), ['admin', 'secretaria'],
        Roles.GLOBAL_GROUP)){
        this.subscribe("fieis");
    }
  },

  create: function () {
    this.render("CreateFiel", {});
  },

  list: function () {
    this.render('ListFiel', {});
  },

  edit: function () {
    this.render('UpdateFiel', {});
  },

  view: function () {
    this.render('ViewFiel', {});
  },

  data: function () {
    return Fieis.findOne({_id: this.params._id});
  },

  onBeforeAction: function () {
    if (!Meteor.userId()) {
      this.redirect('login');
      this.stop();
    }

    console.log("User: " + Meteor.user());
    console.log("Roles: " + Meteor.user().roles);
    var auth = Roles.userIsInRole(Meteor.user(), ['admin', 'secretaria'], Roles.GLOBAL_GROUP);
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
  },
});
