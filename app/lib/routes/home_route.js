Router.route('/', {
  name: 'home',
  controller: 'HomeController',
  where: 'client'
});

Router.route("/dashboard", {
  name:"routeName",
  where: "client"
}, function(){
  this.redirect('home');
});
