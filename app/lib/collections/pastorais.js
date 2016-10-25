Pastorais = new Mongo.Collection('pastorais');

Pastorais.attachSchema(new SimpleSchema({
  nome: {
    type: String,
    label: "Nome da pastoral",
    optional: false
  },
  descricao: {
    type: String,
    label: "Descrição",
    autoform: {
      afFieldInput: {
        type: "textarea",
        rows: 3
      }
    }
  }
}));


if (Meteor.isServer) {
  Pastorais.allow({
    insert: function (userId, doc) {
      return Roles.userIsInRole(userId, ['admin', 'secretaria'], Roles.GLOBAL_GROUP);
    },

    update: function (userId, doc, fieldNames, modifier) {
      return Roles.userIsInRole(userId, ['admin', 'secretaria'], Roles.GLOBAL_GROUP);
    },

    remove: function (userId, doc) {
      if (Roles.userIsInRole(userId, ['admin', 'secretaria'], Roles.GLOBAL_GROUP)) {
        // verificar se existem dependentes para esta organização
        return true;
      }
      return false;
    }
  });

  Pastorais.deny({
    insert: function (userId, doc) {
      return !Roles.userIsInRole(userId, ['admin', 'secretaria'], Roles.GLOBAL_GROUP);
    },

    update: function (userId, doc, fieldNames, modifier) {
      return !Roles.userIsInRole(userId, ['admin', 'secretaria'], Roles.GLOBAL_GROUP);
    },

    remove: function (userId, doc) {
      if (Roles.userIsInRole(userId, ['admin', 'secretaria'], Roles.GLOBAL_GROUP)) {
        // verificar se existem dependentes para esta organização
        return false;
      }
      return true;
    }
  });
}
