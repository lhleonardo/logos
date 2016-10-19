Router.route('/users', {
  name: 'users.list',
  controller: 'UsersController',
  action: 'list'
});

Router.route('/users/create', {
  name: 'users.create',
  controller: 'UsersController',
  action: 'create'
});

Router.route('/users/:_id/edit', {
  name: 'users.edit',
  controller: 'UsersController',
  action: 'edit'
});

Router.route('/users/:_id', {
  name: 'users.view',
  controller: 'UsersController',
  action: 'view'
});
