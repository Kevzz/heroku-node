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
		this.$http.post(url,data);
		return this.$http.get(url);
		
	}
	ApiService.prototype.deleteData=function(url,id)
	{
		this.$http.delete(url+"/"+id);
		return this.$http.get(url);
		
	}
	ApiService.prototype.putData=function(url,id,data)
	{
		this.$http.put(url+"/"+id,data);
		return this.$http.get(url);
	}
}]);
