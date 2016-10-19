
Meteor.publish('fieis', function () {
  return Fieis.find();
});

Meteor.publish('organizacoes', function () {
  return Organizacoes.find();
});

Meteor.publish('users', function () {
  return Meteor.users.find();
});
