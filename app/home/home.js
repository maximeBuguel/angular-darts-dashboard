'use strict';

angular.module('myApp.home', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/home', {
    templateUrl: 'home/home.html',
    controller:'HomeCtrl',
    controllerAs:'hc'
  });
}])

.controller('HomeCtrl', ['constellationConsumer','$location','$mdDialog', function(constellation,  $location, $mdDialog) {
    
    var vm = this;
    
    vm.scoresGames = ['301','501','701','1001']
    vm.cricketsGames = ['Cricket', 'Cricket Cut Throat'];
    vm.nbPlayers = [1,2,3,4];
    vm.currentGame = {};
    vm.gameSelected = false;
    vm.playersSelected = false;
    
	var stringArray = ['0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','!','?'];

    vm.generateToken = generateToken;
    vm.init = init;
    vm.selectGame = selectGame;
    vm.selectPlayers = selectPlayers;
    vm.startGame = startGame;
    vm.joinModal  = joinModal;
    init();
        
    function init(){
        constellation.initializeClient("http://192.168.1.2:8088", "maximeQuentinThomasCharles5900DartsBoyGay", "DartsDashboard");
        constellation.onConnectionStateChanged(function (change) {
            if (change.newState === $.signalR.connectionState.connected) {
                console.log("DartsDashboard connected");
            }
        });
        constellation.connect();
    }
    
    function selectGame(gameType){
        vm.gameSelected = true;
        vm.currentGame.Type = gameType;
    }
    
    function selectPlayers(nbPlayers){
        vm.currentGame.Players = new Array(nbPlayers);
        for(var i = 0; i < nbPlayers; i ++ ){
            var player = {}
            player.Id = i;
            player.Name = "Player " + (i+1) ;
            player.Url = "images/default.png";
            vm.currentGame.Players[i] = player;
        }
        vm.currentGame.id = vm.generateToken();
        vm.playersSelected = true;
    }
    
    
    function startGame(){
        console.log(vm.currentGame);
        constellation.sendMessage({ Scope: 'Package', Args: ['DartManager'] }, 'initGame', vm.currentGame);
        $location.path('/game');            

    }
    
    
    function generateToken(){
		var rndString = "";
	    for (var i = 1; i < 50; i++) { 
			var rndNum = Math.ceil(Math.random() * stringArray.length) - 1;
			rndString = rndString + stringArray[rndNum];
		};
		return rndString;
	};
    
    function joinModal() {
        $mdDialog.show({
          controller: JoinModalController,
          controllerAs: 'jmc',
          templateUrl: 'home/joinModal.tmpl.html',
          parent: angular.element(document.body),
          clickOutsideToClose:true,
            locals: {
                gameId: vm.currentGame.id
            }
        })
        .then(function(answer) {
          //vm.status = 'You said the information was "' + answer + '".';
        }, function() {
          //vm.status = 'You cancelled the dialog.';
        });
      };
    
    
    
    function JoinModalController($mdDialog, gameId) {
        var vm = this;
        vm.gameId = gameId;
      
        vm.hide = function() {
          $mdDialog.hide();
        };

        vm.cancel = function() {
          $mdDialog.cancel();
        };

        vm.answer = function(answer) {
          $mdDialog.hide(answer);
        };
  }
    
}]);