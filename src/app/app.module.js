(function() {
  "use strict";

  angular.module("app", [
    // Módulos de terceiro
    "ionic",

    // Módulos da aplicação
    "app.common",
    "app.pages",
    "app.providers"
  ]);

  angular.module("app.common", []);

  angular.module("app.pages", []);

  angular.module("app.providers", []);
})();
