'use strict';

/* Filters */

angular.module('uiucEmailForm.filters', []).
  filter('interpolate', ['version', function(version) {
    return function(text) {
      return String(text).replace(/\%VERSION\%/mg, version);
    };
  }]).filter('reverse', function() {
    return function(items) {
      return items.slice().reverse();
    };
  }).filter('memberContains', function(){
    return function(members,list){
      // List = "" means all members
      if (typeof(list) == "undefined"){
        return members;
      }

      // Get all members with lists that contain the selected list
      var ret = [];
      angular.forEach(members,function(member){
        if (member.lists && member.lists.indexOf(list) != -1){
          ret.push(member);
        }
      });

      return ret;
    };
  });
