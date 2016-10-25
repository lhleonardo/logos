PastoralController = RouteController.extend({

  // A place to put your subscriptions
  // this.subscribe('items');
  // // add the subscription to the waitlist
  // this.subscribe('item', this.params._id).wait();

  subscriptions: function() {

  },

  create: function() {
    this.render("CreatePastoral", {});
  },

  view: function() {
    this.render("ViewPastoral", {});
  },

  edit: function() {
    this.render("EditPastoral", {});
  },

  list: function() {
    this.render("ListPastoral", {});
  },

  data: function () {
    return Pastorais.findOne(this.params._id);
  },

  onBeforeAction: function () {
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
