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
    count: 'sizeFieis',
    label: 'Fieis',
    icon: 'intersex',
    roles: 'admin,secretaria'
  }, {
    route: 'contribuicoes.list',
    color: 'blue',
    count: 'sizeContribuicoes',
    label: 'Contribuições',
    icon: 'link',
    roles: 'admin,financeiro,contabilidade'
  }, {
    route: 'pastoral.list',
    color: 'green',
    count: 'sizePastorais',
    label: 'Pastorais',
    icon: 'archive',
    roles: 'admin,secretaria'
  }, {
    route: 'organizacoes.list',
    color: 'purple',
    count: 'sizeOrganizacoes',
    label: 'Organizações',
    icon: 'object-group',
    roles: 'admin,secretaria'
  }, {
    route: 'users.list',
    color: 'yellow',
    count: 'sizeUsers',
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
