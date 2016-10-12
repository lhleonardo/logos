
Template.Header.helpers({
  create: function(){

  },
  rendered: function(){

  },
  destroyed: function(){

  },
  role: function () {
    return Meteor.user().roles.__global_roles__[0];
  }
});

Template.Header.events({
  "click #logout": function(event, template){
     event.preventDefault();
     Meteor.logout();
     Router.go('home');
  }
});
