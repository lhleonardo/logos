OrganizacoesController = RouteController.extend({

  layoutTemplate: 'MasterLayout',

  subscriptions: function() {
    if (Roles.userIsInRole(Meteor.user(), ['admin', 'secretaria'], Roles.GLOBAL_GROUP)) {
      console.log("subscribing...");
      this.subscribe('organizacoes');
      this.subscribe('pastorais');
      this.subscribe('fieis');
    }
  },

  list: function () {
    this.render("ListOrganizacao", {});
  },

  create: function () {
    this.render('CreateOrganizacao', {});
  },

  edit: function () {
    this.render("UpdateOrganizacao", {});
  },

  view: function () {
    this.render("ViewOrganizacao", {});
  },

  data: function () {
    return Organizacoes.findOne({_id: this.params._id});
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
  }
});
