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
