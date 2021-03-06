angular
  .module('theme.core.navigation_controller', ['theme.core.services'])
  .controller('NavigationController', ['apiService','$scope', '$location', '$timeout', function(apiService,$scope, $location, $timeout) {
    'use strict';
    var urlLocations="/locations";
  //   var locacion = new Firebase('https://formacret.firebaseio.com/locaciones/san_luis');
  //   // download the data into a local object
  //   // create a synchronized array
  //  // click on `index.html` above to see it used in the DOM!
  //  $scope.messages = $firebaseArray(locacion);
    var menuPs=[{
      label: 'Inicio',
      iconClasses: '',
      separator:true
    },{
      label: 'Productos',
      iconClasses: 'fa fa-check-circle',
      url: '#/app-vistaProductos'
    },{
      label: 'Marcas',
      url: '#/app-vistaMarcas',
      iconClasses: 'fa fa-tag'
    },
    {
      label: 'Proveedores',
      url: '#/app-vistaProveedor',
      iconClasses: 'fa fa-truck'
    }, 
    {
      label: 'Clientes',
      iconClasses: 'fa fa-users',
      url: '#/app-vistaClientes',
    },{
      label: 'Locaciones',
      iconClasses: '',
      separator:true
    }];
  apiService.getData(urlLocations).then(function(response) {
    $scope.Locaciones=response.data;
    angular.forEach(response.data,function(value,key){
      var data={
        label: value.name,
        iconClasses: 'fa fa-map',
        url:'',
        children: []
      };
      angular.forEach(value.warehouses,function(value2,key){
        //console.log(value2);
        if(value2.name!="Global")
        {
          var almacenes={
            label: value2.name,
            url: '#/app-vistaAlmacen/'+value2.id
          }
        }
        else
        {
          var almacenes={
            label: value2.name,
            url: '#/app-vistaLocacion/'+value.id
          }  
        }
        data.children.push(almacenes);
      });
      menuPs.push(data);
    });
    var menuFaltante= [{
      label: 'Nueva Locacion',
      iconClasses: 'fa fa-plus',
      url:'#/app-nuevaLocacion'
    },{
      label: 'Ordenes',
      iconClasses: '',
      separator:true
    }, {
      label: 'Venta',
      iconClasses: 'fa fa-shopping-cart',
      url: '#/app-vistaOrdenesVenta',
    }, {
      label: 'Compra',
      iconClasses: 'fa fa-level-up ',
      url: '#/app-vistaOrdenesCompra',
    }, {
      label: 'Prestamos',
      iconClasses: 'fa fa-share ',
      url: '#/app-vistaPrestamos',
    }, {
      label: 'Transferencias',
      iconClasses: 'fa fa-paper-plane-o ',
      url: '#/app-vistaTransferencias',
    },{
      label: 'Ajuste',
      iconClasses: ' fa fa-level-down',
      url: '#/app-vistaOrdenesAjuste',
    }];
    angular.forEach(menuFaltante,function(value3,key){
      menuPs.push(value3);
    });
    
  });

    $scope.menu = menuPs;/*[{
      label: 'Inicio',
      iconClasses: '',
      separator:true
    }, {
      label: 'Productos',
      iconClasses: 'fa fa-check-circle',
      url: '#/app-vistaProductos',
    }, {
      label: 'Clientes',
      iconClasses: 'fa fa-users',
      url: '#/app-vistaClientes',
    },{
      label: 'Locaciones',
      iconClasses: '',
      separator:true
    },{
      label: 'San Luis Potosí',
      iconClasses: '',
      url:'',
      children: [{
        label: 'Global',
        url: '#/app-vistaLocacion/1',
      }, {
        label: 'Herramientas',
        url: '#/app-vistaAlmacen/5'
      },{
        label: 'Materiales',
        url: '#/app-vistaAlmacen/6'
      },{
        label: 'Moldes',
        url: '#/app-vistaAlmacen/7'
      }]
    }, {
      label: 'Cancun',
      iconClasses: '',
      url:'#/',
    }, {
      label: 'Ordenes',
      iconClasses: '',
      separator:true
    }, {
      label: 'Venta',
      iconClasses: '',
      url: '#/',
    }, {
      label: 'Compra',
      iconClasses: '',
      url: '#/app-vistaOrdenesCompra',
    }, {
      label: 'Prestamos',
      iconClasses: '',
      url: '#/',
    }, {
      label: 'Transferencias',
      iconClasses: '',
      url: '#/',
    }, {
      label: 'Devolución',
      iconClasses: '',
      url: '#/',
    }, {
      label: 'Transferencias',
      iconClasses: '',
      url: '#/',
    }, {
      label: 'Ajuste',
      iconClasses: '',
      url: '#/',
    }, {
      label: 'Admin',
      iconClasses: '',
      separator:true
    },{
      label: 'Dashboard',
      iconClasses: 'fa fa-home',
      url: '#/',
    }, {
      label: 'HTML Version',
      iconClasses: 'fa fa-code',
      url: '../../',
    }, {
      label: 'Layouts',
      iconClasses: 'fa fa-columns',
      html: '<span class="badge badge-info">2</span>',
      children: [{
        label: 'Grid Scaffolding',
        url: '#/layout-grid',
      }, {
        label: 'Boxed',
        url: '#/layout-boxed'
      }]
    }, {
      label: 'Base Styles',
      iconClasses: 'fa fa-flask',
      children: [{
        label: 'Typography',
        url: '#/ui-typography'
      }, {
        label: 'Buttons',
        url: '#/ui-buttons'
      }, {
        label: 'Font Icons',
        url: '#/ui-icons-fontawesome',
      }]
    }, {
      label: 'Bootstrap',
      iconClasses: 'fa fa-cogs',
      html: '<span class="label label-info">UI</span>',
      children: [{
        label: 'Modals',
        url: '#/ui-modals'
      }, {
        label: 'Progress Bars',
        url: '#/ui-progressbars'
      }, {
        label: 'Pagination',
        url: '#/ui-paginations'
      }, {
        label: 'Breadcrumbs',
        url: '#/ui-breadcrumbs'
      }, {
        label: 'Labels & Badges',
        url: '#/ui-labelsbadges',
      }, {
        label: 'Alerts',
        url: '#/ui-alerts',
      }, {
        label: 'Tabs',
        url: '#/ui-tabs',
      }, {
        label: 'Wells',
        url: '#/ui-wells'
      }, {
        label: 'Carousel',
        url: '#/ui-imagecarousel'
      }]
    }, {
      label: 'Plugins',
      iconClasses: '',
      separator: true
    }, {
      label: 'Components',
      iconClasses: 'fa fa-random',
      children: [{
        label: 'Tiles',
        url: '#/ui-tiles'
      }, {
        label: 'Bootbox',
        url: '#/components-bootbox'
      }, {
        label: 'Pines Notifications',
        url: '#/components-notifications'
      }, {
        label: 'Sliders & Ranges',
        url: '#/ui-sliders',
      }, {
        label: 'Pulsating Elements',
        url: '#/components-pulsate'
      }, {
        label: 'jQuery Knob',
        url: '#/components-knob'
      }]
    }, {
      label: 'Forms',
      iconClasses: 'fa fa-pencil',
      children: [{
        label: 'Form Layout',
        url: '#/form-layout',
      }, {
        label: 'Components',
        url: '#/form-components',
      }, {
        label: 'Pickers',
        url: '#/form-pickers'
      }, {
        label: 'Form Wizard',
        url: '#/form-wizard'
      }, {
        label: 'Validation',
        url: '#/form-validation',
      }, {
        label: 'Form Masks',
        url: '#/form-masks'
      }, {
        label: 'Advanced Uploaders',
        url: '#/form-fileupload',
      }, {
        label: 'WYSIWYG Editor',
        url: '#/form-wysiwyg',
      }, {
        label: 'Inline Editor',
        url: '#/form-xeditable',
      }]
    }, {
      label: 'Tables',
      iconClasses: 'fa fa-table',
      children: [{
        label: 'Tables',
        url: '#/tables-basic'
      }, {
        label: 'ngGrid',
        url: '#/tables-data',
      }, {
        label: 'Responsive Tables',
        url: '#/tables-responsive'
      }, {
        label: 'Editable Tables',
        url: '#/tables-editable',
      }]
    }, {
      label: 'Panels',
      iconClasses: 'fa fa-cog fa-spin',
      hideOnHorizontal: true,
      url: '#/ui-advancedpanels'
    }, {
      label: 'Analytics',
      iconClasses: 'fa fa-bar-chart-o',
      hideOnHorizontal: true,
      children: [{
        label: 'Flot',
        url: '#/charts-flot',
      }, {
        label: 'Chartist',
        url: '#/charts-chartist'
      }, {
        label: 'Morris.js',
        url: '#/charts-morrisjs'
      }, {
        label: 'Easy Pie Chart',
        url: '#/charts-easypiechart'
      }, {
        label: 'Sparklines',
        url: '#/charts-sparklines',
      }]
    }, {
      label: 'Maps',
      iconClasses: 'fa fa-map-marker',
      hideOnHorizontal: true,
      children: [{
        label: 'Google Maps',
        url: '#/maps-google'
      }, {
        label: 'Vector Maps',
        url: '#/maps-vector',
      }]
    }, {
      label: 'Pages',
      iconClasses: 'fa fa-files-o',
      hideOnHorizontal: true,
      children: [{
        label: 'Profile',
        url: '#/extras-profile'
      }, {
        label: 'Messages',
        url: '#/extras-messages'
      }, {
        label: 'Pricing Tables',
        url: '#/extras-pricingtable'
      }, {
        label: 'Timeline',
        url: '#/extras-timeline'
      }, {
        label: 'Invoice',
        url: '#/extras-invoice'
      }]
    }, {
      label: 'Extras',
      iconClasses: 'fa fa-briefcase',
      hideOnHorizontal: true,
      children: [{
        label: 'FAQ',
        url: '#/extras-faq',
      }, {
        label: 'Registration',
        url: '#/extras-registration'
      }, {
        label: 'Password Reset',
        url: '#/extras-forgotpassword'
      }, {
        label: 'Login',
        url: '#/extras-login'
      }, {
        label: '404 Page',
        url: '#/extras-404'
      }, {
        label: '500 Page',
        url: '#/extras-500'
      }]
    }, {
      label: 'Multiple Levels',
      iconClasses: 'fa fa-sitemap',
      hideOnHorizontal: true,
      children: [{
        label: 'Menu Item 1',
      }, {
        label: 'Menu Item 2',
        children: [{
          label: 'Deeper',
          children: [{
            label: 'Deeper Yet!'
          }]
        }]
      }]
    }, {
      label: 'Functional Apps',
      hideOnHorizontal: true,
      separator: true
    }, {
      label: 'Inbox',
      iconClasses: 'fa fa-inbox',
      url: '#/inbox',
      html: '<span class="badge badge-danger">3</span>'
    }, {
      label: 'Tasks',
      iconClasses: 'fa fa-tasks',
      url: '#/app-tasks',
      html: '<span class="badge badge-warning">1</span>'
    }, {
      label: 'Notes',
      iconClasses: 'fa fa-pencil-square-o',
      url: '#/app-notes',
    }, {
      label: 'To-do',
      iconClasses: 'fa fa-check',
      url: '#/app-todo',
    }];*/

    var setParent = function(children, parent) {
      angular.forEach(children, function(child) {
        child.parent = parent;
        if (child.children !== undefined) {
          setParent(child.children, child);
        }
      });
    };

    $scope.findItemByUrl = function(children, url) {
      for (var i = 0, length = children.length; i < length; i++) {
        if (children[i].url && children[i].url.replace('#', '') === url) {
          return children[i];
        }
        if (children[i].children !== undefined) {
          var item = $scope.findItemByUrl(children[i].children, url);
          if (item) {
            return item;
          }
        }
      }
    };

    setParent($scope.menu, null);

    $scope.openItems = []; $scope.selectedItems = []; $scope.selectedFromNavMenu = false;

    $scope.select = function(item) {
      // close open nodes
      if (item.open) {
        item.open = false;
        return;
      }
      for (var i = $scope.openItems.length - 1; i >= 0; i--) {
        $scope.openItems[i].open = false;
      }
      $scope.openItems = [];
      var parentRef = item;
      while (parentRef !== null) {
        parentRef.open = true;
        $scope.openItems.push(parentRef);
        parentRef = parentRef.parent;
      }

      // handle leaf nodes
      if (!item.children || (item.children && item.children.length < 1)) {
        $scope.selectedFromNavMenu = true;
        for (var j = $scope.selectedItems.length - 1; j >= 0; j--) {
          $scope.selectedItems[j].selected = false;
        }
        $scope.selectedItems = [];
        parentRef = item;
        while (parentRef !== null) {
          parentRef.selected = true;
          $scope.selectedItems.push(parentRef);
          parentRef = parentRef.parent;
        }
      }
    };

    $scope.highlightedItems = [];
    var highlight = function(item) {
      var parentRef = item;
      while (parentRef !== null) {
        if (parentRef.selected) {
          parentRef = null;
          continue;
        }
        parentRef.selected = true;
        $scope.highlightedItems.push(parentRef);
        parentRef = parentRef.parent;
      }
    };

    var highlightItems = function(children, query) {
      angular.forEach(children, function(child) {
        if (child.label.toLowerCase().indexOf(query) > -1) {
          highlight(child);
        }
        if (child.children !== undefined) {
          highlightItems(child.children, query);
        }
      });
    };

    // $scope.searchQuery = '';
    $scope.$watch('searchQuery', function(newVal, oldVal) {
      var currentPath = '#' + $location.path();
      if (newVal === '') {
        for (var i = $scope.highlightedItems.length - 1; i >= 0; i--) {
          if ($scope.selectedItems.indexOf($scope.highlightedItems[i]) < 0) {
            if ($scope.highlightedItems[i] && $scope.highlightedItems[i] !== currentPath) {
              $scope.highlightedItems[i].selected = false;
            }
          }
        }
        $scope.highlightedItems = [];
      } else
      if (newVal !== oldVal) {
        for (var j = $scope.highlightedItems.length - 1; j >= 0; j--) {
          if ($scope.selectedItems.indexOf($scope.highlightedItems[j]) < 0) {
            $scope.highlightedItems[j].selected = false;
          }
        }
        $scope.highlightedItems = [];
        highlightItems($scope.menu, newVal.toLowerCase());
      }
    });

    $scope.$on('$routeChangeSuccess', function() {
      if ($scope.selectedFromNavMenu === false) {
        var item = $scope.findItemByUrl($scope.menu, $location.path());
        if (item) {
          $timeout(function() {
            $scope.select(item);
          });
        }
      }
      $scope.selectedFromNavMenu = false;
      $scope.searchQuery = '';
    });
  }]);
