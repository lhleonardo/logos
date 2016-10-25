Router.route('/pastorais', {
  name: "pastoral.list",
  controller: "PastoralController",
  action: "list"
});

Router.route('/pastorais/create', {
  name: "pastoral.create",
  controller: "PastoralController",
  action: "create"
});

Router.route('/pastoral/:_id', {
  name: "pastoral.view",
  controller: "PastoralController",
  action: "view"
});


Router.route('/pastoral/:_id/edit', {
  name: "pastoral.edit",
  controller: "PastoralController",
  action: "edit"
});
