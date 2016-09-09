angular.module('theme.core.localm_controller', ['theme.core.services'])
.controller('CtrlLocacionNueva',['SimLog','apiService',"recentService","$scope","$route","$location","$routeParams","dataShareAlmacen",function (SimLog,apiService,recentService,$scope, $route,$location, $routeParams,dataShareAlmacen) {
  var urlLocation="/locations";
  var urlWarehouses="/warehouses";
  $scope.locacion={};
  var reciente=0;
  $scope.nuevaLoc=function()
  {
    reciente=0;
    apiService.postData(urlLocation,$scope.locacion).then(function(response){
      reciente=recentService.getRecent(response.data);
      console.log(reciente);
      var data={
        name:'Global',
        location_id:reciente
        };
      apiService.postData(urlWarehouses,data);
      $location.path('/');
    });
  };
}])
.controller('CtrlAlmacenNuevo',['SimLog','apiService',"recentService","$scope","$location","$routeParams","dataShareLocacion","dataShareAlmacen",function (SimLog,apiService,recentService,$scope, $location, $routeParams,dataShareLocacion,dataShareAlmacen) {
  var urlLocation="/locations";
  var urlWarehouses="/warehouses";
  var urldivisor="/dividers";

  var idLocacion=dataShareLocacion.getData();
  //var idAlmacen=dataShareAlmacen.getData();
  $scope.almacenN={};
  $scope.nuevoAlmacen=function(){
    var data={
      name:$scope.almacenN.name,
      location_id:idLocacion
    }
    apiService.postData(urlWarehouses,data).then(function(response){
      reciente=recentService.getRecent(response.data);
      var data2={
        name:'General',
        warehouse_id:reciente
        };
      apiService.postData(urldivisor,data2);
      $location.path('/app-vistaLocacion/'+idLocacion);
    });
  };
}])
.controller('CtrlDivisorNuevo',['SimLog','apiService',"$scope","$location","$routeParams","dataShareLocacion","dataShareAlmacen",function (SimLog,apiService,$scope, $location, $routeParams,dataShareLocacion,dataShareAlmacen) {

  var urlLocation="/locations";
  var urlWarehouses="/warehouses";
  var urldivisor="/dividers";
  var idAlmacen=dataShareAlmacen.getData();
  $scope.divisorN={};

  apiService.getSingleData(urlWarehouses,idAlmacen).then(function(response){
    $scope.almacenOr=response.data;
  });
  $scope.nuevoDivisor=function(){
    var data={
        name:$scope.divisorN.name,
        warehouse_id:idAlmacen
      };
    apiService.postData(urldivisor,data).then(function(response){

      $location.path('/app-vistaAlmacen/'+idAlmacen);

    });
  };
}])
.controller('CtrlAlmacen',['SimLog','apiService',"$scope","$location","$routeParams","dataShareAlmacen","dataShareLocacion",function (SimLog,apiService,$scope, $location, $routeParams,dataShareAlmacen,dataShareLocacion) {
  var urlLocation="/locations";
  var urlWarehouses="/warehouses";
  var idLocacion=0;
  var urlProducts="/products";


  $scope.cargarOrden=function(){
    dataShareAlmacen.sendData($routeParams.id);
    $location.path('/app-vistaCargarOrden/');
  };
  $scope.nuevoDivisor=function(){
    dataShareAlmacen.sendData($routeParams.id);
    $location.path('/app-nuevoDivisor/');
  };
  $scope.varProdAl=function(id){
    dataShareAlmacen.sendData(id);
    $location.path('/app-vistaVarProdAl/'+$routeParams.id);
  };
  apiService.getSingleData(urlWarehouses,$routeParams.id).then(function(response) {

    $scope.almacenes=response.data;
    idLocacion=$scope.almacenes.location.id;
    angular.forEach($scope.almacenes.variant_warehouses, function(value, key) {
        apiService.getSingleData(urlProducts,value.variant.product_id).then(function(response) {
        value.variant.prodName=response.data.name;
        value.variant.brand=response.data.brand.name;
        });
      });
    });
  /*  Prueba de data tables con las ordenes de compra************************************************** */
  $scope.filterOptions = {
      filterText: '',
      useExternalFilter: true
    };
    $scope.totalServerItems = 0;
    $scope.pagingOptions = {
      pageSizes: [25, 50, 100],
      pageSize: 25,
      currentPage: 1
    };
    $scope.setPagingData = function(data, page, pageSize) {
      var pagedData = data.slice((page - 1) * pageSize, page * pageSize);
      $scope.myData = pagedData;
      $scope.totalServerItems = data.length;
      if (!$scope.$$phase) {
        $scope.$apply();
      }
    };
    $scope.getPagedDataAsync = function(pageSize, page, searchText) {
      setTimeout(function() {
        var data;
        if (searchText) {
          var ft = searchText.toLowerCase();
          apiService.getSingleData(urlWarehouses,$routeParams.id).then(function(largeLoad) {
            angular.forEach(largeLoad.data.variant_warehouses, function(value, key) {
              apiService.getSingleData(urlProducts,value.variant.product_id).then(function(response) {
              value.variant.prodName=response.data.name;
              value.variant.brand=response.data.brand.name;
              });
            });
            data = largeLoad.data.variant_warehouses.filter(function(item) {
              //console.log(JSON.stringify(item).toLowerCase().indexOf(ft));
              return JSON.stringify(item).toLowerCase().indexOf(ft) !== -1;
            });

            $scope.setPagingData(data, page, pageSize);
          });
        } else {
          apiService.getSingleData(urlWarehouses,$routeParams.id).then(function(largeLoad) {
            angular.forEach(largeLoad.data.variant_warehouses, function(value, key) {
              apiService.getSingleData(urlProducts,value.variant.product_id).then(function(response) {
              value.variant.prodName=response.data.name;
              console.log(value.variant.prodName);
              value.variant.brand=response.data.brand.name;
              });
            });
            $scope.setPagingData(largeLoad.data.variant_warehouses, page, pageSize);
          });
        }
      }, 100);
    };

    $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);

    $scope.$watch('pagingOptions', function(newVal, oldVal) {
      if (newVal !== oldVal && newVal.currentPage !== oldVal.currentPage) {
        $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filterText);
      }
    }, true);
    $scope.$watch('filterOptions', function(newVal, oldVal) {
      if (newVal !== oldVal) {
        $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filterText);
      }
    }, true);
    $scope.gridOptions = {
      data: 'myData',
      columnDefs: [
            { field: "variant.prodName", displayName:"Producto",cellTemplate:'<div class="ngCellText ng-scope">'+'<a ng-click="varProdAl(row.entity.variant.product_id)">{{row.entity.variant.prodName}}</a>'+'</div>' },
            { field: "variant.name", displayName:"Variante" },
            { field: "variant.brand",displayName:"Marca" },
            { field: "stock",displayName:"Disponible" }
        ],
      enablePaging: true,
      showFooter: true,
      totalServerItems: 'totalServerItems',
      pagingOptions: $scope.pagingOptions,
      filterOptions: $scope.filterOptions
    };
  /* ****************************************************************************************************/
}])
.controller('CtrlVarProdAl',['SimLog','apiService',"$scope","$location","$routeParams","dataShareAlmacen","dataShareVariante",function (SimLog,apiService,$scope, $location, $routeParams,dataShareAlmacen,dataShareVariante) {
  var urlLocation="/locations";
  var urlWarehouses="/warehouses";
  var urlProducts="/products";

  var id_Prod=dataShareAlmacen.getData();
  $scope.varProdAlmacen=new Array();
  apiService.getSingleData(urlProducts,id_Prod).then(function(response){
    $scope.prod=response.data;
  });

  $scope.infoVariante=function(idVar){
    dataShareVariante.sendData(idVar);
    $location.path('/app-vistaVarDivisorAl/'+$routeParams.id);
  };
  apiService.getSingleData(urlWarehouses,$routeParams.id).then(function(response){
    $scope.wareOr=response.data;
    angular.forEach(response.data.variants, function(value, key) {

      if (value.product.id==id_Prod)
      {
        //console.log(value);
        $scope.varProdAlmacen.push(value);
      };
      //$scope.Productos=response.data;
      //console.log($scope.variantesFormC);
    });
      var json = JSON.stringify( $scope.varProdAlmacen);
      $scope.varProdAlmacen=JSON.parse(json);
      var cantidadApartada=0;
      angular.forEach($scope.varProdAlmacen, function(value2, key) {
        cantidadApartada=0;
        angular.forEach(value2.variant_warehouses, function(value3, key2) {
          if(value3.warehouse_id==$routeParams.id)
          {
            $scope.varProdAlmacen[key].stock=value3.stock;
          }
        });
        angular.forEach(value2.sell_orders, function(value4, key4) {
          //console.log(value4);
          if(value4.status=='Solicitado')
          {
            angular.forEach(value2.variant_sell_orders, function(value5, key5) {

              if(value5.sell_order_id==value4.id)
              {
                cantidadApartada=cantidadApartada+parseInt(value5.amount);
              }
            });
          }
        });
      $scope.varProdAlmacen[key].Ndis=cantidadApartada;
    });
  });
}])
.controller('CtrlVarDivisorAl',['SimLog','apiService',"$scope","$location","$routeParams","dataShareVariante","$modal","dataShareTransDivxDiv","dataShareAlmacen",function (SimLog,apiService,$scope, $location, $routeParams,dataShareVariante,$modal,dataShareTransDivxDiv,dataShareAlmacen) {

  var urlLocation="/locations";
  var urlWarehouses="/warehouses";
  var urlProducts="/products";
  var urlVariants="/variants";

  apiService.getSingleData(urlWarehouses,$routeParams.id).then(function(response){
    $scope.almacenOrigen=response.data;

  });

  var id_Variante=dataShareVariante.getData();

  //codigo para el modal****************************************

  $scope.open = function(size,DivID) {

    dataShareTransDivxDiv.sendData(DivID);
    var modalInstance = $modal.open({
      templateUrl: 'myModalContent.html',
      controller: function($scope, $modalInstance,dataShareTransDivxDiv,dataShareVariante,apiService) {
        var id_divisor=dataShareTransDivxDiv.getData();
        var id_Variante=dataShareVariante.getData();
        var urldivisor="/dividers";
        var urlVarianteAlmacen="/variant_warehouses";
        var urlVariantDivisor="/variant_divisions";

        $scope.maxTransferencia=0;
        $scope.priVar=0;
        //console.log($routeParams.id);
        $scope.divisoresExtras=$scope.dividersD;
        apiService.getSingleData(urlWarehouses,$routeParams.id).then(function(response){
          $scope.dividersD=response.data.dividers;
          $scope.divisoresExtras=$scope.dividersD;
          });

        apiService.getSingleData(urldivisor,id_divisor).then(function(response){
          angular.forEach(response.data.variant_divisions,function(value,index){
            if(value.variant.id==id_Variante)
            {
              $scope.maxTransferencia=value.total;
              $scope.priVar=value.pri;
            }
          });
          $scope.dividersD=response.data.dividers;

          });

        $scope.ok = function(divId,cantidad) {
          if(!cantidad)
            return false;

          if(($scope.maxTransferencia-cantidad)<$scope.priVar)
          {
            alert("Se alcanso el PRI");
            return false;
          }
          else if(($scope.maxTransferencia-cantidad)<0)
          {
            alert("No hay suficientes");
            return false;
          }
          else
          {
            var data={
              total:cantidad
            };
            var data2={
              total:parseInt($scope.maxTransferencia)-parseInt(cantidad)
            }
            var idVarDiv=0;
            var idVarDivOrigen=0;
            apiService.getData(urlVariantDivisor).then(function(response){
              angular.forEach(response.data,function(value,index){
                if((divId==value.divider.id)&&(id_Variante==value.variant.id))
                {
                  idVarDiv=value.id;
                  totaldivExiste=value.total;
                  data={total:parseInt(totaldivExiste)+parseInt(cantidad)}
                }

              });
              //origen y asi para eliminar la cantidad de stock
              angular.forEach(response.data,function(valueOr,indexOr){
                if((id_divisor==valueOr.divider.id)&&(id_Variante==valueOr.variant.id))
                {
                 idVarDivOrigen=valueOr.id;
                }
                apiService.putData(urlVariantDivisor,idVarDivOrigen,data2);
              });

              //aqui quito del almacen

              apiService.getSingleData(urlVariantDivisor,idVarDivOrigen).then(function(responseOrDiv){

                angular.forEach(responseOrDiv.data.variant.variant_warehouses,function(val,ind){
                  if((val.warehouse_id==$routeParams.id)&&(id_Variante==val.variant_id))
                  {
                    idAlmOrigen=val.id;
                    stockOrAl=val.stock;
                  }
                });
                var dataOrAl={stock:parseInt(stockOrAl)-parseInt(cantidad)};
                apiService.putData(urlVarianteAlmacen,idAlmOrigen,dataOrAl);
              })
              //***********************************************************************************
              if(idVarDiv!=0)
              {
                apiService.putData(urlVariantDivisor,idVarDiv,data);
              }
              else
              {
                var newData={
                  divider_id:divId,
                  variant_id:id_Variante,
                  pri:1,
                  total:cantidad
                };

                //console.log(newData);
                apiService.getSingleData(urldivisor,divId).then(function(DivisorInf){
                  var idWareDes=DivisorInf.data.warehouse.id;
                  var newDataWare={
                    warehouse_id:idWareDes,
                    variant_id:id_Variante,
                    stock:cantidad,
                    status:"D"
                  };
                  apiService.postData(urlVarianteAlmacen,newDataWare);
                  apiService.postData(urlVariantDivisor,newData);
                })

              }

            });
            //quitar del origen la cantidad
              $modalInstance.close();
          }

        };

        $scope.cancel = function() {
          $modalInstance.dismiss('cancel');
        };
      },
      size: size
    });

  };
  //***********************************************************
  $scope.divEnVar=new Array();

  var tempCantidad=0;
  apiService.getSingleData(urlVariants,id_Variante).then(function(response){
    $scope.variante=response.data;
    tempCantidad=0;
    angular.forEach($scope.variante.variant_divisions, function(value, key) {
      angular.forEach($scope.variante.variant_sell_orders, function(value2, key2) {
        if((value.divider.id==value2.divider.id)&&value2.sell_order.status=='Solicitado')
        {
          tempCantidad=tempCantidad+value2.amount;
        }
      });
      if (value.divider.warehouse_id==$routeParams.id)
      {
        //console.log(value);
        value.ApartadoNot=tempCantidad;

        $scope.divEnVar.push(value);
      };
      //$scope.Productos=response.data;
      //console.log($scope.variantesFormC);
    });
  });


      var json = JSON.stringify( $scope.divEnVar);

      $scope.divEnVar=JSON.parse(json);

    $scope.regresarVarProd=function(){
    dataShareAlmacen.sendData($scope.variante.product.id);
    $location.path("/app-vistaVarProdAl/"+$routeParams.id);
   };
      //********************************************************************

      //*******************************************************************************
      //console.log($scope.divEnVar);
}])
