var app = angular.module('theToDoListApp', ['ngRoute', 'controllers', 'ui.bootstrap']);

app.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/', {
    templateUrl: 'views/main.html',
    controller: 'myController'
  })
}]);

// Remove the hashtag from localhost:8080/#
app.config(['$locationProvider', function($locationProvider) {
  $locationProvider.html5Mode(true);
}]);
