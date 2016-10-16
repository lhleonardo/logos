OrganizacoesController = RouteController.extend({

  layoutTemplate: 'MasterLayout',

  subscriptions: function() {
    if (Roles.userIsInRole(Meteor.user(), ['admin', 'secretaria'], Roles.GLOBAL_GROUP)) {
      console.log("subscribing...");
      this.subscribe('organizacoes');
    }
  },

  list: function () {
    this.render("ListOrganizacao", {});
  },

  create: function () {
    this.render('CreateOrganizacao', {});
  },

  edit: function () {
    this.render("UpdateOrganizacao", {});
  },

  view: function functionName() {
    this.render("ViewOrganizacao", {});
  },
  // Subscriptions or other things we want to "wait" on. This also
  // automatically uses the loading hook. That's the only difference between
  // this option and the subscriptions option above.
  // return Meteor.subscribe('post', this.params._id);

  waitOn: function () {
  },

  // A data function that can be used to automatically set the data context for
  // our layout. This function can also be used by hooks and plugins. For
  // example, the "dataNotFound" plugin calls this function to see if it
  // returns a null value, and if so, renders the not found template.
  // return Posts.findOne({_id: this.params._id});

  data: function () {
    return Organizacoes.findOne({_id: this.params._id});
  },

  // You can provide any of the hook options

  onRun: function () {
    this.next();
  },
  onRerun: function () {
    this.next();
  },
  onBeforeAction: function () {
    if (!Meteor.userId()) {
      this.redirect('login');
      this.stop();
    }

    if (Roles.userIsInRole(Meteor.user(), ['admin', 'secretaria'], Roles.GLOBAL_GROUP) == false) {
      this.render('Unauthorized');
    }
    this.next();
  },

  // The same thing as providing a function as the second parameter. You can
  // also provide a string action name here which will be looked up on a Controller
  // when the route runs. More on Controllers later. Note, the action function
  // is optional. By default a route will render its template, layout and
  // regions automatically.
  // Example:
  //  action: 'myActionFunction'

  action: function () {
    this.render();
  },
  onAfterAction: function () {
  },
  onStop: function () {
  }
});
