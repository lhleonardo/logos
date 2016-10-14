Organizacoes = new Mongo.Collection('organizacoes');

Organizacoes.attachSchema(new SimpleSchema({
  nome: {
    label: 'Nome da Organização',
    type: String,
    optional: false
  },
  tipo: {
    type: String,
    allowedValues: ['PAROQUIA', 'DIOCESE', 'COMUNIDADE'],
    label: 'Tipo de Organização',
    optional: false,
    autoform: {
      options: function () {
        return [
          {label: "Diocese", value: "DIOCESE"},
          {label: "Paróquia", value: "PAROQUIA"},
          {label: "Comunidade", value: "COMUNIDADE"}
        ];
      }
    }
  },
  dataFundacao: {
    type: "datetime-local",
    label: 'Data de Fundação',
    optional: true,
    autoform: {
      type: 'masked-input',
      mask: "00/00/0000",
      maskOptions: {
      	placeholder: "__/__/____"
      }
    }
  },
  dataFixacao: {
    type: 'datetime-local',
    label: 'Data de Fixação',
    optional: true,
    autoform: {
      type: 'masked-input',
      mask: "00/00/0000",
      maskOptions: {
      	placeholder: "__/__/____"
      }
    }
  },
  cnpj: {
    type: String,
    label: "CNPJ",
    max: 18,
    min: 18,
    optional: true,
    regEx: /\d{2}.?\d{3}.?\d{3}\/?\d{4}-?\d{2}/g,
		autoform: {
			type: "masked-input",
      mask: "00.000.000/0000-00",
      maskOptions: {
      	placeholder: "__.___.___/____-__"
      }
    }
  },
  ie: {
    label: 'Inscrição Estadual (IE)',
    optional: true,
    type: String
  },
  descricao: {
    type: String,
    label: 'Descrição',
    optional: true
  },
  dependentes: {
    type: [String],
    optional: true,
    label: 'Organizações dependentes desta',
    autoform: {
			type: "select2",
			afFieldInput: {
        multiple: true
      },
			options: function () {
				let valores = [];
				let organizacoes = Organizacoes.find({$or: [{tipo: 'PAROQUIA'}, {tipo: 'COMUNIDADE'}]});
				organizacoes.forEach((organizacao)=> {
					valores.push({label: organizacao.nome, value: organizacao._id});
				});
				return valores;
      }
		}
  },
  coordenadora: {
    type: String,
    optional: true,
    label: 'Organização de coordenação superior',
    autoform: {
			type: "typeahead",
			options: function () {
				let valores = [];
				let organizacoes = Organizacoes.find({$or: [{tipo: 'PAROQUIA'}, {tipo: 'DIOCESE'}]});
				organizacoes.forEach((organizacao)=> {
					valores.push({label: organizacao.nome, value: organizacao._id});
				});
				return valores;
      }
		}
  },
  endereco: {
    type: SchemaEndereco,
    optional: false
  }
}));

if (Meteor.isServer) {
  Organizacoes.allow({
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

  Organizacoes.deny({
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
