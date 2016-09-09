angular.module('theme.core.services')
  .service('recentService',['$http' ,function ApiService($http) {
    'use strict';
	RecentService.prototype.getRecent = function(prod) {
    var tmp;
    var tmp1;
    //console.log(prod.length);
    if(prod.length==1)
    {
      console.log(prod[0].id);
      return prod[0].id;
    }
    else
    {
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
            mayor=tmp;
            id=prod[i].id;
          }
          else if(tmp<mayor)
          {
            continue;
          }
          else if(tmp=mayor)
          {
            continue;
          }
        }
      }
      return id;
    }
	};
}]);
