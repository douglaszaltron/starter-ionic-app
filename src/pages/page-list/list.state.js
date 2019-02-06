(function() {
  "use strict";

  angular.module("app.pages").config(Configure);

  Configure.$inject = ["$stateProvider"];

  function Configure($stateProvider) {
    $stateProvider.state("drawer.list", {
      url: "/list",
      views: {
        drawer: {
          templateUrl: "./list.html",
          controllerAs: "vm",
          controller: "ListController"
        }
      }
    });
  }
})();
