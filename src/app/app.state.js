(function() {
  "use strict";

  angular.module("app").config(Configure);

  Configure.$inject = ["$stateProvider"];

  function Configure($stateProvider) {
    $stateProvider.state("app", {
      url: "/app",
      abstract: true,
      templateUrl: "./app.html"
    });
  }
})();
