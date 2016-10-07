Fieis = new Mongo.Collection("fieis");

Fieis.attachSchema(new SimpleSchema({
  nome: {
    type: String,
    optional: false,
    max: 255
  },
  tipo: {
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
    type: String,
    allowedValues: ["M", "F", "O"],
    autoform: {
      options: [
        {label: "Feminino", value: "F"},
        {label: "Masculino", value: "M"},
        {label: "Outro", value: "O"}
      ]
    }
  },
  cpf: {
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
    type: String,
    optional: false,
  },
  status: {
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
