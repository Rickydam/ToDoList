// Angular
var app = angular.module('theToDoListApp', []);

function myController($scope, $http) {
  $scope.formData = {};

  $http.get('/items')
    .success(function(data) {
      $scope.items = data;
      console.log(data);
    })
    .error(function(data) {
      console.log('Error: ' + data);
    });

  $scope.createTodo = function() {
    $http.post('/items', $scope.formData)
      .success(function(data) {
        $scope.items = data;
        $scope.formData = "";
        console.log(data);
      })
      .error(function(data) {
        console.log('Error: ' + data);
      });
  };

  $scope.deleteTodo = function(id) {
    $http.delete('/items/' + id)
      .success(function(data) {
        $scope.items = data;
        console.log(data);
      })
      .error(function(data) {
        console.log('Error: ' + data);
      });
  };
  $scope.$apply();
}
