(function() {
  "use strict";

  angular.module("app").config(Configure);

  Configure.$inject = ["$stateProvider"];

  function Configure($stateProvider) {
    $stateProvider.state("root", {
      url: "/root",
      abstract: true,
      templateUrl: "./app-root.html"
    });
  }
})();
