Router.route('/contribuicoes/create', {
  name: 'contribuicoes.create',
  controller: 'ContribuicoesController',
  action: 'create'
});

Router.route('/contribuicoes', {
  name: 'contribuicoes.list',
  controller: 'ContribuicoesController',
  action: 'list'
});
