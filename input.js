// Angular
var app = angular.module('theToDoListApp', [])

function detectMobile() {
  if(navigator.userAgent.match(/Android/i)
  || navigator.userAgent.match(/webOS/i)
  || navigator.userAgent.match(/iPhone/i)
  || navigator.userAgent.match(/iPad/i)
  || navigator.userAgent.match(/iPod/i)
  || navigator.userAgent.match(/BlackBerry/i)
  || navigator.userAgent.match(/Windows Phone/i)){
    return true;
  }
  else {
    return false;
  }
}

function checkEnter(e) {
  if(e.keyCode==13) {
    angular.element(document.getElementById("theDiv")).scope().createTodo();
  }
}

function myController($scope, $http) {
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
}
