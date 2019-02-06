(function() {
  "use strict";

  angular.module("app.pages").config(Configure);

  Configure.$inject = ["$stateProvider", "$urlRouterProvider"];

  function Configure($stateProvider, $urlRouterProvider) {
    $stateProvider.state("drawer.home", {
      url: "/home",
      views: {
        drawer: {
          templateUrl: "./home.html",
          controllerAs: "vm",
          controller: "HomeController"
        }
      }
    });

    // Inicializa a aplicação na rota que for configurada aqui.
    $urlRouterProvider.otherwise("drawer/home");
  }
})();
