angular.module('starter.services', [])
.constant("URL", "http://www.ideal.mobint.com.br/")

.service('PostService', function($q, $http, $ionicLoading, URL) {
  return {
    Post: function(url_caminho,params) {
      var deferred = $q.defer();
      var promise = deferred.promise;
      var url =  URL + url_caminho;

      $.post(url, params)
      .success(function(data) {
          deferred.resolve(data);
        }).error(function(err) {
          deferred.reject(err);
        })
        promise.success = function(fn) {
          promise.then(fn);
          return promise;
        }
        promise.error = function(fn) {
          promise.then(null, fn);
          return promise;
        }
        return promise;
      }     
    }
  })
;