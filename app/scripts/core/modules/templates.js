/* jshint ignore:start */
angular.module('theme.core.templates', []).run(['$templateCache', function ($templateCache) {
  'use strict';

  $templateCache.put('templates/nav_renderer.html',
    "<span ng-if=\"item.separator==true\">{{item.label}}</span>\r" +
    "\n" +
    "<a ng-if=\"!item.separator\" ng-click=\"select(item)\" ng-href=\"{{item.url}}\">\r" +
    "\n" +
    "  <i ng-if=\"item.iconClasses\" class=\"{{item.iconClasses}}\"></i><span>{{item.label}}</span>\r" +
    "\n" +
    "  <span ng-bind-html=\"item.html\"></span>\r" +
    "\n" +
    "</a>\r" +
    "\n" +
    "<ul ng-if=\"item.children.length\" data-slide-out-nav=\"item.open || (searchQuery.length>0 && item.selected)\">\r" +
    "\n" +
    "    <li ng-repeat=\"item in item.children\"\r" +
    "\n" +
    "      ng-class=\"{ hasChild: (item.children!==undefined),\r" +
    "\n" +
    "                      active: item.selected,\r" +
    "\n" +
    "                        open: (item.children!==undefined) && item.open,\r" +
    "\n" +
    "              'search-focus': (searchQuery.length>0 && item.selected) }\"\r" +
    "\n" +
    "    ng-show=\"!(searchQuery.length>0 && !item.selected)\"\r" +
    "\n" +
    "      ng-include=\"'templates/nav_renderer.html'\"\r" +
    "\n" +
    "    ></li>\r" +
    "\n" +
    "</ul>"
  );


  $templateCache.put('templates/nav_renderer_horizontal.html',
    "<a ng-click=\"select(item)\" ng-href=\"{{item.url}}\">\r" +
    "\n" +
    "\t<i ng-if=\"item.iconClasses\" class=\"{{item.iconClasses}}\"></i><span>{{item.label}}</span>\r" +
    "\n" +
    "</a>\r" +
    "\n" +
    "<ul ng-if=\"item.children.length\" class=\"dropdown-menu\">\r" +
    "\n" +
    "\t<li ng-repeat=\"item in item.children\"\r" +
    "\n" +
    "    \tng-class=\"{ hasChild: (item.children!==undefined),\r" +
    "\n" +
    "        \t\t\t  active: item.selected,\r" +
    "\n" +
    "\t\t\t\t\t\topen: (item.children!==undefined) && item.open }\"\r" +
    "\n" +
    "      ng-include=\"'templates/nav_renderer_horizontal.html'\"\r" +
    "\n" +
    "    ></li>\r" +
    "\n" +
    "</ul>\r" +
    "\n"
  );


  $templateCache.put('templates/panel-tabs-without-heading.html',
    "<div class=\"panel {{panelClass}}\">\r" +
    "\n" +
    "  <div class=\"panel-heading\" ng-attr-ng-drag-handle=\"{{draggable}}\">\r" +
    "\n" +
    "        <h2>\r" +
    "\n" +
    "            <ul class=\"nav nav-{{type || 'tabs'}}\" ng-class=\"{'nav-stacked': vertical, 'nav-justified': justified}\" ng-transclude></ul>\r" +
    "\n" +
    "        </h2>\r" +
    "\n" +
    "  </div>\r" +
    "\n" +
    "  <div class=\"panel-body\">\r" +
    "\n" +
    "    <div class=\"tab-content\">\r" +
    "\n" +
    "        <div class=\"tab-pane\"\r" +
    "\n" +
    "            ng-repeat=\"tab in tabs\"\r" +
    "\n" +
    "            ng-class=\"{active: tab.active}\"\r" +
    "\n" +
    "            tab-content-transclude=\"tab\">\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "  </div>\r" +
    "\n" +
    "</div>\r" +
    "\n"
  );


  $templateCache.put('templates/panel-tabs.html',
    "<div class=\"panel {{panelClass}}\">\r" +
    "\n" +
    "  <div class=\"panel-heading\" ng-attr-ng-drag-handle=\"{{draggable}}\">\r" +
    "\n" +
    "        <h2><i ng-if=\"panelIcon\" class=\"{{panelIcon}}\"></i>{{(panelIcon? \" \":\"\")+heading}}</h2>\r" +
    "\n" +
    "        <div class=\"panel-ctrls\">\r" +
    "\n" +
    "            <ul class=\"nav nav-{{type || 'tabs'}}\" ng-class=\"{'nav-stacked': vertical, 'nav-justified': justified}\" ng-transclude></ul>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "  </div>\r" +
    "\n" +
    "  <div class=\"panel-body\">\r" +
    "\n" +
    "    <div class=\"tab-content\">\r" +
    "\n" +
    "        <div class=\"tab-pane\"\r" +
    "\n" +
    "            ng-repeat=\"tab in tabs\"\r" +
    "\n" +
    "            ng-class=\"{active: tab.active}\"\r" +
    "\n" +
    "            tab-content-transclude=\"tab\">\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "  </div>\r" +
    "\n" +
    "</div>\r" +
    "\n"
  );


  $templateCache.put('templates/panel.html',
    "<div class=\"panel {{panelClass}}\">\r" +
    "\n" +
    "  <div class=\"panel-heading\">\r" +
    "\n" +
    "        <h2><i ng-if=\"panelIcon\" class=\"{{panelIcon}}\"></i>{{(panelIcon? \" \":\"\")+heading}}</h2>\r" +
    "\n" +
    "        <div class=\"panel-ctrls\">\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "  </div>\r" +
    "\n" +
    "  <div class=\"panel-body\" ng-transclude>\r" +
    "\n" +
    "  </div>\r" +
    "\n" +
    "</div>\r" +
    "\n"
  );


  $templateCache.put('templates/themed-tabs-bottom.html',
    "<div class=\"tab-container tab-{{theme || 'primary'}} tab-{{position || 'normal'}}\">\r" +
    "\n" +
    "  <div class=\"tab-content\">\r" +
    "\n" +
    "    <div class=\"tab-pane\"\r" +
    "\n" +
    "        ng-repeat=\"tab in tabs\"\r" +
    "\n" +
    "        ng-class=\"{active: tab.active}\"\r" +
    "\n" +
    "        tab-content-transclude=\"tab\">\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "  </div>\r" +
    "\n" +
    "  <ul class=\"nav nav-{{type || 'tabs'}}\" ng-class=\"{'nav-stacked': vertical, 'nav-justified': justified}\" ng-transclude></ul>\r" +
    "\n" +
    "</div>\r" +
    "\n"
  );


  $templateCache.put('templates/themed-tabs.html',
    "<div class=\"tab-container tab-{{theme || 'primary'}} tab-{{position || 'normal'}}\">\r" +
    "\n" +
    "  <ul class=\"nav nav-{{type || 'tabs'}}\" ng-class=\"{'nav-stacked': vertical, 'nav-justified': justified}\" ng-transclude></ul>\r" +
    "\n" +
    "  <div class=\"tab-content\">\r" +
    "\n" +
    "    <div class=\"tab-pane\"\r" +
    "\n" +
    "        ng-repeat=\"tab in tabs\"\r" +
    "\n" +
    "        ng-class=\"{active: tab.active}\"\r" +
    "\n" +
    "        tab-content-transclude=\"tab\">\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "  </div>\r" +
    "\n" +
    "</div>\r" +
    "\n"
  );


  $templateCache.put('templates/tile-large.html',
    "<a class=\"info-tile tile-{{item.color}}\" ng-href=\"{{item.href}}\">\r" +
    "\n" +
    "    <div class=\"tile-heading\">\r" +
    "\n" +
    "        <span>{{item.title}}</span>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "    <div class=\"tile-icon\">\r" +
    "\n" +
    "    \t<i class=\"{{item.classes}}\"></i>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "    <div class=\"tile-body\">\r" +
    "\n" +
    "        <span ng-show=\"item.text\">{{item.text}}</span>\r" +
    "\n" +
    "        <span ng-show=\"!item.text\" ng-transclude></span>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "    <div class=\"tile-footer\">\r" +
    "\n" +
    "\t    <span class=\"text-{{item.infoClass}}\">{{item.titleBarInfo}}</span>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</a>\r" +
    "\n"
  );
}])
/* jshint ignore:end */