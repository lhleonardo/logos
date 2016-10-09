/*List*/
Router.route('/fieis', {
  name: 'fieis.list',
  controller: 'FieisController',
  action: 'list',
  where: 'client'
});

/*Create*/
Router.route('/fieis/create', {
  name: 'fieis.create',
  controller: 'FieisController',
  action: 'create',
  where: 'client'
});
