
Template.Header.helpers({
  create: function(){

  },
  rendered: function(){

  },
  destroyed: function(){

  },
});

Template.Header.events({
  "click #logout": function(event, template){
     event.preventDefault();
     Meteor.logout();
     Router.go('home');
  }
});
