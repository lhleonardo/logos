
Template.CreateContribuicao.helpers({
  rendered: function(){
     $("input[name=data]").datetimepicker({
       locale: 'pt-BR'
     });
  },
});
