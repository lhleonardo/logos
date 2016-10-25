Router.route('/pastorais', {
  name: "pastorais.list",
  controller: "PastoralController",
  action: "list"
});

Router.route('/pastorais/:_id', {
  name: "pastorais.view",
  controller: "PastoralController",
  action: "view"
});

Router.route('/pastorais/create', {
  name: "pastorais.create",
  controller: "PastoralController",
  action: "create"
});

Router.route('/pastorais/:_id/edit', {
  name: "pastorais.edit",
  controller: "PastoralController",
  action: "edit"
});
