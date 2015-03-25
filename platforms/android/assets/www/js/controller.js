angular.module('starter.controllers', ['ionic'])
  .filter('trustAsHtml', function($sce) {
    return $sce.trustAsHtml;
  })
  .controller('LoginCtrl', function($scope, PostService, $ionicPopup, $state, $http, IDEALFactory, $ionicLoading) {
    $scope.data = {};

    $scope.data.persistente = false;
    $scope.login = function() {
      $ionicLoading.show({
        template: 'Carregando...'
      });
      /*    PostService.post($scope.data.username, $scope.data.password).success(function(data) {

            IDEALFactory.setUser({
              'username': $scope.data.username
            }, true);


            $ionicLoading.hide();
            $state.go('home');
          }).error(function(data) {
            $ionicLoading.hide();
            var alertPopup = $ionicPopup.alert({
              title: 'Falha no login!',
              template: 'Por favor, cheque sua conexão!'
            });
          });
      */
      $state.go("main");
    }

    $scope.forget = function() {
      /* window.open('http://conexaojbs.agencianuts.com.br/i-o/lostpassword/','_blank', 'location=no');*/
    };

  })
  .controller('EsqueceuSenhaCtrl', function($scope, $state, $ionicLoading, IDEALFactory, $rootScope, $ionicViewService) {

  $scope.esqueceusenha = function() {
       $state.go("esqueceusenha");
    };

  })
  .controller('MainCtrl', function($scope, $state, $ionicLoading, IDEALFactory, $rootScope, $ionicViewService) {

    $scope.getBack = function() {
      $state.go("login");
    }
    $ionicLoading.hide({
      template: 'Carregando...'
    });


  })
  .controller('InternoCtrl', function($scope, $state, $ionicLoading, IDEALFactory, $rootScope, $stateParams, $ionicViewService) {
    $scope.getBack = function() {
      $ionicViewService.getBackView().go();
    }
    $scope.page = $stateParams.page;
    var arrayItems = [
      ["Teste", "economico", "20/05"],
      ["Teste", "economico", "20/05"],
      ["Teste", "economico", "20/05"]
    ];


    $scope.items = arrayItems;

  })


.controller('AcordionCtrl', function($scope, $state, $ionicLoading, IDEALFactory, $rootScope, $ionicViewService) {
    $scope.page = "guia";

    $scope.getBack = function() {
      $ionicViewService.getBackView().go();
    }

    // $scope.page = "briefing";
    $scope.groups = [];
    for (var i = 0; i < 10; i++) {
      $scope.groups[i] = {
        name: i,
        items: []
      };
      for (var j = 0; j < 8; j++) {
        $scope.groups[i].items.push(i + '-' + j);
      }
    }
    $scope.toggleGroup = function(group) {
      if ($scope.isGroupShown(group)) {
        $scope.shownGroup = null;
      } else {
        $scope.shownGroup = group;
      }
    };
    $scope.isGroupShown = function(group) {
      return $scope.shownGroup === group;
    };


    /*
    <ion-item class="item-stable"
                ng-click="toggleGroup(group)"
                ng-class="{active: isGroupShown(group)}">
          <i class="icon" ng-class="isGroupShown(group) ? 'ion-minus' : 'ion-plus'"></i>
        &nbsp;
        Group {{group.name}}
      </ion-item>
      <ion-item class="item-accordion"
                ng-repeat="item in group.items"
                ng-show="isGroupShown(group)">
        {{item}}
      </ion-item>
    //*/
  })
  .controller('NotesCtrl', function($scope, $state, $ionicLoading, IDEALFactory, $rootScope, $stateParams, $ionicViewService) {

    $scope.getBack = function() {
      $ionicViewService.getBackView().go();
    }
    $scope.id = $stateParams.id;
    console.log($scope.id);

    $scope.page = $stateParams.page;



    // $scope.page = "briefing";
    $scope.groups = [];
    for (var i = 0; i < 10; i++) {
      $scope.groups[i] = {
        name: i,
        items: []
      };
      for (var j = 0; j < 8; j++) {
        $scope.groups[i].items.push(i + '-' + j);
      }
    }
    $scope.toggleGroup = function(group) {
      if ($scope.isGroupShown(group)) {
        $scope.shownGroup = null;
      } else {
        $scope.shownGroup = group;
      }
    };
    $scope.isGroupShown = function(group) {
      return $scope.shownGroup === group;
    };

  });