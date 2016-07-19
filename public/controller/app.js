var userApp = angular.module('userApp', ['ui.router', 'ngStorage']);
// userApp.directive('mydirective', function() {
//     return {
//         // restrict: 'E',
//         // replace: true,
//         // template: '<div></div>',
//         link: function($scope, element, attrs) {
//           element.click(function(){
//             alert('hello tauhid');
//            //Do something useful
//           }); 
//             // $scope.clickMe= function() {
//             //     alert('hello tauhid');
//             // }
//         }
//     }
// });
/*userApp.directive('clicker', function(){
  var link = function(scope){
      scope.showMessage = function(){
        alert('hello tauhid');
      };
  };
   return{
    link: link,
    template: "<button ng-click='showMessage()'>Click me</button>"
  };
});*/
userApp.config(function($stateProvider, $urlRouterProvider, $httpProvider) {    
  $stateProvider
        .state('home', {
          abstract : true,
          url : ''
        })
        .state('home1', {
          url : '/',
          templateUrl : './htmlPages/homePage.html',
          controller : 'homePageController',
          resolve : {
            checkSession : beforeLogin
          }
        })
        .state('registration', {
          url : '/registration',
          templateUrl : "./htmlPages/registration.html",
          controller : "registrationController",
          resolve : {
            checkSession : beforeLogin
          }
        })
        .state('login', {
          url : '/login',
          templateUrl : "./htmlPages/login.html",
          controller : "loginController",
          resolve : {
            checkSession : beforeLogin
          }
        })
        .state('user-Dashboard', {
          url : '/user-Dashboard',
          templateUrl : "./htmlPages/userDashboard.html",
          controller : "homePageController",
          resolve : {
            checkSession : afterLogin
          }
        })
        .state('user-feedBack', {
          url : '/user-feedBack',
          templateUrl : "./htmlPages/userFeedBack.html",
          controller : "homePageController"
        });
      $urlRouterProvider.otherwise('/login');
      
      $httpProvider.interceptors.push(function($q, $location) {
      return {
        response: function(response) {
          // do something on success
          return response;
        },
        responseError: function(response) {
          console.log(response);
          if (response.status === 401)
            $location.url('/login');
          return $q.reject(response);
        }
      };
    });
})

  .run(['$rootScope', '$state', '$stateParams', 
      function($rootScope, $state, $stateParams) {
        $rootScope.$on('$stateChangeError', 
          function(event, toState, toParams, fromState, fromParams, error) {
            if(error.authentication == false) {
              $state.go('login');
              // console.log("hii");
            } else { 
              $state.go('login');
              console.log("hello tauhid");
            }
          });
        $rootScope.$on('$stateChangeSuccess', 
          function(event, toState, toParams, fromState, fromParams) {

          })
      }
    ])
 
 var beforeLogin = function($q, $localStorage) {
  console.log("before login");
  var deferred = $q.defer();
  // console.log($localStorage.userData);
  // if ($localStorage.userData) {
  //     deferred.reject({
  //       authentication : false
  //     });
  // } else {
  //   deferred.resolve();
  // }
  // return deferred.promise;
 }

 var afterLogin = function($location, $q, $localStorage){
  console.log("after login");
  var deferred = $q.defer();
  // console.log($localStorage.userData);
  // if ($localStorage.userData) {
  //   deferred.reject({
  //     authentication : true
  //   });
  // } else{
  //   deferred.resolve();
  // } 
  // return deferred.promise;
 }

 var checkLoggedin = function($q, $timeout, $http, $location, $rootScope){
      // Initialize a new promise
      var deferred = $q.defer();

      // Make an AJAX call to check if the user is logged in
      $http.get('/loggedin').success(function(user){
        // Authenticated
        if (user !== '0')
          /*$timeout(deferred.resolve, 0);*/
          deferred.resolve();

        // Not Authenticated
        else {
          $rootScope.message = 'You need to log in.';
          //$timeout(function(){deferred.reject();}, 0);
          deferred.reject();
          $location.url('/login');
        }
      });

      return deferred.promise;
    };
