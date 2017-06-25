var app = angular.module("appMod");
app.service("eventService", function($http) {
// add event
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
  //  update event
   this.updateEvent = function(update) {
       var promise = $http({
           url: '/eventmanage',
           method: "POST",
           data: update
       })
       .then(function(response) {
           console.log('success')
       },
       function(response) {
           console.log('post failed');
       });
       return promise;
   };
// send email
   this.sendEmail = function(email) {
       var promise = $http({
           url: '/contact',
           method: "POST",
           data: email
       })
       .then(function(response) {
           console.log('success')
       },
       function(response) {
           console.log('post failed');
       });
       return promise;
   };


// get all events for event page
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


// get single event
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

   this.deleteEvent = function(postid) {
       // DELETE /api/items/{ID}
       console.log(postid);
       var userid =postid.id;
       return $http.delete('/deletepost?postid='+ userid).then(function(response){
         console.log(response);
         return response;
       // TODO Make the HTTP request to the server and return a promise.
   })
   }

   this.checkLogin = function(login) {
       var username=login.username;
       var pword=username.pword;
       var promise = $http({
         method: 'GET',
         url: '/eventlogin?username='+username
     }).then(function successCallback(response) {
       loginCheck = response.data;
       console.log(loginCheck);
       return loginCheck;
   }, function errorCallback(response) {
       console.log('error');
   });
     return promise;
   };
});
