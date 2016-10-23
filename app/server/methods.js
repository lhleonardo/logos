/*****************************************************************************/
/*  Server Methods */
/*****************************************************************************/
var roles = [
  {label: "Administrador", value: 'admin'},
  {label: "Financeiro", value: 'financeiro'},
  {label: "Pastoral", value: 'pastoral'},
  {label: "Contabilidade", value: "contabilidade"},
  {label: "Convidado", value: "default"},
  {label: "Secretaria", value: "secretaria"}
];

Meteor.methods({
  'getNameForUser': function () {
    let id = Meteor.user().profile.fiel;
    let nome = Fieis.findOne({_id: id}).nome;
    return nome;
  },
  'getNameForRole': function (user) {
    let role = Roles.getRolesForUser((user) ? user : Meteor.user(), Roles.GLOBAL_GROUP)[0];
    let obj = _.find(roles, function(item){ return item.value == role});
    console.log(obj.label);
    return obj.label;
  },
  'getUser': function(id) {
    return Meteor.users.findOne({_id: id});
  },
  'addUser': function(user) {
    console.log(user.email);
    console.log(user.senha);
    console.log(user.role);
    console.log(user.fiel);
    var created = Accounts.createUser({
      email: user.email,
      password: user.senha,
      profile: {
        fiel: user.fiel
      }
    });

    if (created) {
      Roles.addUsersToRoles(created, user.role, Roles.GLOBAL_GROUP);
    } else {

    }


  }
});
