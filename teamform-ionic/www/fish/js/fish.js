
teamapp.controller('fishCtrl', ['$scope', "$rootScope", "$firebaseObject", "$firebaseArray", function($scope,$rootScope, $firebaseObject, $firebaseArray) {


//keep consistent with Hamster...
$rootScope.currentEvent = 0;
$rootScope.currentTeam = 0;
$rootScope.currentUser = 0;

$scope.events = $rootScope.events;
$scope.users = $rootScope.users;
$scope.teams = $rootScope.teams;


var allData = $firebaseObject(firebase.database().ref("/"));
$scope.processData=function(allData, currentEventID, currentTeamID, currentUserID){
	var events = allData.events;

	var curEvent = {eventName: events[currentEventID].eventName, eventDescription: events[currentEventID].description,
		eventBG: events[currentEventID].imageURL};

		var teamsCurEvent = [];

		var teams = allData.teams;

		//select teams in this event 
		for (var key in teams){
			var t = teams[key];
			if (t.belongstoEvent == currentEventID && (key == currentTeamID || t.isPrivate == false)){
				t.teamID = key;
				teamsCurEvent.push(t);
			}
		}


    	//move my team in the first position
    	for (var i = 0; i < teamsCurEvent.length; i++){
    		if (teamsCurEvent[i].teamID == currentTeamID){
    			var temp = teamsCurEvent[0];
    			teamsCurEvent[0] = teamsCurEvent[i];
    			teamsCurEvent[i] = temp;
    		}
    	}

    	return {event: curEvent, team: teamsCurEvent, user: allData.users};

    }




    $scope.clickCount = 0;

    $scope.showBody=function(id){
    	$(".collapsible-body-"+id).slideToggle(100);
    	$scope.clickCount++;

    };

    allData.$loaded().then(function(data){
    	$scope.readyData = $scope.processData(allData, $rootScope.currentEvent, $rootScope.currentTeam, $rootScope.currentUser);
    });


    $scope.initShowBody=function(id){
    	if ($scope.clickCount == 0){
    		$(".collapsible-body-"+id).slideToggle(100);
    	}
    };
    
}]);


teamapp.directive("fishNavi", function() {
	return {
		restrict: "E",
		templateUrl: "fish/fish-navi.html",
	};
});
