'use strict';

angular.module('myApp.home', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/home', {
    templateUrl: 'home/home.html',
    controller:'HomeCtrl',
    controllerAs:'hc'
  });
}])

.controller('HomeCtrl', ['constellationConsumer', function(constellation) {
    
    var vm = this;
    
    vm.scoresGames = ['301','501','701','1001']
    vm.cricketsGames = ['Cricket', 'Cricket Cut Throat'];
    vm.nbPlayers = [1,2,3,4];
    vm.currentGame = {};
    vm.gameSelected = false;
    
    
    vm.init = init;
    vm.selectGame = selectGame;
    vm.selectPlayers = selectPlayers;
    
    init();
    
    function init(){
        constellation.initializeClient("http://localhost:8088", "352783eac7e2adb5b50692d522ffc81a3a6cae18", "DartsDashboard");
        constellation.onConnectionStateChanged(function (change) {
            if (change.newState === $.signalR.connectionState.connected) {
                console.log("DartsDashboard connected");
            }
        });
        constellation.connect();
    }
    
    function selectGame(gameType){
        vm.gameSelected = true;
        vm.currentGame.type = gameType;
    }
    
    function selectPlayers(nbPlayers){
        vm.currentGame.nbPlayers = nbPlayers;
        constellation.sendMessage({ Scope: 'DartsDashboard', Args: ['Darts'] }, 'StartGame', [ "gameType", vm.currentGame.type, "nbPlayers", vm.currentGame.nbPlayers ]);
    }
    
    
}]);