angular.module('starter.controllers', ['ionic'])

.filter('trustAsHtml', function($sce) {
  return $sce.trustAsHtml;
})
.controller('LoginCtrl', function($scope, PostService, $ionicPopup, $state, $http, IDEALFactory, $ionicLoading, $rootScope) {
  var ipt_login = document.getElementById('input_mail');
  ipt_login.value = "";

  var ipt_pass= document.getElementById('input_pass');
  ipt_pass.value = "";

  $rootScope.$on('$stateChangeSuccess',
    function(event, toState, toParams, fromState, fromParams) {
      //console.log(toState);
      $scope.state = toState.name;
      if (toState.name == "login") {
        var user = IDEALFactory.getInfoUser();
        //console.log(user.infoUser.login);
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
    PostService.Post(url).success(function(data) {
      var email = $scope.data.email.toLowerCase();
      var senha = $scope.data.password.toLowerCase();
      for (var i = 0; i < data.posts.length; i++) {
        if (data.posts[i].custom_fields.email == email && data.posts[i].custom_fields.pass == senha) {
          var categorias = data.posts[i].categories;
          console.log(data.posts[i].custom_fields);
          var empresa;
          for (var n = 0; n < categorias.length; n++) {
            console.log(categorias[n]);
            if (categorias[n].slug != "usuario_app") {
              empresa = categorias[n].slug;
            }
          };
          var infoUser = {
            login: data.posts[i].custom_fields.login[0],
            email: data.posts[i].custom_fields.email[0],
            status: data.posts[i].custom_fields.status[0],
            empresa: empresa,
            id: data.posts[i].id
          };
          IDEALFactory.setInfoUser({
            'infoUser': infoUser
          }, true);
          //console.log(IDEALFactory.getInfoUser());
          $ionicLoading.hide();
          

          $state.go('main');
          break;
        } else {
          if (i >= (data.posts.length - 1)) {
            $ionicLoading.hide();
            var alertPopup = $ionicPopup.alert({
              title: 'Usuário ou senha inválidos!',
              template: 'Por favor, tente novamente!'
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
.controller('EsqueceuSenhaCtrl', function($scope, $state, PostService, $ionicPopup, $ionicLoading, IDEALFactory, $rootScope, $ionicViewService) {
  $scope.enviarPedido = function() {
    $ionicLoading.show({
      template: 'Carregando...'
    });
    var email = angular.element(document.getElementById("input_mail2"));
    console.log(email[0].value);
    var url = "/forget.php?mail=" + email[0].value;
    PostService.Post(url).success(function(data) {
      console.log(data);
      if (data = "ok") {
        $ionicLoading.hide();
        var alertPopup = $ionicPopup.alert({
          title: 'Email enviado',
          template: 'Por favor, cheque sue email!'
        });
        $state.go('login');
      } else{
        $ionicLoading.hide();
        var alertPopup = $ionicPopup.alert({
          title: 'Falha no envio!',
          template: 'Por favor, cheque sua conexão!'
        });
      };
    }).error(function(data) {
        $ionicLoading.hide();
        // alert("Falha no login, cheque sua conexão!");
                var alertPopup = $ionicPopup.alert({
                  title: 'Falha no envio!',
                  template: 'Por favor, cheque sua conexão!'
                });
      });
    
  }
})
.controller('MainCtrl', function($scope, $state, $ionicLoading, $localstorage, IDEALFactory, $rootScope, $ionicViewService, PostService, $ionicPopup) {
  $scope.guia = function() {

    // $ionicLoading.show({
    //   template: 'Carregando...'
    // });
    $state.go('acordion', {
      'page': 'guia'
    });
  }
  $scope.informacoes = function() {

    // $ionicLoading.show({
    //   template: 'Carregando...'
    // });
    $state.go('interno', {
      'page': 'informacoes'
    });
  }
  $scope.briefings = function() {

    // $ionicLoading.show({
    //   template: 'Carregando...'
    // });
    $state.go('interno', {
      'page': 'briefings'
    });
  }
  $scope.contato = function() {
    // $ionicLoading.show({
    //   template: 'Carregando...'
    // });
    $state.go('contato');
  }
  $scope.getBack = function() {
    var infoUser = {};
    IDEALFactory.setInfoUser({
      'infoUser': infoUser
    }, true);
    $localstorage.clear();
    $state.go("login");
  }
  // $ionicLoading.hide({
  //   template: 'Carregando...'
  // });
  var user = IDEALFactory.getInfoUser();
  $scope.username = user.infoUser.login;
  
  //verificar internet
  //var net = true;
  var net = window.navigator.onLine;
  if(net){
  $ionicLoading.show({
    template: 'Buscando novos conteúdos...'
  });
  var user = IDEALFactory.getInfoUser();
  var chamados ={
      guia :       "?json=get_posts&category_name=guia&include=custom_fields,categories",
      briefings:   "?json=get_posts&category_name=briefings&include=custom_fields",
      informacoes: "?json=get_posts&category_name=informacoes+"+ user.infoUser.empresa + "&include=custom_fields",
      contato:     "?json=get_posts&category_name=contatos+" + user.infoUser.empresa + "&include=custom_fields"
  };
  console.log(Object.keys(chamados));
  var Things = Object.keys(chamados);
  for (var i = 0; i < Things.length; i++) {
    var url = chamados[Things[i]];
    console.log(Things[i]);
      PostService.Post(url)
      .success(function(data) {
        IDEALFactory.setOffLine(data.query.category_name, data);
        if(i >= (Things.length-1)){ $ionicLoading.hide(); }
      })
      .error(function(data) {
        $ionicLoading.hide();
        // alert("Falha no login, cheque sua conexão!");
        var alertPopup = $ionicPopup.alert({
          title: 'Falha!',
          template: 'Por favor, cheque sua conexão!'
        });
      });   
    };
  }else{
    // var alertPopup = $ionicPopup.alert({
    //       title: 'Falha!',
    //       template: 'sem conexão! informações podem estar desatualizadas!'
    //     });
  }
})
.controller('InternoCtrl', function($scope, $state, $ionicLoading, IDEALFactory, $rootScope, $stateParams, $ionicViewService, PostService) {

  $scope.page = $stateParams.page;

    var user = IDEALFactory.getInfoUser();
    var info = $stateParams.page + (($stateParams.page == 'informacoes') ? " "+user.infoUser.empresa :  "");
    var data = IDEALFactory.getOffLine(info);
    console.log(data);
    if(data.count_total != 0){
      IDEALFactory.setInfoInterno(data.posts, false);
      $scope.groups = [];
      var count = 0;
      for (var i = 0; i < data.posts.length; i++) {
        //console.log((user.infoUser.id == data.posts[i].custom_fields.entrevistado) + " fields " + user.infoUser.id +"=="+ data.posts[i].custom_fields.entrevistado);
        console.log((user.infoUser.id == data.posts[i].custom_fields.entrevistado));
        console.log(i);
        if ($stateParams.page == 'briefings') {
          if(user.infoUser.id == data.posts[i].custom_fields.entrevistado){
            $scope.groups[count] = {
              indexStore: i,
              data: data.posts[i].custom_fields.data[0],
              title: data.posts[i].custom_fields.titulo_briefing[0]
            };
            count++;
          }
        }else if($stateParams.page == 'informacoes'){
          $scope.groups[count] = {
              indexStore: i,
              data: "",
              title: data.posts[i].custom_fields.titulo_informacoes[0]
            };
            count++;
        }
        if (i >= (data.posts.length-1)) {$ionicLoading.hide();};
      }
    }else{
      $ionicLoading.hide();
    }

  $scope.getBack = function() {
    $ionicViewService.getBackView().go();
  }
})
.controller('AcordionCtrl', function($scope, $state, $ionicLoading, $ionicScrollDelegate, IDEALFactory, $rootScope, $ionicViewService, $stateParams, PostService) {
  $scope.page = $stateParams.page;

  $scope.getBack = function() {
    $ionicViewService.getBackView().go();
  }
  var user = IDEALFactory.getInfoUser();
  var empresa = user.infoUser.empresa;
  var data = IDEALFactory.getOffLine($stateParams.page);
  $scope.groups = [];
  var countGroups = 0;
  console.log(data);
  var hasJob = [];
  var countJob = 0;
  for (var i = 0; i < data.posts.length; i++) {
    console.log("posts => " +i + " len categories " + data.posts[i].categories.length);
    //for (var k = 0; k < data.posts[i].categories.length; k++) {
      //console.log("slugs=> " + data.posts[i].categories[k].slug);
      // if(data.posts[i].categories[k].slug == empresa){
        hasJob[countJob] = data.posts[i].custom_fields;
      // }

      // if(data.posts[i].categories.length = 1 && data.posts[i].categories[k].slug == "guia"){
       // hasJob[countJob] = data.posts[i].custom_fields; 
      // }
      countJob++;
    //};
  }
  console.log(hasJob);
  for (var j = 0; j < hasJob.length; j++) {
      for (var l = 0; l < hasJob[j].titulo.length; l++) {
        
        $scope.groups[countGroups] = {
          name: hasJob[j].titulo[l],
          items: hasJob[j].valor[l]
        };
        countGroups++;
        
      };
      if(j >= (hasJob.length-1)){
        $ionicLoading.hide();
      }
    }
  $scope.toggleGroup = function(index, group) {
    if ($scope.isGroupShown(group)) {
      $scope.shownGroup = null;
    } else {
      $scope.shownGroup = group;
    }
  };
  $scope.isGroupShown = function(group) {
    return $scope.shownGroup === group;
  };
  $scope.gotoItem = function(elem) {
      /* $location.hash('itemsAncora:nth-child('+elem+')');*/
      var handle = $ionicScrollDelegate.$getByHandle('content');
      handle.anchorScroll();
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
  var len = 0;
  if ($scope.page == "briefings") {
    var cabecalho = infosInterno.custom_fields.titulo_briefing[0] + "<br/>" + infosInterno.custom_fields.data[0] + "<br/>" + infosInterno.custom_fields.forma[0] + "<br/>" +infosInterno.custom_fields.local_do_briefing[0] + "<br/>" +infosInterno.custom_fields.pr_contato[0];
    $scope.titulo = cabecalho;
    len = infosInterno.custom_fields.titulo.length;
  } else {
    $scope.titulo = infosInterno.custom_fields.cabecalho[0];
    len = infosInterno.custom_fields.titulo.length;
  }
  // $scope.page = "briefing";
  $scope.groups = [];
    for (var j = 0; j < len; j++) {
      var custom_fields = infosInterno.custom_fields;
      $scope.groups[j] = {
        title: ($scope.page == "briefings") ? custom_fields.titulo[j] : custom_fields.titulo[j],
        valor: custom_fields.valor[j]
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
  var info = "contatos "+user.infoUser.empresa;
  console.log(info);
  var data = IDEALFactory.getOffLine(info);
  if(data.count_total != 0){
    $scope.groups = [];
      for (var i = 0; i < data.posts.length; i++) {
        $scope.groups[i] = {
          name: data.posts[i].custom_fields.nome[0],
          cargo: data.posts[i].custom_fields.cargo[0],
          phone: data.posts[i].custom_fields.telefone[0],
          email: data.posts[i].custom_fields.email[0]
        };
        if (i >= (data.posts.length-1)) {$ionicLoading.hide();};
      }
    }else{
      $ionicLoading.hide();
    }
  $scope.getBack = function() {
    $ionicViewService.getBackView().go();
  }
});