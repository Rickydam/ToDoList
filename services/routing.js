var isMobile = false;
function checkIfMobile() {
  if(navigator.userAgent.match(/Android/i)
  || navigator.userAgent.match(/webOS/i)
  || navigator.userAgent.match(/iPhone/i)
  || navigator.userAgent.match(/iPad/i)
  || navigator.userAgent.match(/iPod/i)
  || navigator.userAgent.match(/BlackBerry/i)
  || navigator.userAgent.match(/Windows Phone/i)) {
    isMobile =  true;
  }
  else {
    isMobile = false;
  }
}
checkIfMobile();

var app = angular.module('theToDoListApp', ['ngRoute', 'controllers', 'ui.bootstrap']);
app.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: (isMobile)? 'views/mobile.html':'views/main.html',
      controller: (isMobile)? 'myController':'myController'
    })
}]);

// Remove the hashtag from localhost:8080/#
app.config(['$locationProvider', function($locationProvider) {
  $locationProvider.html5Mode(true);
}]);
