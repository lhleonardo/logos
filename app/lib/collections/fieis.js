Fieis = new Mongo.Collection("fieis");

Fieis.attachSchema(new SimpleSchema({
  nome: {
    label: 'Nome completo do fiel',
    type: String,
    optional: false,
    max: 255
  },
  tipo: {
    label: 'Classificação do fiel',
    type: String,
    allowedValues: ["PADRE", "MINISTRO", "DIZIMISTA", "CONTRIBUINTE"],
    autoform: {
      options: [
        {label: "Padre", value: "PADRE"},
        {label: "Ministro", value: "MINISTRO"},
        {label: "Dizimista", value: "DIZIMISTA"},
        {label: "Contribuinte", value: "CONTRIBUINTE"}
      ]
    }
  },
  sexo: {
    label: 'Sexo do fiel',
    type: String,
    allowedValues: ["M", "F"],
    autoform: {
      options: [
        {label: "Feminino", value: "F"},
        {label: "Masculino", value: "M"}
      ]
    }
  },
  dataNascimento: {
    label: "Data de Nascimento (DD/MM/YYYY)",
		type: "datetime-local",
		optional: false,
    autoform: {
      type: 'masked-input',
      mask: "00/00/0000",
      maskOptions: {
      	placeholder: "__/__/____"
      },
    }
	},
  cpf: {
    label: "CPF",
    type: String,
    max: 14,
    min: 14,
    optional: false,
    regEx: /^\d{3}.\d{3}.\d{3}-\d{2}$/,
		optional: false,
		autoform: {
			type: "masked-input",
      mask: "000.000.000-00",
      maskOptions: {
      	placeholder: "___.___.___-__"
      }
    }
  },
  rg: {
    label: "RG",
    type: String,
    optional: false,
  },
  status: {
    label: 'Status',
    type: String,
    allowedValues: ["ATIVO", "INATIVO"],
    autoform: {
      options: [
        {label: "Ativo", value: "ATIVO"},
        {label: "Inativo", value: "INATIVO"}
      ]
    }
  },
   endereco: {
     type: SchemaEndereco,
     optional: false
   }
}));

if (Meteor.isServer) {
  Fieis.allow({
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

  Fieis.deny({
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
}
