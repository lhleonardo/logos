Template.usersOperationCell.events({
  "click .btn-apaga-registro": function(event, template) {
    var $idUsuario = event.target.getAttribute("data-id");
    var $fiel = Fieis.findOne(Meteor.users.findOne($idUsuario).profile.fiel);
    var mensagem = "Se fizer isso, o usuário pertencente ";
    if ($fiel.sexo == "M") {
      mensagem += "ao " + $fiel.nome;
    } else {
      mensagem += "à " + $fiel.nome;
    }
    mensagem += " será excluído, impossibilitando à autenticação no sistema."
    swal({
      title: "Deseja realmente excluir o usuário?",
      text: mensagem,
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DD6B55",
      confirmButtonText: "Sim, quero excluir",
      cancelButtonText: "Não, cancelar",
      closeOnConfirm: false
    }, function() {
      Meteor.users.remove({_id: $idUsuario}, function(error, result){
        if (result) {
          swal({
            title: "Excluído!",
            text: "O usuário foi excluído com sucesso",
            type: "success"
          }, function() {
            location.reload();
            Router.go('users.list');
          });
        }
        if (error) {
          swal("Não foi excluído", "Algo aconteceu e o usuário não foi excluído. \nMotivo: " + error, "error");
        }
      });
    });
  }
});
