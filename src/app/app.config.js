(function() {
  angular.module("app").config(Configure);

  Configure.$inject = ["$ionicConfigProvider"];

  function Configure($ionicConfigProvider) {
    var config = $ionicConfigProvider;

    config.spinner.icon("android");
    config.form.toggle("small");
    config.navBar.alignTitle("center");
    config.backButton.previousTitleText(false);
    config.views.maxCache(3);

    config.platform.android.tabs.style("striped");
    config.platform.android.tabs.position("bottom");
    config.platform.android.backButton.text(" ").icon("ion-md-arrow-back");
    config.platform.android.views.transition("android");

    config.platform.ios.tabs.style("striped");
    config.platform.ios.tabs.position("bottom");
    config.platform.ios.backButton.text("Voltar").icon("ion-ios-arrow-back");
    config.platform.ios.views.transition("android");

    /**
     * Para usar a rolagem em JavaScript ou Nativa do dispositivo.
     * Configurando isso para `true` tem o mesmo efeito que definir
     * cada `ion-content` como `overflow-scroll = 'false'`.
     */
    if (ionic.Platform.isIOS()) {
      config.scrolling.jsScrolling(true);
    } else {
      config.scrolling.jsScrolling(false);
    }
  }
})();
