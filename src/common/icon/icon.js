(function() {
  "use strict";

  // eslint-disable-next-line prettier/prettier
  var ICON_TPL = "<i class='icon ion-{{vm.platform}}-{{vm.name}} {{vm.props}} {{vm.color}}'></i>";

  var ICON_COMP = {
    template: ICON_TPL,
    bindings: {
      name: "@",
      props: "@",
      platform: "@",
      ios: "@",
      md: "@",
      color: "@"
    },
    controller: IconController,
    controllerAs: "vm"
  };

  function IconController() {
    var vm = this;

    vm.$onInit = function() {
      vm.platform = ionic.Platform.isIOS() ? "ios" : "md";

      if (angular.isDefined(vm.ios) && vm.platform === "ios") {
        vm.name = vm.ios;
      }

      if (angular.isDefined(vm.md) && vm.platform == "md") {
        vm.name = vm.md;
      }
    };
  }

  angular.module("app.common").component("uiIcon", ICON_COMP);
})();
