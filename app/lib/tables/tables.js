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
