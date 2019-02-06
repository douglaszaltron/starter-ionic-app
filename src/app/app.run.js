(function() {
  "use strict";

  angular.module("app").run(Run);

  Run.$inject = ["$window", "$document"];

  function Run($window, $document) {
    ionic.Platform.ready(Ready);

    function Ready() {
      // Caso esteja com copilação do cordova.
      if ($window.cordova) {
        $window.addEventListener("keyboardWillShow", function() {
          $document.body.classList.add("keyboard-is-open");
        });

        $window.addEventListener("keyboardWillHide", function() {
          $document.body.classList.remove("keyboard-is-open");
        });

        // Exibe as opções no teclado iOS.
        Keyboard.hideFormAccessoryBar(false);

        // Barra de navegação com o texto claro ( Para ser usado em um fundo escuro ).
        StatusBar.styleLightContent();
        StatusBar.show();
      }
    }
  }
})();
