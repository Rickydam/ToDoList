angular.module('controllers', [])
  .controller('myController', ['$scope', '$http', function($scope, $http) {
    // Create an empty form data
    $scope.formData = {};

    // Get the items
    $http.get('/items')
      .success(function(data) {
        $scope.items = data;
        console.log(data);
      })
      .error(function(data) {
        console.log('Error: ' + data);
      });

    // Create a todo
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
            $scope.$apply();
          })
          .error(function(data) {
            console.log('Error: ' + data);
          });
      }
    };

    // Delete a todo
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
}]);
