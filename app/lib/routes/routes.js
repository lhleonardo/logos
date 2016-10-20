/*Default configuration for generic routes*/
Router.configure({
  layoutTemplate: 'MasterLayout',
  loadingTemplate: 'Loading',
  notFoundTemplate: 'NotFound'
});

Router.route('/NotFound');

Router.route('/Unauthorized');
