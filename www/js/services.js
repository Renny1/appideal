angular.module('starter.services', [])
.constant("URL", "http://192.168.1.219/wordpress/")
/*?json=get_posts&category_name=usuario_app*/
.service('PostService', function($q, $http, $ionicLoading, URL) {

  return {

    Post: function(url_caminho,params) {

      var deferred = $q.defer();
      var promise = deferred.promise;
      var url =  URL + url_caminho;

      $http.post(url, params)
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