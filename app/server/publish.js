
Meteor.publish('fieis', function () {
  return Fieis.find();
});


Meteor.publish('organizacoes', function () {
  return Organizacoes.find();
});