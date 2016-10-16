/*Listagem*/
Router.route("/fieis", {
  name:"fieis.list",
  controller: 'FieisController',
  action: 'list'
});

/*Criação*/
Router.route("fieis/create", {
  name:"fieis.create",
  controller: 'FieisController',
  action: 'create'
});

/*Edit*/
Router.route('fieis/:_id/edit', {
  name: 'fieis.edit',
  controller: 'FieisController',
  action: 'edit'
});

/*Visualizar*/
Router.route('fieis/:_id', {
  name: 'fieis.view',
  controller: 'FieisController',
  action: 'view'
});
