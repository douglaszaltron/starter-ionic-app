/* eslint-disable angular/controller-as */

(function() {
  "use strict";

  var PICKER_TPL = [
    "<ion-scroll direction='y'>",
    " <ion-list>",
    "  <ion-item ng-if='vm.search == \"true\"' class='item item-light item-input-inset item-search-bar-container help-border-none'>",
    "   <label class='item-input-wrapper item-search-bar-wrapper'>",
    "    <ion-icon name='search' props='placeholder-icon'></ion-icon>",
    "    <input type='search' ng-change='handlerSearch(search)' ng-model='search[vm.attr]' placeholder='Buscar' />",
    "   </label>",
    "   <div class='item-search-bar-action' ng-show='search'>",
    "     <button class='button button-clear item-search-bar-button button-icon' ng-click='search[vm.attr] = \"\"; handlerClear()'><ion-icon ios='close-circle' md='close'></ion-icon></button>",
    "   </div>",
    "  </ion-item>",
    "  <div ng-if='!options.length' class='item-progress-spinner-container item-progress-spinner-static'><ion-spinner icon='android' class='spinner-positive'></ion-spinner></div>",
    "  <ion-item ng-if='options.length' ng-click='$buttonTapped({}, item); vm.data = item' ng-repeat='item in options' class='item-light' icon='ion-md-radio-button-on'>{{item[vm.attr]}}</ion-item>",
    "  <ion-item ng-if='options.length && (options.length >= 25)' class='item-light item-borderless'><button ng-click='handlerLoadAll()' class='button button-small button-raised button-block button-positive'>Ver mais</button></ion-item>",
    " </ion-list>",
    "</ion-scroll>"
  ].join("");

  var PICKER_COMP = {
    template:
      "<input type='text' class='input-picker' ng-click='vm.handlerPickerShow()' ng-model='vm.data[vm.attr]' placeholder='Selecione uma opção' ng-readonly='true' />",
    require: { model: "ngModel" },
    bindings: {
      options: "<",
      search: "@",
      disabled: "@",
      title: "@",
      attr: "@"
    },
    controller: PickerController,
    controllerAs: "vm"
  };

  PickerController.$inject = ["$ionicPopup", "$scope", "$filter", "$timeout"];

  function PickerController($ionicPopup, $scope, $filter, $timeout) {
    var vm = this;
    var items = [];
    var limit = 25;
    var current = limit;

    vm.options = [];
    vm.search = "false";
    vm.title = "Selecione uma opção";
    vm.attr = "name";

    vm.handlerPickerShow = handlerPickerShow;
    $scope.handlerSearch = handlerSearch;
    $scope.handlerClear = handlerClear;
    $scope.handlerLoadAll = handlerLoadAll;

    /**
     * @description O $onInit é uma propriedade exposta no ciclo de vida para inicialização de um controlador.
     */
    vm.$onInit = function() {
      vm.model.$render = function() {
        vm.data = vm.model.$viewValue;
      };
    };

    /**
     * @description O $onChange é uma propriedade exposta no ciclo de vida para ouvir as mudanças do controlador.
     */
    vm.$onChanges = function(changes) {
      if (!changes.options) return;
      if (angular.isDefinedOrNotNull(vm.options) && vm.options.length > 0) {
        var data = vm.options.filter(function(item) {
          return item.id == vm.data;
        });
        if (angular.isDefinedOrNotNull(data) && data.length > 0) {
          vm.model.$setViewValue(data[0].id);
          vm.data = data[0];
        }
      }
    };

    /**
     * @description Função para exibir popup picker.
     */
    function handlerPickerShow() {
      items = angular.copy(vm.options);

      if (!(angular.isDefined(items) && items.length > 0)) {
        return false;
      }

      $scope.options = [];
      $scope.options = items.splice(0, limit);

      if (vm.disabled === "true") return;

      $ionicPopup
        .show({
          title: vm.title,
          cssClass: "popup-container-picker",
          template: PICKER_TPL,
          scope: $scope
        })
        .then(function() {
          vm.model.$setViewValue(vm.data.id);
        });
    }

    /**
     * @description Função para pesquisar item da lista por seu atributo, sendo ordenado pelo atributo ascendente.
     */
    function handlerSearch(expression) {
      $scope.options = [];

      $timeout(function() {
        var filtered = $filter("filter")(vm.options, expression, compare);
        $scope.options = filtered.slice(0, limit);
      }, 300);

      /* prettier-ignore */
      function compare(actual, expected) {
        return actual.toString().toLowerCase().latinise().indexOf(expected.toString().trim().toLowerCase().latinise()) !== -1;
      }
    }

    /**
     * @description Função para recarregar os itens da lista com os valores iniciais.
     */
    function handlerClear() {
      $scope.options = [];

      $timeout(function() {
        items = angular.copy(vm.options);
        $scope.options = items.splice(0, limit);
      }, 300);
    }

    /**
     * @description Função para carregar todos os itens da lista.
     */
    function handlerLoadAll() {
      $scope.options = [];
      $timeout(function() {
        current = current + limit;
        items = angular.copy(vm.options);
        $scope.options = items.splice(0, current);
      }, 300);
    }
  }

  angular.module("app.common").component("uiPicker", PICKER_COMP);
})();
