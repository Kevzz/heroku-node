angular.module('theme.core.variants_controller', ['theme.core.services'])
.controller('EditCtrlVariantes',['SimLog',"apiService","$scope","$location","$routeParams","dataShare",function(SimLog,apiService,$scope, $location, $routeParams,dataShare) {
  var urlProducts="/products";
  var urlSuppliers="/suppliers";
  var urlBrands="/brands";
  var urlCurrency="/currencies";
  var urlVariantPrices="/variant_prices";
  var urlVariant="/variants";
  var urlTaxes= "/taxes";

 var idP =  dataShare.getData();

  $scope.$on('data_shared',function(){
        var idP =  dataShare.getData();
  });

  apiService.getSingleData(urlProducts,idP).then(function(response){
    $scope.variantesFormC=response.data.variants.sort(function(a, b) {
        return a.id - b.id;
    });
    console.log($scope.variantesFormC);
  });
  apiService.getData(urlCurrency).then(function(response) {
    //console.log(response);
    $scope.currProxy=response.data;
    });
  apiService.getData(urlTaxes).then(function(response) {
    //console.log(response);
    $scope.taxProxy=response.data;
    });
$scope.makeid=function()
{
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var number=Math.floor(100000 + Math.random() * 900000);
    for( var i=0; i < 3; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text+number;
}
//console.log($scope.makeid());
  $scope.subVariantC=function(data)
  {
    angular.forEach(data, function(value, key) {
        //console.log("aqui se imprime cada valor de cada data que se envia"+key);
        //console.log(value.status);
        var skuGen=$scope.makeid();

        if(value.status==true||value.status=='U')
          value.status="U";
        else if((value.code==''||value.weight==''||value.description==''||value.status==''||value.currency_id==''||value.tax_id=='')&&value.status!=true)
          value.status="I";
        else
          value.status="C";

        var data={
          sku:skuGen,
          code:value.code,
          weight:value.weight,
          description:value.description,
          status:value.status,
          currency_id:value.currency_id,
          tax_id:value.tax_id
        };
        apiService.putDataPrices(urlVariant,value.id,data);

        angular.forEach(value.variant_prices, function(value1, key) {
          var dataP={
            cost:parseFloat(value1.cost)
          };
          apiService.putDataPrices(urlVariantPrices,value1.id,dataP);
        });
      });
    $location.path('/app-vistaProductoInd/'+dataShare.getData());
  };


}])
.controller('EditCtrlVariantesInd',['SimLog',"apiService","$scope","$location","$routeParams","dataShare",function(SimLog,apiService,$scope, $location, $routeParams,dataShare) {
  var urlProducts="/products";
  var urlSuppliers="/suppliers";
  var urlBrands="/brands";
  var urlCurrency="/currencies";
  var urlVariantPrices="/variant_prices";
  var urlVariant="/variants";
  var urlTaxes= "/taxes";



  $scope.guardarCambiosV=function(data){
    //console.log(data.status);
    if(data.status==false)
      data.status="C";
    if(data.status==true)
      data.status="U";

    apiService.putDataPrices(urlVariant,$routeParams.id,data);
    //console.log(data);
    angular.forEach(data.variant_prices, function(value1, key) {

          var dataP={
            cost:parseFloat(value1.cost)
          };
          console.log(dataP);
          apiService.putDataPrices(urlVariantPrices,value1.id,dataP);
        });
    $location.path('/app-vistaVarianteInd/'+$routeParams.id);
  };
  apiService.getSingleData(urlVariant,$routeParams.id).then(function(response){
    $scope.variant=response.data;
    $scope.variant.variant_prices.sort(function(a, b) {
    return a.id - b.id;
});
  });
  apiService.getData(urlTaxes).then(function(response) {
    //console.log(response);
    $scope.taxProxy=response.data;
    });
  apiService.getData(urlCurrency).then(function(response) {
    //console.log(response);
    $scope.currProxy=response.data;
    });

}])

.controller('CtrlVariantInd',['SimLog',"apiService","$scope","$location","$routeParams","dataShare",function(SimLog,apiService,$scope, $location, $routeParams,dataShare) {
  var urlVariant="/variants";
  var urlLocations="/locations";
  var urlVariantPrices="/variant_prices";
  apiService.getSingleData(urlVariant,$routeParams.id).then(function(response){
        $scope.variante=response.data;
        angular.forEach($scope.variante.variant_warehouses, function(value, key) {
          apiService.getSingleData(urlLocations,value.warehouse.location_id).then(function(response) {
            value.warehouse.location_name=response.data.name;
          });
        });
        $scope.variante.variant_prices.sort(function(a, b) {
            return a.id - b.id;
        });
        //console.log($scope.variantesFormC);
      });
  $scope.elimVar=function(){
      var answer = confirm("Vas a archivar la variante ¿Estás seguro?")
      if (answer) {
        var data={status:"A"};
        apiService.putData(urlVariant,$routeParams.id,data).then(function(response){
          if(response.status==200)
          {
            $location.path('/app-vistaProductoInd/'+$scope.variante.product.id);
          }
        });
      }
  };
}])
