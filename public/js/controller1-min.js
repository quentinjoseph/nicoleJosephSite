var app=angular.module("appMod");app.controller("controller1",function(e,a,t){function o(){a.getLatestEvents().then(function(a){e.latest=a,console.log(e.latest)})}e.formItem={},e.events,e.latest,e.addSuccess=!1,e.addEvent=function(t){function o(o,n){var o=new google.maps.Geocoder,s=t.eventAddress;o.geocode({address:s},function(o,n){if("OK"===n){var s=o[0].geometry.location.lat(),l=o[0].geometry.location.lng();e.formItem.lat=s,e.formItem.lng=l,a.addEvent(t).then(function(){e.formItem={},e.addSuccess=!0})}else alert("Geocode was not successful for the following reason: "+n)})}o()},o(),e.getEventById=function(t){var o=t;a.getEventInfo(o).then(function(a){e.singleEvent=a,console.log(e.singleEvent)})},e.goToEvent=function(e){t.url("/thisevent?id="+e),console.log(e)},e.searchEvents=[],a.getAllEvents().then(function(a){e.searchEvents=a}),e.updateSuccess=!1,e.updateItem={},e.updateEvents=function(t){a.updateEvent(t).then(function(){e.updateItem={},e.updateSuccess=!0})},e.deleter={},e.deleteSuccess=!1,e.deletePosts=function(t){a.deleteEvent(t).then(function(a){console.log(a),e.deleter={},e.deleteSuccess=!0})},e.login,e.pageShow=!1,e.loginHide=!0,e.checkLogin=function(t){var o=t.username,n=t.pword;a.checkLogin(t).then(function(a){pword=a[0].password,user=a[0].username,pword==n&&user==o?(e.pageShow=!0,e.loginHide=!1):(console.log("nope"),e.loginHide=!0,e.pageShow=!1)})};var n=angular.element(document.querySelector("#liHome")),s=angular.element(document.querySelector("#liEvents")),l=angular.element(document.querySelector("#liBio")),d=angular.element(document.querySelector("#liMedia")),c=angular.element(document.querySelector("#liContact"));e.navHome=function(){n.addClass("pageNotify"),n.removeClass("navSelect"),s.removeClass("pageNotify"),s.addClass("navSelect"),l.removeClass("pageNotify"),l.addClass("navSelect"),d.removeClass("pageNotify"),d.addClass("navSelect"),c.removeClass("pageNotify"),c.addClass("navSelect")},e.navEvents=function(){s.addClass("pageNotify"),s.removeClass("navSelect"),n.removeClass("pageNotify"),n.addClass("navSelect"),l.removeClass("pageNotify"),l.addClass("navSelect"),d.removeClass("pageNotify"),d.addClass("navSelect"),c.removeClass("pageNotify"),c.addClass("navSelect")},e.navBio=function(){l.addClass("pageNotify"),l.removeClass("navSelect"),n.removeClass("pageNotify"),n.addClass("navSelect"),s.removeClass("pageNotify"),s.addClass("navSelect"),d.removeClass("pageNotify"),d.addClass("navSelect"),c.removeClass("pageNotify"),c.addClass("navSelect")},e.navMedia=function(){d.addClass("pageNotify"),d.removeClass("navSelect"),n.removeClass("pageNotify"),n.addClass("navSelect"),s.removeClass("pageNotify"),s.addClass("navSelect"),l.removeClass("pageNotify"),l.addClass("navSelect"),c.removeClass("pageNotify"),c.addClass("navSelect")},e.navContact=function(){c.addClass("pageNotify"),c.removeClass("navSelect"),n.removeClass("pageNotify"),n.addClass("navSelect"),s.removeClass("pageNotify"),s.addClass("navSelect"),l.removeClass("pageNotify"),l.addClass("navSelect"),d.removeClass("pageNotify"),d.addClass("navSelect")};var r=angular.element(document.querySelector("#resume")),i=angular.element(document.querySelector("#headshot1")),v=angular.element(document.querySelector("#headshot2")),u=angular.element(document.querySelector("#main"));e.showButtons=function(){u.removeClass("bioButton"),u.addClass("buttonHide"),r.removeClass("buttonHide"),r.addClass("bioButton"),i.removeClass("buttonHide"),i.addClass("bioButton"),v.removeClass("buttonHide"),v.addClass("bioButton")},e.openNav=function(){document.getElementById("mySidenav").style.width="100%"},e.closeNav=function(){document.getElementById("mySidenav").style.width="0"},e.goR1=function(){document.getElementById("moveTo1").scrollLeft+=1e3}});