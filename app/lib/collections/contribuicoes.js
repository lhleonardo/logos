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
    type: 'datetime-local',
    label: "Data da contribuição (Padrão: hoje)"
  },
  descricao: {
    type: String,
    optional: true,
    label: 'Descrição desta contribuição (Opcional)'
  },
  valor: {
    type: String,
    label: "Valor fornecido",
    optional: false
  }
}));

if (Meteor.isServer) {
  Contribuicoes.allow({
    insert: function (userId, doc) {
      return false;
    },

    update: function (userId, doc, fieldNames, modifier) {
      return false;
    },

    remove: function (userId, doc) {
      return false;
    }
  });

  Contribuicoes.deny({
    insert: function (userId, doc) {
      return true;
    },

    update: function (userId, doc, fieldNames, modifier) {
      return true;
    },

    remove: function (userId, doc) {
      return true;
    }
  });
}
