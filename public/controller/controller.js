userApp.controller('homePageController', function($scope, $location, $http, $rootScope, $localStorage){
  $scope.registration = function(){
    // console.log("hello");
    $location.path('/registration');
  }
  $scope.userLogin = function(data){
    console.log(data);
    // $location.path('/login');
    $http.post('userLogin', data).success(function(response){
      // console.log(response);
      // $scope.register = response;
      if (response.authentication == true) {
        $localStorage.userData = response;
        $location.path('/user-Dashboard');
      }
    })
  }

  $scope.logOut = function(){
    $localStorage.$reset();
    $http.post('logOut').success(function(response){
      // console.log(response.session);
      if (response.session == false) {
        $location.path('/');
      }
    })
  }

  if($localStorage.userData){
    $scope.userData = $localStorage.userData;
  }

});


userApp.controller('registrationController', function($scope, $http, $rootScope, $location){
  $scope.userSignUp = function(data){
    // console.log("I m in controller");
    $http.post('userSignUp', data).success(function(response){
      console.log(response);
      if (response.authentication == true) {
        $location.path('/login');
      } else {
        console.log("failed");
      }
    })
  }
});
userApp.controller('loginController', function($scope, $http, $rootScope, $location, $localStorage){
  // console.log("Welcome to login page");
  $scope.userLogin = function(data){
    // console.log(data);
    $http.post('userLogin', data).success(function(response){
      // console.log(response);
      // $scope.register = response;
      if (response.authentication == true) {
        $localStorage.userData = response;
        $location.path('/user-Dashboard');
      }
    })
  }
})
