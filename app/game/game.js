'use strict';

angular.module('myApp.game', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/game', {
    templateUrl: 'game/game.html',
    controller: 'GameCtrl'
  });
}])


.controller('GameCtrl', ['$scope','$mdDialog','$location', 'constellationConsumer', function($scope,$mdDialog,$location,constellation) {
    console.log("GameCtrl");
    var vm = this;
    
    $scope.constelationGame = {};

    $scope.cricketGoals = ["15","16","17","18","19","20","bull"];
    $scope.currentRoundDarts =[0,1,2];
    $scope.getShot = getShot;
    $scope.cancelDart = cancelDart;
    $scope.nextPlayer =nextPlayer;
    $scope.getImage = getImage;
    $scope.winnerModal  = winnerModal;
    $scope.keyPressed = keyPressed;
    
    init();
    
    function init(){
        constellation.initializeClient("http://192.168.1.2:8088", "maximeQuentinThomasCharles5900DartsBoyGay", "DartsDashboard");
        constellation.onConnectionStateChanged(function (change) {
            if (change.newState === $.signalR.connectionState.connected) {
                console.log("DartsDashboard connected");
                //S'abonner au stateobject game
                constellation.registerStateObjectLink("*", "*", "DartGame", "*", function (so) {
                    $scope.$apply(function() {
                        $scope.constelationGame = so.Value;
                        console.log($scope.constelationGame);
                        if($scope.constelationGame.Winners && $scope.constelationGame.Winners.length > 0){
                            $scope.winnerModal();
                        }
                    });           
                });
            
                constellation.subscribeMessages("DartsDashboard");

                constellation.registerMessageCallback("Triple", function (msg) {
                    var audio = new Audio('sounds/Triple.wav');
                    audio.play();
                });
                
                constellation.registerMessageCallback("Double", function (msg) {
                    var audio = new Audio('sounds/Double.wav');
                    audio.play();
                });
                
                constellation.registerMessageCallback("Useless", function (msg) {
                    var audio = new Audio('sounds/Useless.wav');
                    audio.play();
                });
                
                constellation.registerMessageCallback("SoBad", function (msg) {
                    var audio = new Audio('sounds/Sobad.wav');
                    audio.play();
                });
                
                constellation.registerMessageCallback("Bull", function (msg) {
                    var audio = new Audio('sounds/Bull.wav');
                    audio.play();
                });
                
                constellation.registerMessageCallback("DBull", function (msg) {
                    var audio = new Audio('sounds/DBull.wav');
                    audio.play();
                });
                
                constellation.registerMessageCallback("Busted", function (msg) {
                    var audio = new Audio('sounds/Busted.wav');
                    audio.play();
                });
                
                constellation.registerMessageCallback("CloseGoal", function (msg) {
                    var audio = new Audio('sounds/Busted.wav');
                    audio.play();
                });
                
                 constellation.registerMessageCallback("Good", function (msg) {
                    var audio = new Audio('sounds/Good.wav');
                    audio.play();
                });
            }
        });
        constellation.connect();
        
    }

    
    function keyPressed(event){
        console.log(event);
    }
    
    function getShot(dart){
        if(dart){
            if(dart.Value == 25){
                if(dart.Type == 1){
                    return "BULL";
                }
                if(dart.Type == 2){
                    return "D-BULL";
                }
            }
            if(dart.Type == 1){
                return dart.Value;
            }
            if(dart.Type == 2){
                return "Double " + dart.Value;
            }
            if(dart.Type == 3){
                return "Triple " + dart.Value;
            }
            if(dart.Type == 0){
                return "Miss";
            }
            if(dart.Type == -1){
                return "/";
            }
        }
    }
    
    
    function getImage(value){
        if(value == 1){
            return "images/darts.png";
        }
        if(value == 2){
            return "images/double.png";
        }
        if(value >= 3){
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
    
    
    function winnerModal() {
        $mdDialog.show({
          controller: WinnerModalController,
          controllerAs: 'wmc',
          templateUrl: 'game/winnerModal.tmpl.html',
          parent: angular.element(document.body),
          clickOutsideToClose:true,
            locals: {
                winners: $scope.constelationGame.Winners
            }
        })
        .then(function(answer) {
            $location.path('/home');  
          //vm.status = 'You said the information was "' + answer + '".';
        }, function() {
            $location.path('/home');  
          //vm.status = 'You cancelled the dialog.';
        });
      };
    
    
    
    function WinnerModalController($mdDialog,$location, winners) {
        var vm = this;
        vm.winners = winners;
      
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