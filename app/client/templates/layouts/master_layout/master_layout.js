Template.registerHelper("userName", function(user){
    Meteor.call("getNameForUser", function (error, result) {
      if (error) {
        console.log("error");
      }

      if (result) {
        Session.set("nomeUsuario", (result.length == 0 ? "Undefined" : result));
      }
    });
    return Session.get("nomeUsuario");
});

Template.registerHelper("roleName", function(){
  Meteor.call("getNameForRole", function (error, result) {
    if (error) {
      console.log(error);
    }
    if (result) {
      Session.set("nomeRole", (result.length == 0 ? "Undefined" : result));
    }
  });
  return Session.get("nomeRole");
});

Template.MasterLayout.helpers({
  create: function(){
    var self = this;

    self.minHeight = new ReactiveVar(
      $(window).height() - $('.main-header').height());

    $(window).resize(function () {
      self.minHeight.set($(window).height() - $('.main-header').height());
    });

    $('body').addClass('fixed');
  },
  destroyed: function(){
    $('body').removeClass('fixed');
  },
  minHeight: function () {
    return Template.instance().minHeight.get() + 'px'
  }
});
