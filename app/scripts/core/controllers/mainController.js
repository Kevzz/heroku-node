angular.module('theme.core.main_controller', ['theme.core.services','firebase','ui.bootstrap','ng-token-auth'])
.config(function($authProvider) {
    // the following shows the default values. values passed to this method
    // will extend the defaults using angular.extend
    $authProvider.configure({
      apiUrl:                  'https://stage-formacret.herokuapp.com',
      tokenValidationPath:     '/auth/validate_token',
      signOutUrl:              '/auth/sign_out',
      emailSignInPath:         '/auth/sign_in',
      storage:                 'localStorage',
      forceValidateToken:      false,
      validateOnPageLoad:      true,
      omniauthWindowType:      'sameWindow',
      tokenFormat: {
        "access-token": "{{ token }}",
        "token-type":   "Bearer",
        "client":       "{{ clientId }}",
        "expiry":       "{{ expiry }}",
        "uid":          "{{ uid }}"
      },
      cookieOps: {
        path: "/#",
        expires: 9999,
        expirationUnit: 'days',
        secure: false,
        domain: 'https://stage-formacret.herokuapp.com'
      },
      createPopup: function(url) {
        return window.open(url, '_blank', 'closebuttoncaption=Cancel');
      },
      parseExpiry: function(headers) {
        // convert from UTC ruby (seconds) to UTC js (milliseconds)
        return (parseInt(headers['expiry']) * 1000) || null;
      },
      handleLoginResponse: function(response) {
        return response.data;
      },
      handleAccountUpdateResponse: function(response) {
        return response.data;
      },
      handleTokenValidationResponse: function(response) {
        return response.data;
      }
    });
  })
.filter('unique', function() {
   return function(collection, keyname) {
      var output = [],
          keys = [];

      angular.forEach(collection, function(item) {
          var key = item[keyname];
          if(keys.indexOf(key) === -1) {
              keys.push(key);
              output.push(item);
          }
      });
      return output;
   };
})
.controller('CtrlFacturacion',['SimLog','apiService',"$scope","$route","$location","$routeParams","dataShareAlmacen","modalService",function (SimLog,apiService,$scope, $route,$location, $routeParams,dataShareAlmacen,modalService) {

  //aqui en la facturacion ponemos primero la parte de las divisas
  var urlCurrency="/currencies";
    $scope.initFirst=function()
    {
       apiService.getData(urlCurrency).then(function(response) {
          //console.log(response);
        $scope.currencies=response.data;
        });
     };
    if($routeParams.id)
    {
      apiService.getSingleData(urlCurrency,$routeParams.id).then(function(response) {
      $scope.currenciesEd=response.data;
      });
    }
    /* **********************Manejar info desde Heroku y el proxy ********************************* */
    apiService.getData(urlCurrency).then(function(response) {
      $scope.currencies=response.data;
    });
    $scope.subDivisa = function(formData) {
      formData.status='D';
      apiService.postData(urlCurrency,formData).then(function(response) {
        $scope.currencies=response.data;
        $scope.initFirst();
        $location.path('/app-vistaFacturacion');
      });

    }
    $scope.removeDivisa=function(id){
      var modalOptions = {
          closeButtonText: 'Cancelar',
          actionButtonText: 'Archivar Divisa',
          headerText: '¿ Archivar Divisa ?',
          bodyText: '¿Está seguro de archivar la divisa?'
        };

        modalService.showModal({}, modalOptions).then(function (result) {
         var datUpdDiv={
            status:"A"
          }
          apiService.putData(urlCurrency,id,datUpdDiv).then(function(response){
            $scope.initFirst();
          });
          $location.path('/app-vistaFacturacion');
        });
     }

    $scope.editDivisa=function()
    {
      var data = {
        name: $scope.currenciesEd.name,
        shortcut: $scope.currenciesEd.shortcut,
        unit:$scope.currenciesEd.unit
      };
      apiService.putData(urlCurrency,$scope.currenciesEd.id,data).then(function(response){
        $scope.initFirst();
        $location.path('/app-vistaFacturacion');
      });
    }
  //aqui se termina la parte de las divisas

  //aqui en la facturacion ponemos primero la parte de los impuestos
  var urlTaxes="/taxes";
    $scope.initFirstT=function()
    {
       apiService.getData(urlTaxes).then(function(response) {
          //console.log(response);
        $scope.taxes=response.data;
        });
     };
    if($routeParams.id)
    {
      apiService.getSingleData(urlTaxes,$routeParams.id).then(function(response) {
      $scope.taxesEd=response.data;
      });
    }
    /* **********************Manejar info desde Heroku y el proxy ********************************* */
    apiService.getData(urlTaxes).then(function(response) {
      $scope.taxes=response.data;
    });
    $scope.subTax = function(formData) {
      formData.status='D';
      apiService.postData(urlTaxes,formData).then(function(response) {
        $scope.taxes=response.data;
        $scope.initFirstT();
        $location.path('/app-vistaFacturacion');
      });

    }

    $scope.removeTax=function(id){
      var modalOptions = {
          closeButtonText: 'Cancelar',
          actionButtonText: 'Archivar Impuesto',
          headerText: '¿ Archivar Impuesto ?',
          bodyText: '¿Está seguro de archivar el impuesto?'
        };

        modalService.showModal({}, modalOptions).then(function (result) {
         var datUpdDiv={
            status:"A"
          }
          apiService.putData(urlTaxes,id,datUpdTax).then(function(response){
            $scope.initFirstT();
          });
          $location.path('/app-vistaFacturacion');
        });
     }
    $scope.editTax=function()
    {
      var data = {
        name: $scope.taxesEd.name,
        percentage: $scope.taxesEd.percentage
      };
      apiService.putData(urlTaxes,$scope.taxesEd.id,data).then(function(response){
        $scope.initFirstT();
        $location.path('/app-vistaFacturacion');
      });
    }
  //aqui se termina la parte de las impuestos

  //aqui en la facturacion ponemos primero la parte de los precios
  var urlPrices="/prices";
    $scope.initFirstP=function()
    {
       apiService.getData(urlPrices).then(function(response) {
          //console.log(response);
        $scope.prices=response.data;
        });
     };
    if($routeParams.id)
    {
      apiService.getSingleData(urlPrices,$routeParams.id).then(function(response) {
      $scope.pricesEd=response.data;
      });
    }
    /* **********************Manejar info desde Heroku y el proxy ********************************* */
    apiService.getData(urlPrices).then(function(response) {
      $scope.prices=response.data;
    });
    $scope.subPrecio = function(formData) {
      formData.status='D';
      apiService.postData(urlPrices,formData).then(function(response) {
        $scope.prices=response.data;
        $scope.initFirstP();
        $location.path('/app-vistaFacturacion');
      });
    }

    $scope.removePrecio=function(id){
      var modalOptions = {
          closeButtonText: 'Cancelar',
          actionButtonText: 'Archivar Precio',
          headerText: '¿ Archivar Precio ?',
          bodyText: '¿Está seguro de archivar el precio?'
        };

        modalService.showModal({}, modalOptions).then(function (result) {
         var datUpdDiv={
            status:"A"
          }
          apiService.putData(urlPrices,id,datUpdDiv).then(function(response){
            $scope.initFirstP();
          });
          $location.path('/app-vistaFacturacion');
        });
     }
    $scope.editPrices=function()
    {
      var data = {
        name: $scope.pricesEd.name,
        description: $scope.pricesEd.description
      };
      apiService.putData(urlPrices,$scope.pricesEd.id,data).then(function(response){
        $scope.initFirstP();
        $location.path('/app-vistaFacturacion');
      });
    }
  //aqui se termina la parte de las divisas
  }])
.controller('CtrlListas',['SimLog','apiService',"$scope","$route","$location","$routeParams","dataShareAlmacen",function (SimLog,apiService,$scope, $route,$location, $routeParams,dataShareAlmacen) {
  var urlCriterios="/rules";
  apiService.getData(urlCriterios).then(function(response){
    $scope.criterios=response.data;
  });

  if($routeParams.id)
  {
    apiService.getSingleData(urlCriterios,$routeParams.id).then(function(response2){
      $scope.criterioEdit=response2.data;
    });

  }

  $scope.editCrit=function(){
    var edCrit={name:$scope.criterioEdit.name};
    apiService.putData(urlCriterios,$routeParams.id,edCrit).then(function(response5){
      $location.path("/app-vistaListas");
      $scope.initFirst();
    });
  }

  $scope.nuevoCrit=function(){
    var newDta={
      status:"D",
      name:$scope.nombreNCrit
    }
    apiService.postData(urlCriterios,newDta).then(function(response4){
      $location.path("/app-vistaListas");
      $scope.initFirst();
    });
  };

  $scope.initFirst=function()
  {
    apiService.getData(urlCriterios).then(function(response){
      $scope.criterios=response.data;
    });
  };

$scope.archivarCrit=function(idC){
      var modalOptions = {
          closeButtonText: 'Cancelar',
          actionButtonText: 'Archivar criterio',
          headerText: '¿ Archivar criterio ?',
          bodyText: '¿Está seguro de archivar el criterio ?'
        };

        modalService.showModal({}, modalOptions).then(function (result) {
         var data={status:"A"};
          apiService.putData(urlCriterios,idC,data).then(function(response3){
            $scope.initFirst();
          });
          $location.path('/app-vistaFacturacion');
        });
     }


  }])
.controller('CtrlPrestamos',['SimLog','apiService',"$scope","$route","$location","$routeParams","dataShareAlmacen","$http",function (SimLog,apiService,$scope, $route,$location, $routeParams,dataShareAlmacen,$http) {
  var urlLocations="/locations";
  var urlTransfers="/transfers";
  var urlDividers="/dividers";
  var urlProducts="/products";
  var urlTransfersVar="/transfer_variants";
  var urlVariantDivisor="/variant_divisions";
  var urlPrestamo="/loans"
  $scope.SubmitOnce=false;
  $scope.exiteDIvVar=false;

  $scope.opciones_origen=[];
  $scope.opciones_destino=[];
  $scope.LocOrigen;

  $scope.variants=[{
    id_var:"",
    amount:""
  }];
  $scope.cloneItem = function () {
    var itemToClone = { "id_var": 0, "amount": 0 };
    $scope.variants.push(itemToClone);
  }

  $scope.removeItem = function (itemIndex) {
    $scope.variants.splice(itemIndex, 1);
  }



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
          apiService.getData(urlPrestamo).then(function(largeLoad) {
            /*angular.forEach(largeLoad.data,function(val,key){
              val.supplier="";
            });*/
            data = largeLoad.data.filter(function(item) {
              //console.log(JSON.stringify(item).toLowerCase().indexOf(ft));
              return JSON.stringify(item).toLowerCase().indexOf(ft) !== -1;
            });

            $scope.setPagingData(data, page, pageSize);
          });
        } else {
          apiService.getData(urlPrestamo).then(function(largeLoad) {
            $scope.setPagingData(largeLoad.data, page, pageSize);
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
            { field: "number", displayName:"Folio",cellTemplate:'<div class="ngCellText ng-scope">'+'<a href="#/app-vistaLoanInd/{{row.entity.id}}">{{row.entity.number}}</a>'+'</div>' },
            { field: "origin.warehouse.name", displayName:"Prestamista" },
            { field: "borrower",displayName:"Prestatario" },
            { field: "created_at",displayName:"Fecha" },
            { field: "status",displayName:"Estado" }
        ],
      enablePaging: true,
      showFooter: true,
      totalServerItems: 'totalServerItems',
      pagingOptions: $scope.pagingOptions,
      filterOptions: $scope.filterOptions
    };
  /* ****************************************************************************************************/

  apiService.getData(urlPrestamo).then(function(response){
    $scope.prestamos=response.data;
    angular.forEach($scope.prestamos,function(value,key){
      apiService.getSingleData(urlLocations,value.origin.warehouse.location_id).then(function(response){
        value.origin.warehouse.location_name=response.data.name;
      });

    });
    //console.log($scope.locations);
  });


  apiService.getData(urlLocations).then(function(response){
    $scope.locations=response.data;
    //console.log($scope.locations);
  });
  $scope.almacenesOrigen=function(){
    $scope.opciones_origen=[];
    apiService.getSingleData(urlLocations,$scope.LocOrigen).then(function(response){
      angular.forEach(response.data.warehouses,function(data,key){
        if(data.name!='Global')
        {
          angular.forEach(data.dividers,function(data2,key){
            var datToPush={
              name:data.name+"/"+data2.name,
              id_div:data2.id,
              id_alm:data.id
              };

            $scope.opciones_origen.push(datToPush);
            //console.log($scope.opciones_origen);
          });
        }
      });
    });
  };
  $scope.almacenesDestino=function(){
    $scope.opciones_destino=[];
    console.log($scope.LocDestino);
    apiService.getSingleData(urlLocations,$scope.LocDestino).then(function(response){
      angular.forEach(response.data.warehouses,function(data,key){
        if(data.name!='Global')
        {
          angular.forEach(data.dividers,function(data2,key){
            var datToPushD={
              name:data.name+"/"+data2.name,
              id_div:data2.id,
              id_alm:data.id
              };

            $scope.opciones_destino.push(datToPushD);
            console.log($scope.opciones_origen);
          });
        }
      });
    });
  };
  $scope.prodDiv=function(){
    //console.log("entro");
    apiService.getSingleData(urlDividers,$scope.divOrigen).then(function(response){
      $scope.ProdVarDiv=response.data;
      //console.log(response.data);
      angular.forEach($scope.ProdVarDiv.variant_divisions, function(value, key) {
        //console.log(value);
        apiService.getSingleData(urlProducts,value.variant.product_id).then(function(response2) {
        value.variant.prodName=response2.data.name;
        });
      });
      //console.log($scope.ProdVarDiv);
    });
  };
  $scope.checkAb=function(index,id){
    angular.forEach($scope.ProdVarDiv.variant_divisions,function(value,key){

      if(value.variant.id==id)
      {
        maxVarDiv=value.total;
        $scope.variants[index].max=maxVarDiv;
        //console.log(maxVarDiv);
      }
    });

  };
  $scope.submitOrd=function(){
    $scope.SubmitOnce=true;
    var banderaMax=false;
    var banderaRep=false;
    var banderadesTS=false;
    var idVarSel=[];

    angular.forEach($scope.variants,function(value,key){
      if(value.amount==value.max)
      {
        banderaMax=true;
      }
      idVarSel.push(value.id_var);
    });

    var sorted_arr = idVarSel.slice().sort();
    var results = [];
    for (var i = 0; i < idVarSel.length - 1; i++) {
        if (sorted_arr[i + 1] == sorted_arr[i]) {
            results.push(sorted_arr[i]);
        }
    }
    if(results.length>0){
      banderaRep=true;
    }
    if(banderaRep==true)
    {
      alert("No se puede Repetir variantes");
      $scope.SubmitOnce=false;
      return false;
    }
    else if(banderaMax==true)
    {
      alert("No se puede Repetir variantes");
      $scope.SubmitOnce=false;
      return false;
    }
    else
    {
      var data={
        status:"Pendiente",
        origin_id:$scope.divOrigen,
        loan:true
      };
      apiService.postData(urlTransfers,data).then(function(response){
        reciente=recentService.getRecent(response.data);
          //console.log(reciente);
          var newData={
            number:"OP_"+reciente
          };
          apiService.putData(urlTransfers,reciente,newData).then(function(resp){
            angular.forEach($scope.variants,function(valor,llave){
              var dataTr={
                transfer_id:reciente,
                variant_id:valor.id_var,
                amount:valor.amount,
              };
              apiService.postData(urlTransfersVar,dataTr);

            });
            $location.path("/app-vistaPrestamos");
          });


      });
    }
  };
}])
.controller('CtrlLoansInd',['SimLog','apiService',"$scope","$route","$location","$routeParams","dataShareAlmacen",function (SimLog,apiService,$scope, $route,$location, $routeParams,dataShareAlmacen) {
 var urlLocations="/locations";
  var urlTransfers="/transfers";
  var urlDividers="/dividers";
  var urlProducts="/products";
  var urlWarehouses="/warehouses";
  var urlVariantDivisor="/variant_divisions";
  var urlVariantWarehouse="/variant_warehouses";


  apiService.getSingleData(urlTransfers,$routeParams.id).then(function(response){
    $scope.LoanInd=response.data;
    angular.forEach($scope.LoanInd.transfer_variants,function(value,key){
      angular.forEach($scope.LoanInd.variants,function(value2,key){
        if(value2.id==value.variant.id)
        {
          value.product_name=value2.product.name;
        }
      });
    });
    apiService.getSingleData(urlLocations,$scope.LoanInd.origin.warehouse.location_id).then(function(response){
        $scope.LoanInd.origin.warehouse.location_name=response.data.name;
    });
      apiService.getSingleData(urlLocations,$scope.LoanInd.destination.warehouse.location_id).then(function(response){
        $scope.LoanInd.destination.warehouse.location_name=response.data.name;
    });
  });

  $scope.changeStatus=function(){
    var dataUPD={
      status:"Prestado"
    }
    apiService.putData(urlTransfers,$routeParams.id,dataUPD).then(function(resp){
      $location.path('/app-vistaPrestamos');
    });

  }
  $scope.changeStatusDevuelto=function(){
    var dataUPD={
      status:"Devuelto"
    }
    apiService.putData(urlTransfers,$routeParams.id,dataUPD).then(function(resp){
      $location.path('/app-vistaPrestamos');
    });
  }
}])
.controller('CtrlTransfInd',['SimLog','apiService',"$scope","$route","$location","$routeParams","dataShareAlmacen",function (SimLog,apiService,$scope, $route,$location, $routeParams,dataShareAlmacen) {
  var urlLocations="/locations";
  var urlTransfers="/transfers";
  var urlDividers="/dividers";
  var urlProducts="/products";
  var urlWarehouses="/warehouses";
  var urlVariantDivisor="/variant_divisions";
  var urlVariantWarehouse="/variant_warehouses";


  apiService.getSingleData(urlTransfers,$routeParams.id).then(function(response){
    $scope.TransInd=response.data;
    angular.forEach($scope.TransInd.transfer_variants,function(value,key){
      angular.forEach($scope.TransInd.variants,function(value2,key){
        if(value2.id==value.variant.id)
        {
          value.product_name=value2.product.name;
        }
      });
    });
    apiService.getSingleData(urlLocations,$scope.TransInd.origin.warehouse.location_id).then(function(response){
        $scope.TransInd.origin.warehouse.location_name=response.data.name;
    });
      apiService.getSingleData(urlLocations,$scope.TransInd.destination.warehouse.location_id).then(function(response){
        $scope.TransInd.destination.warehouse.location_name=response.data.name;
    });
  });

  $scope.changeStatus=function(){
    var dataUPD={
      status:"Entregado"
    }
    var id_Var_Div=0;
    var id_Var_Div_des=0;
    var newTotal_Var_Div=0;
    var newTotal_Var_Div_des=0;
    var id_War_Div=0;
    var newTotal_War_Div=0;
    var id_Var_war=0;
    apiService.putData(urlTransfers,$routeParams.id,dataUPD);

    /* *************** Lo que se hizo aqui fue para el origen quitar la informacion de cada variante del orgien*/
    apiService.getSingleData(urlDividers,$scope.TransInd.origin_id).then(function(response){
      $scope.divisor=response.data;
      //pedimos la parte de los divisores y los almacenes , una vez obtenidos
      //buscamos origen  modificamos los totales, tanto de almacenes y de divisor
      //****************   ORIGEN ****************************************++
      angular.forEach($scope.divisor.variant_divisions,function(valDiv,keyDiv){

        angular.forEach($scope.TransInd.transfer_variants,function(valTra,keyTra){
          if(valDiv.divider.id==$scope.TransInd.origin_id)
          {
            if(valDiv.variant.id==valTra.variant.id)
            {
              var datDiv_Var={
                total:(valDiv.total)-(valTra.amount)
              };
              console.log("si realizo la actualizcion del registro del div X var origen")
              console.log(valDiv.id);
              apiService.putData(urlVariantDivisor,valDiv.id,datDiv_Var);
            }
          }
        });


      });

      //************************   FIN     ******************************
      //ahora verificamos la informacion pero ahora vemos los variantes por almacen
        apiService.getSingleData(urlWarehouses,$scope.TransInd.origin.warehouse.id).then(function(responseWar){
        $scope.almacen=responseWar.data;
        angular.forEach($scope.almacen.variant_warehouses,function(valWar,keyWar){
          angular.forEach($scope.TransInd.transfer_variants,function(valTra,keyTra){
            if((valWar.variant.id==valTra.variant.id)&&($scope.TransInd.origin.warehouse.id==valWar.warehouse.id))
            {
              var datWar_Var={
                stock:parseInt(valWar.stock)-parseInt(valTra.amount)
              };
              apiService.putData(urlVariantWarehouse,valWar.id,datWar_Var);
            }
          });

        });

      });
        apiService.getSingleData(urlWarehouses,$scope.TransInd.destination.warehouse.id).then(function(responseWar){
        $scope.almacen_des=responseWar.data;
        angular.forEach($scope.almacen_des.variant_warehouses,function(valWarRes,keyWar){
          angular.forEach($scope.TransInd.transfer_variants,function(valTra,keyTra){
            if((valWarRes.variant.id==valTra.variant.id)&&($scope.TransInd.destination.warehouse.id==valWarRes.warehouse.id))
            {
              flagUpd=true;
              var datWar_Var={
                stock:parseInt(valWarRes.stock)+parseInt(valTra.amount)
              };
              apiService.putData(urlVariantWarehouse,valWarRes.id,datWar_Var);
            }

          });

        });


      });
        /* *************** Lo que se hizo aqui fue para el destino sumar el valor pero del divisor , ya sirve el almacen*/
      apiService.getSingleData(urlDividers,$scope.TransInd.destination_id).then(function(response){
        $scope.diviOrigen=response.data;
        //****************   Destino ****************************************++

          angular.forEach($scope.diviOrigen.variant_divisions,function(valDivO,keyDiv){

            angular.forEach($scope.TransInd.transfer_variants,function(valTra,keyTra){
              //console.log(valDivO.divider.id);
              //console.log($scope.TransInd.destination_id);
              if(valDivO.divider.id==$scope.TransInd.destination_id)
              {
                if(valDivO.variant.id==valTra.variant.id)
                {
                  var datDiv_Var_des={
                    total:parseInt(valDivO.total)+parseInt(valTra.amount)
                  };
                  //console.log("si realizo la actualizcion del registro del div X var destino")
                  //console.log(valDivO.id);
                  apiService.putData(urlVariantDivisor,valDivO.id,datDiv_Var_des);
                }
              }

            });


          });
          $location.path('/app-vistaTransferencias');
      });
    });


}

}])
.controller('CtrlTransferencias',['SimLog','apiService',"recentService","$scope","$route","$location","$routeParams","dataShareAlmacen",function (SimLog,apiService,recentService,$scope, $route,$location, $routeParams,dataShareAlmacen) {
  var urlLocations="/locations";
  var urlTransfers="/transfers";
  var urlTransferences="/transferences";
  var urlDividers="/dividers";
  var urlProducts="/products";
  var urlTransfersVar="/transfer_variants";
  var urlVariantDivisor="/variant_divisions";
  $scope.SubmitOnce=false;
  $scope.exiteDIvVar=false;

  $scope.opciones_origen=[];
  $scope.opciones_destino=[];
  $scope.LocOrigen;

  $scope.variants=[{
    id_var:"",
    amount:""
  }];
  $scope.cloneItem = function () {
    var itemToClone = { "id_var": 0, "amount": 0 };
    $scope.variants.push(itemToClone);
  }

  $scope.removeItem = function (itemIndex) {
    $scope.variants.splice(itemIndex, 1);
  }



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
          apiService.getData(urlTransfers).then(function(largeLoad) {
            /*angular.forEach(largeLoad.data,function(val,key){
              val.supplier="";
            });*/
            data = largeLoad.data.filter(function(item) {
              //console.log(JSON.stringify(item).toLowerCase().indexOf(ft));
              return JSON.stringify(item).toLowerCase().indexOf(ft) !== -1;
            });

            $scope.setPagingData(data, page, pageSize);
          });
        } else {
          apiService.getData(urlTransfers).then(function(largeLoad) {
            $scope.setPagingData(largeLoad.data, page, pageSize);
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
            { field: "number", displayName:"Folio",cellTemplate:'<div class="ngCellText ng-scope">'+'<a href="#/app-vistaTransInd/{{row.entity.id}}">{{row.entity.number}}</a>'+'</div>' },
            { field: "origin.warehouse.name", displayName:"Prestamista" },
            { field: "destination.warehouse.name",displayName:"Prestatario" },
            { field: "created_at",displayName:"Fecha" },
            { field: "status",displayName:"Estado" }
        ],
      enablePaging: true,
      showFooter: true,
      totalServerItems: 'totalServerItems',
      pagingOptions: $scope.pagingOptions,
      filterOptions: $scope.filterOptions
    };
  /* ****************************************************************************************************/

  apiService.getData(urlTransferences).then(function(response){
    $scope.transferencias=response.data;
    angular.forEach($scope.transferencias,function(value,key){
      apiService.getSingleData(urlLocations,value.origin.warehouse.location_id).then(function(response){
        value.origin.warehouse.location_name=response.data.name;
      });
      apiService.getSingleData(urlLocations,value.destination.warehouse.location_id).then(function(response){
        value.destination.warehouse.location_name=response.data.name;
      });
    });
    //console.log($scope.locations);
  });


  apiService.getData(urlLocations).then(function(response){
    $scope.locations=response.data;
    //console.log($scope.locations);
  });
  $scope.almacenesOrigen=function(){
    $scope.opciones_origen=[];
    apiService.getSingleData(urlLocations,$scope.LocOrigen).then(function(response){
      angular.forEach(response.data.warehouses,function(data,key){
        if(data.name!='Global')
        {
          angular.forEach(data.dividers,function(data2,key){
            var datToPush={
              name:data.name+"/"+data2.name,
              id_div:data2.id,
              id_alm:data.id
              };

            $scope.opciones_origen.push(datToPush);
            //console.log($scope.opciones_origen);
          });
        }
      });
    });
  };
  $scope.almacenesDestino=function(){
    $scope.opciones_destino=[];
    console.log($scope.LocDestino);
    apiService.getSingleData(urlLocations,$scope.LocDestino).then(function(response){
      angular.forEach(response.data.warehouses,function(data,key){
        if(data.name!='Global')
        {
          angular.forEach(data.dividers,function(data2,key){
            var datToPushD={
              name:data.name+"/"+data2.name,
              id_div:data2.id,
              id_alm:data.id
              };

            $scope.opciones_destino.push(datToPushD);
            console.log($scope.opciones_origen);
          });
        }
      });
    });
  };
  $scope.prodDiv=function(){
    //console.log("entro");
    apiService.getSingleData(urlDividers,$scope.divOrigen).then(function(response){
      $scope.ProdVarDiv=response.data;
      //console.log(response.data);
      angular.forEach($scope.ProdVarDiv.variant_divisions, function(value, key) {
        //console.log(value);
        apiService.getSingleData(urlProducts,value.variant.product_id).then(function(response2) {
        value.variant.prodName=response2.data.name;
        });
      });
      //console.log($scope.ProdVarDiv);
    });
  };
  $scope.checkAb=function(index,id){
    var maxVarDiv=0;
    //console.log(index);
    //console.log(id);
    var divCheck=0;
    if($scope.divDestinoOp1)
      divCheck=$scope.divDestinoOp1
    else if($scope.divDestinoOp2)
      divCheck=$scope.divDestinoOp2

    apiService.getSingleData(urlDividers,divCheck).then(function(respDivCheck){
      angular.forEach(respDivCheck.data.variant_divisions,function(valCh,keyCh){
        if((valCh.variant.id==id)&&(valCh.divider.id==divCheck))
        {
          //alert("El producto no existe en el destino");
          console.log("El producto si existe en el destino");
          console.log(id);
          console.log(divCheck)
          $scope.exiteDIvVar=true;
        }
        else{
            $scope.exiteDIvVar=false;
          }
      });
    });
    angular.forEach($scope.ProdVarDiv.variant_divisions,function(value,key){

      if(value.variant.id==id)
      {
        maxVarDiv=value.total;
        $scope.variants[index].max=maxVarDiv;
        //console.log(maxVarDiv);
      }
    });

  };
  $scope.checkAbAll=function(variantes,destino){
    var banderaExiste=false;
    apiService.getSingleData(urlDividers,destino).then(function(respDivCheck){
      angular.forEach(respDivCheck.data.variant_divisions,function(valCh,keyCh){
        angular.forEach(variantes,function(valVar,keyVar){
          if((valCh.variant.id==valVar.id_var)&&(valCh.divider.id==destino))
          {
            console.log(banderaExiste);
            banderaExiste=true;
          }else{
            banderaExiste=false;
          }
        });

      });
      return banderaExiste;
    });

  };
  $scope.submitOrd=function(){
    $scope.SubmitOnce=true;
    var banderaMax=false;
    var banderaRep=false;
    var banderadesTS=false;
    var  destino=0;


    if($scope.exiteDIvVar==false)
    {
      alert("El producto no existe en el destino");
      $scope.SubmitOnce=false;
      return false;
    }

    if(!$scope.divDestinoOp2)
      destino=$scope.divDestinoOp1;
    else if(!$scope.divDestinoOp1)
      destino=$scope.divDestinoOp2;
    else
      banderadesTS=true;

    var existenVari=$scope.checkAbAll($scope.variants,destino);
    if(existenVari===false)
    {
      alert("Una de las variantes no existe en el destino");
      $scope.SubmitOnce=false;
      return false;
    }


    var idVarSel=[];
    if(($scope.divDestinoOp1==$scope.divOrigen)||($scope.divDestinoOp2==$scope.divOrigen))
    {
      alert("el destino y origen no pueden ser los mismos");
      $scope.SubmitOnce=false;
      return false;
    }
    angular.forEach($scope.variants,function(value,key){
      if(value.amount==value.max)
      {
        banderaMax=true;
      }
      idVarSel.push(value.id_var);
    });
    var sorted_arr = idVarSel.slice().sort();
    var results = [];
    for (var i = 0; i < idVarSel.length - 1; i++) {
        if (sorted_arr[i + 1] == sorted_arr[i]) {
            results.push(sorted_arr[i]);
        }
    }
    if(results.length>0){
      banderaRep=true;
    }
    if(banderaRep===true)
    {
      alert("No se puede Repetir variantes");
      $scope.SubmitOnce=false;
      return false;
    }
    else if(banderaMax===true)
    {
      alert("No se puede Repetir variantes");
      $scope.SubmitOnce=false;
      return false;
    }
    else if(banderadesTS===true)
    {
      alert("No se selecciono destino");
      $scope.SubmitOnce=false;
      return false;
    }
    else
    {
      var data={
        status:"Pendiente",
        origin_id:$scope.divOrigen,
        destination_id:destino,
        loan:false
      };
      apiService.postData(urlTransfers,data).then(function(response){
        apiService.getData(urlTransfers).then(function(responseNew){
          reciente=recentService.getRecent(responseNew.data);
          console.log(reciente);
          var newData={
            number:"OT"+reciente
          };
          apiService.putData(urlTransfers,reciente,newData);
          angular.forEach($scope.variants,function(valor,llave){
            var dataTr={
              transfer_id:reciente,
              variant_id:valor.id_var,
              amount:valor.amount,
            };
            apiService.postData(urlTransfersVar,dataTr);

          });
        })
        $location.path('/app-vistaTransferencias');
      });
    }
  };
}])

.controller('CtrlSigUp', ['$location','SimLog','$scope', '$theme','$auth','$rootScope',"apiService","recentService", function($location,SimLog,$scope, $theme,$auth,$rootScope,apiService,recentService) {
    'use strict';
    //console.log('asdkjasdlk');
    var urlUsers="/users"
    $scope.us;
    $scope.pass;
    $scope.ErrorLog=true;
    $scope.handleLoginBtnClick = function() {
      //console.log("Entrol al login");
      $auth.submitLogin($scope.loginForm)
        .then(function(resp) {
          // handle success response
          //console.log(resp);
          /*apiService.getSingleData(urlUsers,resp.id).then(function(response){
            console.log(response.data);
          });*/
          $scope.ErrorLog=true;
        })
        .catch(function(resp) {
          // handle error response
          $scope.ErrorLog=false;

        });
    };
    var isLog=SimLog.getData();
    if(isLog)
      $location.path('/app-vistaProductos');
    $scope.createLog=function(){

      if($scope.us=='Admin'&&$scope.pass=='admin')
      {
        SimLog.sendData("Logged");
        $location.path('/app-vistaProductos');
      }
    };

    $theme.set('fullscreen', true);

    $scope.$on('$destroy', function() {
      $theme.set('fullscreen', false);
    });
  }])
.controller('CtrlSignOut', ['$location','SimLog','$scope', '$theme','$auth', function($location,SimLog,$scope, $theme, $auth) {
    'use strict';
    //console.log('asdkjasdlk')
    SimLog.sendData("");


    $theme.set('fullscreen', true);

    $scope.$on('$destroy', function() {
      $theme.set('fullscreen', false);
    });
  }])
.controller('CtrlOrdenesCInd',['SimLog','apiService',"$scope","$location","$routeParams","dataShareVenta","$timeout","dataShareReady","modalService",function (SimLog,apiService,$scope, $location, $routeParams,dataShareVenta,$timeout,dataShareReady,modalService){
   var urlLocation="/locations";
  var urlWarehouses="/warehouses";
  var urlProducts="/products";
  var urlVariantOrders="/variant_orders"
  var urlPurchaseOrders="/purchase_orders"
  var urlVarianteDivisor="/variant_divisions";
  var urlVarianteAlmacen="/variant_warehouses";

  var urlOrdenesC="/purchase_orders";
  var urlVariantOC="/variant_orders";


  var urlLocation="/locations";

  var urlVariantDivisor="/variant_divisions";
  var urlVarianteAlmacen="/variant_warehouses";

 $scope.archivar=function(){
  var modalOptions = {
      closeButtonText: 'Cancelar',
      actionButtonText: 'Archivar Orden',
      headerText: '¿ Archivar Orden' + $scope.statusOrden.number  + '?',
      bodyText: '¿Está seguro de archivar la orden?'
    };

    modalService.showModal({}, modalOptions).then(function (result) {
      var dataUPD={
        status:"Archivado"
      };
      apiService.putData(urlPurchaseOrders,$scope.statusOrden,dataUPD);
      $location.path("/app-vistaOrdenesCompra");
    });
 }

  $scope.cargarOrden=function(){
    if($scope.statusOrden=='Solicitado')
    {
      var dataUPD={
        status:"En Almacen"
      };
      apiService.putData(urlPurchaseOrders,$scope.idnumOrden,dataUPD);

      angular.forEach($scope.ordenCompra.variant_orders,function(value3,key){
        var idvarianteAlmacen=0;
        var idvarianteDivisor=0;
        var idDivisorGeneral=0;
        apiService.getSingleData(urlWarehouses,value3.warehouse.id).then(function(response2){

            angular.forEach(response2.data.variant_warehouses,function(value4,key){
              //console.log("Almacen");
              //console.log(value4);
              if( (value4.warehouse.id==value3.warehouse.id )&& (value4.variant.id==value3.variant.id) )
              {
                //console.log("si");
                idvarianteAlmacen=value4.id;
                console.log(idvarianteAlmacen);
              }
            });
            angular.forEach(response2.data.dividers,function(value5,key){

              if(value5.name=='General')
              {
                //console.log("divisores entro");
                //console.log(value5);
                idDivisorGeneral=value5.id;
                angular.forEach( value5.variant_divisions,function(value6,key){
                  if( (value6.divider_id==idDivisorGeneral )&& (value6.variant_id==value3.variant.id) )
                    {
                      idvarianteDivisor=value6.id;
                    }
                });
              }
            });
            if(idvarianteDivisor!=0)
            {
              var cantidadVieja=0;
              apiService.getSingleData(urlVarianteDivisor,idvarianteDivisor).then(function(respuesta){
                cantidadVieja=respuesta.data.total;
                var data={
                  total:parseInt(cantidadVieja)+parseInt(value3.amount)
                  };
                  apiService.putData(urlVarianteDivisor,idvarianteDivisor,data);
              });

            }
            else
            {
              var newData={
                divider_id:idDivisorGeneral,
                variant_id:value3.variant.id,
                pri:1,
                total:value3.amount
              };
              //console.log(newData);
              apiService.postData(urlVarianteDivisor,newData);
            }

            if(idvarianteAlmacen!=0)
            {
              console.log("Aqui se supone que entra si encontro un valor de almacen");
              var cantidadVieja=0;
              apiService.getSingleData(urlVarianteAlmacen,idvarianteAlmacen).then(function(respuesta){
                cantidadVieja=respuesta.data.stock;
                var data={
                  stock:parseInt(cantidadVieja)+parseInt(value3.amount),
                  status:"D"
                  };
                  apiService.putData(urlVarianteAlmacen,idvarianteAlmacen,data);
              });

            }
            else
            {
              var newData={
                warehouse_id:value3.warehouse.id,
                variant_id:value3.variant.id,
                stock:value3.amount,
                status:"D"
              };
              //console.log(newData);
              apiService.postData(urlVarianteAlmacen,newData);
            }
        });

      });
    dataShareReady.sendData($scope.ordenCompra.number);
    $location.path('/app-vistaOrdenesCompra');
    }


  };

  $scope.subTotalInd=0;
   var ID_divisor;
   var ID_almacen;
   var locID;
  apiService.getSingleData(urlOrdenesC,$routeParams.id).then(function(response){
    //console.log(response.data);
    $scope.ordenCompra=response.data;
    $scope.idnumOrden=$scope.ordenCompra.id;
    $scope.statusOrden=$scope.ordenCompra.status;
    //pasamos por cada variante que tiene la orden de compra
    angular.forEach(response.data.variant_orders,function(value,key){
      //para obtener el nombre del producto
      locID=value.warehouse.location_id;
      $scope.subTotalInd=$scope.subTotalInd+(value.amount*value.cost_per_unit);
      apiService.getSingleData(urlProducts,value.variant.product_id).then(function(response2) {
        value.variant.product_name=response2.data.name;
      });
    });
    apiService.getSingleData(urlLocation,locID).then(function(respLoc){
      $scope.Locationstreet=respLoc.data.street;
      $scope.Locationnumber=respLoc.data.number;
      $scope.Locationneighboorhood=respLoc.data.neighboorhood;
      $scope.Locationzipcode=respLoc.data.zipcode;
      $scope.LocationState=respLoc.data.municipality;

    });
  });


}])
.controller('CtrlOrdenesVentaInd',['SimLog','apiService',"$scope","$location","$routeParams","dataShareVenta","$timeout",function (SimLog,apiService,$scope, $location, $routeParams,dataShareVenta,$timeout){

  var urlOrdenesV="/sell_orders";
  var urlVariantOV="/variant_sell_orders";
  var urlProducts="/products";
  var urlWarehouses="/warehouses";

  var urlVariantDivisor="/variant_divisions";
  var urlVarianteAlmacen="/variant_warehouses";


  $scope.changeStatus=function(){
    var dataUPD={
      status:"Entregado"
    }
    apiService.putData(urlOrdenesV,$scope.ordenVenta.id,dataUPD);
    angular.forEach($scope.ordenVenta.variant_sell_orders,function(value,key){
      var TotalNew=0;
      var TotalNewAlm=0;
      angular.forEach($scope.ordenVenta.variants,function(value2,key2){
        angular.forEach(value2.variant_divisions,function(value3,key3){
          if((value.variant.id==value3.variant_id)&&(value.divider.id==value3.divider_id))
          {
            var data={
            total:value3.total-value.amount
            };
            apiService.putData(urlVariantDivisor,value3.id,data);
          }

        });
        angular.forEach(value2.variant_warehouses,function(value4,key4){
          if((value.variant.id==value4.variant_id)&&(value.divider.warehouse_id==value4.warehouse_id))
          {
            var data2={
            stock:value4.stock-value.amount
            };
            apiService.putData(urlVarianteAlmacen,value4.id,data2);
          }
        });
      });
    });
    //Aqui tengo que pasar por cada variante y quitarla del divisor

    $location.path('/app-vistaOrdenesVenta/');
  };
  $scope.changePayment=function(){
    var dataUPD={
      payment:"Pagado"
    }
    apiService.putData(urlOrdenesV,$scope.ordenVenta.id,dataUPD);
    $location.path('/app-vistaOrdenesVenta/');
  };
  $scope.subTotalInd=0;
   var ID_divisor;
   var ID_almacen;

  apiService.getSingleData(urlOrdenesV,$routeParams.id).then(function(response) {
    //console.log(response.data);
    $scope.ordenVenta=response.data;
    //pasamos por cada variante que tiene la orden de compra
    angular.forEach(response.data.variant_sell_orders,function(value,key){
      //para obtener el nombre del producto

      $scope.divisorName=value.divider.name;

      $scope.subTotalInd=$scope.subTotalInd+(value.amount*value.price_per_unit);
      apiService.getSingleData(urlProducts,value.variant.product_id).then(function(response2) {
        value.variant.product_name=response2.data.name;
      });
      //para obtener la informacion del almacen
      apiService.getSingleData(urlWarehouses,value.divider.warehouse_id).then(function(response3) {

        $scope.AlmacenName=response3.data.name;
        $scope.LocacionName=response3.data.location.name;

        value.divider.warehouses_name=response3.data.name;
      });

    });
    //console.log($scope.ordenVenta);
  });


}])

.controller('CtrlOrdenesVenta',['recentService','apiService',"$scope","$location","$routeParams","dataShareVenta","$timeout","$http",function (recentService,apiService,$scope, $location, $routeParams,dataShareVenta,$timeout,$http){
  var urlOrdenesV="/sell_orders";
  $scope.isDisabled = false;


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
          apiService.getData(urlOrdenesV).then(function(largeLoad) {
            /*angular.forEach(largeLoad.data,function(val,key){
              val.supplier="";
            });*/
            data = largeLoad.data.filter(function(item) {
              //console.log(JSON.stringify(item).toLowerCase().indexOf(ft));
              return JSON.stringify(item).toLowerCase().indexOf(ft) !== -1;
            });

            $scope.setPagingData(data, page, pageSize);
          });
        } else {
          apiService.getData(urlOrdenesV).then(function(largeLoad) {
            $scope.setPagingData(largeLoad.data, page, pageSize);
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
            { field: "number", displayName:"Folio",cellTemplate:'<div class="ngCellText ng-scope">'+'<a href="#/app-vistaOrdenVInd/{{row.entity.id}}">{{row.entity.number}}</a>'+'</div>' },
            { field: "client.name", displayName:"Cliente" },
            { field: "status",displayName:"Estado" },
            { field: "date",displayName:"Fecha" },
            { field: "amount",displayName:"Monto" }
        ],
      enablePaging: true,
      showFooter: true,
      totalServerItems: 'totalServerItems',
      pagingOptions: $scope.pagingOptions,
      filterOptions: $scope.filterOptions
    };
  /* ****************************************************************************************************/

  apiService.getData(urlOrdenesV).then(function(response) {
    //console.log(response.data);
    $scope.ordenesVenta=response.data;
  });
  $scope.redNOrdenV=function()
  {
    $scope.isDisabled = false;
    var data = {
      status:"Borrador",
      amount:0
    };


    apiService.postData(urlOrdenesV,data).then(function(response){
      apiService.getData(urlOrdenesV).then(function(response) {
        idRec=recentService.getRecent(response.data);
        //console.log(idRec);
        dataShareVenta.sendData(idRec);
        var dataUpd = {
        number:"OV_"+dataShareVenta.getData()
        };
          //dataShareCompra.sendData(idRec);
          apiService.putData(urlOrdenesV,idRec,dataUpd);
      });
    });


    $timeout(function(){


      $location.path('/app-nuevaOrdenV');
    }, 7000);


  };
}])
.controller('CtrlOrdenesVNueva',['SimLog','apiService',"$scope","$location","$routeParams","dataShareVenta","modalService",function (SimLog,apiService,$scope, $location, $routeParams,dataShareVenta,modalService){
  var urlSuppliers="/suppliers";
  var urlLocation="/locations";
  var urlWarehouses="/warehouses";
  var urldivisor="/dividers";
  var urlProducts="/products";
  var urlVariants="/variants";
  var urlOrdenesV="/sell_orders";
  var urlPrices="/prices";
  var urlClientes="/clients";

  var urlVariantOV="/variant_sell_orders";




  $scope.isDisabled = false;
  var idOrdenVentaBorrador=dataShareVenta.getData();
  //console.log(idOrdenBorrador);
  $scope.variants=[];
  apiService.getSingleData(urlOrdenesV,idOrdenVentaBorrador).then(function(response) {

      $scope.infoOrden=response.data;

    });

  apiService.getData(urlLocation).then(function(response) {
    $scope.locations=response.data;
  });
  apiService.getData(urlPrices).then(function(response) {
    $scope.precios=response.data;
  });
  apiService.getData(urlClientes).then(function(response) {
    $scope.clientes=response.data;
  });

  //arreglo para la agregar mas productos a la orden

  $scope.cloneVariante = function () {
    var itemToClone = { "orderVariant_id": "",
        "cantidad":"",
        "cantidadDisp":0,
        "costo": "",
        "tax":1,
        "ordenWarehId":"",
        "products":$scope.productosDivisor};
    $scope.variants.push(itemToClone);
  }

  $scope.removeItem = function (itemIndex) {
    $scope.variants.splice(itemIndex, 1);
  }
  // Variables para la creacion de la orden de compra

  // ***********************************************

  //funcion para hacer update de la informacion en base al proveedor
  $scope.updateInfo=function()
  {

    apiService.getSingleData(urlSuppliers,$scope.ordenSupplierId).then(function(response) {

      //$scope.unit=response.data.currency.unit;
      //$scope.currency=response.data.currency.name;
      if($scope.warehouses)
      {
        $scope.variants = [
          {
            "orderVariant_id": "",
            "cantidad":"",
            "cantidadDisp":0,
            "costo": "",
            "tax":1,
            "ordenWarehId":"",
            "products":response.data.products
          }
        ];
      }
      else
      {
        $scope.variants = [
          {
            "orderVariant_id": "",
            "cantidad":"",
            "cantidadDisp":0,
            "costo": "",
            "tax":1,
            "ordenWarehId":"",
            "products":response.data.products
          }
        ];
      }

      $scope.products=response.data.products;
      //console.log($scope.variants);
      });
  };

  //funcion para hacer update de la variant
  $scope.variantesEnDIv=new Array();
  $scope.updateInfoProduct=function(indexV,prodID){
    //console.log(indexV);
    //console.log(prodID);
    $scope.variantesEnDIv=new Array();
    apiService.getSingleData(urlProducts,prodID).then(function(response) {
      angular.forEach(response.data.variants, function(value, key) {
        angular.forEach($scope.variantes_div, function(value2, key) {
          if(value.id==value2.variant.id)
          {
            $scope.variantesEnDIv.push(value2);
          }
        });

      });
     $scope.variants[indexV]['variantes']=$scope.variantesEnDIv;
      //console.log($scope.variants[indexV]);
    });
    //
  };
  $scope.$on('$locationChangeStart', function( event ) {
      var answer = confirm("Saliendo de la creacion de la orden de venta ¿Está seguro?")
      if (!answer) {
          event.preventDefault();
      }
  });
  $scope.changePrices=function(){
    if($scope.variants){
      apiService.getSingleData(urlPrices,$scope.OrdenCliPrecio).then(function(response) {
        angular.forEach(response.data.variant_prices, function(value, key) {
          angular.forEach($scope.variants, function(value2, key) {
            if(value.variant.id==value2['orderVariant_id'])
            {
              value2['costo']=value.cost;
            }

          });
        });
      });
    }
  };
  $scope.getTax=function(indexV,varID){

    apiService.getSingleData(urlVariants,varID).then(function(response) {
       $scope.variants[indexV]['precios']=response.data.variant_prices;

      angular.forEach(response.data.variant_divisions, function(value2, key) {
        if(value2.divider.id==$scope.ordenDivisorId)
        {
          $scope.variants[indexV]['cantidadDisp']=value2.total;
        }

      });
     $scope.variants[indexV]['tax']=(response.data.tax.percentage)/100;
    });
  };
  $scope.changeCost=function(indexV,priceID){
    //console.log(indexV);
    //console.log(priceID);
    angular.forEach($scope.variants[indexV].precios, function(value, key) {
      //console.log(value);
        if(value.price.id==priceID)
           $scope.variants[indexV]['costo']=value.cost;
      });
  };

  $scope.getSubtotal=function(){
    var subTotal = 0;
    for(var i = 0; i < $scope.variants.length; i++){
        var variant = $scope.variants[i];
        subTotal += (variant.cantidad * variant.costo);
    }
    return subTotal;
  };

  $scope.getImpuestos=function(){
    var Impuesto = 0;
    for(var i = 0; i < $scope.variants.length; i++){
        var variant = $scope.variants[i];
        Impuesto += (variant.cantidad * variant.costo)*variant.tax;
    }
    return Impuesto;
  };

  $scope.getTotal=function()
  {
    var total = 0;
    for(var i = 0; i < $scope.variants.length; i++){
        var variant = $scope.variants[i];
        total += ((variant.cantidad * variant.costo)*variant.tax)+(variant.cantidad * variant.costo);
    }
    return total;
  }
  // funcion para hacer update de las locaciones
  $scope.updateInfoLocacion=function()
  {
    apiService.getSingleData(urlLocation,$scope.ordenLocationId).then(function(response) {
        $scope.warehouses_Loc=response.data.warehouses;
      });
  }
  $scope.updateInfoAlmacen=function()
  {
    apiService.getSingleData(urlWarehouses,$scope.ordenAlmacenId).then(function(response) {
        $scope.divisor_Alm=response.data.dividers;
      });
  }
  $scope.productosDivisor=new Array();
  $scope.variantes_div=""
  $scope.updateInfoDivisor=function()
  {
    apiService.getSingleData(urldivisor,$scope.ordenDivisorId).then(function(response) {
        $scope.variantes_div=response.data.variant_divisions;
        apiService.getData(urlProducts).then(function(response){
          angular.forEach(response.data, function(value, key) {
            angular.forEach($scope.variantes_div, function(value2, key2) {
              //console.log(value2.variant.product_id);
              //console.log(value.id);
              if(value2.variant.product_id==value.id)
              {
                $scope.productosDivisor.push(value);
              }
            });
          });
            var arraySinDuplicados = [];
            $.each($scope.productosDivisor, function(i, el){
                if($.inArray(el, arraySinDuplicados) === -1) arraySinDuplicados.push(el);
            });
            $scope.variants = [
              {
                "orderVariant_id": "",
                "cantidad":"",
                "cantidadDisp":0,
                "costo": "",
                "tax":1,
                "ordenWarehId":"",
                "products":$scope.productosDivisor
              }
            ];
            $scope.productosDivisor=arraySinDuplicados;

        });
      });


  }

  //aAqui se obtine la info de los clientes
  $scope.updateInfoCliente=function(){

    apiService.getSingleData(urlClientes,$scope.ordenClientId).then(function(response) {
     $scope.directionsCli=response.data.send_orders;
    });
    //
  };
  /* ***************Aqui se hace el submit *****************/
  $scope.submitOrden=function(variantes,date,ordenSupplierId,notas,facturacion)
  {
    var modalOptions = {
      closeButtonText: 'Cancelar',
      actionButtonText: 'Enviar Orden',
      headerText: '¿ Enviar Orden' + $scope.infoOrden.number  + '?',
      bodyText: '¿Está seguro de enviar la orden?'
    };

    modalService.showModal({}, modalOptions).then(function (result) {
      $scope.isDisabled = true;
      var total=$scope.getTotal();

      var fact="N"
      if(facturacion==true)
        fact="Y"

      var dataUpd={
        payment:"Pendiente",
        amount:total,
        billing:fact,
        date:date,
        notes:notas,
        status:"Solicitado",
        client_id:$scope.ordenClientId,
        send_order_id:$scope.ordenDirecctionId
      };
      //console.log(dataUpd);
      apiService.putData(urlOrdenesV,idOrdenVentaBorrador,dataUpd);
      angular.forEach(variantes, function(value, key) {
        //console.log("valor de la orden de venta")
        //console.log(idOrdenVentaBorrador);

        var data={

          sell_order_id:idOrdenVentaBorrador,
          variant_id:value.orderVariant_id,
          amount:value.cantidad,
          price_per_unit:value.costo,
          divider_id:$scope.ordenDivisorId
        };
        //console.log(data);
          apiService.postData(urlVariantOV,data);
      });
      $location.path('/app-vistaOrdenesVenta');
    });

  }
  $scope.submitOrdenBorrador=function(variantes,date,ordenSupplierId,notas,facturacion)
  {
    var modalOptions = {
      closeButtonText: 'Cancelar',
      actionButtonText: 'Enviar Orden',
      headerText: '¿ Enviar Orden' + $scope.infoOrden.number  + '?',
      bodyText: '¿Está seguro de gusrdar la orden como borrador?'
    };

    modalService.showModal({}, modalOptions).then(function (result) {
      $scope.isDisabled = true;
      var total=$scope.getTotal();

      var fact="N"
      if(facturacion==true)
        fact="Y"

      var dataUpd={
        payment:"Pendiente",
        amount:total,
        billing:fact,
        date:date,
        notes:notas,
        status:"Borrador",
        client_id:$scope.ordenClientId,
        send_order_id:$scope.ordenDirecctionId
      };
      //console.log(dataUpd);
      apiService.putData(urlOrdenesV,idOrdenVentaBorrador,dataUpd);
      angular.forEach(variantes, function(value, key) {


        var data={

          sell_order_id:idOrdenVentaBorrador,
          variant_id:value.orderVariant_id,
          amount:value.cantidad,
          price_per_unit:value.costo,
          divider_id:$scope.ordenDivisorId
        };
          apiService.postData(urlVariantOV,data);
      });
      $location.path('/app-vistaOrdenesVenta');
    });

  }
  /* ***************************** */
  $scope.today = function() {
      $scope.dt = new Date();
    };
    $scope.today();

    $scope.clear = function() {
      $scope.dt = null;
    };

    // Disable weekend selection
    $scope.disabled = function(date, mode) {
      return (mode === 'day' && (date.getDay() === 0 || date.getDay() === 6));
    };

    $scope.toggleMin = function() {
      $scope.minDate = $scope.minDate ? null : new Date();
    };
    $scope.toggleMin();

    $scope.open = function($event) {
      $event.preventDefault();
      $event.stopPropagation();

      $scope.opened = true;
    };

    $scope.dateOptions = {
      formatYear: 'yy',
      startingDay: 1
    };

    $scope.initDate = new Date('2016-15-20');
    $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = $scope.formats[0];
  /* ******************************* */
  $scope.redNOrdenC=function()
  {
    $location.path('/app-nuevaOrdenC');
  };
}])
.controller('CtrlOrdenesA',['recentService','apiService',"$scope","$location","$routeParams","dataShareCompra","$timeout",function (recentService,apiService,$scope, $location, $routeParams,dataShareCompra,$timeout){
  var urlOrdenesA="/adjustment_orders";
  $scope.isDisabled = false;


  apiService.getData(urlOrdenesA).then(function(response) {
    //console.log(response.data);
    $scope.ordenesA=response.data;
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
          apiService.getData(urlOrdenesA).then(function(largeLoad) {
            /*angular.forEach(largeLoad.data,function(val,key){
              val.supplier="";
            });*/
            data = largeLoad.data.filter(function(item) {
              //console.log(JSON.stringify(item).toLowerCase().indexOf(ft));
              return JSON.stringify(item).toLowerCase().indexOf(ft) !== -1;
            });

            $scope.setPagingData(data, page, pageSize);
          });
        } else {
          apiService.getData(urlOrdenesA).then(function(largeLoad) {
            $scope.setPagingData(largeLoad.data, page, pageSize);
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
  /* <tr ng-repeat="order in ordenesA">
                                <td><a href="#/app-vistaOrdenCInd/{{order.id}}">{{order.number}}</a></td>
                                <td>{{order.purchase_order.number}}</td>
                                <td>{{order.date}}</td>
                            </tr>*/
    $scope.gridOptions = {
      data: 'myData',
      columnDefs: [
            { field: "number", displayName:"Folio",cellTemplate:'<div class="ngCellText ng-scope">'+'<a href="#/app-vistaOrdenCInd/{{row.entity.id}}">{{row.entity.number}}</a>'+'</div>' },
            { field: "purchase_order.number", displayName:"Orden a Ajustar" },
            { field: "date",displayName:"Fecha" }
        ],
      enablePaging: true,
      showFooter: true,
      totalServerItems: 'totalServerItems',
      pagingOptions: $scope.pagingOptions,
      filterOptions: $scope.filterOptions
    };
  /* ****************************************************************************************************/
  $scope.redNOrdenA=function()
  {
    $scope.isDisabled = false;
    var data = {
      status:"Pendiente",
    };

    apiService.postData(urlOrdenesA,data).then(function(response){
      idRec=recentService.getRecent(response.data);
      console.log(idRec);
      dataShareCompra.sendData(idRec);
      var dataUpd = {
        number:"OA_"+idRec
      };
        //dataShareCompra.sendData(idRec);
        apiService.putData(urlOrdenesA,idRec,dataUpd);
      $location.path('/app-nuevaOrdenAjuste');
    });

  }
}])
.controller('CtrlOrdenesANueva',['SimLog','apiService',"$scope","$location","$routeParams","dataShareCompra",function (SimLog,apiService,$scope, $location, $routeParams,dataShareCompra){

  var urlSuppliers="/suppliers";
  var urlLocation="/locations";
  var urlWarehouses="/warehouses";
  var urlProducts="/products";
  var urlVariants="/variants";
  var urlOrdenesC="/purchase_orders";
  var urlOrdenesA="/adjustment_orders";
  var urlVariantO="/variant_orders";
  var urlVariantOA="/variant_adjustments";
  var urlVarianteDivisor="/variant_divisions";
  var urlVarianteAlmacen="/variant_warehouses";



  $scope.isDisabled = false;
  var idOrdenBorrador=dataShareCompra.getData();
  //console.log(idOrdenBorrador);
 $scope.variants=[];
 apiService.getSingleData(urlOrdenesA,idOrdenBorrador).then(function(response) {

      $scope.infoOrden=response.data;

    });
  apiService.getData(urlOrdenesC).then(function(response) {
    $scope.ordenesC=response.data;
  });
apiService.getData(urlLocation).then(function(response) {

  $scope.locations=response.data;
  });

  // ***********************************************
$scope.$on('$locationChangeStart', function( event ) {
      var answer = confirm("Saliendo de la creacion de la orden de ajuste ¿Está seguro?")
      if (!answer) {
          event.preventDefault();
      }
  });
  //funcion para hacer update de la informacion en base a la orden de compra
  $scope.updateInfo=function()
  {

    apiService.getSingleData(urlOrdenesC,$scope.ordenCId).then(function(response) {


      if(response.data.status!="En Almacen")
      {
        $scope.noDisp=true;
      }
      else
      {
        $scope.OrdenCompleta=response.data;
        $scope.noDisp=false;
        angular.forEach($scope.OrdenCompleta.variant_orders,function(val,k){
          apiService.getSingleData(urlProducts,val.variant.product_id).then(function(res){
            val.variant.product_name=res.data.name;
          })
          apiService.getSingleData(urlWarehouses,val.warehouse.id).then(function(resW){
            angular.forEach(resW.data.dividers,function(val2,k2){
              if(val2.name=="General")
              {
                angular.forEach(val2.variant_divisions,function(val3,k3){
                  if(val3.variant_id==val.variant.id)
                  {
                    val.idVarXdiv=val3.id;
                    val.totVarXdiv=val3.total;
                  }
                });
              }
            });
            angular.forEach(resW.data.variant_warehouses,function(val4,k4){
              if(val4.variant.id==val.variant.id)
              {
                val.idVarXwar=val4.id;
                val.totVarXwar=val4.stock;
              }
            });
          })
        });
      }

      //console.log($scope.variants);
    });
  };

  /* ***************Aqui se hace el submit *****************/
  $scope.submitOrden=function()
  {
    $scope.isDisabled = true;

    var dataUpd={
      purchase_order_id:$scope.OrdenCompleta.id,
      date:$scope.dt,
      status:"Ajustado"
    };
    //console.log(dataUpd);
    apiService.putData(urlOrdenesA,idOrdenBorrador,dataUpd);
    angular.forEach($scope.OrdenCompleta.variant_orders, function(value, key) {
      //console.log(value);
      var TotalNewDiv=value.totVarXdiv-value.adjust;
      var TotalNewAlm=value.totVarXwar-value.adjust;
      var dataAlm={stock:TotalNewAlm};
      var dataDiv={total:TotalNewDiv};
      var data={
        adjustment_order_id:idOrdenBorrador,
        variant_id:value.variant.id,
        total_amount:value.amount,
        adjust_amount:value.adjust
      };

      apiService.postData(urlVariantOA,data);

      apiService.putData(urlVarianteDivisor,value.idVarXdiv,dataDiv);

      apiService.putData(urlVarianteAlmacen,value.idVarXwar,dataAlm);
    });
    $location.path('/app-vistaOrdenesAjuste');
  }
    /* ***************************** */
  $scope.today = function() {
      $scope.dt = new Date();
    };
    $scope.today();

    $scope.clear = function() {
      $scope.dt = null;
    };

    // Disable weekend selection
    $scope.disabled = function(date, mode) {
      return (mode === 'day' && (date.getDay() === 0 || date.getDay() === 6));
    };

    $scope.toggleMin = function() {
      $scope.minDate = $scope.minDate ? null : new Date();
    };
    $scope.toggleMin();

    $scope.open = function($event) {
      $event.preventDefault();
      $event.stopPropagation();

      $scope.opened = true;
    };

    $scope.dateOptions = {
      formatYear: 'yy',
      startingDay: 1
    };

    $scope.initDate = new Date('2016-15-20');
    $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = $scope.formats[0];
  /* ******************************* */
  $scope.redNOrdenC=function()
  {
    $location.path('/app-nuevaOrdenC');
  };
}])
.controller('CtrlOrdenesC',['recentService','apiService',"$scope","$location","$routeParams","dataShareCompra","$timeout","$http","dataShareReady","modalService2",function (recentService,apiService,$scope, $location, $routeParams,dataShareCompra,$timeout,$http,dataShareReady,modalService2){
  var urlOrdenesC="/purchase_orders";
  $scope.isDisabled = false;
  if(dataShareReady.getData())
  {
    var modalOptions = {
      closeButtonText: 'Cancelar',
      actionButtonText: 'Aceptar',
      headerText: 'Orden de compra' + dataShareReady.getData() +"Recibida",
      bodyText: 'La orden de compra ah sido cargada con exito'
    };

    modalService2.showModal({}, modalOptions).then(function (result) {
      dataShareReady.sendData("");
      console.log("cerrar Modal");
    });
  }
  function walkclean(x) {
    var type = typeof x;
    if (x instanceof Array) {
      type = 'array';
    }
    if ((type == 'array') || (type == 'object')) {
      for (k in x) {
        var v = x[k];
        if (((v === '') && (type == 'object'))||v === null) {
          delete x[k];
        } else {
          walkclean(v);
        }
      }
    }
  }
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
          apiService.getData(urlOrdenesC).then(function(largeLoad) {
            largeLoad.data = largeLoad.data.filter(function(col){
              return col.status !== 'Archivado';
            });
            data = largeLoad.data.filter(function(item) {
              //console.log(JSON.stringify(item).toLowerCase().indexOf(ft));
              return JSON.stringify(item).toLowerCase().indexOf(ft) !== -1;
            });

            $scope.setPagingData(data, page, pageSize);
          });
        } else {
          apiService.getData(urlOrdenesC).then(function(largeLoad) {
            largeLoad.data = largeLoad.data.filter(function(col){
              return col.status !== 'Archivado';
            });
            $scope.setPagingData(largeLoad.data, page, pageSize);
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
            { field: "number", displayName:"Folio",cellTemplate:'<div class="ngCellText ng-scope">'+'<a href="#/app-vistaOrdenCInd/{{row.entity.id}}">{{row.entity.number}}</a>'+'</div>' },
            { field: "supplier.name", displayName:"Proveedor" },
            { field: "status",displayName:"Estado" },
            { field: "date",displayName:"Fecha" },
            { field: "amount",displayName:"Monto" }
        ],
      enablePaging: true,
      showFooter: true,
      totalServerItems: 'totalServerItems',
      pagingOptions: $scope.pagingOptions,
      filterOptions: $scope.filterOptions
    };
  /* ****************************************************************************************************/


  apiService.getData(urlOrdenesC).then(function(response) {
    //console.log(response.data);
    $scope.ordenesC=response.data;
  });
  $scope.redNOrdenC=function()
  {
    $scope.isDisabled = false;
    var data = {
      status:"Borrador",
      amount:0
    };

    apiService.postData(urlOrdenesC,data).then(function(response){
      idRec=recentService.getRecent(response.data);
      //console.log(idRec);
      dataShareCompra.sendData(idRec);
      var dataUpd = {
        number:"OC_"+idRec
      };
        //dataShareCompra.sendData(idRec);
        apiService.putData(urlOrdenesC,idRec,dataUpd);
      $location.path('/app-nuevaOrdenC');
    });

  }
}])
.controller('CtrlOrdenesCArchivo',['SimLog','apiService',"$scope","$location","$routeParams","dataShareCompra","$timeout","$http","dataShareReady","modalService2",function (SimLog,apiService,$scope, $location, $routeParams,dataShareCompra,$timeout,$http,dataShareReady,modalService2){
  var urlOrdenesC="/purchase_orders";

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
          apiService.getData(urlOrdenesC).then(function(largeLoad) {
            largeLoad.data = largeLoad.data.filter(function(col){
              return col.status === 'Archivado';
            });
            data = largeLoad.data.filter(function(item) {

              //console.log(JSON.stringify(item).toLowerCase().indexOf(ft));
              return JSON.stringify(item).toLowerCase().indexOf(ft) !== -1;
            });

            $scope.setPagingData(data, page, pageSize);
          });
        } else {
          apiService.getData(urlOrdenesC).then(function(largeLoad) {
            largeLoad.data = largeLoad.data.filter(function(col){
              return col.status === 'Archivado';
            });
            console.log(largeLoad.data);
            $scope.setPagingData(largeLoad.data, page, pageSize);
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
            { field: "number", displayName:"Folio",cellTemplate:'<div class="ngCellText ng-scope">'+'<a href="#/app-vistaOrdenCInd/{{row.entity.id}}">{{row.entity.number}}</a>'+'</div>' },
            { field: "supplier.name", displayName:"Proveedor" },
            { field: "status",displayName:"Estado" },
            { field: "date",displayName:"Fecha" },
            { field: "amount",displayName:"Monto" }
        ],
      enablePaging: true,
      showFooter: true,
      totalServerItems: 'totalServerItems',
      pagingOptions: $scope.pagingOptions,
      filterOptions: $scope.filterOptions
    };
  /* ****************************************************************************************************/
}])

.controller('CtrlOrdenesCNueva',['SimLog','apiService',"$scope","$location","$routeParams","dataShareCompra","modalService",function (SimLog,apiService,$scope, $location, $routeParams,dataShareCompra,modalService){

  var urlSuppliers="/suppliers";
  var urlLocation="/locations";
  var urlWarehouses="/warehouses";
  var urlProducts="/products";
  var urlVariants="/variants";
  var urlOrdenesC="/purchase_orders";
  var urlVariantO="/variant_orders";
$scope.Math = window.Math;


  $scope.isDisabled = false;
  var idOrdenBorrador=dataShareCompra.getData();
  //console.log(idOrdenBorrador);
 $scope.variants=[];
 apiService.getSingleData(urlOrdenesC,idOrdenBorrador).then(function(response) {

      $scope.infoOrden=response.data;

    });
  apiService.getData(urlSuppliers).then(function(response) {
    $scope.suppliers=response.data;
  });
apiService.getData(urlLocation).then(function(response) {

  $scope.locations=response.data;
  });

  //arreglo para la agregar mas productos a la orden

  $scope.cloneVariante = function () {
    var itemToClone = { "orderVariant_id": "",
        "cantidad":"",
        "costo": "",
        "tax":1,
        "ordenWarehId":"",
        "products":$scope.products,
        "warehouses":$scope.warehouses };
    $scope.variants.push(itemToClone);
  }

  $scope.removeItem = function (itemIndex) {
    $scope.variants.splice(itemIndex, 1);
  }
  // Variables para la creacion de la orden de compra

  // ***********************************************

  //funcion para hacer update de la informacion en base al proveedor
  $scope.updateInfo=function()
  {

    apiService.getSingleData(urlSuppliers,$scope.ordenSupplierId).then(function(response) {

      //$scope.unit=response.data.currency.unit;
      //$scope.currency=response.data.currency.name;
      if($scope.warehouses)
      {
        $scope.variants = [
          {
            "orderVariant_id": "",
            "cantidad":"",
            "costo": "",
            "tax":1,
            "ordenWarehId":"",
            "products":response.data.products,
            "warehouses":$scope.warehouses
          }
        ];
      }
      else
      {
        $scope.variants = [
          {
            "orderVariant_id": "",
            "cantidad":"",
            "costo": "",
            "tax":1,
            "ordenWarehId":"",
            "products":response.data.products
          }
        ];
      }

      $scope.products=response.data.products;
      //console.log($scope.variants);
      });
  };

  //funcion para hacer update de la variant
  $scope.updateInfoProduct=function(indexV,prodID){
    //console.log(indexV);
    //console.log(prodID);
    apiService.getSingleData(urlProducts,prodID).then(function(response) {
     $scope.variants[indexV]['variants']=response.data.variants;
    });
    //
  };

  $scope.getTax=function(indexV,varID){

    apiService.getSingleData(urlVariants,varID).then(function(response) {
      angular.forEach(response.data.variant_prices, function(value, key) {
        if(value.price.name=='Compra')
           $scope.variants[indexV]['costo']=value.cost;
      });
     $scope.variants[indexV]['tax']=(response.data.tax.percentage)/100;
    });
  };
  $scope.getSubtotal=function(){
    var subTotal = 0;
    for(var i = 0; i < $scope.variants.length; i++){
        var variant = $scope.variants[i];
        subTotal += (variant.cantidad * variant.costo);
    }
    return subTotal;
  };
  $scope.Math = window.Math;
  $scope.getImpuestos=function(){
    var Impuesto = 0;
    for(var i = 0; i < $scope.variants.length; i++){
        var variant = $scope.variants[i];
        Impuesto += (variant.cantidad * variant.costo)*variant.tax;
    }
    return Impuesto;
  };

  $scope.getTotal=function()
  {
    var total = 0;
    for(var i = 0; i < $scope.variants.length; i++){
        var variant = $scope.variants[i];
        total += ((variant.cantidad * variant.costo)*variant.tax)+(variant.cantidad * variant.costo);
    }
    return total;
  }
  // funcion para hacer update de las locaciones
  $scope.updateInfoAlmacen=function()
  {
    apiService.getSingleData(urlLocation,$scope.ordenLocationId).then(function(response) {
      //console.log(response.data);
      $scope.Locationstreet=response.data.street;
      $scope.Locationnumber=response.data.number;
      $scope.Locationneighboorhood=response.data.neighboorhood;
      $scope.Locationzipcode=response.data.zipcode;
      $scope.warehouses=response.data.warehouses;
      if($scope.variants)
      {
        $scope.variants['warehouses']=response.data.warehouses;
      }

      });
  }
  /* ***************Aqui se hace el submit *****************/
  $scope.submitOrden=function(variantes,date,ordenSupplierId,notas,facturacion)
  {
    var modalOptions = {
      closeButtonText: 'Cancelar',
      actionButtonText: 'Enviar Orden',
      headerText: '¿ Enviar Orden' + $scope.infoOrden.number  + '?',
      bodyText: '¿Está seguro de enviar la orden?'
    };

    modalService.showModal({}, modalOptions).then(function (result) {
      $scope.isDisabled = true;
      var total=$scope.getTotal();

      var fact="N"
      if(facturacion==true)
        fact="Y"

      var dataUpd={
        payment:"Pendiente",
        amount:total,
        billing:fact,
        date:date,
        notes:notas,
        refs:$scope.referencia,
        status:"Solicitado",
        supplier_id:parseInt(ordenSupplierId)
      };
      //console.log(dataUpd);
      apiService.putData(urlOrdenesC,idOrdenBorrador,dataUpd);
      angular.forEach(variantes, function(value, key) {
        //console.log(value);

        var data={

          purchase_order_id:idOrdenBorrador,
          variant_id:value.orderVariant_id,
          amount:value.cantidad,
          cost_per_unit:value.costo,
          warehouse_id:value.ordenWarehId
        };
          apiService.postData(urlVariantO,data);
      });
      $location.path('/app-vistaOrdenesCompra');
    });


  }
  $scope.submitOrdenBorrador=function(variantes,date,ordenSupplierId,notas,facturacion)
  {
    var modalOptions = {
      closeButtonText: 'Cancelar',
      actionButtonText: 'Enviar Orden',
      headerText: '¿ Guardar como borrador' + $scope.infoOrden.number  + '?',
      bodyText: '¿Está seguro de guardar la orden como borrador?'
    };

    modalService.showModal({}, modalOptions).then(function (result) {
      $scope.isDisabled = true;
      var total=$scope.getTotal();

      var fact="N"
      if(facturacion==true)
        fact="Y"

      var dataUpd={
        payment:"Pendiente",
        amount:total,
        billing:fact,
        date:date,
        reference:$scope.referencia,
        notes:notas,
        status:"Borrador",
        supplier_id:parseInt(ordenSupplierId)
      };
      //console.log(dataUpd);
      apiService.putData(urlOrdenesC,idOrdenBorrador,dataUpd);
      angular.forEach(variantes, function(value, key) {
        var data={
          purchase_order_id:idOrdenBorrador,
          variant_id:value.orderVariant_id,
          amount:value.cantidad,
          cost_per_unit:value.costo,
          warehouse_id:value.ordenWarehId
        };
          apiService.postData(urlVariantO,data);
      });
      $location.path('/app-vistaOrdenesCompra');
    });

  }
  /* ***************************** */
  $scope.today = function() {
      $scope.dt = new Date();
    };
    $scope.today();

    $scope.clear = function() {
      $scope.dt = null;
    };

    // Disable weekend selection
    $scope.disabled = function(date, mode) {
      return (mode === 'day' && (date.getDay() === 0 || date.getDay() === 6));
    };

    $scope.toggleMin = function() {
      $scope.minDate = $scope.minDate ? null : new Date();
    };
    $scope.toggleMin();

    $scope.open = function($event) {
      $event.preventDefault();
      $event.stopPropagation();

      $scope.opened = true;
    };

    $scope.dateOptions = {
      formatYear: 'yy',
      startingDay: 1
    };

    $scope.initDate = new Date('2016-15-20');
    $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = $scope.formats[0];
  /* ******************************* */
  $scope.redNOrdenC=function()
  {
    $location.path('/app-nuevaOrdenC');
  };
}])

.controller('EditCtrl',['SimLog','apiService',"$scope","$location","$routeParams","modalService",function (SimLog,apiService,$scope, $location, $routeParams,modalService) {

    var urlBrands="/brands"
    $scope.initFirst=function()
    {
       apiService.getData(urlBrands).then(function(response) {
          //console.log(response);
        $scope.marcasProxy=response;
        });
    };
    if($routeParams.id)
    {
      apiService.getSingleData(urlBrands,$routeParams.id).then(function(response) {
      //console.log(response.data);
      $scope.marcaUProxy=response.data;
      });
    }
    /* **********************Manejar info desde Heroku y el proxy ********************************* */
    apiService.getData(urlBrands).then(function(response) {
    //console.log(response);
    $scope.marcasProxy=response;
    });
    $scope.sub = function(formData) {
      //console.log(formData);
      formData.status='D';
      apiService.postData(urlBrands,formData).then(function(response) {
      //console.log(response);
      $scope.marcasProxy=response;

      });
      $scope.initFirst();
      $location.path('/app-vistaMarcas');
    }

    $scope.removeTest=function(id)
    {
      //console.log(id);
      var modalOptions = {
          closeButtonText: 'Cancelar',
          actionButtonText: 'Archivar marca',
          headerText: 'Archivar Marca?',
          bodyText: '¿Esta seguro que va a archivar esta Marca?'
      };

      modalService.showModal({}, modalOptions).then(function (result) {

              var updData={status:'A'};
              apiService.putDataPrices(urlBrands,id,updData);
              $scope.initFirst();
              $location.path('/app-vistaMarcas');

      });


    }
    $scope.editTest=function(marcaUProxy)
    {
      //console.log(marcaUProxy);
      var data = {
                name: marcaUProxy.name,
                description: "si furulo"
            };
            //console.log(data);
      apiService.putData(urlBrands,marcaUProxy.id,data);
      //$scope.proxp=response;
      $scope.initFirst();
      $location.path('/app-vistaMarcas');

    }
  }])
.controller('CtrlClientesDirEnv',['SimLog',"$scope","$location","$routeParams","apiService","$timeout","dataShareClientes",function (SimLog,$scope, $location, $routeParams,apiService,$timeout,dataShareClientes) {
  var urlClientes="/clients";
  var  urlDirEnvios="/send_orders";


  var idCliente=dataShareClientes.getData();

  apiService.getSingleData(urlClientes,idCliente).then(function(response) {
    $scope.clientes=response.data;
  });

  $scope.direcciones=[{
    street:'',
    neighborhood:'',
    number:'',
    zipcode:'',
    entity:'',
    municipalty:'',
    client_id:idCliente
  }];

  $scope.agregarEnvios=function()
  {
    angular.forEach($scope.direcciones,function(value,key){
      apiService.postData(urlDirEnvios,value);
    });
    $location.path('/app-vistaClienteInd/'+idCliente);
  }
  $scope.cloneItem = function () {
      var itemToClone = { "street": "", "neighborhood": "","zipcode":"","entity":"","municipalty":"","number":"","client_id":idCliente };
      $scope.direcciones.push(itemToClone);
    }

    $scope.removeItem = function (itemIndex) {
      $scope.direcciones.splice(itemIndex, 1);
    }

}])

.controller('CtrlEditarDirEnvio',['SimLog',"$scope","$location","$routeParams","apiService","$timeout","dataShareClientes",function (SimLog,$scope, $location, $routeParams,apiService,$timeout,dataShareClientes) {
var urlClientes="/clients";
    var  urlDirEnvios="/send_orders";


    ID_sendCli=dataShareClientes.getData();
      apiService.getSingleData(urlDirEnvios,ID_sendCli).then(function(response) {
      //console.log(response.data);
      $scope.sendOrd=response.data;
      });



    $scope.editEnv=function(){
      var data={
        street:$scope.sendOrd.street,
        neighborhood:$scope.sendOrd.neighborhood,
        number:$scope.sendOrd.number,
        zipcode:$scope.sendOrd.zipcode,
        entity:$scope.sendOrd.entity,
        municipalty:$scope.sendOrd.municipalty
      };
      apiService.putData(urlDirEnvios,ID_sendCli,data);
      $location.path('/app-vistaClienteInd/'+$routeParams.id);
    }
  }])

.controller('CtrlClientes',['recentService',"$scope","$location","$routeParams","apiService","$timeout","dataShareClientes",function (recentService,$scope, $location, $routeParams,apiService,$timeout,dataShareClientes) {
    var urlClientes="/clients";
    var  urlDirEnvios="/send_orders";
    var urlPrices="/prices";

    apiService.getData(urlClientes).then(function(response) {
      //console.log(response.data);
      $scope.clientesTods=response.data;
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
          apiService.getData(urlClientes).then(function(largeLoad) {
            /*angular.forEach(largeLoad.data,function(val,key){
              val.supplier="";
            });*/
            data = largeLoad.data.filter(function(item) {
              //console.log(JSON.stringify(item).toLowerCase().indexOf(ft));
              return JSON.stringify(item).toLowerCase().indexOf(ft) !== -1;
            });

            $scope.setPagingData(data, page, pageSize);
          });
        } else {
          apiService.getData(urlClientes).then(function(largeLoad) {
            $scope.setPagingData(largeLoad.data, page, pageSize);
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
            { field: "name", displayName:"Nombre",cellTemplate:'<div class="ngCellText ng-scope">'+'<a href="#/app-vistaClienteInd/{{row.entity.id}}">{{row.entity.name}}</a>'+'</div>' },
            { field: "email", displayName:"Correo" },
            { field: "website",displayName:"Página" },
            { field: "phone",displayName:"Teléfono" },
            { field: "price.name",displayName:"Precio" }
        ],
      enablePaging: true,
      showFooter: true,
      totalServerItems: 'totalServerItems',
      pagingOptions: $scope.pagingOptions,
      filterOptions: $scope.filterOptions
    };
  /* ****************************************************************************************************/
    apiService.getData(urlPrices).then(function(response) {
      //console.log(response.data);
      $scope.precios=response.data;
    });

    $scope.clienteN={};

    $scope.agregarEnvio=function(ID_cli){
      dataShareClientes.sendData(ID_cli);
      $location.path('/app-agregarClientesDirEnv');
    };
var IDsendCliente="";
    $scope.editarEnvioCli=function(ID_sendCli){

      dataShareClientes.sendData(ID_sendCli);

      $location.path('/app-editarClienteEnvio/'+$routeParams.id);

    }

    $scope.editEnv=function(){
      var data={
        street:$scope.sendOrd.street,
        neighborhood:$scope.sendOrd.neighborhood,
        number:$scope.sendOrd.number,
        zipcode:$scope.sendOrd.zipcode,
        entity:$scope.sendOrd.entity,
        municipalty:$scope.sendOrd.municipalty
      };
      apiService.putData(urlDirEnvios,IDsendCliente,data);
      $location.path('/app-vistaClienteInd/'+$routeParams.id);
    }

    $scope.edit=function(){
      var data={
        street:$scope.clientes.street,
        neighborhood:$scope.clientes.neighborhood,
        number:$scope.clientes.number,
        zipcode:$scope.clientes.zipcode,
        entity:$scope.clientes.entity,
        city:$scope.clientes.city,
        razonsocial:$scope.clientes.razonsocial,
        rfc:$scope.clientes.rfc,
        email:$scope.clientes.email,
        name:$scope.clientes.name,
        website:$scope.clientes.website,
        phone:$scope.clientes.phone,
        price_id:$scope.clientes.price_id
      };
      apiService.putData(urlClientes,$routeParams.id,data);
      $location.path('/app-vistaClienteInd/'+$routeParams.id);
    };

    $scope.editEnv=function(){
      var data={

      };
    }

    if($routeParams.id)
    {
      apiService.getSingleData(urlClientes,$routeParams.id).then(function(response) {
      //console.log(response.data);
      $scope.clientes=response.data;
      });
    }

    $scope.nuevo=function(clienteN)
    {
      var idcliente=0;
      clienteN.price_id=parseInt(clienteN.price_id);
      console.log(clienteN);
      apiService.postData(urlClientes,clienteN).then(function(response) {
        idcliente=recentService.getRecent(response.data);
        if($scope.clienteN.envio)
        {
          clienteN.client_id=idcliente;
          clienteN.municipalty=$scope.clienteN.city;
          clienteN.zipcode=$scope.clienteN.zipcode;
          apiService.postData(urlDirEnvios,clienteN);
        }
        else
        {
          var data={
            client_id:idcliente,
            municipalty:$scope.clienteN.municipioEnvio,
            street:$scope.clienteN.calleEnvio,
            neighborhood:$scope.clienteN.coloniaEnvio,
            zipcode:$scope.clienteN.cpEnvio,
            number:$scope.clienteN.numeroEnvio
          };
          apiService.postData(urlDirEnvios,data);
        }
      });
      $location.path('/app-vistaClientes');
    };
  }])

.controller('EditCtrlProveedor',['SimLog',"apiService","$scope","$location","$routeParams","modalService",function (SimLog,apiService,$scope, $location, $routeParams,modalService) {
    var urlSuppliers="/suppliers"
    var urlCurrency="/currencies"

    $scope.initFirst=function()
    {
       apiService.getData(urlSuppliers).then(function(response) {
          //console.log(response);
        $scope.suppProxy=response.data;
        });
     };

    if($routeParams.id)
    {
      apiService.getSingleData(urlSuppliers,$routeParams.id).then(function(response) {
      //console.log(response.data);
      $scope.suppUProxy=response.data;
      });
    }


    /* **********************Manejar info desde Heroku y el proxy ********************************* */
    apiService.getData(urlSuppliers).then(function(response) {
    //console.log(response);
    $scope.suppProxy=response.data;
    });

    apiService.getData(urlCurrency).then(function(response) {
    //console.log(response);
    $scope.currProxy=response.data;
    });
    $scope.sub = function(formData) {
      //console.log(formData);
      formData.status='D';
      apiService.postData(urlSuppliers,formData).then(function(response) {
      //console.log(response);
      $scope.suppProxy=response.data;

      });
      $scope.initFirst();
      $location.path('/app-vistaProveedor');
    }
    $scope.editTest=function(suppUProxy)
    {
      //console.log(suppUProxy);
      var data = {
                name: suppUProxy.name,
                email:  suppUProxy.email,
                website: suppUProxy.website,
                phone: suppUProxy.phone,
                currency_id: suppUProxy.currency_id
            };
            //console.log(data);

      apiService.putData(urlSuppliers,suppUProxy.id,data);
      //$scope.proxp=response;
      $scope.initFirst();
      $location.path('/app-vistaProveedor');

    }
    $scope.removeTest=function(id)
    {
      //console.log(id);
      var modalOptions = {
          closeButtonText: 'Cancelar',
          actionButtonText: 'Archivar marca',
          headerText: '¿Archivar Proveedor?',
          bodyText: '¿Esta seguro que va a archivar el proveedor?'
      };

      modalService.showModal({}, modalOptions).then(function (result) {
              var updData={status:'A'};
              apiService.putDataPrices(urlSuppliers,$routeParams.id,updData);
              $location.path('/app-vistaProveedor');
      });
    }
  }])
.controller('CtrlLocacion',["apiService","$scope","$location","$routeParams","dataShareLocacion",function(apiService,$scope, $location, $routeParams,dataShareLocacion) {

  var urlLocations="/locations";
  var urlWarehouses="/warehouses";
  var urlProducts="/products";
  var contador=0;
  $scope.productosInLoc=[];



  $scope.productosInLoc1=new Array();
  $scope.productosInLoc2=new Array();

  dataShareLocacion.sendData($routeParams.id);
  $scope.nuevoAlmacen=function(){
    dataShareLocacion.sendData($routeParams.id);

    $location.path('/app-nuevoAlmacen');
  };
  $scope.AddProduct=function(){
    $location.path('/app-agregarProdLoc/'+$routeParams.id);
  };
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
          apiService.getData(urlWarehouses).then(function(largeLoad) {
            angular.forEach(largeLoad.data, function(value, key) {
              if (value.location.id==$routeParams.id) {
                contador++;
                if(value.variant_warehouses!='[]')
                  $scope.productosInLoc2.push(value.variant_warehouses);
              };
            });
            var json = JSON.stringify( $scope.productosInLoc2);
              newStr = json.substring(1, json.length-1);
              newStr=newStr.replace("[","");
              newStr=newStr.replace("]","");
            for (var i = contador; i >= 0; i--) {
              newStr=newStr.replace("],[],[",",");
              newStr=newStr.replace("],[",",");
            };
              newStr = newStr.substring(1, newStr.length);
              newStr=newStr.replace(",]","]");
              //console.log(newStr);
              $scope.productosInLoc2=JSON.parse(newStr);
              angular.forEach($scope.productosInLoc2, function(value, key) {
                  apiService.getSingleData(urlProducts,value.variant.product_id).then(function(response) {
                    value.variant.description=response.data.name;
                    value.variant.brand=response.data.brand.name;
                  });
              });
            data = $scope.productosInLoc2.filter(function(item) {
              //console.log(JSON.stringify(item).toLowerCase().indexOf(ft));
              return JSON.stringify(item).toLowerCase().indexOf(ft) !== -1;
            });

            $scope.setPagingData(data, page, pageSize);
          });
        } else {
          apiService.getData(urlWarehouses).then(function(largeLoad) {
            angular.forEach(largeLoad.data, function(value, key) {
              if (value.location.id==$routeParams.id) {
                contador++;
                if(value.variant_warehouses!='[]')
                  $scope.productosInLoc1.push(value.variant_warehouses);
              };
            });
            var json = JSON.stringify( $scope.productosInLoc1);
              newStr = json.substring(1, json.length-1);
              newStr=newStr.replace("[","");
              newStr=newStr.replace("]","");
            for (var i = contador; i >= 0; i--) {
              newStr=newStr.replace("],[],[",",");
              newStr=newStr.replace("],[",",");
            };
              newStr = newStr.substring(1, newStr.length);
              newStr=newStr.replace(",]","]");
              console.log(newStr);
              $scope.productosInLoc1=JSON.parse(newStr);
              angular.forEach($scope.productosInLoc1, function(value, key) {
                  apiService.getSingleData(urlProducts,value.variant.product_id).then(function(response) {
                    value.variant.description=response.data.name;
                    value.variant.brand=response.data.brand.name;
                  });
              });
            $scope.setPagingData($scope.productosInLoc1, page, pageSize);
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
            { field: "name", displayName:"Producto",cellTemplate:'<div class="ngCellText ng-scope">'+'<a href="#/app-vistaAlmacen/{{row.entity.warehouse.id}}">{{row.entity.variant.description}}</a>'+'</div>' },
            { field: "variant.name", displayName:"Variante" },
            { field: "warehouse.name",displayName:"Almacen" },
            { field: "status",displayName:"Disponible en Locación" , cellTemplate:'<div class="ngCellText ng-scope">'+'<span ng-show="p.status==\'N\'">No disponible</span><span ng-show="p.status==\'D\'">Disponible</span>'+'</div>' }
        ],
      enablePaging: true,
      showFooter: true,
      totalServerItems: 'totalServerItems',
      pagingOptions: $scope.pagingOptions,
      filterOptions: $scope.filterOptions
    };
  /* ****************************************************************************************************/
   apiService.getData(urlWarehouses).then(function(response){
    angular.forEach(response.data, function(value, key) {

      if (value.location.id==$routeParams.id) {
        //console.log(value);
        contador++;
        if(value.variant_warehouses!='[]')
          $scope.productosInLoc.push(value.variant_warehouses);

      };

      //$scope.Productos=response.data;
      //console.log($scope.productosInLoc);
    });
    //console.log($scope.productosInLoc);
    var json = JSON.stringify( $scope.productosInLoc);
      newStr = json.substring(1, json.length-1);
      newStr=newStr.replace("[","");
      newStr=newStr.replace("]","");
    for (var i = contador; i >= 0; i--) {

      newStr=newStr.replace("],[],[",",");
      newStr=newStr.replace("],[",",");
    };

      newStr = newStr.substring(1, newStr.length);
      newStr=newStr.replace(",]","]");
      //console.log(newStr);

      $scope.productosInLoc=JSON.parse(newStr);
      angular.forEach($scope.productosInLoc, function(value, key) {
          apiService.getSingleData(urlProducts,value.variant.product_id).then(function(response) {
            value.variant.description=response.data.name;
            value.variant.brand=response.data.brand.name;
          });
      });
  });
}])
.controller('CtrlAddProdLoc',['SimLog',"apiService","$scope","$location","$routeParams",'$filter',"dataShareLocacion","$timeout",function(SimLog,apiService,$scope, $location, $routeParams,$filter,dataShareLocacion,$timeout) {

  var variantWare="/variant_warehouses";
  var variantDiv="/variant_divisions";
  var urlProducts="/products";
  var urlLocations="/locations";
  var urlWarehouses="/warehouses";

  $scope.addVarLoc=false;


  var locacionId=dataShareLocacion.getData();
  $scope.SelectProd=true;
  $scope.SelectVar=false;
   $scope.selected = {};
   $scope.almacenPG="";
  //*********************************************************
  apiService.getData(urlProducts).then(function(response) {
     $scope.products=response.data;
  });

  apiService.getSingleData(urlLocations,locacionId).then(function(response){
    $scope.almacenes=response.data.warehouses;
      //console.log($scope.variantesFormC);
    });
  $scope.showVar=function(id){
    $scope.SelectProd=false;
    $scope.SelectVar=true;
    $scope.variablesProd=$scope.products[id];
    //console.log($scope.variablesProd);
  };
  $scope.submitVariables=function(formData)
  {
    $scope.addVarLoc=true;
    var idDivGeneral=0;
    apiService.getSingleData(urlWarehouses,$scope.almacenPG).then(function(response){
    angular.forEach(response.data.dividers, function(value, key) {
      if(value.name=="General")
        idDivGeneral=value.id
      });
    angular.forEach($scope.selected, function(value, key) {
      //console.log(value);
      //console.log(key);
      if(value&&$scope.almacenPG)
      {
        var dataDivision={
          pri:0,
          total:0,
          variant_id:key,
          divider_id:idDivGeneral
        };
        var data={
          warehouse_id:$scope.almacenPG,
          variant_id:key,
          status:"N",
          stock:0
        };
        console.log(dataDivision);
        apiService.postData(variantWare,data);
        apiService.postData(variantDiv,dataDivision);
        $location.path('/app-vistaLocacion/'+locacionId);
      }

      });


    });
    //console.log(formData);
  }
}])

.controller('MainController', ['$auth','SimLog','apiService','$resource','$http','$scope', '$theme', '$timeout', 'progressLoader', 'wijetsService', '$location',
    function($auth,SimLog,apiService,$resource,$http,$scope, $theme, $timeout, progressLoader, wijetsService, $location) {
    'use strict';
    /*¨Aqui terminan las pruebas de firebase*/

    $scope.layoutFixedHeader = $theme.get('fixedHeader');
    $scope.layoutPageTransitionStyle = $theme.get('pageTransitionStyle');
    $scope.layoutDropdownTransitionStyle = $theme.get('dropdownTransitionStyle');
    $scope.layoutPageTransitionStyleList = ['bounce',
      'flash',
      'pulse',
      'bounceIn',
      'bounceInDown',
      'bounceInLeft',
      'bounceInRight',
      'bounceInUp',
      'fadeIn',
      'fadeInDown',
      'fadeInDownBig',
      'fadeInLeft',
      'fadeInLeftBig',
      'fadeInRight',
      'fadeInRightBig',
      'fadeInUp',
      'fadeInUpBig',
      'flipInX',
      'flipInY',
      'lightSpeedIn',
      'rotateIn',
      'rotateInDownLeft',
      'rotateInDownRight',
      'rotateInUpLeft',
      'rotateInUpRight',
      'rollIn',
      'zoomIn',
      'zoomInDown',
      'zoomInLeft',
      'zoomInRight',
      'zoomInUp'
    ];

  $scope.sign_u_out=function()
   {
      $auth.signOut()
        .success(function(resp) {
          console.log("salio muahahaha");
        })
        .catch(function(resp) {
          console.log(resp);
        });
   }
    $scope.layoutLoading = true;

    $scope.getLayoutOption = function(key) {
      return $theme.get(key);
    };

    $scope.setNavbarClass = function(classname, $event) {
      $event.preventDefault();
      $event.stopPropagation();
      $theme.set('topNavThemeClass', classname);
    };

    $scope.setSidebarClass = function(classname, $event) {
      $event.preventDefault();
      $event.stopPropagation();
      $theme.set('sidebarThemeClass', classname);
    };

    $scope.layoutFixedHeader = $theme.get('fixedHeader');
    $scope.layoutLayoutBoxed = $theme.get('layoutBoxed');
    $scope.layoutLayoutHorizontal = $theme.get('layoutHorizontal');
    $scope.layoutLeftbarCollapsed = $theme.get('leftbarCollapsed');
    $scope.layoutAlternateStyle = $theme.get('alternateStyle');

    $scope.$watch('layoutFixedHeader', function(newVal, oldval) {
      if (newVal === undefined || newVal === oldval) {
        return;
      }
      $theme.set('fixedHeader', newVal);
    });
    $scope.$watch('layoutLayoutBoxed', function(newVal, oldval) {
      if (newVal === undefined || newVal === oldval) {
        return;
      }
      $theme.set('layoutBoxed', newVal);
    });
    $scope.$watch('layoutLayoutHorizontal', function(newVal, oldval) {
      if (newVal === undefined || newVal === oldval) {
        return;
      }
      $theme.set('layoutHorizontal', newVal);
    });
    $scope.$watch('layoutAlternateStyle', function(newVal, oldval) {
      if (newVal === undefined || newVal === oldval) {
        return;
      }
      $theme.set('alternateStyle', newVal);
    });
    $scope.$watch('layoutPageTransitionStyle', function(newVal) {
      $theme.set('pageTransitionStyle', newVal);
    });
    $scope.$watch('layoutDropdownTransitionStyle', function(newVal) {
      $theme.set('dropdownTransitionStyle', newVal);
    });
    $scope.$watch('layoutLeftbarCollapsed', function(newVal, oldVal) {
      if (newVal === undefined || newVal === oldVal) {
        return;
      }
      $theme.set('leftbarCollapsed', newVal);
    });

    $scope.toggleLeftBar = function() {
      $theme.set('leftbarCollapsed', !$theme.get('leftbarCollapsed'));
    };

    $scope.toggleRightBar = function() {
      $theme.set('rightbarCollapsed', !$theme.get('rightbarCollapsed'));
    };

    $scope.hideHeaderBar = function() {
      $theme.set('headerBarHidden', true);
    };

    $scope.showHeaderBar = function($event) {
      $event.stopPropagation();
      $theme.set('headerBarHidden', false);
    };

    $scope.$on('themeEvent:maxWidth767', function(event, newVal) {
      $timeout(function() {
          $theme.set('leftbarCollapsed', newVal);
      });
    });
    $scope.$on('themeEvent:changed:fixedHeader', function(event, newVal) {
      $scope.layoutFixedHeader = newVal;
    });
    $scope.$on('themeEvent:changed:layoutHorizontal', function(event, newVal) {
      $scope.layoutLayoutHorizontal = newVal;
    });
    $scope.$on('themeEvent:changed:layoutBoxed', function(event, newVal) {
      $scope.layoutLayoutBoxed = newVal;
    });
    $scope.$on('themeEvent:changed:leftbarCollapsed', function(event, newVal) {
      $scope.layoutLeftbarCollapsed = newVal;
    });
    $scope.$on('themeEvent:changed:alternateStyle', function(event, newVal) {
      $scope.layoutAlternateStyle = newVal;
    });

    $scope.toggleSearchBar = function($event) {
      $event.stopPropagation();
      $event.preventDefault();
      $theme.set('showSmallSearchBar', !$theme.get('showSmallSearchBar'));
    };

    $scope.toggleExtraBar = function($event) {
      $event.stopPropagation();
      $event.preventDefault();
      $theme.set('extraBarShown', !$theme.get('extraBarShown'));
    };

    // there are better ways to do this, e.g. using a dedicated service
    // but for the purposes of this demo this will do
    $scope.isLoggedIn = true;
    $scope.logOut = function() {
      $scope.isLoggedIn = false;
    };
    $scope.logIn = function() {
      $scope.isLoggedIn = true;
    };

    $scope.$on('$routeChangeStart', function() {
      if ($location.path() === '') {
        return $location.path('/');
      }
      progressLoader.start();
      progressLoader.set(50);
    });
    $scope.$on('$routeChangeSuccess', function() {
      progressLoader.end();
      if ($scope.layoutLoading) {
        $scope.layoutLoading = false;
      }
      // wijetsService.make();
    });
  }])
