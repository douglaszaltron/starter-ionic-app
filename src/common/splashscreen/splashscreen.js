(function() {
  "use strict";

  var SPLASH_SCREEN_TPL = [
    "<section class='splashscreen-container'>",
    " <ion-spinner icon='android' class='spinner-positive'></ion-spinner>",
    "</section>"
  ].join("");

  SplashScreen.$inject = ["$ionicBackdrop", "$ionicLoading", "$timeout"];

  function SplashScreen($ionicBackdrop, $ionicLoading, $timeout) {
    ionic.Platform.ready(function() {
      $timeout(function() {
        $ionicLoading.hide();
        elem.removeClass("backdrop-splashscreen");
      }, 1000);
    });

    var elem = $ionicBackdrop.getElement();

    elem.addClass("backdrop-splashscreen");

    $ionicLoading.show({ template: SPLASH_SCREEN_TPL });
  }

  angular.module("app.common").run(SplashScreen);
})();
