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
				let organizacoes = Organizacoes.find({$or: [{tipo: 'PAROQUIA'},
                            {tipo: 'COMUNIDADE'}]});
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
  pastorais: {
    type: Array,
    optional: true,
    label: "Pastorais presentes na organização"
  },
  "pastorais.$": {
    type: Object
  },
  'pastorais.$.pastoral': {
    type: String,
    optional: false,
    label: "Nome da Pastoral",
    autoform: {
      type: "select2",
      options: function() {
        let valores = [];
        Pastorais.find().forEach((pastoral) => {
          valores.push({label: pastoral.nome, value: pastoral._id});
        });
        return valores;
      }
    }
  },
  'pastorais.$.responsaveis': {
    type: [String],
    optional: false,
    label: "Responsáveis pela pastoral",
    autoform: {
      type: 'select2',
      afFieldInput: {
        multiple: true
      },
      options: function (){
        let valores = [];
        Fieis.find().forEach((fiel)=>{
          valores.push({label: fiel.nome, value: fiel._id});
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

var SchemaPastorais = new SimpleSchema({

});

Organizacoes.after.insert(function (userId, doc) {
  if (_.has(doc, "coordenadora")) {
    // adiciona 'this' aos dependentes da coordenadora
    var coordenadora = Organizacoes.findOne({_id: doc.coordenadora});

    if (! _.has(coordenadora, "dependentes")) {
      coordenadora.dependentes = [];
    }

    coordenadora.dependentes.push(doc._id);

    Organizacoes.update({_id: doc.coordenadora}, {$set:{
      dependentes: coordenadora.dependentes
    }});
  }
  if (_.has(doc, "dependentes")) {
    // adiciona 'this' ao coordenadora dos dependentes
    doc.dependentes.forEach(function(dependente){

      Organizacoes.update({_id:dependente._id}, {$set:{
        coordenadora: doc._id
      }});

    });
  }
});

Organizacoes.after.update(function(userId, doc, fieldNames, modifier){
  if (_.has(doc, "coordenadora")) {
    // adiciona 'this' aos dependentes da coordenadora
    var coordenadora = Organizacoes.findOne({_id: doc.coordenadora});
    if (! _.contains(coordenadora.dependentes, doc._id)) {
        coordenadora.dependentes.push(doc._id);
        Organizacoes.update({_id: coordenadora._id}, {$set:{
          depedentes: coordenadora.dependentes
        }});
    }
  }

  if (_.has(doc, "dependentes")) {
    var dependentesValidos = _.map(Organizacoes.find({"coordenadora": doc._id}),
                              function(i){
                                return i;
                              });
    var difference = _.difference(doc.dependentes,dependentesValidos);
    if (! _.isEmpty(difference)){
        difference.forEach(function (item) {
          Organizacoes.update({_id: item}, {$set:{
            coordenadora: doc._id
          }});

        });
    }
  }

});

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
