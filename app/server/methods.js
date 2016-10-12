/*****************************************************************************/
/*  Server Methods */
/*****************************************************************************/

Meteor.methods({
  'getNameForUser': function () {
    let id = Meteor.user().profile.fiel;
    let nome = Fieis.findOne({_id: id}).nome;
    return nome;
  }
});
