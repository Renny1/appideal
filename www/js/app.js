// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'

angular.module('ionic.utils', [])
  .factory('$localstorage', ['$window', function($window) {
    return {
      set: function(key, value) {
        $window.localStorage[key] = value;
      },
      get: function(key, defaultValue) {
        return $window.localStorage[key] || defaultValue;
      },
      setObject: function(key, value) {
        $window.localStorage[key] = JSON.stringify(value);
      },
      getObject: function(key) {
        return JSON.parse($window.localStorage[key] || '{}');
      },
      clear: function(){
        return $window.localStorage.clear();
      }
    }
  }]);


angular.module('starter', ['ionic', 'ionic.utils', 'starter.controllers', 'starter.services'])

.factory('IDEALFactory', function($localstorage) {

  var _infoUser = $localstorage.getObject('infoUser');
  var _infoInterno = null;

  return {

    setInfoUser: function(infoUser, manterConectado) {
      if (manterConectado) {
        $localstorage.setObject('infoUser', JSON.stringify(infoUser));
      }
      _infoUser = JSON.stringify(infoUser);
    },
    getInfoUser: function() {
      return JSON.parse(_infoUser);
    },


    setInfoInterno: function(infoInterno) {

      _infoInterno = JSON.stringify(infoInterno);
    },
    getInfoInterno: function(infoInterno) {

      return JSON.parse(_infoInterno)[infoInterno];
    },

    setOffLine: function(local, info) {
      $localstorage.setObject(local, JSON.stringify(info));
    },
    getOffLine: function(local) {
      return JSON.parse($localstorage.getObject(local));
    },



  };
})

.run(function($ionicPlatform, IDEALFactory, $state) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      StatusBar.styleDefault();
    }

    var user = IDEALFactory.getInfoUser();
    
    if (typeof user.infoUser.login !== 'undefined' && user.infoUser.login !== null) {
      $state.go('main');
    } else {
      $state.go('login');
    }



  });
})


.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

  $ionicConfigProvider.views.swipeBackEnabled(false);

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('login', {
      url: '/login',
      templateUrl: 'templates/login.html',
      controller: 'LoginCtrl'
    })
    .state('main', {
      url: '/main',
      templateUrl: 'templates/main.html',
      controller: 'MainCtrl'
    })
    .state('interno', {
      url: '/interno/:page',
      templateUrl: 'templates/interno.html',
      controller: 'InternoCtrl'
    })
    .state('acordion', {
      url: '/acordion/:page',
      templateUrl: 'templates/acordion.html',
      controller: 'AcordionCtrl'
    })
    .state('notes', {
      url: '/notes/:page/:id',
      templateUrl: 'templates/notes.html',
      controller: 'NotesCtrl'
    })
    .state('esqueceusenha', {
      url: '/esqueceusenha',
      templateUrl: 'templates/esqueceusenha.html',
      controller: 'EsqueceuSenhaCtrl'
    })
    .state('contato', {
      url: '/contato',
      templateUrl: 'templates/contato.html',
      controller: 'ContatoCtrl'
    })

  ;
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');

});