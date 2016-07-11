var userApp = angular.module('userApp', ['ui.router', 'ngStorage']);
userApp.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
        .state('home', {
          abstract : true,
          url : ''
        })
        .state('home1', {
          url : '',
          templateUrl : './htmlPages/homePage.html',
          controller : 'homePageController',
          // resolve : {
          //   checkSession : beforeLogin
          // }
        })
        .state('registration', {
          url : '/registration',
          templateUrl : "./htmlPages/registration.html",
          controller : "registrationController",
          // resolve : {
          //   checkSession : beforeLogin
          // }
        })
        .state('login', {
          url : '/login',
          templateUrl : "./htmlPages/login.html",
          controller : "loginController",
          // resolve : {
          //   checkSession : beforeLogin
          // }
        })
        .state('user-Dashboard', {
          url : '/user-Dashboard',
          templateUrl : "./htmlPages/userDashboard.html",
          controller : "homePageController",
          // resolve : {
          //   checkSession : afterLogin
          // }
        });
      // $urlRouterProvider.otherwise('/login');
});
 
 /*var beforeLogin = function($q, $localStorage) {
  console.log("hello tauhid");
  var deferred = $q.defer();
  if ($localStorage.userData) {
      deferred.reject({
        authentication : false
      });
  } else {
    deferred.resolve();
  }
  return deferred.promise;
 }*/

 // var afterLogin = function($location, $q, $localStorage){
 //  var deferred = $q.defer();
 //  console.log($localStorage.userData);
 //  if ($localStorage.userData) {
 //    deferred.reject({
 //      authentication : true
 //    });
 //  } else{
 //    deferred.resolve();
 //  } 
 //  return deferred.promise;
 // }
