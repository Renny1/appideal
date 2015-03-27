angular.module('starter.controllers', ['ionic'])
  .filter('trustAsHtml', function($sce) {
    return $sce.trustAsHtml;
  })
  .controller('LoginCtrl', function($scope, PostService, $ionicPopup, $state, $http, IDEALFactory, $ionicLoading, $rootScope) {


    $rootScope.$on('$stateChangeSuccess',
      function(event, toState, toParams, fromState, fromParams) {
        console.log(toState);
        $scope.state = toState.name;
        if (toState.name == "login") {
          var user = IDEALFactory.getInfoUser();
          console.log(user.infoUser.login);
          if (typeof user.infoUser.login !== 'undefined' && user.infoUser.login !== null) {
            $state.go('main');
          }
        }
      });

    $scope.data = {};
    $scope.data.persistente = true;
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
              // navigator.notification.alert("Usuário ou senha inválidos!", "alertCallback", "[title]", "OKZ")
              alert("Usuário ou senha inválidos!");
              /*              var alertPopup = $ionicPopup.alert({
                              title: 'Usuário ou senha inválidos!',
                              template: 'Por favor, cheque sua conexão!'
                            });*/
            }


          }
        };

      }).error(function(data) {
        $ionicLoading.hide();
        alert("Falha no login, cheque sua conexão!");
        /*        var alertPopup = $ionicPopup.alert({
                  title: 'Falha no login!',
                  template: 'Por favor, cheque sua conexão!'
                });*/
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
    $scope.guia = function() {

      $ionicLoading.show({
        template: 'Carregando...'
      });
      $state.go('acordion', {
        'page': 'guia'
      });
    }
    $scope.informacoes = function() {

      $ionicLoading.show({
        template: 'Carregando...'
      });
      $state.go('interno', {
        'page': 'informacoes'
      });
    }
    $scope.briefings = function() {

      $ionicLoading.show({
        template: 'Carregando...'
      });
      $state.go('interno', {
        'page': 'briefings'
      });
    }
    $scope.contato = function() {
      $ionicLoading.show({
        template: 'Carregando...'
      });
      $state.go('contato');
    }

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
    var user = IDEALFactory.getInfoUser();
    $scope.username = user.infoUser.login;


  })
  .controller('InternoCtrl', function($scope, $state, $ionicLoading, IDEALFactory, $rootScope, $stateParams, $ionicViewService, PostService) {

    $scope.page = $stateParams.page;

    var user = IDEALFactory.getInfoUser();
    console.log(user);

    var url = "?json=get_posts&category_name=" + $stateParams.page + "+" + user.infoUser.empresa + "&include=custom_fields";
    PostService.Post(url).success(function(data) {
      console.log(data);
      IDEALFactory.setInfoInterno(data.posts, false);
      $scope.groups = [];
      for (var i = 0; i < data.posts.length; i++) {
        $scope.groups[i] = {
          index: i,
          data: ($stateParams.page == 'briefings') ? data.posts[i].custom_fields.data[0] : "",
          title: ($stateParams.page == 'briefings') ? data.posts[i].custom_fields.titulo_briefing[0] : data.posts[i].custom_fields.titulo_informacoes[0]
        };

      }

      $ionicLoading.hide();

    }).error(function(data) {
      $ionicLoading.hide();
    });

    // $scope.items = arrayItems;

    $scope.getBack = function() {
      $ionicViewService.getBackView().go();
    }
  })


.controller('AcordionCtrl', function($scope, $state, $ionicLoading, IDEALFactory, $rootScope, $ionicViewService, $stateParams, PostService) {

    $scope.page = $stateParams.page;

    $scope.getBack = function() {
      $ionicViewService.getBackView().go();
    }
    var url = "?json=get_posts&category_name=guia";
    PostService.Post(url).success(function(data) {
      console.log(data);
      $scope.groups = [];
      for (var i = 0; i < data.posts.length; i++) {
        $scope.groups[i] = {
          name: data.posts[i].title,
          items: data.posts[i].content
        };
        $ionicLoading.hide();
      }
    }).error(function(data) {
      $ionicLoading.hide();
    });
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
  .controller('NotesCtrl', function($scope, $state, $ionicLoading, IDEALFactory, $rootScope, $stateParams, $ionicViewService) {

    $scope.getBack = function() {
      $ionicViewService.getBackView().go();
    }
    $scope.id = $stateParams.id;


    var infosInterno = IDEALFactory.getInfoInterno($scope.id);

    console.log(infosInterno);

    $scope.page = $stateParams.page;

    if ($scope.page == "briefings") {
      var cabecalho = infosInterno[0].custom_fields.titulo_briefing[0] + "<br/>" + infosInterno[0].custom_fields.data[0] + "<br/>" + infosInterno[0].custom_fields.forma[0] + "<br/>" //+infosInterno[0].custom_fields.contato[0] + "<br/>";
      $scope.titulo = cabecalho;
    } else {
      $scope.titulo = infosInterno[0].custom_fields.cabecalho[0];
    }
    // $scope.page = "briefing";
    $scope.groups = [];
    for (var i = 0; i < infosInterno.length; i++) {
      for (var j = 0; j < infosInterno[0].custom_fields.titulo.length; j++) {
        var custom_fields = infosInterno[0].custom_fields;
        $scope.groups[j] = {
          title: custom_fields.titulo[j],
          valor: custom_fields.valor[j]
        };
      };
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

.controller('ContatoCtrl', function($scope, $state, $ionicLoading, IDEALFactory, PostService, $rootScope, $stateParams, $ionicViewService) {

  $scope.groups = [];
  var user = IDEALFactory.getInfoUser();
  var url = "?json=get_posts&category_name=contatos+" + user.infoUser.empresa + "&include=custom_fields";
  PostService.Post(url).success(function(data) {
    console.log(data);
    $scope.groups = [];
    for (var i = 0; i < data.posts.length; i++) {
      $scope.groups[i] = {
        name: data.posts[i].custom_fields.nome[0],
        cargo: data.posts[i].custom_fields.cargo[0],
        phone: data.posts[i].custom_fields.telefone[0],
        email: data.posts[i].custom_fields.email[0]
      };
    }
    $ionicLoading.hide();
  }).error(function(data) {
    $ionicLoading.hide();
  });
  $scope.getBack = function() {
    $ionicViewService.getBackView().go();
  }


});