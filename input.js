// Angular
var app = angular.module('theToDoListApp', []);

function checkEnter(e) {
  if(e.keyCode==10 || e.keyCode==13) {
    angular.element(document.getElementById("theDiv")).scope().createTodo();
  }
}

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
    var input = document.getElementById("theTextField");
    if(input.value == "") {
      input.focus();
    }
    else {
      $http.post('/items', $scope.formData)
        .success(function(data) {
          $scope.items = data;
          $scope.formData = "";
          console.log(data);
          input.focus();
        })
        .error(function(data) {
          console.log('Error: ' + data);
        });
    }
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
