TabularTables = {};

TabularTables.Fieis = new Tabular.Table({
  name: "Fieis",
  collection: Fieis,
  columns: [
    {data: "nome", title: "Nome"},
    {data: "tipo", title: "Tipo"},
    {data: "cpf", title: "CPF"},
    {data: "status", title: "Situação"},
    {
      tmpl: Meteor.isClient && Template.fielOperationCell
    }
  ]
});
