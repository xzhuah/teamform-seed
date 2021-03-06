var teamapp = angular.module('teamapp', ["ngRoute","firebase"]);



teamapp.config(function($routeProvider) {
	$routeProvider
	.when("/search", {
		templateUrl : "zhuxinyu/searchEvent.html"
	}).when("/eventx",{
		templateUrl : "baichunyan/eventx.html"
	}).when("/profile",{
		templateUrl : "Samuel-personalDashboard/personal-dashboard.html"
	}).when("/home",{
		templateUrl : "Fenghaoan/home.html"
	}).when("/teamleader",{
		templateUrl : "JiaHe/teamleader.html"
	}).when("/admin",{
		templateUrl : "ZhaoLucen/admin.html"
	}).when("/team",{
		templateUrl : "fish/member-event.html"
	}).otherwise({redirectTo:'/home'});

});


teamapp.controller('main_ctroller', ['$scope','$firebase','$rootScope','$firebaseObject','$firebaseArray', function($scope,$firebase,$rootScope,$firebaseObject,$firebaseArray){
	$rootScope.user_ref=firebase.database().ref("users");
	$rootScope.event_ref=firebase.database().ref("events");
	$rootScope.team_ref=firebase.database().ref("teams");

	$rootScope.users=$firebaseArray($rootScope.user_ref);
	$rootScope.events=$firebaseArray($rootScope.event_ref);
	$rootScope.teams=$firebaseArray($rootScope.team_ref);

	$rootScope.test=function(){
		$rootScope.loginWithEmail($scope.useremail);
		console.log($scope.useremail);
		console.log($rootScope.currentUser);

	}

	$rootScope.addEventTest=function(){
		exampleEvent.eventName=$scope.eventtitle;
		$rootScope.addEvent(exampleEvent);
		console.log($rootScope.events);
	}
	$rootScope.loginWithEmail=function(email){

		for(var i=0;i<$rootScope.users.length;i++){

			if($rootScope.users[i].email==email){
				$rootScope.currentUser=$rootScope.users[i];

			}
		}
	}

	$rootScope.currentUser={
        id:"0",
        profilePic:"http://a5.mzstatic.com/us/r30/Purple/v4/26/f4/d3/26f4d3b5-5f61-89ba-29cf-a0866ac89ee7/screen568x568.jpeg",
        email:"abc@connect.ust.hk"
    }
                
	var exampleNewUser={
		eventsManaging:[],
		email:"abcde@connect.ust.hk",
		name:"I am new",
		notifis:[],
		profilePic:"https://scontent-hkg3-1.xx.fbcdn.net/v/t1.0-9/11811378_670467616420822_8367557776291472237_n.jpg?oh=daf68581e51d412ce96010adf7d77648&oe=588A7872",
		skills:[],
		teamsApplying:[],
		teamsAsLeader:[],
		teamsAsMember:[]

	}

	var exampleEvent={
		adminID:"-asdnfkasdfadfad",
		allTeams:[],
		description:"A new Event holden by peter",
		eventName:"My Awsome event",
		maxSize:10,
		minSize:5
	}
	$rootScope.addUser=function(user){
		$rootScope.users.$add(user);

	}
	$rootScope.addEvent=function(event){
		$rootScope.events.$add(event);
	}
	// $rootScope.addUser(exampleNewUser);

	$rootScope.carousel_timer = null;
	$rootScope.$on('$viewContentLoaded', function() {
		// Don't touch these lines 
		carousel_flag_fha = true;

		$('.carousel').off('mouseover');
		$('.carousel').off('mouseleave');

		// $('.carousel').carousel();
		$('.carousel.carousel-slider').carousel({full_width: true});

		clearInterval($rootScope.carousel_timer);
		
		$rootScope.carousel_timer = setInterval(()=> { 
			if (carousel_flag_fha) {
				$('.carousel').carousel('next'); 
			}
		}, 3000);
		$('.carousel').on('mouseover', ()=> { carousel_flag_fha = false; });
		$('.carousel').on('mouseleave', ()=> { carousel_flag_fha = true; });

		$(document).keyup(function(event){
			if(event.which=='27'){
				$('.cd-user-modal').removeClass('is-visible');
			}


		});
		$(function() {
			var div = $('.videoframe');
			var width = div.width();

			div.css('height', width*0.6);
		});

	});

}]);
