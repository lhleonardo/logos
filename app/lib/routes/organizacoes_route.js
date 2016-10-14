// Create
Router.route('/organizacoes/create', {
  name: 'organizacoes.create',
  controller: 'OrganizacoesController',
  action: 'create'
});

// List
Router.route('/organizacoes', {
  name: 'organizacoes.list',
  controller: 'OrganizacoesController',
  action: 'list'
});
