angular.module('starter.controllers',['ionic'])

.controller('LoginCtrl', function($scope, PostService, $ionicPopup, $state, $http, IDEALFactory, $ionicLoading) {
    $scope.data = {};

    $scope.data.persistente = false;
    $scope.login = function() {
        $ionicLoading.show({template: 'Carregando...'});
        PostService.post($scope.data.username, $scope.data.password).success(function(data) {

            IDEALFactory.setUser({
                'username' : $scope.data.username
            },true);

            
            $ionicLoading.hide();
            $state.go('home');
        }).error(function(data) {
            $ionicLoading.hide();
            var alertPopup = $ionicPopup.alert({
                title: 'Falha no login!',
                template: 'Por favor, cheque sua conexão!'
            });
        });

    }

    $scope.forget = function(){
     /* window.open('http://conexaojbs.agencianuts.com.br/i-o/lostpassword/','_blank', 'location=no');*/
 };

})

.controller('MainCtrl', function($scope, $state, $ionicLoading, IDEALFactory, $rootScope) {


});