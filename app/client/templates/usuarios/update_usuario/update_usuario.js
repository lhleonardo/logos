Template.UpdateUsuario.helpers({
  rendered: function(){

  },
  getEmailForUser: function () {
    let $data = this;
    return $data.emails[0].address;
  },
  getRolesForUser: function () {
    var role = Roles.getRolesForUser(this._id, Roles.GLOBAL_GROUP);
    return role;
  },
  getFielForUser: function() {
    let $data = this;
    let fiel = Fieis.findOne({_id: $data.profile.fiel});
    return fiel._id;
  }
});
