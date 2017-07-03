var app = angular.module("appMod");

app.controller("contactController", function ($scope, eventService, $location) {
  $scope.contactMe = function(email){
        eventService.sendEmail(email).then(function(){
          $scope.contactInfo={};
          $location.url('/sent');
        })


  };


  function showAdmin(){
  var admin=angular.element(document.querySelector('#admin'));
    admin.removeClass('hide');
  }
  showAdmin();

  $scope.$on('$destroy', function() {
    var admin=angular.element(document.querySelector('#admin'));
      admin.addClass('hide');
  })

});
