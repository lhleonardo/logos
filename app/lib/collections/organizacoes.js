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
    autoform: {
      type: 'select2',
      afFieldInput: {
        multiple: false
      },
      options: [
        {label: "Diocese", value: "DIOCESE"},
        {label: "Paróquia", value: "PAROQUIA"},
        {label: "Comunidade", value: "COMUNIDADE"}
      ]
    }
  },
  dataFundacao: {
    type: Date,
    label: 'Data de Fundação',
    optional: true,
    autoform: {
      afFieldInput: {
        type: "bootstrap-datepicker"
      }
    }
  },
  dataFixacao: {
    type: Date,
    label: 'Data de Fixação',
    optional: true,
    autoform: {
      afFieldInput: {
        type: "bootstrap-datepicker"
      }
    }
  },
  cnpj: {
    type: String,
    label: "CNPJ",
    max: 18,
    min: 18,
    optional: false,
    regEx: /\d{2}.?\d{3}.?\d{3}\/?\d{4}-?\d{2}/g,
		optional: false,
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
			type: "select2",
			afFieldInput: {
        multiple: false
      },
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
    type: Object,
    optional: false
  },
   "endereco.tipoLogradouro": {
     type: String,
     optional: false,
     allowedValues: ["ALM","AVN","BEC","BLV","CAM","CAS","CMP","ESC","ETR",
                     "FAV","FAZ","FLT","ILH","JRD","LAD","LRG","LTM","LUG",
                     "MRR","PQE","PAS","PRA","PRC","REC","ROD","RUA","SRV",
                     "TRV","VIA","VIL"],
     autoform: {
       options: [
         {label: "ALAMEDA"	,value: "ALM"},
         {label: "AVENIDA"	,value: "AVN"},
         {label: "BECO"	,value: "BEC"},
         {label: "BOULEVARD"	,value: "BLV"},
         {label: "CAMINHO"	,value: "CAM"},
         {label: "CAIS"	,value: "CAS"},
         {label: "CAMPO"	,value: "CMP"},
         {label: "ESCADA"	,value: "ESC"},
         {label: "ESTRADA"	,value: "ETR"},
         {label: "FAVELA"	,value: "FAV"},
         {label: "FAZENDA"	,value: "FAZ"},
         {label: "FLORESTA"	,value: "FLT"},
         {label: "ILHA"	,value: "ILH"},
         {label: "JARDIM"	,value: "JRD"},
         {label: "LADEIRA"	,value: "LAD"},
         {label: "LARGO"	,value: "LRG"},
         {label: "LOTEAMENTO"	,value: "LTM"},
         {label: "LUGAR"	,value: "LUG"},
         {label: "MORRO"	,value: "MRR"},
         {label: "PARQUE"	,value: "PQE"},
         {label: "PASSEIO"	,value: "PAS"},
         {label: "PRAIA"	,value: "PRA"},
         {label: "PRAÇA"	,value: "PRC"},
         {label: "RECANTO"	,value: "REC"},
         {label: "RODOVIA"	,value: "ROD"},
         {label: "RUA"	,value: "RUA"},
         {label: "SERVIDAO"	,value: "SRV"},
         {label: "TRAVESSA"	,value: "TRV"},
         {label: "VIA"	,value: "VIA"},
         {label: "VILA"	,value: "VIL"}
       ]
     }
   },
  "endereco.logradouro" : {
    type: String,
    optional: false
  },
  "endereco.bairro": {
    type: String,
    optional: true
  },
  "endereco.estado": {
    type: String
  },
  "endereco.cidade": {
    type: String
  },
  "endereco.numero": {
    type: String
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
