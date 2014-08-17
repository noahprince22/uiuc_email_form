'use strict';

/* Controllers */

angular.module('uiucEmailForm.controllers', [])
  .controller('LoginFormController', ['$scope','$cookieStore', '$location',function LoginFormController($scope,$cookieStore,$location){
    $scope.form = {
      name: "login-form",
      submit: function(data){
        $cookieStore.put('credentials', data);
        $location.path("/");
      }
    };
  }])
  .controller('EmailFormController', ['$scope',function EmailFormController($scope) {
    // Pass information needed by the form-default
    $scope.form = {
      name: "email-form",
      listsAvail: [
        { name: 'Business',   selected: false },
        { name: 'Electrical', selected: false },
        { name: 'Industrial', selected: false },
        { name: 'Mechanical', selected: false }
      ],
      submit: function(data){
        $scope.members.$add(data).then(function(){
          $scope.form.resetForm();
        });
      }
    };
  }])
  .controller('MainController',['$scope', '$firebase', 'filterFilter', function MainController($scope,$firebase,filterFilter){
    $scope.members = [];
    var ref = new Firebase("https://blazing-torch-5171.firebaseio.com/members");
    var sync = $firebase(ref);

    // create a synchronized array for use in our HTML code
    $scope.members = sync.$asArray();
  }]);

