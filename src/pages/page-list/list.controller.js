(function() {
  "use strict";

  angular.module("app.pages").controller("ListController", ListController);

  ListController.$inject = ["$scope", "Samples"];

  function ListController($scope, Samples) {
    var vm = this;

    vm.findAllSamples = findAllSamples;

    $scope.$on("$ionicView.loaded", componentWillLoad);

    $scope.$on("$ionicView.enter", componentDidLoad);

    /**
     * @description Método para criar e inicializar os objetos no controlador.
     */
    function activate() {
      vm.items = [];
    }

    /**
     * @description Método executado quando o componente está sendo carregando no DOM. Este evento só acontecerá uma vez por visualização sendo criada.
     */
    function componentWillLoad() {
      activate();
    }

    /**
     * @description Método executado após a saída do componente ter sido renderizada no DOM. Esse evento será acionado, independentemente da primeira carga ou de uma exibição armazenada em cache.
     */
    function componentDidLoad() {
      findAllSamples();
    }

    /**
     * @description Método para buscar todos os items da lista de exemplo.
     */
    function findAllSamples() {
      Samples.index()
        .then(success)
        .catch(failed);

      function success(response) {
        vm.items.$resolved = true;
        $scope.$broadcast("scroll.refreshComplete");
        if (!response) {
          return;
        }

        var items = response.items;

        vm.items.total = items.length;
        vm.items.categories = items.groupBy("icon");
        vm.items.$resolved = true;
      }

      function failed() {
        vm.items.$resolved = true;
        vm.items.$error = true;
        $scope.$broadcast("scroll.refreshComplete");
        vm.items.$error = { icon: "sad", title: "An inconsistency has occurred, please try again later!" };
      }
    }
  }
})();
