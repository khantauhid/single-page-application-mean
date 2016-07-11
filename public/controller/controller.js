userApp.controller('homePageController', function($scope, $http, $rootScope, $state, $localStorage){
	// console.log("I am in home controller");
	$scope.userLogin = function(data){
    // $location.path('/login');
    $http.post('userLogin', data).success(function(response){
      // $scope.register = response;
      if (response.authentication == true) {
        $localStorage.userData = response;
        $state.go('user-Dashboard');
      }
    })
  }
  if($localStorage.userData){
    $scope.userData = $localStorage.userData;
  }

  $scope.logOut = function(){
    $localStorage.$reset();
    $http.post('logOut').success(function(response){
      // console.log(response.session);
      if (response.session == false) {
        $state.go('login');
      }
    })
  }

})
userApp.controller('registrationController', function($scope, $http, $rootScope, $state, $location){
  console.log("I m in registration controller");
  $scope.userSignUp = function(data){
    console.log("I m in controller");
    $http.post('userSignUp', data).success(function(response){
      console.log(response);
      if (response.authentication == true) {
        $state.go('login');
      } else {
        console.log("failed");
      }
    })
  }
});
userApp.controller('loginController', function($scope, $http, $rootScope, $state, $location, $localStorage){
  // console.log("Welcome to login page");
  $scope.userLogin = function(data){
    // console.log(data);
    $http.post('userLogin', data).success(function(response){
      // console.log(response);
      // $scope.register = response;
      if (response.authentication == true) {
        $localStorage.userData = response;
        $state.go('user-Dashboard');
      }
    })
  }
})