var app = angular.module("appMod");
app.service("eventService", function($http) {

   this.addEvent = function(item) {
       var promise = $http({
           url: '/events',
           method: "POST",
           data: item
       })
       .then(function(response) {
           console.log('success')
       },
       function(response) {
           console.log('post failed');
       });
       return promise;
   };



   this.getAllEvents = function() {
       var eventArr = [];
       var promise = $http({
         method: 'GET',
         url: '/events'
     }).then(function successCallback(response) {
       eventArr = response.data;
       console.log(eventArr);
       return eventArr;
   }, function errorCallback(response) {
       console.log('error');
   });
     return promise;
   };

   this.getEventInfo = function(eventId){
     console.log(eventId);
     var id = eventId;
     var eventArr=[];
     var promise = $http({
       method: 'GET',
       url: '/viewevent?id='+id
     }).then(function successCallback(response){
       eventArr = response.data;
       console.log(eventArr);
       return eventArr;
     }, function errorCallback(response) {
         console.log('error');
     });
     return promise
   }


   this.getLatestEvents= function(){
     var latestArr=[];
     var promise = $http({
       method:'GET',
       url: '/recent'
     }).then(function successCallback(response){
       latestArr=response.data;
       return latestArr;
     }, function errorCallback(response) {
         console.log('error');
       });
       return promise
   }
});
