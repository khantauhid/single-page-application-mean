var userApp = angular.module('userApp', ['ngRoute', 'ngStorage']);
userApp.config(function($routeProvider) {
  $routeProvider
  .when('/',{
      templateUrl : "./htmlPages/homePage.html",
      controller : "homePageController"
    })
  .when('/registration', {
    templateUrl : "./htmlPages/registration.html",
    controller : "registrationController"
  })
  .when('/login', {
    templateUrl : "./htmlPages/login.html",
    controller : "loginController"
  })
  .when('/user-Dashboard', {
    templateUrl : "./htmlPages/userDashboard.html",
    controller : "homePageController"
  })
});
