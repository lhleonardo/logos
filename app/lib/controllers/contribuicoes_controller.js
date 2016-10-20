ContribuicoesController = RouteController.extend({

  subscriptions: function() {
    if (Roles.userIsInRole(Meteor.userId(), ['admin', 'financeiro', 'contabilidade'],
        Roles.GLOBAL_GROUP)){
        console.log("subscribing...");
        this.subscribe("fieis");
        this.subscribe("contribuicoes");
    }
  },

  create: function() {
    this.render('CreateContribuicao', {});
  },

  waitOn: function () {
  },

  data: function () {
  },

  onBeforeAction: function () {
    if (!Meteor.userId()) {
      this.redirect('login');
      this.stop();
    }

    if (Roles.userIsInRole(Meteor.user(), ['admin', 'financeiro', 'contabilidade'],
        Roles.GLOBAL_GROUP) == false) {
          this.redirect('Unauthorized');
          this.stop();
    }
    this.next();
  },

  onAfterAction: function () {
  },

});
