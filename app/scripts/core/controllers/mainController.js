angular.module('theme.core.main_controller', ['theme.core.services','firebase','ui.bootstrap'])
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
.controller('SignupPageController', ['$scope', '$theme', function($scope, $theme) {
    'use strict';
    console.log('asdkjasdlk')
    $theme.set('fullscreen', true);

    $scope.$on('$destroy', function() {
      $theme.set('fullscreen', false);
    });
  }])
.controller('CtrlLocacionNueva',['apiService',"$scope","$route","$location","$routeParams","dataShareAlmacen",function (apiService,$scope, $route,$location, $routeParams,dataShareAlmacen) {
  var urlLocation="/locations";
  var urlWarehouses="/warehouses";
  $scope.locacion={};
  var reciente=0;
  function getRecent(prod)
    {
      var tmp;
      var tmp1;
      var id=prod[prod.length-1].id;
      var mayor=new Date(prod[prod.length-1].updated_at).getTime();
      //console.log(mayor);
      if(prod.length==1)
      {
        id=prod.id;
      }
      else
      {
        
        for (var i=prod.length-1; i>=0; i--) {
          
          tmp = new Date(prod[i].updated_at).getTime();
          
          if( tmp > mayor)
          {
            //console.log("tmp>mayor");
            mayor=tmp;
            //console.log(mayor);
            id=prod[i].id;

          }
          else if(tmp<mayor)
          {
            //id=prod[i].id;
            continue;
          }
          else if(tmp=mayor)
          {
            //id=prod[i].id;
            continue;
          }
        }
      }
      return id;
    }
  $scope.nuevaLoc=function()
  {
    apiService.postData(urlLocation,$scope.locacion).then(function(response){
      reciente=getRecent(response.data);
      var data={
        name:'Global',
        location_id:reciente
        };
      apiService.postData(urlWarehouses,data);
      $location.path('#/');
    });
    
    //$route.reload();
  };

  }])

.controller('CtrlAlmacenNuevo',['apiService',"$scope","$location","$routeParams","dataShareLocacion","dataShareAlmacen",function (apiService,$scope, $location, $routeParams,dataShareLocacion,dataShareAlmacen) {
  var urlLocation="/locations";
  var urlWarehouses="/warehouses";
  var urldivisor="/dividers";

  var idLocacion=dataShareLocacion.getData();
  //var idAlmacen=dataShareAlmacen.getData();
  $scope.almacenN={};
  function getRecent(prod)
    {
      var tmp;
      var tmp1;
      var id=prod[prod.length-1].id;
      var mayor=new Date(prod[prod.length-1].updated_at).getTime();
      //console.log(mayor);
      if(prod.length==1)
      {
        id=prod.id;
      }
      else
      {
        
        for (var i=prod.length-1; i>=0; i--) {
          
          tmp = new Date(prod[i].updated_at).getTime();
          
          if( tmp > mayor)
          {
            //console.log("tmp>mayor");
            mayor=tmp;
            //console.log(mayor);
            id=prod[i].id;

          }
          else if(tmp<mayor)
          {
            //id=prod[i].id;
            continue;
          }
          else if(tmp=mayor)
          {
            //id=prod[i].id;
            continue;
          }
        }
      }
      return id;
    }
  $scope.nuevoAlmacen=function(){
    var data={
      name:$scope.almacenN.name,
      location_id:idLocacion
    }
    apiService.postData(urlWarehouses,data).then(function(response){
      reciente=getRecent(response.data);
      var data2={
        name:'General',
        warehouse_id:reciente
        };
      apiService.postData(urldivisor,data2);
      $location.path('#/app-vistaLocacion/'+idLocacion);
    });
  };

  }])
.controller('CtrlDivisorNuevo',['apiService',"$scope","$location","$routeParams","dataShareLocacion","dataShareAlmacen",function (apiService,$scope, $location, $routeParams,dataShareLocacion,dataShareAlmacen) {
  var urlLocation="/locations";
  var urlWarehouses="/warehouses";
  var urldivisor="/dividers";
  var idAlmacen=dataShareAlmacen.getData();
  $scope.divisorN={};
  
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
.controller('CtrlAlmacen',['apiService',"$scope","$location","$routeParams","dataShareAlmacen","dataShareLocacion",function (apiService,$scope, $location, $routeParams,dataShareAlmacen,dataShareLocacion) {
  var urlLocation="/locations";
  var urlWarehouses="/warehouses";
  var idLocacion=0;
  var urlProducts="/products";
  
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
        value.variant.description=response.data.name;
        value.variant.brand=response.data.brand.name;
        });
      });
    });
  
}])
.controller('CtrlCargarOrden',['apiService',"$scope","$location","$routeParams","dataShareAlmacen","dataShareVariante",function (apiService,$scope, $location, $routeParams,dataShareAlmacen,dataShareVariante) {
  var urlLocation="/locations";
  var urlWarehouses="/warehouses";
  var urlProducts="/products";
  var urlVariantOrders="/variant_orders"
  var urlPurchaseOrders="/purchase_orders"

  $scope.numOrden;
  var idnumOrden;
  var indexOfNumeroOrden;
  $scope.VariantesAlmacen;
  $scope.buscarOrden=function(){

    apiService.getData(urlPurchaseOrders).then(function(response){
      angular.forEach(response.data,function(value,key){
        if(value.number==$scope.numOrden)
        {
          idnumOrden=value.id;
          indexOfNumeroOrden=key;
          $scope.VariantesAlmacen=value.variant_orders;
        }
      });
      
    });
  }

  $scope.cargarOrden=function(){
    angular.forEach(response2.data,function(value2,key){
          
        });
  };


  }])
.controller('CtrlVarProdAl',['apiService',"$scope","$location","$routeParams","dataShareAlmacen","dataShareVariante",function (apiService,$scope, $location, $routeParams,dataShareAlmacen,dataShareVariante) {
  var urlLocation="/locations";
  var urlWarehouses="/warehouses";
  var urlProducts="/products";
  var id_Prod=dataShareAlmacen.getData();
  $scope.varProdAlmacen=new Array();
  apiService.getSingleData(urlProducts,id_Prod).then(function(response){
    $scope.prod=response.data;
  });

  $scope.abrirVistaOrden=function(){
    dataShareAlmacen.sendData();
    $location.path('/app-vistaCargarOrden/');
  };
  $scope.infoVariante=function(idVar){
    dataShareVariante.sendData(idVar);
    $location.path('/app-vistaVarDivisorAl/'+$routeParams.id);
  };
  apiService.getSingleData(urlWarehouses,$routeParams.id).then(function(response){
    angular.forEach(response.data.variant_warehouses, function(value, key) {

      if (value.variant.product_id==id_Prod)
      {
        //console.log(value);
        $scope.varProdAlmacen.push(value);
      };
      //$scope.Productos=response.data;
      //console.log($scope.variantesFormC);
    });
      var json = JSON.stringify( $scope.varProdAlmacen);

      
      $scope.varProdAlmacen=JSON.parse(json);
      //console.log($scope.varProdAlmacen);
  });
  
}])
.controller('CtrlVarDivisorAl',['apiService',"$scope","$location","$routeParams","dataShareVariante","$modal","dataShareTransDivxDiv",function (apiService,$scope, $location, $routeParams,dataShareVariante,$modal,dataShareTransDivxDiv) {
  var urlLocation="/locations";
  var urlWarehouses="/warehouses";
  var urlProducts="/products";
  var urlVariants="/variants";

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
              total:$scope.maxTransferencia-cantidad
            }
            var idVarDiv=0;
            var idVarDivOrigen=0;
            apiService.getData(urlVariantDivisor).then(function(response){
              angular.forEach(response.data,function(value,index){
                if(divId==value.divider.id)
                  idVarDiv=value.id;
              });
              if(idVarDiv!=0)
              {
                apiService.putData(urlVariantDivisor,idVarDiv,data);  
              }
              else
              {
                var newData={
                  divider_id:idVarDiv,
                  variant_id:id_Variante,
                  pri:1,
                  total:cantidad
                };
                console.log(newData);
                apiService.postData(urlVariantDivisor,newData);
              }
              
            });
            apiService.getData(urlVariantDivisor).then(function(response){
              angular.forEach(response.data,function(value,index){
                if(id_divisor==value.divider.id)
                  idVarDivOrigen=value.id;
              });
              apiService.putData(urlVariantDivisor,idVarDivOrigen,data2);
              $modalInstance.close();    
            });
            
            
            
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

  apiService.getSingleData(urlVariants,id_Variante).then(function(response){
    $scope.variante=response.data;
    angular.forEach($scope.variante.variant_divisions, function(value, key) {

      if (value.divider.warehouse_id==$routeParams.id)
      {
        //console.log(value);
        $scope.divEnVar.push(value);
      };
      //$scope.Productos=response.data;
      //console.log($scope.variantesFormC);
    });
  });

    
      var json = JSON.stringify( $scope.divEnVar);

      $scope.divEnVar=JSON.parse(json);
      //console.log($scope.divEnVar);  
}])
.controller('CtrlOrdenesVentaInd',['apiService',"$scope","$location","$routeParams","dataShareVenta","$timeout",function (apiService,$scope, $location, $routeParams,dataShareVenta,$timeout){
  var urlOrdenesV="/sell_orders";
  var urlVariantOV="/variant_sell_orders";
  var urlProducts="/products";
  var urlWarehouses="/warehouses";
  $scope.subTotalInd=0;
  apiService.getSingleData(urlOrdenesV,$routeParams.id).then(function(response) {
    //console.log(response.data);
    $scope.ordenVenta=response.data;
    //pasamos por cada variante que tiene la orden de compra
    angular.forEach(response.data.variant_sell_orders,function(value,key){
      //para obtener el nombre del producto
      $scope.subTotalInd=$scope.subTotalInd+(value.amount*value.price_per_unit);
      apiService.getSingleData(urlProducts,value.variant.product_id).then(function(response2) {
        value.variant.product_name=response2.data.name;
      });
      //para obtener la informacion del almacen
      apiService.getSingleData(urlWarehouses,value.divider.warehouse_id).then(function(response3) {
        value.divider.warehouses_name=response3.data.name;
      });

    });
    //console.log($scope.ordenVenta);
  });
  

}])
.controller('CtrlOrdenesVenta',['apiService',"$scope","$location","$routeParams","dataShareVenta","$timeout",function (apiService,$scope, $location, $routeParams,dataShareVenta,$timeout){
  var urlOrdenesV="/sell_orders";  
  $scope.isDisabled = false;
  apiService.getData(urlOrdenesV).then(function(response) {
    //console.log(response.data);
    $scope.ordenesVenta=response.data;
  });
  function getRecent(prod)
    {
      var tmp;
      var tmp1;
      var id=prod[prod.length-1].id;
      var mayor=new Date(prod[prod.length-1].updated_at).getTime();
      //console.log(mayor);
      if(prod.length==1)
      {
        id=prod.id;
      }
      else
      {
        
        for (var i=prod.length-1; i>=0; i--) {
          
          tmp = new Date(prod[i].updated_at).getTime();
          
          if( tmp > mayor)
          {
            //console.log("tmp>mayor");
            mayor=tmp;
            //console.log(mayor);
            id=prod[i].id;

          }
          else if(tmp<mayor)
          {
            //id=prod[i].id;
            continue;
          }
          else if(tmp=mayor)
          {
            //id=prod[i].id;
            continue;
          }
        }
      }
      return id;
    }
  $scope.redNOrdenV=function()
  {
    $scope.isDisabled = false;
    var data = {
      status:"Borrador",
      amount:0
    };
    
    apiService.postData(urlOrdenesV,data);

    apiService.getData(urlOrdenesV).then(function(response) {
      idRec=getRecent(response.data);
      //console.log(idRec);
      dataShareVenta.sendData(idRec);
    });
    $timeout(function(){
      var dataUpd = {
        number:"OV_"+idRec
      };
        //dataShareCompra.sendData(idRec);
        apiService.putData(urlOrdenesV,idRec,dataUpd);
      $location.path('/app-nuevaOrdenV');
    }, 7000); 
    

  };
}])
.controller('CtrlOrdenesVNueva',['apiService',"$scope","$location","$routeParams","dataShareVenta",function (apiService,$scope, $location, $routeParams,dataShareVenta){
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
      var answer = confirm("Are you sure you want to leave this page?")
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
  }
  $scope.submitOrdenBorrador=function(variantes,date,ordenSupplierId,notas,facturacion)
  {
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
.controller('CtrlOrdenesC',['apiService',"$scope","$location","$routeParams","dataShareCompra","$timeout",function (apiService,$scope, $location, $routeParams,dataShareCompra,$timeout){
  var urlOrdenesC="/purchase_orders";  
  $scope.isDisabled = false;
  apiService.getData(urlOrdenesC).then(function(response) {
    //console.log(response.data);
    $scope.ordenesC=response.data;
  });
  function getRecent(prod)
    {
      var tmp;
      var tmp1;
      var id=prod[prod.length-1].id;
      var mayor=new Date(prod[prod.length-1].updated_at).getTime();
      //console.log(mayor);
      if(prod.length==1)
      {
        id=prod.id;
      }
      else
      {
        
        for (var i=prod.length-1; i>=0; i--) {
          
          tmp = new Date(prod[i].updated_at).getTime();
          
          if( tmp > mayor)
          {
            //console.log("tmp>mayor");
            mayor=tmp;
            //console.log(mayor);
            id=prod[i].id;
          }
          else if(tmp<mayor)
          {
            //id=prod[i].id;
            continue;
          }
          else if(tmp=mayor)
          {
            //id=prod[i].id;
            continue;
          }
        }
      }
      return id;
    }
  $scope.redNOrdenC=function()
  {
    $scope.isDisabled = false;
    var data = {
      status:"Borrador",
      amount:0
    };
    
    apiService.postData(urlOrdenesC,data);

    apiService.getData(urlOrdenesC).then(function(response) {
      idRec=getRecent(response.data);
      //console.log(idRec);
      dataShareCompra.sendData(idRec);
    });
    $timeout(function(){
      var dataUpd = {
        number:"OC_"+idRec
      };
        //dataShareCompra.sendData(idRec);
        apiService.putData(urlOrdenesC,idRec,dataUpd);
      $location.path('/app-nuevaOrdenC');
    }, 7000); 
    

  };
}])
.controller('CtrlOrdenesCNueva',['apiService',"$scope","$location","$routeParams","dataShareCompra",function (apiService,$scope, $location, $routeParams,dataShareCompra){
  var urlSuppliers="/suppliers"; 
  var urlLocation="/locations";  
  var urlWarehouses="/warehouses";
  var urlProducts="/products";
  var urlVariants="/variants";
  var urlOrdenesC="/purchase_orders";
  var urlVariantO="/variant_orders";  
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
  $scope.$on('$locationChangeStart', function( event ) {
      var answer = confirm("Are you sure you want to leave this page?")
      if (!answer) {
          event.preventDefault();
      }
  });
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
  }
  $scope.submitOrdenBorrador=function(variantes,date,ordenSupplierId,notas,facturacion)
  {
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
.controller('EditCtrl',['apiService',"$scope","$location","$routeParams",function (apiService,$scope, $location, $routeParams) {
    /*var marcasURL = new Firebase("https://formacret.firebaseio.com/marcas/" + $routeParams.id);
    $scope.marcas = $firebaseObject(marcasURL);
    var marcasURLT = new Firebase("https://formacret.firebaseio.com/marcas/");
    $scope.marcasT = $firebaseArray(marcasURLT);
    $scope.marcaN={};*/
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
      apiService.deleteData(urlBrands,id);
      $scope.initFirst();
      $location.path('/app-vistaMarcas');
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
    //***********************************************************************************************+
    /*console.log($scope.marcasTitulos);
    $scope.edit = function() {
      $scope.marcas.$save();
      $location.path('/app-vistaMarcas');
    };
    $scope.remove = function(id) {
      var elim= new Firebase("https://formacret.firebaseio.com/marcas/" + id);
      elim.remove();
    };
    $scope.nueva=function(marcaN)
    {
        marcasURLT.push({
          nombre:$scope.marcaN.nombre
        });
        $location.path('/app-vistaMarcas');
    };*/
  }])
.controller('CtrlClientesDirEnv',["$scope","$location","$routeParams","apiService","$timeout","dataShareClientes",function ($scope, $location, $routeParams,apiService,$timeout,dataShareClientes) {
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
.controller('CtrlEditarDirEnvio',["$scope","$location","$routeParams","apiService","$timeout","dataShareClientes",function ($scope, $location, $routeParams,apiService,$timeout,dataShareClientes) {
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
.controller('CtrlClientes',["$scope","$location","$routeParams","apiService","$timeout","dataShareClientes",function ($scope, $location, $routeParams,apiService,$timeout,dataShareClientes) {
    var urlClientes="/clients";
    var  urlDirEnvios="/send_orders";
    var urlPrices="/prices";
    apiService.getData(urlClientes).then(function(response) {
      //console.log(response.data);
      $scope.clientesTods=response.data;
    });

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

    function getRecent(prod)
    {
      var tmp;
      var tmp1;
      var id=prod[prod.length-1].id;
      var mayor=new Date(prod[prod.length-1].updated_at).getTime();
      //console.log(mayor);
      if(prod.length==1)
      {
        id=prod.id;
      }
      else
      {
        
        for (var i=prod.length-1; i>=0; i--) {
          
          tmp = new Date(prod[i].updated_at).getTime();
          
          if( tmp > mayor)
          {
            //console.log("tmp>mayor");
            mayor=tmp;
            //console.log(mayor);
            id=prod[i].id;
          }
          else if(tmp<mayor)
          {
            //id=prod[i].id;
            continue;
          }
          else if(tmp=mayor)
          {
            //id=prod[i].id;
            continue;
          }
        }
      }
      return id;
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
      apiService.postData(urlClientes,clienteN).then(function(response) {
        //console.log(response.data);
        //idcliente=getRecent(response.data);        
      });
      apiService.getData(urlClientes).then(function(response) {
        //console.log(response.data);
        idcliente=getRecent(response.data);        
      });

      $timeout(function(){

        if($scope.clienteN.envio)
        {
          clienteN.client_id=idcliente;
          clienteN.municipalty=$scope.clienteN.city;
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
      }, 8000); 
        
        $location.path('/app-vistaClientes');
    };
  }])

.controller('EditCtrlDivisas',["apiService","$scope","$location","$routeParams",function (apiService,$scope, $location, $routeParams) {
    var urlCurrency="/currencies";
    $scope.initFirst=function()
    {
       apiService.getData(urlCurrency).then(function(response) {
          //console.log(response);
        $scope.currenciesProxy=response.data;
        });
     };

    if($routeParams.id)
    {
      apiService.getSingleData(urlCurrency,$routeParams.id).then(function(response) {
      //console.log(response.data);
      $scope.currenciesProxy=response.data;
      });
    }
    /* **********************Manejar info desde Heroku y el proxy ********************************* */
    apiService.getData(urlCurrency).then(function(response) {
    //console.log(response.data);
    $scope.currenciesProxy=response.data;
    });
    $scope.sub = function(formData) {
      //console.log(formData);
      apiService.postData(urlCurrency,formData).then(function(response) {
      //console.log(response);
      $scope.currenciesProxy=response.data;

      });
      $scope.initFirst();
      $location.path('/app-vistaDivisa');
    }

    $scope.removeTest=function(id)
    {
      //console.log(id);
      apiService.deleteData(urlCurrency,id);
      $scope.initFirst();
      $location.path('/app-vistaDivisa');
    }
    $scope.editTest=function(divisa)
    {
      //console.log(marcaUProxy.id);
      var data = {
                name: divisa.name,
                shortcut: divisa.shortcut
            };
            //console.log(data);
      apiService.putData(urlCurrency,divisa.id,data);
      //$scope.proxp=response;
      $scope.initFirst();
      $location.path('/app-vistaDivisa');
      
    }
    //***********************************************************************************************+

    /*var divisasURL = new Firebase("https://formacret.firebaseio.com/divisas/" + $routeParams.id);
    $scope.divisas = $firebaseObject(divisasURL);

    var divisasURLT = new Firebase("https://formacret.firebaseio.com/divisas/");
    $scope.divisasT = $firebaseArray(divisasURLT);

    //console.log($scope.marcasTitulos);
    $scope.edit = function() {
      $scope.divisas.$save();
      $location.path('/app-divisasMarcas');
    };
    $scope.remove = function(id) {
      var elim= new Firebase("https://formacret.firebaseio.com/divisas/" + id);
      elim.remove();
    };
    $scope.nueva = function (divisaN)
    {
      //console.log($scope.person);
          divisasURLT.push({
            nombre: $scope.divisaN.nombre,
            divisa: $scope.divisaN.divisa,
          });
          $location.path('/app-vistaDivisa');
    };*/
  }])
.controller('EditCtrlProveedor',["apiService","$scope","$location","$routeParams",function (apiService,$scope, $location, $routeParams) {
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
      apiService.postData(urlSuppliers,formData).then(function(response) {
      //console.log(response);
      $scope.suppProxy=response.data;

      });
      $scope.initFirst();
      $location.path('/app-vistaProveedor');
    }
    $scope.removeTest=function(id)
    {
      //console.log(id);
      apiService.deleteData(urlSuppliers,id);
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

    /*var proveURL = new Firebase("https://formacret.firebaseio.com/proveedores/" + $routeParams.id);
    $scope.proveedores = $firebaseObject(proveURL);

    var proveURLT = new Firebase("https://formacret.firebaseio.com/proveedores/");
    $scope.proveedoresT = $firebaseArray(proveURLT);

    $scope.edit = function() {
      $scope.proveedores.$save();
      $location.path('/app-vistaProveedor');
    };
    $scope.remove = function(id) {
      var elim= new Firebase("https://formacret.firebaseio.com/proveedores/" + id);
      elim.remove();
      //$location.path('/app-vistaProveedor');
    };
    $scope.nuevo=function(proveN)
    {
        proveURLT.push({
          correo:$scope.proveN.correo,
          nombre:$scope.proveN.nombre,
          divisa:$scope.proveN.divisa,
          pagina:$scope.proveN.pagina,
          telefono:$scope.proveN.telefono
        });
        $location.path('/app-vistaProveedor');
    };*/

  }])
  .controller('EditCtrlProductos',["apiService","$scope","$location","$routeParams","dataShare","$timeout",function (apiService,$scope, $location, $routeParams,dataShare,$timeout) {
    var urlProducts="/products";
    var urlSuppliers="/suppliers";
    var urlBrands="/brands";
    $scope.prodname;
    var idRec;

      
    $scope.initFirst=function()
    {
       apiService.getData(urlProducts).then(function(response) {
          //console.log(response);
        $scope.productos=response.data;
        });
       apiService.getData(urlSuppliers).then(function(response) {
          //console.log(response);
        $scope.suppliers=response.data;
        });
    apiService.getData(urlBrands).then(function(response) {
          //console.log(response);
        $scope.brands=response.data;
        });
    }
    function getRecent(prod)
    {
      var tmp;
      var tmp1;
      var id=prod[prod.length-1].id;
      var mayor=new Date(prod[prod.length-1].updated_at).getTime();
      //console.log(mayor);
      if(prod.length==1)
      {
        id=prod.id;
      }
      else
      {
        
        for (var i=prod.length-1; i>=0; i--) {
          
          tmp = new Date(prod[i].updated_at).getTime();
          
          if( tmp > mayor)
          {
            //console.log("tmp>mayor");
            mayor=tmp;
            //console.log(mayor);
            id=prod[i].id;
          }
          else if(tmp<mayor)
          {
            //id=prod[i].id;
            continue;
          }
          else if(tmp=mayor)
          {
            //id=prod[i].id;
            continue;
          }
        }
      }
      return id;
    }
    apiService.getData(urlProducts).then(function(response) {
          //console.log(response);
        $scope.productos=response.data;
        getRecent(response.data);
        });
    apiService.getData(urlSuppliers).then(function(response) {
          //console.log(response);
        $scope.suppliers=response.data;
        });
    apiService.getData(urlBrands).then(function(response) {
          //console.log(response);
        $scope.brands=response.data;
        });
    if($routeParams.id)
    {
      apiService.getSingleData(urlProducts,$routeParams.id).then(function(response) {
      //console.log(response.data);
      $scope.prodIndv=response.data;
      });
    }

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

    $scope.sub = function(formData) {
      //console.log(formData);
      $scope.prodname=formData.name;
      apiService.postData(urlProducts,formData).then(function(response) {
      //console.log(response);
      $scope.productos=response.data;

      });
      apiService.getData(urlProducts).then(function(response) {
        idRec=getRecent(response.data);
        //console.log("se supone que obteve el mas reciente");
        //console.log(idRec);
        dataShare.sendData(idRec);
      });
      $scope.initFirst();
      $location.path('/app-defVariantes');
    }
    $scope.formVariantes= [];
    $scope.subVariant = function(formData) {
      //console.log(formData);
      urlVariant="/variants";
      urlPrices="/prices";
      urlVariantPrices="/variant_prices";
      var variantesForm =[];


      angular.forEach(formData, function(value, key) {
        variantesForm.push(value.Text);
      });      

      
      /*while(idRec)
      {
        window.setTimeout(function() {
            console.log("esperando");
            console.log(idRec);
        }, 3000);
      }*/
      $scope.variantesAsi=variantesForm;
      
      var json = JSON.stringify( variantesForm);
      var newStr = json.substring(1, json.length-1);
      
      $scope.variantesAsi=newStr;
      eval("$scope.variantesAsi=cartesian("+newStr+")");
      //console.log("volvemos a poner el id que se genero");
      idRec=dataShare.getData();
      //console.log(idRec=dataShare.getData());
      angular.forEach($scope.variantesAsi, function(value, key) {
        //console.log("aqui se imprime cada valor");
        valor=value.join(', ');
        //console.log(valor);
        var data = {
                name: valor,
                status: "I",
                product_id: idRec//aqui me traigo el id de ultimo agregado
            };
        apiService.postData(urlVariant,data);
        
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
                apiService.postData(urlVariantPrices,data);
                //console.log("se guarda el dato");
              });  
              //apiService.push(urlVariant,);
            });    
          });
          $timeout(function(){
            dataShare.sendData(idRec);
          $location.path('/app-subVariantes');
        }, 10000); 
          
        });


      apiService.getSingleData(urlProducts,idRec).then(function(response){
        $scope.variantesFormC=response.data.variants;
        //console.log($scope.variantesFormC);
        apiService.getData(urlPrices).then(function(response){
          $scope.pricesProxy=response.data;
        });
        
      });
      
    }
    //console.log(cartesian(["rojo","verde","azul"], ["chico","grande"],["feo","bonito"]));

  }])
.controller('EditCtrlProductoInd',["apiService","$scope","$location","$routeParams","dataShare",function(apiService,$scope, $location, $routeParams,dataShare) {
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
.controller('EditCtrlVariantes',["apiService","$scope","$location","$routeParams","dataShare",function(apiService,$scope, $location, $routeParams,dataShare) {
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
        //console.log($scope.variantesFormC);
        /*apiService.getData(urlPrices).then(function(response){
          $scope.pricesProxy=response.data;
        });*/
        
      });
  apiService.getData(urlCurrency).then(function(response) {
    //console.log(response);
    $scope.currProxy=response.data;
    });
  apiService.getData(urlTaxes).then(function(response) {
    //console.log(response);
    $scope.taxProxy=response.data;
    });
  $scope.subVariantC=function(data)
  {
    angular.forEach(data, function(value, key) {
        //console.log("aqui se imprime cada valor de cada data que se envia"+key);
        //console.log(value.status);
        
        if(value.status==true||value.status=='U')
          value.status="U";
        else if((value.sku==''||value.code==''||value.weight==''||value.description==''||value.status==''||value.currency_id==''||value.tax_id=='')&&value.status!=true)
          value.status="I";
        else
          value.status="C";

        var data={
          sku:value.sku,
          code:value.code,
          weight:value.weight,
          description:value.description,
          status:value.status,
          currency_id:value.currency_id,
          tax_id:value.tax_id
        };
        apiService.putData(urlVariant,value.id,data);

        angular.forEach(value.variant_prices, function(value1, key) {
          var dataP={
            cost:value1.cost
          };
          apiService.putData(urlVariantPrices,value1.id,dataP);
        });
      });
    $location.path('/app-vistaProductoInd/'+dataShare.getData());
  };


}])
.controller('EditCtrlVariantesInd',["apiService","$scope","$location","$routeParams","dataShare",function(apiService,$scope, $location, $routeParams,dataShare) {
  var urlProducts="/products";
  var urlSuppliers="/suppliers";
  var urlBrands="/brands";
  var urlCurrency="/currencies";
  var urlVariantPrices="/variant_prices";
  var urlVariant="/variants";
  var urlTaxes= "/taxes";

  $scope.guardarCambiosV=function(data){
    apiService.putData(urlVariant,$routeParams.id,data);
    angular.forEach(data.variant_prices, function(value1, key) {
          var dataP={
            cost:value1.cost
          };
          apiService.putData(urlVariantPrices,value1.id,dataP);
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
.controller('EditCtrlVariantInd',["apiService","$scope","$location","$routeParams","dataShare",function(apiService,$scope, $location, $routeParams,dataShare) {
  var urlVariant="/variants";
  apiService.getSingleData(urlVariant,$routeParams.id).then(function(response){
        $scope.variante=response.data;
        $scope.variante.variant_prices.sort(function(a, b) {
            return a.id - b.id;
        });
        //console.log($scope.variantesFormC);
      });
}])
.controller('EditCtrlProdInd',["apiService","$scope","$location","$routeParams","dataShare",function(apiService,$scope, $location, $routeParams,dataShare) {
  var urlProducts="/products";
  var urlSuppliers="/suppliers";
  var urlBrands="/brands";
  var urlCurrency="/currencies";
  
  apiService.getSingleData(urlProducts,$routeParams.id).then(function(response){
        $scope.prod=response.data;
        //console.log($scope.variantesFormC);
      });

}])

.controller('CtrlLocacion',["apiService","$scope","$location","$routeParams","dataShareLocacion",function(apiService,$scope, $location, $routeParams,dataShareLocacion) {
  var urlLocations="/locations";
  var urlWarehouses="/warehouses";
  var urlProducts="/products";
  var contador=0;
  $scope.productosInLoc=new Array();
  dataShareLocacion.sendData($routeParams.id);
  $scope.nuevoAlmacen=function(){
    dataShareLocacion.sendData($routeParams.id);
    
    $location.path('/app-nuevoAlmacen');
  };
  $scope.AddProduct=function(){
    $location.path('/app-agregarProdLoc/');
  };
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
      console.log(newStr);
      
      $scope.productosInLoc=JSON.parse(newStr);
      angular.forEach($scope.productosInLoc, function(value, key) {
          apiService.getSingleData(urlProducts,value.variant.product_id).then(function(response) {
            value.variant.description=response.data.name;
            value.variant.brand=response.data.brand.name;
          });
      });
  });
}])
.controller('CtrlAddProdLoc',["apiService","$scope","$location","$routeParams",'$filter',"dataShareLocacion","$timeout",function(apiService,$scope, $location, $routeParams,$filter,dataShareLocacion,$timeout) {
  var variantWare="/variant_warehouses";
  var variantDiv="/variant_divisions";
  var urlProducts="/products";
  var urlLocations="/locations";
  var urlWarehouses="/warehouses";
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
    var idDivGeneral=0;
    apiService.getSingleData(urlWarehouses,$scope.almacenPG).then(function(response){
    angular.forEach(response.data.dividers, function(value, key) {
      if(value.name=="General")
        idDivGeneral=value.id
      });

      
    });
    $timeout(function(){
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
    }, 6000);
    
    //console.log(formData);
  }
   /**/
}])
.controller('MainController', ['apiService','$resource','$http','$scope', '$theme', '$timeout', 'progressLoader', 'wijetsService', '$location',
    function(apiService,$resource,$http,$scope, $theme, $timeout, progressLoader, wijetsService, $location,Proveedores) {
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

  