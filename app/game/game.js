'use strict';

angular.module('myApp.game', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/game', {
    templateUrl: 'game/game.html',
    controller: 'GameCtrl',
    controllerAs:'gc'
  });
}])

.controller('GameCtrl', ['constellationConsumer', function(constellation) {
    console.log("GameCtrl");
    var vm = this;
    vm.game = {
	"game_id":1,
	"game_type":"01 Game",
	"round_number": 2,
	"player" : 1, 
	"players":[
		{
			"player_id":1,
			"player_name":"maxime",
			"score":79,
			"rounds":[
				[
					"10",
					"d20",
					"bull"
				],
                [
                    "D12"
                ]
			]
		},
		{
			"player_id":2,
			"player_name":"thomas",
			"score":33,
			"rounds":[
				[
					"15",
					"t2",
					"12"
				]
				
			]
		},
		{
			"player_id":3,
			"player_name":"quentin",
			"score":43,
			"rounds":[
				[
					"10",
					"14",
					"19"
				]
            ]
		},
		{
			"player_id":4,
			"player_name":"charles",
			"score":78,
			"rounds":[
				[
					"16",
					"d6",
					"dbull"
				]
			]
		}
	   ],
	"game_information":{
		"goals":[
			{
			"20":0,
			"19":0,
			"18":0,
			"17":0,
			"16":1,
			"15":0,
			"bull":2
			},
			{
			"20":0,
			"19":0,
			"18":0,
			"17":0,
			"16":1,
			"15":0,
			"bull":2
			},
			{
			"20":0,
			"19":0,
			"18":0,
			"17":0,
			"16":1,
			"15":0,
			"bull":2
			},
			{
			"20":0,
			"19":0,
			"18":0,
			"17":0,
			"16":1,
			"15":0,
			"bull":2
			}
		]

	}
}
    vm.cricketGoals = ["20","19","18","17","16","15","bull"];
    vm.isCurrentPlayer = isCurrentPlayer
    vm.currentPlayerTurn = [];
    
    
    vm.setCurrentPlayerTurn = setCurrentPlayerTurn;
    vm.cancelDart = cancelDart;
    vm.nextPlayer =nextPlayer;
    setCurrentPlayerTurn();
    
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
    
    //S'abonner au stateobject game
    /*constellation.registerStateObjectLink("*", "HWMonitor", "/intelcpu/0/load/0", "*", function (so) {
        vm.game = vo.parseJSON();    
    });
    */
    
    function setCurrentPlayerTurn(){
        var currentPlayerIndex = vm.game.player - 1;
        var currentTurnIndex = vm.game.round_number - 1;
        if(vm.game.players[currentPlayerIndex].rounds[currentTurnIndex]){
            vm.currentPlayerTurn = vm.game.players[currentPlayerIndex].rounds[currentTurnIndex];
            while (vm.currentPlayerTurn.length < 3){
                vm.currentPlayerTurn.push(undefined);
            }
        }else{
             vm.currentPlayerTurn = [undefined ,undefined ,undefined];
        }
    }
    
    function cancelDart(){
        //message callback cancel dart
    }
    
    function nextPlayer(){
        //message callback next player
    }
    
    function isCurrentPlayer(playerId){
        return playerId === vm.game.player;
    }
    
}]);