// var app = angular.module("appMod");
//
// app.directive('photoGallery', function() {
//   var links=angular.element(document.querySelector('#links'));
//   return {
//   	restrict: 'E',
//     link: function($scope, links, atts){
//     links.onclick=function(event){
//     event = event || window.event;
//     var target = event.target || event.srcElement,
//         link = target.src ? target.parentNode : target,
//         options = {index: link, event: event},
//         links = this.angular.element(document.querySelector('a'));
//     blueimp.Gallery(links, options);
//     }
//     replace: false
//   }
//
//   };
// });
