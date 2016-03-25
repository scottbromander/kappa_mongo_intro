var myApp = angular.module("myApp", []);

myApp.controller("SomeController", ["$scope", "$http", function($scope, $http){
    console.log("Controller Loads!");

    $scope.dataArray = [];

    var aesopObject =  {
        name: "Aesop",
        realName: "Monster"
    };

    $http.post("/data", aesopObject).then(function(response){
        console.log(response.data);
        $scope.getData();
    });

    $scope.getData = function(){
        $http.get("/data").then(function(response){
            $scope.dataArray = response.data;
        });
    };
}]);
