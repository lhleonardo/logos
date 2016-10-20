Schema = {};

SchemaUsuarios = new SimpleSchema({
  email: {
      type: String,
      optional: false,
      label: "E-mail"
  },
  senha: {
    type: String,
    optional: false,
    label: 'Senha'
  },
  role: {
    label: "Perfil de Usuário",
    type: String,
    allowedValues: ["admin", 'secretaria', 'financeiro', 'contabilidade'],
    autoform: {
      options: [
        {label: "Administrador", value: "admin"},
        {label: "Contabilidade", value: "contabilidade"},
        {label: "Financeiro", value: "financeiro"},
        {label: "Secretaria", value: "secretaria"}
      ]
    }
  },
  fiel: {
    label: "Dono da conta",
      type: String,
      autoform: {
        type: "select2",
        options: function () {
          let valores = [];
          let pessoas = Fieis.find();
          pessoas.forEach((pessoa)=> {
            let userCount = Meteor.users.find({"profile.fiel": pessoa._id}).count();
            if (userCount == 0) {
              valores.push({label: pessoa.nome, value: pessoa._id});
            }
          });
          return valores;
        }
      }
  }
});

Schema.UserProfile = new SimpleSchema({
  fiel: {
    label: "Dono da conta",
      type: String,
      autoform: {
        type: "select2",
        options: function () {
          let valores = [];
          let pessoas = Fieis.find();
          pessoas.forEach((pessoa)=> {
            let user = Meteor.users.findOne({_id: pessoa._id});
            if (user) {
              valores.push({label: pessoa.nome, value: pessoa._id});
            }
          });
          return valores;
        }
      }
  }
});

Schema.User = new SimpleSchema({
    username: {
        type: String,
        optional: true
    },
    services: {
        type: Object,
        optional: true,
        blackbox: true
    },
    emails: {
        type: Array,
        optional: true
    },
    "emails.$": {
        type: Object
    },
    "emails.$.address": {
        type: String,
        regEx: SimpleSchema.RegEx.Email
    },
    "emails.$.verified": {
        type: Boolean
    },
    createdAt: {
        type: Date
    },
    profile: {
        type: Schema.UserProfile,
        optional: false
    },
    roles: {
        type: Object,
        optional: true,
        blackbox: true
    },
    heartbeat: {
        type: Date,
        optional: true
    }
});

Meteor.users.attachSchema(Schema.User);
