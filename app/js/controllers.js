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
      listsAvail: $scope.listsAvail,
      submit: function(data){
        // Disable the submit button while the form adds the user
        $scope.form.submitDisabled = true;
        
        $scope.members.$add(data).then(function(){   
          $scope.form.resetForm();
          $scope.form.submitDisabled = false;
        });
      }
    };
  }])
  .controller('MainController',['$scope', '$cookieStore','$firebase', function MainController($scope,$cookieStore,$firebase){
    $scope.members = [];
    var credentials = $cookieStore.get('credentials'),
        username = credentials.email.replace("@illinois.edu",""),
        ref = new Firebase("https://blazing-torch-5171.firebaseio.com/"),
        userRef = ref.child(username),
        sync = $firebase(userRef);

    // If an object doesn't exist for this user in firebase, create one
    userRef.once('value', function(snapshot) {
      var exists = (snapshot.val() !== null);
      if (!exists){
        sync.$set("empty");
      }
    });
    
    $scope.listsAvail = [
        { name: 'Business',   selected: false },
        { name: 'Electrical', selected: false },
        { name: 'Industrial', selected: false },
        { name: 'Mechanical', selected: false }
    ];

    // create a synchronized array for use in our HTML code
    $scope.members = sync.$asArray();
  }])
  .controller("TableController",['$scope',function TableController($scope){
    var active = "0",
        list = "";
    
    $scope.isActive = function(index){
      return index == active;
    };

    $scope.getList = function(){
      return list;
    };

    $scope.selectList = function(index){
      active = index;

      list = index === 0 ? "" : $scope.listsAvail[index-1];
    };
  }]);

