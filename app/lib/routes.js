Router.configure({
  loadingTemplate: 'Loading',
  notFoundTemplate: 'NotFound'
});


Router.route('/', {
  name: 'home',
  controller: 'HomeController',
  where: 'client'
});

Router.route('/fieis/create', {
  name: 'createFiel',
  controller: 'FieisController',
  action: 'create',
  where: 'client'
});

Router.route('/login', {
  name: 'login',
  controller: 'LoginController',
  action: 'login',
  where: 'client'
});
