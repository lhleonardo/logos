
Meteor.publish('fieis', function () {
  return Fieis.find();
});
