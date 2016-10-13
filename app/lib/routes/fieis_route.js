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
Router.route('fieis/edit/:_id', {
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
