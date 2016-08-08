angular.module('theme.core.services')
  .service('apiService',['$http' ,function ApiService($http) {
    'use strict';
    this.$http = $http;
	//this.url = "/brands";

	ApiService.prototype.getData = function(url) {
		//console.log(url);
		return this.$http.get(url)
	};
	ApiService.prototype.getSingleData=function(url,id)
	{
		//console.log(url+"/"+id);
		return this.$http.get(url+"/"+id);
	}
	ApiService.prototype.postData= function(url,data)
	{
		return this.$http.post(url,data).then(function(response)
			{
				return $http.get(url);
			});
		
		
	}
	ApiService.prototype.postDataPrices= function(url,data)
	{
		this.$http.post(url,data);
	}
	ApiService.prototype.deleteData=function(url,id)
	{
		return this.$http.delete(url+"/"+id).then(function(response)
		{
			return $http.get(url);
		});		
	}
	ApiService.prototype.putData=function(url,id,data)
	{
		return this.$http.put(url+"/"+id,data).then(function(response)
		{
			return $http.get(url);
		});	
	}
	ApiService.prototype.putDataPrices=function(url,id,data)
	{
		this.$http.put(url+"/"+id,data);
	}
}]);
