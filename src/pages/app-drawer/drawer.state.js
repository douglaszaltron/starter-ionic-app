(function() {
  "use strict";

  angular.module("app").config(Configure);

  Configure.$inject = ["$stateProvider"];

  function Configure($stateProvider) {
    $stateProvider.state("drawer", {
      url: "/drawer",
      abstract: true,
      templateUrl: "./drawer.html"
    });
  }
})();
