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
			"20":2,
			"19":0,
			"18":0,
			"17":0,
			"16":1,
			"15":0,
			"bull":1
			},
			{
			"20":0,
			"19":0,
			"18":0,
			"17":0,
			"16":0,
			"15":1,
			"bull":0
			},
			{
			"20":0,
			"19":1,
			"18":0,
			"17":0,
			"16":0,
			"15":0,
			"bull":0
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
    vm.constelationGame = {
  "Players": [
    {
      "ListGoals": {
        "ListGoals": {
          "15": 0,
          "16": 0,
          "17": 0,
          "18": 3,
          "19": 0,
          "20": 2,
          "25": 0
        }
      },
      "Id": 1,
      "Name": "Thomas",
      "Score": 0,
      "Rounds": [
        {
          "shoots": [
            {
              "Type": 3,
              "Value": 18
            },
            {
              "Type": 2,
              "Value": 20
            },
            {
              "Type": 0,
              "Value": 0
            }
          ],
          "LastShoot": {
            "Type": 0,
            "Value": 0
          }
        }
      ],
      "CurentRound": {
        "shoots": [
          {
            "Type": 3,
            "Value": 18
          },
          {
            "Type": 2,
            "Value": 20
          },
          {
            "Type": 0,
            "Value": 0
          }
        ],
        "LastShoot": {
          "Type": 0,
          "Value": 0
        }
      }
    },
    {
      "ListGoals": {
        "ListGoals": {
          "15": 0,
          "16": 0,
          "17": 0,
          "18": 0,
          "19": 3,
          "20": 1,
          "25": 0
        }
      },
      "Id": 2,
      "Name": "Maxime",
      "Score": 0,
      "Rounds": [
        {
          "shoots": [],
          "LastShoot": null
        },
        {
          "shoots": [
            {
              "Type": 3,
              "Value": 12
            },
            {
              "Type": 1,
              "Value": 20
            },
            {
              "Type": 3,
              "Value": 19
            }
          ],
          "LastShoot": {
            "Type": 3,
            "Value": 19
          }
        }
      ],
      "CurentRound": {
        "shoots": [
          {
            "Type": 3,
            "Value": 12
          },
          {
            "Type": 1,
            "Value": 20
          },
          {
            "Type": 3,
            "Value": 19
          }
        ],
        "LastShoot": {
          "Type": 3,
          "Value": 19
        }
      }
    }
  ],
  "CurrentRound": 1,
  "CurrentPlayer": {
    "ListGoals": {
      "ListGoals": {
        "15": 0,
        "16": 0,
        "17": 0,
        "18": 3,
        "19": 0,
        "20": 2,
        "25": 0
      }
    },
    "Id": 1,
    "Name": "Thomas",
    "Score": 0,
    "Rounds": [
      {
        "shoots": [
          {
            "Type": 3,
            "Value": 18
          },
          {
            "Type": 1,
            "Value": 20
          },
          {
            "Type": 0,
            "Value": 0
          }
        ],
        "LastShoot": {
          "Type": 0,
          "Value": 0
        }
      }
    ],
    "CurentRound": {
      "shoots": [
        {
          "Type": 3,
          "Value": 18
        },
        {
          "Type": 1,
          "Value": 20
        },
        {
          "Type": 0,
          "Value": 0
        }
      ],
      "LastShoot": {
        "Type": 0,
        "Value": 0
      }
    }
  }
}

    vm.cricketGoals = ["15","16","17","18","19","20","bull"];
    vm.currentPlayerTurn = [];
    
    
    vm.setCurrentPlayerTurn = setCurrentPlayerTurn;
    vm.getShot = getShot;
    vm.cancelDart = cancelDart;
    vm.nextPlayer =nextPlayer;
    vm.getImage = getImage;
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
        //S'abonner au stateobject game
        /*constellation.registerStateObjectLink("*", "DartGame", "*", "*", function (so) {
            vm.game = vo.parseJSON();    
        });
*/    }

    
    
    function getShot(dart){
        if(dart.Type == 1){
            return dart.Value;
        }
        if(dart.Type == 2){
            return "Double " + dart.Value;
        }
        if(dart.Type == 3){
            return "Triple " + dart.Value;
        }
    }
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
    
    function getImage(value){
         if(value == 1){
            return "images/darts.png";
        }
        if(value == 2){
            return "images/double.png";
        }
        if(value == 3){
            return "images/triple.png";
        }
    }
    
    function cancelDart(){
        //message callback cancel dart
        constellation.sendMessage({ Scope: 'Package', Args: ['DartManager'] }, 'cancel');
    }
    
    function nextPlayer(){
        //message callback next player
        constellation.sendMessage({ Scope: 'Package', Args: ['DartManager'] }, 'next');
    }
    
    
}]);