var app = angular.module("appMod");

app.controller("controller1", function ($scope, eventService, $location) {
$scope.formItem={};
$scope.events;
$scope.latest;
$scope.addEvent = function(item){
  function geocodeAddress(geocoder, resultsMap) {
    var geocoder = new google.maps.Geocoder();
    var address = item.eventAddress;
    console.log(address);
    geocoder.geocode({'address': address}, function(results, status) {
      if (status === 'OK') {

      var lat = results[0].geometry.location.lat();
      var lng = results[0].geometry.location.lng();
      $scope.formItem.lat= lat;
      $scope.formItem.lng= lng;
      eventService.addEvent(item).then(function(){
      console.log($scope.formItem);
      })

      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }

})
}
geocodeAddress();

};

function getLatestEvents(){
  eventService.getLatestEvents().then(function(results){
    $scope.latest=results;
    console.log($scope.latest);
  })
}
getLatestEvents();

$scope.getEventById= function(eventId){
  var id=eventId;
  eventService.getEventInfo(id).then(function(results){
   $scope.singleEvent=results;
   console.log($scope.singleEvent)
  })
}

$scope.goToEvent = function (eventId) {
    $location.url('/thisevent?id=' + eventId);
    console.log(eventId)
  }





// navbar seclection
var home = angular.element(document.querySelector('#liHome'));
var events = angular.element(document.querySelector('#liEvents'));
var bio = angular.element(document.querySelector('#liBio'));
var media = angular.element(document.querySelector('#liMedia'));
var contact = angular.element(document.querySelector('#liContact'));

$scope.navHome = function(){
  home.addClass('pageNotify');
  home.removeClass('navSelect');
  events.removeClass('pageNotify');
  events.addClass('navSelect');
  bio.removeClass('pageNotify');
  bio.addClass('navSelect');
  media.removeClass('pageNotify');
  media.addClass('navSelect');
  contact.removeClass('pageNotify');
  contact.addClass('navSelect');

  }

$scope.navEvents = function(){
  events.addClass('pageNotify');
  events.removeClass('navSelect');
  home.removeClass('pageNotify');
  home.addClass('navSelect');
  bio.removeClass('pageNotify');
  bio.addClass('navSelect');
  media.removeClass('pageNotify');
  media.addClass('navSelect');
  contact.removeClass('pageNotify');
  contact.addClass('navSelect');
  }

$scope.navBio = function(){
  bio.addClass('pageNotify');
  bio.removeClass('navSelect');
  home.removeClass('pageNotify');
  home.addClass('navSelect');
  events.removeClass('pageNotify');
  events.addClass('navSelect');
  media.removeClass('pageNotify');
  media.addClass('navSelect');
  contact.removeClass('pageNotify');
  contact.addClass('navSelect');
  }

$scope.navMedia = function(){
  media.addClass('pageNotify');
  media.removeClass('navSelect');
  home.removeClass('pageNotify');
  home.addClass('navSelect');
  events.removeClass('pageNotify');
  events.addClass('navSelect');
  bio.removeClass('pageNotify');
  bio.addClass('navSelect');
  contact.removeClass('pageNotify');
  contact.addClass('navSelect');
  }


$scope.navContact = function(){
  contact.addClass('pageNotify');
  contact.removeClass('navSelect');
  home.removeClass('pageNotify');
  home.addClass('navSelect');
  events.removeClass('pageNotify');
  events.addClass('navSelect');
  bio.removeClass('pageNotify');
  bio.addClass('navSelect');
  media.removeClass('pageNotify');
  media.addClass('navSelect');
  }

});
