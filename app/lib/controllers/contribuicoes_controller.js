ContribuicoesController = RouteController.extend({

  subscriptions: function() {
    if (Roles.userIsInRole(Meteor.userId(), ['admin', 'financeiro', 'contabilidade'],
        Roles.GLOBAL_GROUP)){
        this.subscribe("fieis");
        this.subscribe("contribuicoes");
    }
  },

  create: function() {
    this.render('CreateContribuicao', {});
  },

  list: function() {
    this.render("ListContribuicao", {});
  },

  edit: function () {
    this.render("UpdateContribuicao", {});
  },

  view: function () {
    
  },

  onBeforeAction: function () {
    if (!Meteor.userId()) {
      this.redirect('login');
      this.stop();
    }

    console.log("User: " + Meteor.user());
    console.log("Roles: " + Meteor.user().roles);
    var auth = Roles.userIsInRole(Meteor.user(), ['admin', 'financeiro', 'contabilidade'], Roles.GLOBAL_GROUP);
    console.log("Autenticado? " + auth);
    if (auth) {
        this.next();
    } else {
      this.redirect('Unauthorized');
      this.stop();
    }
  },
});
