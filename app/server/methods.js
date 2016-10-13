/*****************************************************************************/
/*  Server Methods */
/*****************************************************************************/
var roles = [
  {label: "Administrador", value: 'admin'},
  {label: "Financeiro", value: 'financeiro'},
  {label: "Pastoral", value: 'pastoral'},
  {label: "Contabilidade", value: "contabilidade"},
  {label: "Convidado", value: "default"}
];

Meteor.methods({
  'getNameForUser': function () {
    let id = Meteor.user().profile.fiel;
    let nome = Fieis.findOne({_id: id}).nome;
    return nome;
  },
  'getNameForRole': function () {
    let role = Roles.getRolesForUser(Meteor.user(), Roles.GLOBAL_GROUP)[0];
    let obj = _.find(roles, function(item){ return item.value == role});
    console.log(obj.label);
    return obj.label;
  }
});
