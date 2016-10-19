SchemaContribuicoes = new SimpleSchema({
  tipo: {
    type: String,
    label: 'Tipo de Contribuição (Obrigatório)',
    allowedValues: ['DIZIMO', 'DOACAO'],
    optional: false,
    autoform: {
      options: [
        {label: 'Dízimo', value: "DIZIMO"},
        {label: 'Doação', value: "DOACAO"}
      ]
    }
  },
  data: {
    type: 'datetime-local',
    label: "Data da contribuição (Padrão: hoje)"
  },
  descricao: {
    type: String,
    optional: true,
    label: 'Descrição desta contribuição (Opcional)'
  },
  valor: {
    type: String,
    label: "Valor fornecido",
    optional: false
  }
});
