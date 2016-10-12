Template.MasterLayout.helpers({
});

Template.MasterLayout.events({
});

Template.registerHelper("userName", function(user){
    Meteor.call("getNameForUser", function (error, result) {
      if (error) {
        console.log("error");
      }

      if (result) {
        check(result, String);
        Session.set("nomeUsuario", (result.length == 0 ? "Undefined" : result));
      }
    });
    return Session.get("nomeUsuario");
    ;
});

var roles = [
  {label: "Administrador", value: 'admin'},
  {label: "Financeiro", value: 'financeiro'},
  {label: "Pastoral", value: 'pastoral'},
  {label: "Contabilidade", value: "contabilidade"},
  {label: "Convidado", value: "default"}
]

Template.registerHelper("roleName", function(roleName){
  check(roleName, String);
  let role = _.find(roles, function(role) { return role.value.valueOf() == roleName.valueOf()});
  return role.label;
});
