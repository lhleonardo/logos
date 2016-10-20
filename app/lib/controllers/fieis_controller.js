FieisController = RouteController.extend({
  layoutTemplate: 'MasterLayout',

  subscriptions: function() {
    if (Roles.userIsInRole(Meteor.userId(), ['admin', 'secretaria'],
        Roles.GLOBAL_GROUP)){
        console.log("subscribing...");
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
    console.log(Roles.userIsInRole(Meteor.user(), ['admin', 'secretaria'], Roles.GLOBAL_GROUP));
    if (!Meteor.userId()) {
      this.redirect('login');
      this.stop();
    }

    if (Roles.userIsInRole(Meteor.user(), ['admin', 'secretaria'], Roles.GLOBAL_GROUP) == false) {
      this.redirect('Unauthorized');
      this.stop();
    }
    this.next();
  },

  action: function () {
    this.render();
  },
});
