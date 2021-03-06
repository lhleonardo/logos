TabularTables = {};

var roles = [
  {label: "Administrador", value: 'admin'},
  {label: "Financeiro", value: 'financeiro'},
  {label: "Pastoral", value: 'pastoral'},
  {label: "Contabilidade", value: "contabilidade"},
  {label: "Convidado", value: "default"},
  {label: "Secretaria", value: "secretaria"}
];

TabularTables.Fieis = new Tabular.Table({
  name: "Fieis",
  collection: Fieis,
  responsive: true,
  autoWidth: false,
  columns: [
    {data: "nome", title: "Nome"},
    {data: "tipo", title: "Tipo"},
    {data: "cpf", title: "CPF"},
    {data: "status", title: "Situação"},
    {
      title: "Ações",
      tmpl: Meteor.isClient && Template.fielOperationCell
    }
  ]
});

TabularTables.Organizacoes = new Tabular.Table({
  name: "Organizacoes",
  collection: Organizacoes,
  responsive: true,
  autoWidth: false,
  columns: [
    {data: "nome", title: "Nome"},
    {
      data: 'tipo',
      title: "Tipo de Organização"
    },
    {
      title: "Ações",
      tmpl: Meteor.isClient && Template.organizacaoOperationCell
    }
  ]
});

TabularTables.Contribuicoes = new Tabular.Table({
  name: "Contribuicoes",
  collection: Contribuicoes,
  responsive: true,
  autoWidth: false,
  columns: [
    {
      data: "contribuidor",
      title: "Contribuidor",
      render: function (val, type, doc) {
        let fiel = Fieis.findOne({_id: val});
        return fiel.nome;
      }
    },
    {data: "tipo", title: "Tipo"},
    {
      data: "data",
      title: "Data de lançamento"
      /*render: function (val, type, doc) {
        return moment(val).format('LLLL');
      }*/
    },
    {
      title: "Valor",
      data: 'valor'
    },
    {
      title: "Ações",
      tmpl: Meteor.isClient && Template.contribuicaoOperationCell
    }

  ]
});

TabularTables.Usuarios = new Tabular.Table({
  name: "Usuarios",
  collection: Meteor.users,
  autoWidth: false,
  columns: [
    {
      data: "emails",
      title: "E-mail",
      searchable: false,
      render: function (val, type, doc) {
        return val[0].address;
      }
    },
    {
      data: "profile.fiel",
      title: "Responsável",
      searchable: false,
      render: function (val, type, doc) {
        let fiel = Fieis.findOne({_id: val});
        return fiel.nome;
      }
    },
    {
      data: '_id',
      title: "Perfil do Usuário",
      render: function (val, type, doc) {
        var role = Roles.getRolesForUser(val, Roles.GLOBAL_GROUP);
        return _.find(roles, function(item){ return item.value == role}).label;
      }
    },
    {
      data: 'createdAt',
      title: "Data de Criação",
      searchable: false,
      render: function (val, type, doc) {
        return moment(val).format('LLLL');
      }
    },
    {
      title: "Ações",
      tmpl: Meteor.isClient && Template.usersOperationCell
    }
  ]
});

TabularTables.Pastorais = new Tabular.Table({
  name: "Pastorais",
  collection: Pastorais,
  responsive: true,
  autoWidth: false,
  columns: [
    {data: "nome", title: "Nome da paróquia"},
    {
      title: "Ações",
      tmpl: Meteor.isClient && Template.pastoralOperationCell
    }
  ]
});
