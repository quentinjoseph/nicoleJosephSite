var app = angular.module("appMod");

app.controller("contactController", function ($scope, eventService, $location) {
  $scope.contactMe = function(email){
        eventService.sendEmail(email).then(function(){
          $scope.contactInfo={};
          $location.url('/sent');
        })


  };

});
