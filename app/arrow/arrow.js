'use strict';

angular.module('myApp.arrow', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/arrow', {
    templateUrl: 'arrow/arrow.html',
    controller:'ArrowCtrl',
    controllerAs:'ac'
  });
}])

.controller('ArrowCtrl', ['constellationConsumer', function(constellation) {
    
    var vm = this;
    vm.constellationUrl = "http://192.168.1.2:8088" ;
    vm.accessToken = "maximeQuentinThomasCharles5900DartsBoyGay";
   
    vm.init = init;
    init();
        
    function init(){
        constellation.initializeClient("http://192.168.1.2:8088", "maximeQuentinThomasCharles5900DartsBoyGay", "DartsDashboard");
        constellation.onConnectionStateChanged(function (change) {
            if (change.newState === $.signalR.connectionState.connected) {
                console.log("DartsDashboard connected");
            }
        });
        constellation.connect();
        
        var dartboard = new Dartboard('#dartboard');
        dartboard.render();

        document.querySelector('#dartboard').addEventListener('throw', function(d) {
            var multiple;
            var value;
            console.log(d.detail);
            if(d.detail.ring == "innerSingle" || d.detail.ring == "outerSingle" || d.detail.ring == "outerBull"){
                multiple = 1
            }
            if(d.detail.ring == "double" || d.detail.ring == "innerBull"){
                multiple = 2
            }
            if(d.detail.ring == "triple"){
                multiple = 3
            }
            value = d.detail.score / multiple;
            console.log(multiple + "  " +  value);
            constellation.sendMessage({ Scope: 'Package', Args: ['DartManager'] }, 'onDartTargetTouch', [ multiple, value ]);
        });
    }
    
    
}]);