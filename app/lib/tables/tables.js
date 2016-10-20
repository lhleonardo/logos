TabularTables = {};

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
      title: "Operações",
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
      // render: function (val, type, doc) {
      //   if (val == "DIOCESE") {
      //     return "Diocese";
      //   }
      //   if (val == "PAROQUIA") {
      //     return "Paróquia";
      //   }
      //   if (val == "COMUNIDADE") {
      //     return "Comunidade";
      //   }
      //   return "ERRO: Undefined";
      // }
    },
    {
      title: "Operações",
      tmpl: Meteor.isClient && Template.organizacaoOperationCell
    }
  ]
});

TabularTables.Usuarios = new Tabular.Table({
  name: "Usuarios",
  collection: Meteor.users,
  responsive: true,
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
      data: 'createdAt',
      title: "Data de Criação",
      searchable: false,
      render: function (val, type, doc) {
        return moment(val).format('LLLL');
      }
    }
  ]
});
