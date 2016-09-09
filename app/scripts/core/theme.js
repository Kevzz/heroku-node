angular.module('theme', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute',
    'ngAnimate',
    'easypiechart',
    'NgSwitchery',
    'ui.bootstrap',
    'ui.select',
    'ng-token-auth',
    'ui.router',
    'theme.core.templates',
    'theme.core.template_overrides',
    'theme.core.directives',
    'theme.core.main_controller',
    'theme.core.navigation_controller',
    'theme.core.products_controller',
    'theme.core.messages_controller',
    'theme.core.notifications_controller'
  ])
  .run(['$window', function ($window) {
    $window.ngGrid.config = {
        footerRowHeight: 40,
        headerRowHeight: 40,
        rowHeight: 40
    };
  }]);
