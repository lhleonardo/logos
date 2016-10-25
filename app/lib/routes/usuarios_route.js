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
