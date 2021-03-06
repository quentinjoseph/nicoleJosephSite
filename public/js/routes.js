var app=angular.module('appMod', ['ngRoute'])
app.config(function($routeProvider) {
    $routeProvider.when('/home', {
      templateUrl: 'views/home.html',
      controller: 'controller1'
    })
    .when('/events',{
      templateUrl: 'views/events.html',
      controller: 'mapController'

    }).when('/bio',{
    templateUrl: 'views/bio.html',
    controller: 'controller1'

    }).when('/media',{
      templateUrl: 'views/media.html',
      controller: 'mediaController'

    }).when('/contact',{
      templateUrl: 'views/contact.html',
      controller: 'contactController'

    }).when('/sent',{
      templateUrl: 'views/sent.html',
      controller: 'contactController'

    }).when('/admin',{
      templateUrl: 'views/admin.html',
      controller: 'controller1'

    }).when('/thisevent',{
      templateUrl: 'views/thisevent.html',
      controller: 'eventController'

    })
      .otherwise('/home');

  });
