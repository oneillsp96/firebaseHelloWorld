var app = angular.module('app', ['firebase', 'ui.grid', 'ui.grid.edit', 'ui.grid.selection', 'ui.grid.autoResize']);

app.controller('customerController', ['$scope', '$firebaseArray', function ($scope, $firebaseArray) {
$scope.gridApi;
$scope.showAddForm = false;
  var ref = new Firebase("https://glaring-heat-7252.firebaseio.com/customers");
  $scope.customers = $firebaseArray(ref);
  $scope.addCustomer = function () {
    $scope.customers.$add({
      "first_name": $scope.firstName,
      "last_name": $scope.lastName,
      "email": $scope.email,
      "country": $scope.country
    });
    $scope.firstName = "";
    $scope.lastName = "";
    $scope.email = "";
    $scope.country = "";
  };

  $scope.gridOptions = {
    data: 'customers',
    showGridFooter: false,
    selectionRowHeaderWidth: 35,
    rowHeight: 45,
    enableVerticalScrollbar: 2,
    enableHorizontalScrollbar: 0,
    //enableScrollbars: false, //uiGridConstants.scrollbars.NEVER
    enableCellSelection: true,
    enableRowSelection: true,
    enableCellEdit: true,
    columnDefs: [
      { field: 'first_name', displayName: 'First Name', enableCellEdit: true },
      { field: 'last_name', displayName: 'Last Name', enableCellEdit: true },
      { field: 'email', displayName: 'Email', enableCellEdit: true },
      { field: 'country', displayName: 'Country', enableCellEdit: true }
    ]
  };


  $scope.gridOptions.onRegisterApi = function (gridApi) {
    $scope.gridApi = gridApi;

    gridApi.edit.on.afterCellEdit($scope, function (rowEntity, colDef, newValue, oldValue) {
      $scope.customers.$save(rowEntity);
      // console.log(rowEntity) 
    });
  };

  $scope.deleteSelectedCustomers = function () {
    angular.forEach($scope.gridApi.selection.getSelectedRows(), function (row) {
      $scope.customers.$remove(row);
    });
  }

}]);


  
  