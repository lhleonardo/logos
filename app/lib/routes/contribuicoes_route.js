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

Router.route('/contribuicoes/:_id', {
  name: "contribuicoes.view",
  controller: 'ContribuicoesController',
  action: 'view'
});

Router.route('/contribuicoes/:_id/edit', {
  name: "contribuicoes.edit",
  controller: 'ContribuicoesController',
  action: 'edit'
});
