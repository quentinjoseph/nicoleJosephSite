var app=angular.module("appMod");app.controller("contactController",function(n,o,t){n.contactMe=function(a){o.sendEmail(a).then(function(){n.contactInfo={},t.url("/sent")})}});