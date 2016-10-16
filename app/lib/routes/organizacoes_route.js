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

Router.route("/organizacoes/:_id/edit", {
  name: 'organizacoes.edit',
  controller: "OrganizacoesController",
  action: 'edit'
});

Router.route('/organizacoes/:_id', {
  name: "organizacoes.view",
  controller: "OrganizacoesController",
  action: 'view'
});
