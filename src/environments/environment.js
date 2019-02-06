var environment = {
  api_url: "https://localhost/api/v1",
  version: "1.0.0",
  production: false
};

(function() {
  "use strict";

  angular.module("app").constant("ENVIRONMENT", environment);
})();
