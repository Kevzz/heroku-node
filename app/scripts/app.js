angular
  .module('themesApp', [
    'theme',
    'theme.demos',
    'ng-token-auth',
    'permission',
    'permission.ng'
  ])
.value('appConf', {
    isAuthorized: false
})
.value('appConf2', {
    isAuthorized: false
})
  .value('fbURL', 'https://formacret.firebaseio.com/')
  .directive('ngConfirmClick', [
        function(){
            return {
                link: function (scope, element, attr) {
                    var msg = attr.ngConfirmClick || "Are you sure?";
                    var clickAction = attr.confirmedClick;
                    element.bind('click',function (event) {
                        if ( window.confirm(msg) ) {
                            scope.$eval(clickAction)
                        }
                    });
                }
            }; 
    }])
  .factory('SimLog',function($rootScope){
  var service = {};
  service.data = false;
  service.sendData = function(data){
      this.data = data;
      $rootScope.$broadcast('data_shared');
  };
  service.getData = function(){
    return this.data;
  };
  return service;
})
  .factory('dataShare',function($rootScope){
  var service = {};
  service.data = false;
  service.sendData = function(data){
      this.data = data;
      $rootScope.$broadcast('data_shared');
  };
  service.getData = function(){
    return this.data;
  };
  return service;
})
  .factory('dataShareCompra',function($rootScope){
  var service = {};
  service.data = false;
  service.sendData = function(data){
      this.data = data;
      $rootScope.$broadcast('data_shared');
  };
  service.getData = function(){
    return this.data;
  };
  return service;
}).factory('dataShareReady',function($rootScope){
  var service = {};
  service.data = false;
  service.sendData = function(data){
      this.data = data;
      $rootScope.$broadcast('data_shared');
  };
  service.getData = function(){
    return this.data;
  };
  return service;
})
    .factory('dataShareVenta',function($rootScope){
  var service = {};
  service.data = false;
  service.sendData = function(data){
      this.data = data;
      $rootScope.$broadcast('data_shared');
  };
  service.getData = function(){
    return this.data;
  };
  return service;
})
  .factory('dataShareLocacion',function($rootScope){
  var service = {};
  service.data = false;
  service.sendData = function(data){
      this.data = data;
      $rootScope.$broadcast('data_shared');
  };
  service.getData = function(){
    return this.data;
  };
  return service;
})
  .factory('dataShareAlmacen',function($rootScope){
  var service = {};
  service.data = false;
  service.sendData = function(data){
      this.data = data;
      $rootScope.$broadcast('data_shared');
  };
  service.getData = function(){
    return this.data;
  };
  return service;
})
  .factory('dataShareVariante',function($rootScope){
  var service = {};
  service.data = false;
  service.sendData = function(data){
      this.data = data;
      $rootScope.$broadcast('data_shared');
  };
  service.getData = function(){
    return this.data;
  };
  return service;
})
  .factory('dataShareTransDivxDiv',function($rootScope){
  var service = {};
  service.data = false;
  service.sendData = function(data){
      this.data = data;
      $rootScope.$broadcast('data_shared');
  };
  service.getData = function(){
    return this.data;
  };
  return service;
})
  .factory('dataShareClientes',function($rootScope){
  var service = {};
  service.data = false;
  service.sendData = function(data){
      this.data = data;
      $rootScope.$broadcast('data_shared');
  };
  service.getData = function(){
    return this.data;
  };
  return service;
})
 /* .config(['$stateProvider', function($stateProvider) {
    $stateProvider
      // this state will be visible to everyone
      .state('index', {
        url: '/',
        templateUrl: 'views/login.html'
      })

      // only authenticated users will be able to see routes that are
      // children of this state
      .state('admin', {
        url: '/admin',
        abstract: true,
        template: 'views/app-vistaMarcas.html',
        resolve: {
          auth: function($auth) {
            return $auth.validateUser();
          }
        }
      })

      // this route will only be available to authenticated users
      
  }])
*/
.run(['$rootScope', '$location', 'PermRoleStore', 'appConf','apiService', function($rootScope, $location, PermRoleStore, appConf,apiService) {
  $rootScope.$on('auth:login-success', function() {
   
    $location.path('/app-vistaProductos')
    //console.log(localStorage);
  });
  $rootScope.$on('auth:logout-success', function(ev) {
    $location.path('/')
  });
   $rootScope.$on('auth:invalid', function() {
      //never gets called
      $location.path('/');
  });
  PermRoleStore.defineRole('AUTHORIZED', function() {
      return appConf.isAuthorized;
    });
}])
.config(['$provide', '$routeProvider', function($provide, $routeProvider) {
    'use strict';
    
    $routeProvider
      .when('/', {
        templateUrl: function(param) {
          return 'views/login.html';
        }
        
      })
      .when('/app-vistaOrdenesAjuste', {
        templateUrl: function(param) {
          return 'views/app-vistaOrdenesAjuste.html';
        },
        resolve: {
          auth: function($auth) {
            return $auth.validateUser();
          }
        }
      })
      .when('/app-vistaOrdenAjusteInd/:id', {
        templateUrl: function(param) {
          return 'views/app-vistaOrdenAjusteInd.html';
        },
        resolve: {
          auth: function($auth) {
            return $auth.validateUser();
          }
        }
      })
      .when('/app-nuevaOrdenAjuste', {
        templateUrl: function(param) {
          return 'views/app-nuevaOrdenAjuste.html';
        },
        resolve: {
          auth: function($auth) {
            return $auth.validateUser();
          }
        }
      })
      .when('/app-vistaListas', {
        templateUrl: function(param) {
          return 'views/app-vistaListas.html';
        },
        resolve: {
          auth: function($auth) {
            return $auth.validateUser();
          }
        }
      })
      .when('/app-editarPrecio/:id', {
        templateUrl: function(param) {
          return 'views/app-editarPrecio.html';
        },
        resolve: {
          auth: function($auth) {
            return $auth.validateUser();
          }
        }
      })
      .when('/app-nuevoPrecio', {
        templateUrl: function(param) {
          return 'views/app-nuevoPrecio.html';
        },
        resolve: {
          auth: function($auth) {
            return $auth.validateUser();
          }
        }
      })
      .when('/app-editarImpuesto/:id', {
        templateUrl: function(param) {
          return 'views/app-editarImpuesto.html';
        },
        resolve: {
          auth: function($auth) {
            return $auth.validateUser();
          }
        }
      })
      .when('/app-nuevoImpuesto', {
        templateUrl: function(param) {
          return 'views/app-nuevoImpuesto.html';
        },
        resolve: {
          auth: function($auth) {
            return $auth.validateUser();
          }
        }
      })
      .when('/app-vistaFacturacion', {
        templateUrl: function(param) {
          return 'views/app-vistaFacturacion.html';
        },
        resolve: {
          auth: function($auth) {
            return $auth.validateUser();
          }
        }
      })
      .when('/app-nuevoCriterio', {
        templateUrl: function(param) {
          return 'views/app-nuevoCriterio.html';
        },
        resolve: {
          auth: function($auth) {
            return $auth.validateUser();
          }
        }
      })
      .when('/app-editarCriterio/:id', {
        templateUrl: function(param) {
          return 'views/app-editarCriterio.html';
        },
        resolve: {
          auth: function($auth) {
            return $auth.validateUser();
          }
        }
      })
      .when('/app-vistaTransferencias', {
        templateUrl: function(param) {
          return 'views/app-vistaTransferencias.html';
        },
        resolve: {
          auth: function($auth) {
            return $auth.validateUser();
          }
        }
      })
      .when('/app-vistaTransInd/:id', {
        templateUrl: function(param) {
          return 'views/app-vistaTransInd.html';
        },
        resolve: {
          auth: function($auth) {
            return $auth.validateUser();
          }
        }
      })
      .when('/app-nuevaTransferencia', {
        templateUrl: function(param) {
          return 'views/app-nuevaTransferencia.html';
        },
        resolve: {
          auth: function($auth) {
            return $auth.validateUser();
          }
        }
      })
      .when('/app-vistaPrestamos', {
        templateUrl: function(param) {
          return 'views/app-vistaPrestamos.html';
        },
        resolve: {
          auth: function($auth) {
            return $auth.validateUser();
          }
        }
      })
      .when('/app-vistaLoanInd/:id', {
        templateUrl: function(param) {
          return 'views/app-vistaLoanInd.html';
        },
        resolve: {
          auth: function($auth) {
            return $auth.validateUser();
          }
        }
      })
      .when('/app-nuevoPrestamo', {
        templateUrl: function(param) {
          return 'views/app-nuevoPrestamo.html';
        },
        resolve: {
          auth: function($auth) {
            return $auth.validateUser();
          }
        }
      })
      .when('/app-agregarClientesDirEnv', {
        templateUrl: function(param) {
          return 'views/app-agregarClientesDirEnv.html';
        },
        resolve: {
          auth: function($auth) {
            return $auth.validateUser();
          }
        }
      })
      .when('/app-nuevaLocacion', {
        templateUrl: function(param) {
          return 'views/app-nuevaLocacion.html';
        },
        resolve: {
          auth: function($auth) {
            return $auth.validateUser();
          }
        }
      })
      .when('/app-vistaCargarOrden', {
        templateUrl: function(param) {
          return 'views/app-vistaCargarOrden.html';
        },
        resolve: {
          auth: function($auth) {
            return $auth.validateUser();
          }
        }
      })
      .when('/app-vistaLocacion/:id', {
        templateUrl: function(param) {
          return 'views/app-vistaLocacion.html';
        },
        resolve: {
          auth: function($auth) {
            return $auth.validateUser();
          }
        }
      })
      .when('/app-vistaAlmacen/:id', {
        templateUrl: function(param) {
          return 'views/app-vistaAlmacen.html';
        },
        resolve: {
          auth: function($auth) {
            return $auth.validateUser();
          }
        }
      })
      .when('/app-nuevoAlmacen', {
        templateUrl: function(param) {
          return 'views/app-nuevoAlmacen.html';
        },
        resolve: {
          auth: function($auth) {
            return $auth.validateUser();
          }
        }
      })
      .when('/app-vistaVarProdAl/:id', {
        templateUrl: function(param) {
          return 'views/app-vistaVarProdAl.html';
        },
        resolve: {
          auth: function($auth) {
            return $auth.validateUser();
          }
        }
      })
      .when('/app-nuevoDivisor', {
        templateUrl: function(param) {
          return 'views/app-nuevoDivisor.html';
        },
        resolve: {
          auth: function($auth) {
            return $auth.validateUser();
          }
        }
      })
      .when('/app-vistaVarDivisorAl/:id', {
        templateUrl: function(param) {
          return 'views/app-vistaVarDivisorAl.html';
        },
        resolve: {
          auth: function($auth) {
            return $auth.validateUser();
          }
        }
      })
      .when('/app-agregarProdLoc/:id', {
        templateUrl: function(param) {
          return 'views/app-agregarProdLoc.html';
        },
        resolve: {
          auth: function($auth) {
            return $auth.validateUser();
          }
        }
      })
      .when('/app-nuevoCliente/', {
        templateUrl: function(param) {
          return 'views/app-nuevoCliente.html';
        },
        resolve: {
          auth: function($auth) {
            return $auth.validateUser();
          }
        }
      })
      .when('/app-vistaOrdenesCompra/',{
        templateUrl: function(param) {
          return 'views/app-vistaOrdenesCompra.html';
        },
        resolve: {
          auth: function($auth) {
            return $auth.validateUser();
          }
        }
      })
      .when('/app-vistaOrdenesCompraArchivo/',{
        templateUrl: function(param) {
          return 'views/app-vistaOrdenesCompraArchivo.html';
        },
        resolve: {
          auth: function($auth) {
            return $auth.validateUser();
          }
        }
      })
      .when('/app-nuevaOrdenC/',{
        templateUrl: function(param) {
          return 'views/app-nuevaOrdenC.html';
        },
        resolve: {
          auth: function($auth) {
            return $auth.validateUser();
          }
        }
      })
      .when('/app-vistaOrdenCInd/:id',{
        templateUrl: function(param) {
          return 'views/app-vistaOrdenCInd.html';
        },
        resolve: {
          auth: function($auth) {
            return $auth.validateUser();
          }
        }
      })
      .when('/app-vistaOrdenesVenta/',{
        templateUrl: function(param) {
          return 'views/app-vistaOrdenesVenta.html';
        },
        resolve: {
          auth: function($auth) {
            return $auth.validateUser();
          }
        }
      })
      .when('/app-nuevaOrdenV/',{
        templateUrl: function(param) {
          return 'views/app-nuevaOrdenV.html';
        },
        resolve: {
          auth: function($auth) {
            return $auth.validateUser();
          }
        }
      })
      .when('/app-vistaOrdenVInd/:id',{
        templateUrl: function(param) {
          return 'views/app-vistaOrdenVInd.html';
        },
        resolve: {
          auth: function($auth) {
            return $auth.validateUser();
          }
        }
      })
      .when('/app-vistaClienteInd/:id', {
        templateUrl: function(param) {
          return 'views/app-vistaClienteInd.html';
        },
        resolve: {
          auth: function($auth) {
            return $auth.validateUser();
          }
        }
      })
      .when('/app-vistaClientes', {
        templateUrl: function(param) {
          return 'views/app-vistaClientes.html';
        },
        resolve: {
          auth: function($auth) {
            return $auth.validateUser();
          }
        }
      })
      .when('/app-editarCliente/:id', {
        templateUrl: function(param) {
          return 'views/app-editarCliente.html';
        },
        resolve: {
          auth: function($auth) {
            return $auth.validateUser();
          }
        }
      })
      .when('/app-editarClienteEnvio/:id', {
        templateUrl: function(param) {
          return 'views/app-editarClienteEnvio.html';
        },
        resolve: {
          auth: function($auth) {
            return $auth.validateUser();
          }
        }
      })
      .when('/app-vistaProveedor/', {
        templateUrl: function(param) {
          return 'views/app-vistaProveedor.html';
        },
        resolve: {
          auth: function($auth) {
            return $auth.validateUser();
          }
        }
      })
      .when('/app-editarProveedor/:id', {
        templateUrl: function(param) {
          return 'views/app-editarProveedores.html';
        },
        resolve: {
          auth: function($auth) {
            return $auth.validateUser();
          }
        }
      })
      .when('/app-vistaProveedorInd/:id', {
        templateUrl: function(param) {
          return 'views/app-vistaProveedorInd.html';
        },
        resolve: {
          auth: function($auth) {
            return $auth.validateUser();
          }
        }
      })
      .when('/app-nuevoProveedor/', {
        templateUrl: function(param) {
          return 'views/app-nuevoProveedor.html';
        },
        resolve: {
          auth: function($auth) {
            return $auth.validateUser();
          }
        }
      })
      .when('/app-vistaDivisa/', {
        templateUrl: function(param) {
          return 'views/app-vistaDivisas.html';
        },
        resolve: {
          auth: function($auth) {
            return $auth.validateUser();
          }
        }
      })
      .when('/app-nuevaDivisa/', {
        templateUrl: function(param) {
          return 'views/app-nuevaDivisa.html';
        },
        resolve: {
          auth: function($auth) {
            return $auth.validateUser();
          }
        }
      })
      .when('/app-nuevaMarca/', {
        templateUrl: function(param) {
          return 'views/app-nuevaMarca.html';
        },
        resolve: {
          auth: function($auth) {
            return $auth.validateUser();
          }
        }
      })
      .when('/app-editarDivisa/:id', {
        templateUrl: function(param) {
          return 'views/app-editarDivisa.html';
        },
        resolve: {
          auth: function($auth) {
            return $auth.validateUser();
          }
        }
      })
      
      .when('/app-editarMarcas/:id', {
        templateUrl: function(param) {
          return 'views/app-editarMarcas.html';
        },
        resolve: {
          auth: function($auth) {
            return $auth.validateUser();
          }
        }
      })
      
      .when('/app-vistaMarcas/', {
        templateUrl: function(param) {
          return 'views/app-vistaMarcas.html';
        },
        resolve: {
          auth: function($auth) {
            return $auth.validateUser();
          }
        }
      })
      .when('/app-vistaProductos/', {
        templateUrl: function(param) {
          return 'views/app-vistaProductos.html';
        },
        resolve: {
          auth: function($auth) {
            return $auth.validateUser();
          }
        }
      })
      .when('/app-nuevoProducto/', {
        templateUrl: function(param) {
          return 'views/app-nuevoProducto.html';
        },
        resolve: {
          auth: function($auth) {
            return $auth.validateUser();
          }
        }
      })
      .when('/app-defVariantes/', {
        templateUrl: function(param) {
          return 'views/app-defVariantes.html';
        },
        resolve: {
          auth: function($auth) {
            return $auth.validateUser();
          }
        }
      })
      .when('/app-subVariantes/', {
        templateUrl: function(param) {
          return 'views/app-subVariantes.html';
        },
        resolve: {
          auth: function($auth) {
            return $auth.validateUser();
          }
        }
      })
      .when('/app-vistaProductoInd/:id', {
        templateUrl: function(param) {
          return 'views/app-vistaProductoInd.html';
        },
        resolve: {
          auth: function($auth) {
            return $auth.validateUser();
          }
        }
      })
      .when('/app-vistaVarianteInd/:id', {
        templateUrl: function(param) {
          return 'views/app-vistaVarianteInd.html';
        },
        resolve: {
          auth: function($auth) {
            return $auth.validateUser();
          }
        }
      })
      .when('/app-editarProducto/:id', {
        templateUrl: function(param) {
          return 'views/app-editarProducto.html';
        },
        resolve: {
          auth: function($auth) {
            return $auth.validateUser();
          }
        }
      })
      .when('/app-editarVariante/:id', {
        templateUrl: function(param) {
          return 'views/app-editarVariante.html';
        },
        resolve: {
          auth: function($auth) {
            return $auth.validateUser();
          }
        }
      })
      .when('/prueba', {
        templateUrl: function(param) {
          return 'views/prueba.html';
        },
        resolve: {
          auth: function($auth) {
            return $auth.validateUser();
          }
        }
      })
      .when('/:templateFile', {
        templateUrl: function(param) {

          return 'views/' + param.templateFile ;
        },
        resolve: {
          auth: function($auth) {
            return $auth.validateUser();
          }
        }
      })
      .when('#', {
        templateUrl: 'views/login.html',
      })
      .otherwise({
        redirectTo: '/'
      });
  }])
  .directive('demoOptions', function () {
    return {
      restrict: 'C',
      link: function (scope, element, attr) {
        element.find('.demo-options-icon').click( function () {
          element.toggleClass('active');
        });
      }
    };
  });
