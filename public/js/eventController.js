var app = angular.module("appMod");

app.controller("eventController", function ($scope, eventService, $location) {
$scope.singleEvent=[];
var eventId = $location.url();
eventId = eventId.substring(eventId.indexOf('=') + 1, eventId.length);
 console.log(eventId);


// initMap();

$scope.goToEvent = function (eventId) {
    $location.url('/thisevent?id=' + eventId);
    console.log('works')
  }


  $scope.getEventById= function(eventId){
    var id=eventId;
    eventService.getEventInfo(id).then(function(results){
     $scope.singleEvent=results;
     var thisEvent=$scope.singleEvent;
     console.log(thisEvent);
     initMap();
     function initMap() {
       map = new google.maps.Map(document.getElementById('map'), {
         center: {lat: Number(thisEvent[0].lat), lng:Number(thisEvent[0].lng)},
         zoom: 18,
         scrollwheel: false
       });

     }
     for(i=0; i < thisEvent.length; i++){

       var marker = new google.maps.Marker({
         position: { lat:Number(thisEvent[i].lat), lng:Number(thisEvent[i].lng) },
         map:map,
         title: thisEvent[i].eventname,
         date: thisEvent[i].eventdate
       });
       function convertDate (date) {
         var output = "";
         output = date.substring(5,7) + "-" + date.substring(8,10);
         return output;
       }

 // this function shows or hides infowindow based on mouseover or mouseout
       (function(marker, i) {
         google.maps.event.addListener(marker, 'mouseover', function() {
           infowindow = new google.maps.InfoWindow({
             content: '<div>'+marker.title+'<br>'+convertDate(marker.date)+'</div>'
           });
           infowindow.open(map, marker);

         });
       })(marker, i);
       (function(marker, i) {
         google.maps.event.addListener(marker, 'mouseout', function() {
           infowindow.close(map, marker);
         });
       })(marker, i);

     }
    })
  }
 $scope.getEventById(eventId);



  var map;
      //  function initMap() {
      //    map = new google.maps.Map(document.getElementById('map'), {
      //      center: {lat: 37.0902, lng: -95.7129},
      //      zoom: 3
      //    });
       //
      //  }


      //  $scope.getEvents = function(){
      //    eventService.getAllEvents().then(function(eventArr){
      //      $scope.events=eventArr;
      //      console.log($scope.events);
      //      for(i=0; i < eventArr.length; i++){
       //
      //        var marker = new google.maps.Marker({
      //          position: { lat:Number(eventArr[i].lat), lng:Number(eventArr[i].lng) },
      //          map:map,
      //          title: eventArr[i].eventname,
      //          date: eventArr[i].eventdate
      //        });
      //        function convertDate (date) {
      //          var output = "";
      //          output = date.substring(5,7) + "-" + date.substring(8,10);
      //          return output;
      //        }
       //
      //  // this function shows or hides infowindow based on mouseover or mouseout
      //        (function(marker, i) {
      //          google.maps.event.addListener(marker, 'mouseover', function() {
      //            infowindow = new google.maps.InfoWindow({
      //              content: '<div>'+marker.title+'<br>'+convertDate(marker.date)+'</div>'
      //            });
      //            infowindow.open(map, marker);
       //
      //          });
      //        })(marker, i);
      //        (function(marker, i) {
      //          google.maps.event.addListener(marker, 'mouseout', function() {
      //            infowindow.close(map, marker);
      //          });
      //        })(marker, i);
       //
      //      }
      //    })
      //  }
  //      $scope.getEvents();
  //


});
