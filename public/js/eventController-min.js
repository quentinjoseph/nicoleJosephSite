var app=angular.module("appMod");app.controller("eventController",function(n,e,o){n.singleEvent=[];var t=o.url();t=t.substring(t.indexOf("=")+1,t.length),console.log(t),n.goToEvent=function(n){o.url("/thisevent?id="+n),console.log("works")},n.getEventById=function(o){var t=o;e.getEventInfo(t).then(function(e){function o(){l=new google.maps.Map(document.getElementById("map"),{center:{lat:Number(r[0].lat),lng:Number(r[0].lng)},zoom:18,scrollwheel:!1})}function t(n){var e="";return e=n.substring(5,7)+"-"+n.substring(8,10)}n.singleEvent=e;var r=n.singleEvent;for(console.log(r),o(),i=0;i<r.length;i++){var a=new google.maps.Marker({position:{lat:Number(r[i].lat),lng:Number(r[i].lng)},map:l,title:r[i].eventname,date:r[i].eventdate});!function(n,e){google.maps.event.addListener(n,"mouseover",function(){infowindow=new google.maps.InfoWindow({content:"<div>"+n.title+"<br>"+t(n.date)+"</div>"}),infowindow.open(l,n)})}(a,i),function(n,e){google.maps.event.addListener(n,"mouseout",function(){infowindow.close(l,n)})}(a,i)}})},n.getEventById(t);var l});