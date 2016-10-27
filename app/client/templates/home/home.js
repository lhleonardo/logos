/*****************************************************************************/
/* Home: Event Handlers */
/*****************************************************************************/
Template.Home.events({
});

/*****************************************************************************/
/* Home: Helpers */
/*****************************************************************************/
Template.Home.helpers({
  rendered: function(){

  },
  cards: function () {
    return cards;
  }
});

Template.card.helpers({
  invoke: function (methodName) {
    Meteor.call(methodName, function(error, result) {
      //console.log(error);
      if (result) {
        Session.set("countValue", result);
      }
      if (error) {
        Session.set("countValue", 0);
      }
    });

    return Session.get('countValue');
  }
});

var cards = [
  {
    route: "fieis.list",
    color: 'red',
    count: function () {
      Meteor.call("sizeFieis", function(error, result) {
        //console.log(error);
        if (result) {
          Session.set("countValueFieis", result);
        }
        if (error) {
          Session.set("countValueFieis", 0);
        }
      });

      return Session.get('countValueFieis');
    },
    label: 'Fieis',
    icon: 'intersex',
    roles: 'admin,secretaria'
  }, {
    route: 'contribuicoes.list',
    color: 'blue',
    count: function() {
      Meteor.call("sizeContribuicoes", function(error, result) {
        //console.log(error);
        if (result) {
          Session.set("countValueContribuicoes", result);
        }
        if (error) {
          Session.set("countValueContribuicoes", 0);
        }
      });

      return Session.get('countValueContribuicoes');
    },
    label: 'Contribuições',
    icon: 'link',
    roles: 'admin,financeiro,contabilidade'
  }, {
    route: 'pastoral.list',
    color: 'green',
    count: function() {
      Meteor.call("sizePastorais", function(error, result) {
        //console.log(error);
        if (result) {
          Session.set("countValuePastoral", result);
        }
        if (error) {
          Session.set("countValuePastoral", 0);
        }
      });

      return Session.get('countValuePastoral');
    },
    label: 'Pastorais',
    icon: 'archive',
    roles: 'admin,secretaria'
  }, {
    route: 'organizacoes.list',
    color: 'purple',
    count: function() {
      Meteor.call("sizeOrganizacoes", function(error, result) {
        //console.log(error);
        if (result) {
          Session.set("countValueOrganizacao", result);
        }
        if (error) {
          Session.set("countValueOrganizacao", 0);
        }
      });

      return Session.get('countValueOrganizacao');
    },
    label: 'Organizações',
    icon: 'object-group',
    roles: 'admin,secretaria'
  }, {
    route: 'users.list',
    color: 'yellow',
    count: function() {
      Meteor.call("sizeUsers", function(error, result) {
        //console.log(error);
        if (result) {
          Session.set("countValueUsers", result);
        }
        if (error) {
          Session.set("countValueUsers", 0);
        }
      });

      return Session.get('countValueUsers');
    },
    label: 'Usuários',
    icon: 'users',
    roles: 'admin'
  }
];

/*****************************************************************************/
/* Home: Lifecycle Hooks */
/*****************************************************************************/
Template.Home.onCreated(function () {
});

Template.Home.onRendered(function () {
});

Template.Home.onDestroyed(function () {
});
