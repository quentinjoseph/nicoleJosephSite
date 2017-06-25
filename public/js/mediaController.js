var app = angular.module("appMod");

app.controller("mediaController", function ($scope){
var audio = angular.element(document.querySelector('#audio'));
var video = angular.element(document.querySelector('#video'));
var photo = angular.element(document.querySelector('#photo'));
var behindbar = angular.element(document.querySelector('#behind'));
$scope.showAudio=function(){
audio.removeClass('mediaBoxHide');
audio.addClass('audioBox');
video.removeClass('videoBox');
video.addClass('mediaBoxHide');
photo.removeClass('photoBox');
photo.addClass('mediaBoxHide');
behindbar.addClass('behindStuff');

}

$scope.showVideo=function(){
video.removeClass('mediaBoxHide');
video.addClass('videoBox');
audio.removeClass('audioBox');
audio.addClass('mediaBoxHide');
photo.removeClass('photoBox');
photo.addClass('mediaBoxHide');
behindbar.addClass('behindStuff');

}

$scope.showPhoto=function(){
photo.removeClass('mediaBoxHide');
photo.addClass('photoBox');
audio.removeClass('audioBox');
audio.addClass('mediaBoxHide');
video.removeClass('videoBox');
video.addClass('mediaBoxHide');

}



});
