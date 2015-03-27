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
      var url = "?json=get_posts&category_name=usuario_app&include=custom_fields,categories";
      /*      var param = {
              user: $scope.data.username,
              senha: $scope.data.password
            };*/

      PostService.Post(url).success(function(data) {
        var email = $scope.data.email;
        var senha = $scope.data.password;
        for (var i = 0; i < data.posts.length; i++) {
          if (data.posts[i].custom_fields.email == email && data.posts[i].custom_fields.pass == senha) {
            var categorias = data.posts[i].categories;
            /*console.log(data.posts[i].custom_fields);*/
            var empresa;
            for (var n = 0; n < categorias.length; n++) {
              /*console.log(categorias[n]);*/
              if (categorias[n].slug != "usuario_app") {
                empresa = categorias[n].slug;
              }
            };
            var infoUser = {
              login: data.posts[i].custom_fields.login[0],
              email: data.posts[i].custom_fields.email[0],
              status: data.posts[i].custom_fields.status[0],
              empresa: empresa
            };
            IDEALFactory.setInfoUser({
              'infoUser': infoUser
            }, true);
            console.log(IDEALFactory.getInfoUser());
            $ionicLoading.hide();
            $state.go('main');
            break;
          } else {
            if (i == (data.posts.length - 1)) {
              $ionicLoading.hide();
              var alertPopup = $ionicPopup.alert({
                title: 'Usuário ou senha inválidos!',
                template: 'Por favor, cheque sua conexão!'
              });
            }


          }
        };

      }).error(function(data) {
        $ionicLoading.hide();
        var alertPopup = $ionicPopup.alert({
          title: 'Falha no login!',
          template: 'Por favor, cheque sua conexão!'
        });
      });

      /*  $state.go("main");*/
    };

    $scope.forget = function() {
      /* window.open('http://conexaojbs.agencianuts.com.br/i-o/lostpassword/','_blank', 'location=no');*/
    };
    $scope.esqueceusenha = function() {
      $state.go("esqueceusenha");
    };

  })
  .controller('EsqueceuSenhaCtrl', function($scope, $state, $ionicLoading, IDEALFactory, $rootScope, $ionicViewService) {
    $scope.enviarPedido = function() {
      $state.go('login');
    }

  })
  .controller('MainCtrl', function($scope, $state, $ionicLoading, IDEALFactory, $rootScope, $ionicViewService) {


    $scope.getBack = function() {
      var infoUser = {};
      IDEALFactory.setInfoUser({
        'infoUser': infoUser
      }, true);
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


.controller('AcordionCtrl', function($scope, $state, $ionicLoading, IDEALFactory, $rootScope, $ionicViewService, $stateParams) {


    $scope.page = $stateParams.page;

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


    $scope.titulo = "<h1>cabeçalho notes</h1>";
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

  })

.controller('ContatoCtrl', function($scope, $state, $ionicLoading, IDEALFactory, $rootScope, $stateParams, $ionicViewService) {
  $scope.groups = [];
  for (var i = 0; i < 10; i++) {
    $scope.groups[i] = {
      name: 'Renan',
      cargo: (i % 2) ? null : 'SEO',
      phone: '+55 11 9 9999-9999',
      email: 'thiago@mobint.com.br'
    };
  }

  $scope.getBack = function() {
    $ionicViewService.getBackView().go();
  }


});