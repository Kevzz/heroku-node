angular.module('theme.core.products_controller', ['theme.core.services'])
.controller('CtrlProductos',["apiService","$scope","$location","$routeParams",function (apiService, $scope, $location, $routeParams) {
  var urlProductsRes="/product/resume"
  apiService.getData(urlProductsRes).then(function(resp){
    $scope.productResume=resp.data;
  });
}])
.controller('CtrlProductoNuevo',["apiService","recentService","$scope","$location","$routeParams","dataShare",function (apiService,recentService,$scope, $location, $routeParams,dataShare) {
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
.controller('CtrlProductosDefVariantes',["apiService","$scope","$location","$routeParams","dataShare",function (apiService,$scope, $location, $routeParams,dataShare) {
  var urlCriterios="/rules";
  var urlProducts="/products";
  idRec=dataShare.getData();
  apiService.getData(urlCriterios).then(function(response3){
    $scope.rules=response3.data;
  });
  apiService.getSingleData(urlProducts,idRec).then(function(response) {
    //console.log(response.data);
    $scope.prodIndv=response.data;
  });
  $scope.variants = [
    {
      "Selection": "",
      "Text": ""
    }
  ];
  $scope.cloneItem = function () {
    var itemToClone = { "Selection": "", "Text": "" };
    $scope.variants.push(itemToClone);
  }
  $scope.removeItem = function (itemIndex) {
    $scope.variants.splice(itemIndex, 1);
  }
  $scope.formVariantes= [];
  $scope.genVar=false;
  $scope.subVariant = function(formData) {
    $scope.genVar=true;
    urlVariant="/variants";
    urlPrices="/prices";
    urlVariantPrices="/variant_prices";
    var variantesForm =[];

    angular.forEach(formData, function(value, key) {
      variantesForm.push(value.Text);
    });
    $scope.variantesAsi=variantesForm;
    var json = JSON.stringify( variantesForm);
    var newStr = json.substring(1, json.length-1);
    $scope.variantesAsi=newStr;
    eval("$scope.variantesAsi=cartesian("+newStr+")");
    idRec=dataShare.getData();
    angular.forEach($scope.variantesAsi, function(value, key) {
      valor=value.join(', ');
      var data = {
              name: valor,
              status: "I",
              product_id: idRec//aqui me traigo el id de ultimo agregado
          };
      apiService.postDataPrices(urlVariant,data);
    });
    apiService.getData(urlPrices).then(function(response){
        $scope.pricesProxy=response.data;
        apiService.getSingleData(urlProducts,idRec).then(function(response){
          angular.forEach(response.data.variants, function(value1, key) {
            angular.forEach($scope.pricesProxy, function(value2, key) {
              var data ={
                variant_id: value1.id,
                price_id: value2.id,
                cost:0,
                label:value2.name
              };
              apiService.postDataPrices(urlVariantPrices,data);
              //console.log("se guarda el dato");
            });
            //apiService.push(urlVariant,);
          });
          dataShare.sendData(idRec);
          $location.path('/app-subVariantes');
        });
      });
  }
}])
.controller('EditCtrlProductoInd',['SimLog',"apiService","$scope","$location","$routeParams","dataShare",function(SimLog,apiService,$scope, $location, $routeParams,dataShare) {
  var urlProducts="/products";
  var urlSuppliers="/suppliers";
  var urlBrands="/brands";

  apiService.getData(urlSuppliers).then(function(response) {
    //console.log(response);
    $scope.suppliers=response.data;
  });
  apiService.getData(urlBrands).then(function(response) {
    //console.log(response);
    $scope.brands=response.data;
  });
  $scope.guardarCambios=function(data)
  {
    //console.log(data);
    apiService.putData(urlProducts,$routeParams.id,data);
    $location.path('/app-vistaProductoInd/'+$routeParams.id);
  };
  apiService.getSingleData(urlProducts,$routeParams.id).then(function(response){
    $scope.producto=response.data;
  });
}])
.controller('EditCtrlProdInd',["apiService","$scope","$location","$routeParams","dataShare","modalService",function(apiService,$scope, $location, $routeParams,dataShare,modalService) {
  var urlProducts="/products";
  var urlSuppliers="/suppliers";
  var urlBrands="/brands";
  var urlCurrency="/currencies";
  var urlSellOrd="/sell_orders";
  var urlVariant="/variants";

  var total=0;
  var disp=0;

  $scope.elimProd=function(){

  var modalOptions = {
      closeButtonText: 'Cancelar',
      actionButtonText: 'Archivar',
      headerText: '¿Archivar Producto: ' + $scope.prod.name  + '?',
      bodyText: '¿Está seguro de archivar este producto y todas sus variantes?'
    };

    modalService.showModal({}, modalOptions).then(function (result) {
      var dataUPD={
        status:"A"
      };
      apiService.putDataPrices(urlProducts,$routeParams.id,dataUPD);

      var data={status:"A"};
      angular.forEach($scope.prod.variants,function(value,key){
        if(value.status='C')
          apiService.putDataPrices(urlVariant,value.id,data);
      });
      $location.path("/app-vistaProductos");
    });
  };

  apiService.getSingleData(urlProducts,$routeParams.id).then(function(response){
        $scope.prod=response.data;

        angular.forEach($scope.prod.variants,function(value,key){
          total=0;

          angular.forEach(value.variant_warehouses,function(value2,key){
            total+=parseInt(value2.stock);
            value.almac=total;
          });
          if(total==0)
          {
            value.almac=total;
          }
          angular.forEach(value.variant_sell_orders,function(value3,key){
            disp=0;

            apiService.getSingleData(urlSellOrd,value3.sell_order_id).then(function(response2){
              if(response2.data.status!='Entregado')
              {
                disp-=parseInt(value3.amount);
                value.disponible=disp;
              }
            });
          });

          if(disp==0)
          {
            value.disponible=disp;
          }

        });
        //console.log($scope.variantesFormC);
      });

}])
