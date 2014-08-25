'use strict';

/* Directives */


angular.module('uiucEmailForm.directives', []).
  directive('appVersion', ['version', function(version) {
    return function(scope, elm, attrs) {
      elm.text(version);
    };
  }])
  .directive('formDefault',function(){
    return {
      restrict: "E",
      transclude: true,
      scope:true,
      templateUrl:"partials/form-default.html",
      controller: function($scope){
        // Create form data object
        $scope.form.data = {};

        // Returns whether the form is valid
        $scope.isValid = function(){
          var name = $scope.form.name;
          return $scope[name].$valid;
        };

        // Add default form reset functionality to the functionality
        // specified by $scope.form.resetForm option
        var _resetForm = $scope.form.resetForm;
        $scope.form.resetForm = function(){
          // Call optional user-defined resetForm
          if(typeof(_resetForm) == "function"){
            _resetForm();
          }

          $scope.form.data = {};
                    
          var name = $scope.form.name;
          $scope[name].$setPristine();
        };
      }
    };    
  })
  .directive('formEmail',function(){
    return {
      restrict: "E",
      scope: true,
      templateUrl:"partials/form-email.html"
    };
  })
  .directive('formName',function(){
    return {
      restrict: "E",
      scope: true,
      templateUrl:"partials/form-name.html"
    };
  })
  .directive('formPassword',function(){
    return {
      restrict: "E",
      scope: true,
      templateUrl:"partials/form-password.html"
    };
  })
  .directive('formLists',function(){
    return {
      restrict: "E",
      scope: true,
      templateUrl:"partials/form-lists.html",
      link: function($scope){

      },
      controller: function($scope){
        $scope.form.listsAvail = [];
        angular.forEach(function(list){
          $scope.form.listsOrig;
        });

        // Add code to reset list form to parent's resetForm
        var _resetForm = $scope.form.resetForm;
        $scope.form.resetForm = function(){
          _resetForm();

          for (var key in $scope.form.listsAvail){
            console.log($scope.form.listsOrig[key]["selected"]);
            $scope.form.listsAvail[key]["selected"] = $scope.form.listsOrig[key]["selected"];
          }
        }; 

        // helper method to get selected lists
        var selectedLists = function selectedLists() {
          return filterFilter($scope.form.listsAvail, { selected: true });
        };

        // watch lists for changes and add them to form.data.lists
console.log($scope.form.listsAvail);
        $scope.$watch('form.listsAvail|filter:{selected:true}', function (nv) {
          $scope.form.data.lists = nv.map(function (list) {
            return list.name;
          });
        }, true);
      }
    };
  });

