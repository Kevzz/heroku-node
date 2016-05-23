angular.module("myApp", ["firebase"])
  .controller("firebaseController", ["$scope", "$firebaseArray",
        function firebaseController($scope, $firebaseArray) {
          var ref = new Firebase("https://formacret.firebaseio.com");
          var productos = ref.child('productos');
          /*productos.push({
            almacenes: 
              {
                san_luis_1:true
              },
            id: "5",
            nombre: "ALguno de prueba",
            descripcion: "Alguna descripcion y asi",
            marca: "Alguna MXS",
            proveedor: "Proveedor 1"
          });
          var newProductoKey = productos.key();

          var newProductos =productos.child(newProductoKey);*/

          $scope.productos = $firebaseArray(productos);
        }
      ]);