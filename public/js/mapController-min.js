var app=angular.module("appMod");app.controller("mapController",function(n,e,o){function t(){l=new google.maps.Map(document.getElementById("map"),{center:{lat:37.0902,lng:-95.7129},zoom:3,scrollwheel:!1})}n.singleEvent=[];var l;t(),n.getEvents=function(){e.getAllEvents().then(function(e){function o(n){var e="";return e=n.substring(5,7)+"-"+n.substring(8,10)}for(n.events=e,console.log(n.events),i=0;i<e.length;i++){var t=new google.maps.Marker({position:{lat:Number(e[i].lat),lng:Number(e[i].lng)},map:l,title:e[i].eventname,date:e[i].eventdate});!function(n,e){google.maps.event.addListener(n,"mouseover",function(){infowindow=new google.maps.InfoWindow({content:"<div>"+n.title+"<br>"+o(n.date)+"</div>"}),infowindow.open(l,n)})}(t,i),function(n,e){google.maps.event.addListener(n,"mouseout",function(){infowindow.close(l,n)})}(t,i)}})},n.getEvents(),n.getEventById=function(o){var t=o;e.getEventInfo(t).then(function(e){n.singleEvent=e,console.log(n.singleEvent)})},n.goToEvent=function(n){o.url("/thisevent?id="+n),console.log(n)}});