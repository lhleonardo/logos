Contribuicoes = new Mongo.Collection('contribuicoes');

Contribuicoes.attachSchema(new SimpleSchema({
  contribuidor: {
    type: String,
    autoform: {
      type: "select2",
      options: function () {
        let valores = [];
        let pessoas = Fieis.find();
        pessoas.forEach((pessoa)=> {
          valores.push({label: pessoa.nome, value: pessoa._id});
        });
        return valores;
      }
    }
  },
  tipo: {
    type: String,
    label: 'Tipo de Contribuição (Obrigatório)',
    allowedValues: ['DIZIMO', 'DOACAO'],
    optional: false,
    autoform: {
      options: [
        {label: 'Dízimo', value: "DIZIMO"},
        {label: 'Doação', value: "DOACAO"}
      ]
    }
  },
  data: {
    type: Date,
    label: "Data da contribuição (Padrão: hoje)",
    autoform: {
     afFieldInput: {
       type: "bootstrap-datetimepicker"
     }
   }
  },
  descricao: {
    type: String,
    optional: true,
    label: 'Descrição desta contribuição (Opcional)'
  },
  valor: {
    type: String,
    label: "Valor fornecido (R$)",
    optional: false,
    autoform: {
      type: 'masked-input',
      mask: "000.000.000.000.000,00",
      maskOptions: {
      	placeholder: "___.___.___.___.___,__"
      },
    }
  }
}));

if (Meteor.isServer) {
  Contribuicoes.allow({
    insert: function (userId, doc) {
      return Roles.userIsInRole(userId, ['admin', 'financeiro'], Roles.GLOBAL_GROUP);
    },

    update: function (userId, doc, fieldNames, modifier) {
      return Roles.userIsInRole(userId, ['admin', 'financeiro'], Roles.GLOBAL_GROUP);
    },

    remove: function (userId, doc) {
      if (Roles.userIsInRole(userId, ['admin', 'financeiro'], Roles.GLOBAL_GROUP)) {
        // verificar se existem dependentes para esta organização
        return true;
      }
      return false;
    }
  });

  Contribuicoes.deny({
    insert: function (userId, doc) {
      return !Roles.userIsInRole(userId, ['admin', 'financeiro'], Roles.GLOBAL_GROUP);
    },

    update: function (userId, doc, fieldNames, modifier) {
      return !Roles.userIsInRole(userId, ['admin', 'financeiro'], Roles.GLOBAL_GROUP);
    },

    remove: function (userId, doc) {
      if (Roles.userIsInRole(userId, ['admin', 'financeiro'], Roles.GLOBAL_GROUP)) {
        // verificar se existem dependentes para esta organização
        return false;
      }
      return true;
    }
  });
}
