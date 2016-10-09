/* LOGIN */
Router.route('/login', {
  name: 'login',
  controller: 'LoginController',
  action: 'login',
  where: 'client'
});
