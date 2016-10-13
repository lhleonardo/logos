/*List*/
Router.route('/fieis', {
  name: 'fieis.list',
  template: 'ListFiel',
  layoutTemplate: 'MasterLayout',
  where: 'client'
}, function() {
  this.render();
},);

/*View*/
Router.route('/fieis/:_id', {
  name: 'fieis.view',
  template: 'ViewFiel',
  layoutTemplate: 'MasterLayout',
  where: 'client'
});

/*Create*/
Router.route('/fieis/create', {
  name: 'fieis.create',
  template: 'CreateFiel',
  layoutTemplate: 'MasterLayout',
  where: 'client',

}, function () {
  this.render();
});

/*Edit*/
Router.route('/fieis/:_id/edit', {
  name: 'fieis.edit',
  template: 'UpdateFiel',
  layoutTemplate: 'MasterLayout',
  where: 'client'
}, function () {
  this.render('UpdateFiel',{
    data: function () {
      return Fieis.find({_id: this.params._id});
    }
  })
});
