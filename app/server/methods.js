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
    return obj.label;
  },
  'getRoleName': function(role) {
    check(role, String);
    let rol = _.find(roles, function (item) {
      return item.value == role;
    });

    if (rol) {
      return rol.label;
    } else {
      return "Undefined";
    }
  },
  'getUser': function(id) {
    return Meteor.users.findOne({_id: id});
  },
  'addUser': function(user) {
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
      // what to do?
    }
  },
  'sizeFieis': function () {
    var size = Fieis.find().count();
    return size;
  },
  'sizeContribuicoes': function () {
    var size = Contribuicoes.find().count();
    return size;
  },
  'sizePastorais': function () {
    var size = Pastorais.find().count();
    return size;
  },
  'sizeUsers': function () {
    var size = Meteor.users.find().count();
    return size;
  },
  'sizeOrganizacoes': function () {
    var size = Organizacoes.find().count();
    return size;
  }
});
