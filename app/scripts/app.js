angular
  .module('themesApp', [
    'theme',
    'theme.demos'
  ])
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
.run(['$rootScope', '$location', function($rootScope, $location) {
  $rootScope.$on('auth:login-success', function() {
    alert("Siii");
  })
}]);
.config(['$provide', '$routeProvider', function($provide, $routeProvider) {
    'use strict';
    
    $routeProvider
      .when('/', {
        templateUrl: function(param) {
          return 'views/login.html';
        }
      }).when('/log-out', {
        templateUrl: function(param) {
          return 'views/log-out.html';
        }
      })
      .when('/pruebaUs', {
        templateUrl:'views/vistaOrdenesAjuste.html',
        resolve: {
          auth: function($auth) {
            return $auth.validateUser();
          }
        }
      })
      .when('/app-vistaOrdenAjusteInd/:id', {
        templateUrl: function(param) {
          return 'views/app-vistaOrdenAjusteInd.html';
        }
      })
      .when('/app-nuevaOrdenAjuste', {
        templateUrl: function(param) {
          return 'views/app-nuevaOrdenAjuste.html';
        }
      })
      .when('/app-vistaListas', {
        templateUrl: function(param) {
          return 'views/app-vistaListas.html';
        }
      })
      .when('/app-editarPrecio/:id', {
        templateUrl: function(param) {
          return 'views/app-editarPrecio.html';
        }
      })
      .when('/app-nuevoPrecio', {
        templateUrl: function(param) {
          return 'views/app-nuevoPrecio.html';
        }
      })
      .when('/app-editarImpuesto/:id', {
        templateUrl: function(param) {
          return 'views/app-editarImpuesto.html';
        }
      })
      .when('/app-nuevoImpuesto', {
        templateUrl: function(param) {
          return 'views/app-nuevoImpuesto.html';
        }
      })
      .when('/app-vistaFacturacion', {
        templateUrl: function(param) {
          return 'views/app-vistaFacturacion.html';
        }
      })
      .when('/app-nuevoCriterio', {
        templateUrl: function(param) {
          return 'views/app-nuevoCriterio.html';
        }
      })
      .when('/app-editarCriterio/:id', {
        templateUrl: function(param) {
          return 'views/app-editarCriterio.html';
        }
      })
      .when('/app-vistaTransferencias', {
        templateUrl: function(param) {
          return 'views/app-vistaTransferencias.html';
        }
      })
      .when('/app-vistaTransInd/:id', {
        templateUrl: function(param) {
          return 'views/app-vistaTransInd.html';
        }
      })
      .when('/app-nuevaTransferencia', {
        templateUrl: function(param) {
          return 'views/app-nuevaTransferencia.html';
        }
      })
      .when('/app-vistaPrestamos', {
        templateUrl: function(param) {
          return 'views/app-vistaPrestamos.html';
        }
      })
      .when('/app-vistaLoanInd/:id', {
        templateUrl: function(param) {
          return 'views/app-vistaLoanInd.html';
        }
      })
      .when('/app-nuevoPrestamo', {
        templateUrl: function(param) {
          return 'views/app-nuevoPrestamo.html';
        }
      })
      .when('/app-agregarClientesDirEnv', {
        templateUrl: function(param) {
          return 'views/app-agregarClientesDirEnv.html';
        }
      })
      .when('/app-nuevaLocacion', {
        templateUrl: function(param) {
          return 'views/app-nuevaLocacion.html';
        }
      })
      .when('/app-vistaCargarOrden', {
        templateUrl: function(param) {
          return 'views/app-vistaCargarOrden.html';
        }
      })
      .when('/app-vistaLocacion/:id', {
        templateUrl: function(param) {
          return 'views/app-vistaLocacion.html';
        }
      })
      .when('/app-vistaAlmacen/:id', {
        templateUrl: function(param) {
          return 'views/app-vistaAlmacen.html';
        }
      })
      .when('/app-nuevoAlmacen', {
        templateUrl: function(param) {
          return 'views/app-nuevoAlmacen.html';
        }
      })
      .when('/app-vistaVarProdAl/:id', {
        templateUrl: function(param) {
          return 'views/app-vistaVarProdAl.html';
        }
      })
      .when('/app-nuevoDivisor', {
        templateUrl: function(param) {
          return 'views/app-nuevoDivisor.html';
        }
      })
      .when('/app-vistaVarDivisorAl/:id', {
        templateUrl: function(param) {
          return 'views/app-vistaVarDivisorAl.html';
        }
      })
      .when('/app-agregarProdLoc/:id', {
        templateUrl: function(param) {
          return 'views/app-agregarProdLoc.html';
        }
      })
      .when('/app-nuevoCliente/', {
        templateUrl: function(param) {
          return 'views/app-nuevoCliente.html';
        }
      })
      .when('/app-vistaOrdenesCompra/',{
        templateUrl: function(param) {
          return 'views/app-vistaOrdenesCompra.html';
        }
      })
      .when('/app-nuevaOrdenC/',{
        templateUrl: function(param) {
          return 'views/app-nuevaOrdenC.html';
        }
      })
      .when('/app-vistaOrdenCInd/:id',{
        templateUrl: function(param) {
          return 'views/app-vistaOrdenCInd.html';
        }
      })
      .when('/app-vistaOrdenesVenta/',{
        templateUrl: function(param) {
          return 'views/app-vistaOrdenesVenta.html';
        }
      })
      .when('/app-nuevaOrdenV/',{
        templateUrl: function(param) {
          return 'views/app-nuevaOrdenV.html';
        }
      })
      .when('/app-vistaOrdenVInd/:id',{
        templateUrl: function(param) {
          return 'views/app-vistaOrdenVInd.html';
        }
      })
      .when('/app-vistaClienteInd/:id', {
        templateUrl: function(param) {
          return 'views/app-vistaClienteInd.html';
        }
      })
      .when('/app-vistaClientes', {
        templateUrl: function(param) {
          return 'views/app-vistaClientes.html';
        }
      })
      .when('/app-editarCliente/:id', {
        templateUrl: function(param) {
          return 'views/app-editarCliente.html';
        }
      })
      .when('/app-editarClienteEnvio/:id', {
        templateUrl: function(param) {
          return 'views/app-editarClienteEnvio.html';
        }
      })
      .when('/app-vistaProveedor/', {
        templateUrl: function(param) {
          return 'views/app-vistaProveedor.html';
        }
      })
      .when('/app-editarProveedor/:id', {
        templateUrl: function(param) {
          return 'views/app-editarProveedores.html';
        }
      })
      .when('/app-vistaProveedorInd/:id', {
        templateUrl: function(param) {
          return 'views/app-vistaProveedorInd.html';
        }
      })
      .when('/app-nuevoProveedor/', {
        templateUrl: function(param) {
          return 'views/app-nuevoProveedor.html';
        }
      })
      .when('/app-vistaDivisa/', {
        templateUrl: function(param) {
          return 'views/app-vistaDivisas.html';
        }
      })
      .when('/app-nuevaDivisa/', {
        templateUrl: function(param) {
          return 'views/app-nuevaDivisa.html';
        }
      })
      .when('/app-nuevaMarca/', {
        templateUrl: function(param) {
          return 'views/app-nuevaMarca.html';
        }
      })
      .when('/app-editarDivisa/:id', {
        templateUrl: function(param) {
          return 'views/app-editarDivisa.html';
        }
      })
      
      .when('/app-editarMarcas/:id', {
        templateUrl: function(param) {
          return 'views/app-editarMarcas.html';
        }
      })
      
      .when('/app-vistaMarcas/', {
        templateUrl: function(param) {
          return 'views/app-vistaMarcas.html';
        }
      })
      .when('/app-vistaProductos/', {
        templateUrl: function(param) {
          return 'views/app-vistaProductos.html';
        }
      })
      .when('/app-nuevoProducto/', {
        templateUrl: function(param) {
          return 'views/app-nuevoProducto.html';
        }
      })
      .when('/app-defVariantes/', {
        templateUrl: function(param) {
          return 'views/app-defVariantes.html';
        }
      })
      .when('/app-subVariantes/', {
        templateUrl: function(param) {
          return 'views/app-subVariantes.html';
        }
      })
      .when('/app-vistaProductoInd/:id', {
        templateUrl: function(param) {
          return 'views/app-vistaProductoInd.html';
        }
      })
      .when('/app-vistaVarianteInd/:id', {
        templateUrl: function(param) {
          return 'views/app-vistaVarianteInd.html';
        }
      })
      .when('/app-editarProducto/:id', {
        templateUrl: function(param) {
          return 'views/app-editarProducto.html';
        }
      })
      .when('/app-editarVariante/:id', {
        templateUrl: function(param) {
          return 'views/app-editarVariante.html';
        }
      })
      .when('/prueba', {
        templateUrl: function(param) {
          return 'views/prueba.html';
        }
      })
      .when('/:templateFile', {
        templateUrl: function(param) {

          return 'views/' + param.templateFile ;
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
