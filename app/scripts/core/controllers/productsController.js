angular.module('theme.core.products_controller', ['theme.core.services'])
.controller('CtrlProductos',["apiService","$scope","$location","$routeParams",function (apiService, $scope, $location, $routeParams) {
  var urlProductsRes="/product/resume"
  apiService.getData(urlProductsRes).then(function(resp){
    console.log("Hola si furulo");
    $scope.productResume=resp.data;
  });
}])
.controller('CtrlProductoNuevo',["SimLog","apiService","recentService","$scope","$location","$routeParams","dataShare","$timeout","$http","modalService",function (SimLog,apiService,recentService,$scope, $location, $routeParams,dataShare,$timeout,$http,modalService) {
  var urlSuppliers="/suppliers";
  var urlBrands="/brands";
  var urlProducts="/products";
  apiService.getData(urlSuppliers).then(function(response) {
    $scope.suppliers=response.data;
  });
  apiService.getData(urlBrands).then(function(response) {

    $scope.brands=response.data;
  });
  $scope.sub = function(formData) {
    //console.log(formData);
    $scope.prodname=formData.name;
    formData.status='D';
    apiService.postProdData(urlProducts,formData).then(function(response) {
      //console.log(response.data);
      //$scope.productos=response.data;
      idRec=recentService.getRecent(response.data);
      dataShare.sendData(idRec);
      $location.path('/app-defVariantes');
    });
  }
}])
