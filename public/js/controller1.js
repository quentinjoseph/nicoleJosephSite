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

});
