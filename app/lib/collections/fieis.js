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
  detalhes: {
    type: Object,
    optional: false,
  },
  'detalhes.statusCivil': {
    type: String,
    optional: false,
    allowedValues: ['SOLTEIRO', 'CASADO', 'VIUVO', 'DIVORCIADO', 'COMPANHEIRO', 'SEPARADO'],
    autoform: {
      type: 'select2',
      options: [
        {label: "Casado(a)", value: "CASADO"},
        {label: "Companheiro(a)", value: "COMPANHEIRO"},
        {label: "Divorciado(a)", value: "DIVORCIADO"},
        {label: "Separado(a)", value: "SEPARADO"},
        {label: "Solteiro(a)", value: "SOLTEIRO"},
        {label: "Viúvo(a)", value: "VIUVO"}
      ]
    }
  },
  'detalhes.conjuge': {
    type: Object,
    optional: true,
    label: "Informações de Cônjuge"
  },
  "detalhes.conjuge.tipo": {
    type: String,
    label: "Tipo de Cônjuge",
    allowedValues: ["VARAO", "VIRAGO"],
    optional: false,
    autoform: {
      options: [
        {label: "Varão  (homem)", value: "VARAO"},
        {label: "Virago (mulher)", value: "VIRAGO"}
      ]
    }
  },
  "detalhes.conjuge.nome": {
    type: String,
    optional: false,
    label: "Nome da pessoa conjuge"
  },
  'detalhes.dependentes': {
    type: Array,
    optional: true,
    label: "Dependentes deste fiel",
    min: 0
  },
  "detalhes.dependentes.$": {
    type: Object,
    optional: true,
    label: "Dependente"
  },
  "detalhes.dependentes.$.tipo": {
    label: "Tipo de Dependente",
    type: String,
    optional: false,
    allowedValues: ['MAE', 'PAI', 'IRMAO', 'IRMA', 'AVOM', 'AVOF', 'OUTRO'],
    autoform: {
      type: "select2",
      options: [
        {label: "Mãe", value: 'MAE'},
        {label: "Pai", value: "PAI"},
        {label: "Irmão", value: "IRMAO"},
        {label: "Irmã", value: "IRMA"},
        {label: "Avó", value: "AVOM"},
        {label: "Avô", value: "AVOF"},
        {label: "Outro", value: "OUTRO"}
      ]
    }
  },
  "detalhes.dependentes.$.nome": {
    type: String,
    optional: false,
    label: "Nome do dependente"
  },
  "detalhes.dependentes.$.dataNascimento" : {
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
  endereco: {
     type: SchemaEndereco,
     label: "Localização e Moradia",
     optional: false
  }
}));

SchemaDetalhes = new SimpleSchema({

});

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
