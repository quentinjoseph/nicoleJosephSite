var app = angular.module("appMod");

app.controller("controller1", function ($scope, eventService, $location) {
$scope.formItem={};
$scope.events;
$scope.latest;
$scope.addSuccess=false;
$scope.addEvent = function(item){
  function geocodeAddress(geocoder, resultsMap) {
    var geocoder = new google.maps.Geocoder();
    var address = item.eventAddress;
    // console.log(address);
    geocoder.geocode({'address': address}, function(results, status) {
      if (status === 'OK') {

      var lat = results[0].geometry.location.lat();
      var lng = results[0].geometry.location.lng();
      $scope.formItem.lat= lat;
      $scope.formItem.lng= lng;
      eventService.addEvent(item).then(function(){
      // console.log($scope.formItem);
      $scope.formItem={};
      $scope.addSuccess=true;
      })

      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }

})
}
geocodeAddress();

};
// get latest events for homepage (shows 3 latest events)
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

// event management

$scope.searchEvents = [];

  eventService.getAllEvents().then(function(response) {
    $scope.searchEvents = response;
  });

// update events
$scope.updateSuccess=false;
$scope.updateItem={};
$scope.updateEvents=function(update){
  // console.log(update);
  eventService.updateEvent(update).then(function(){
  $scope.updateItem={};
  $scope.updateSuccess=true;
  });
}

// deletePosts
$scope.deleter={};
$scope.deleteSuccess=false;
$scope.deletePosts = function(postid){

  eventService.deleteEvent(postid).then(function(response){
    console.log(response);
    $scope.deleter={};
    $scope.deleteSuccess=true;
  });
}

// loginCheck
$scope.login;
$scope.pageShow=false;
$scope.loginHide=true;
$scope.checkLogin =function(login){
  // console.log(login);
var username = login.username;
var userpword = login.pword;
eventService.checkLogin(login).then(function(response){
pword =response[0].password;
user = response[0].username;
if ((pword == userpword)&&(user == username)){
  // console.log('success');
  $scope.pageShow=true;
  $scope.loginHide=false;
}else{
  console.log('nope');
  $scope.loginHide=true;
  $scope.pageShow=false;
}

});

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
// bio show download buttons
var resume = angular.element(document.querySelector('#resume'));
var headshot1 = angular.element(document.querySelector('#headshot1'));
var headshot2 = angular.element(document.querySelector('#headshot2'));
var main = angular.element(document.querySelector('#main'));
$scope.showButtons = function(){
  main.removeClass('bioButton');
  main.addClass('buttonHide');
  resume.removeClass('buttonHide');
  resume.addClass('bioButton');
  headshot1.removeClass('buttonHide');
  headshot1.addClass('bioButton');
  headshot2.removeClass('buttonHide');
  headshot2.addClass('bioButton');
}

// mobile slide nav
$scope.openNav=function() {

    document.getElementById("mySidenav").style.width = "100%";
}

$scope.closeNav=function() {
    document.getElementById("mySidenav").style.width = "0";
}

// scroll buttons
$scope.scrolly=true;
var indexCount = 0;
$scope.moveEvent=function(){

if((indexCount<2)&&(indexCount>=0)){
indexCount=indexCount+1;

document.getElementById('go'+indexCount).scrollIntoView({behavior: "smooth"});
document.getElementById('scrollLimit').scrollIntoView({behavior: "smooth"});
console.log('up'+indexCount)
}else {
  indexCount=0;

  document.getElementById('go'+indexCount).scrollIntoView({behavior: "smooth"});
  document.getElementById('scrollLimit').scrollIntoView({behavior: "smooth"});

  console.log('backdown'+indexCount)
}

}

$scope.moveEventRev=function(){

if((indexCount<=2)&&(indexCount>0)){
indexCount=indexCount-1;

document.getElementById('go'+indexCount).scrollIntoView({behavior: "smooth"});
document.getElementById('scrollLimit').scrollIntoView({behavior: "smooth"});
console.log('down'+indexCount)
}else {
  indexCount=2;

  document.getElementById('go'+indexCount).scrollIntoView({behavior: "smooth"});
  document.getElementById('scrollLimit').scrollIntoView({behavior: "smooth"});

  console.log('backdownRev'+indexCount)
}

}




});
