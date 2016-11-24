var app = angular.module('myApp', []);

function MyController($scope) {
  $scope.list = [];
  $scope.add = function() {
    var input = document.getElementById("theTextField");
    if(input.value == "") {
      input.focus();
    }
    else {
      $scope.list.push($scope.newItem);
      input.value = null;
      input.focus();
    }
    $scope.$apply();
  }
}

function checkEnter(e) {
  if(e.keyCode==10 || e.keyCode==13) {
    angular.element(document.getElementById("theDiv")).scope().add();
  }
}
