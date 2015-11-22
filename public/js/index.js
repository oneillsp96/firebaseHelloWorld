var app = angular.module('app', ['firebase']);

app.controller('customerController', ['$scope', 'customerService', '$firebaseArray', function ($scope, customerService, $firebaseArray) {
  var dataSource = "remote";
  $scope.customers;

  // if (dataSource = "local") {

  //   customerService.getAllCustomers()
  //     .success(function (allCustomers) {
  //       $scope.customers = allCustomers;
  //     })
  //     .error(function (e) {
  //       console.log('error' + e);
  //     })
  // } else if (dataSource = "remote") {
  //   $scope.customers = customerService.getFirebaseData();
  // }
  
  var ref = new Firebase("https://glaring-heat-7252.firebaseio.com");
  $scope.customers = $firebaseArray(ref);

  $scope.addSean = function () {
    $scope.customers.$add({
      "id": 1,
      "first_name": "Sean",
      "last_name": "ONeill",
      "email": "seanemail@email.com",
      "country": "USA USA USA"
    });
  };


}]);


app.service('customerService', ['$http', '$firebaseObject', function ($http, $firebaseArray) {
  var customerService = {},
    ref = new Firebase("https://glaring-heat-7252.firebaseio.com");


  customerService.getAllCustomers = function () {
    return $http.get('data/customers.json')
  }

  customerService.getFirebaseData = function () {
    return $firebaseArray(ref);
  }





  return customerService;
}])


  
  