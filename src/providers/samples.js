(function() {
  "use strict";

  angular.module("app.providers").factory("Samples", Samples);

  Samples.$inject = ["$q"];

  function Samples($q) {
    var icons = [
      "flask",
      "wifi",
      "beer",
      "football",
      "basketball",
      "paper-plane",
      "american-football",
      "boat",
      "bluetooth",
      "build"
    ];

    var items = [];

    for (var i = 1; i < 11; i++) {
      items.push({
        title: "Item " + i,
        note: "This is item #" + i,
        icon: icons[Math.floor(Math.random() * icons.length)]
      });
    }

    return {
      index: index,
      store: store,
      destroy: destroy
    };

    function index(params) {
      if (!params) {
        return $q.when({ items: items });
      }

      items = items.filter(function(item) {
        for (var key in params) {
          var field = item[key];
          if (
            typeof field == "string" &&
            field.toLowerCase().indexOf(params[key].toLowerCase()) >= 0
          ) {
            return item;
          } else if (field == params[key]) {
            return item;
          }
        }
        return null;
      });

      return $q.when({ items: items });
    }

    function store(item) {
      items.push(item);
    }

    function destroy(item) {
      items.splice(items.indexOf(item), 1);
    }
  }
})();
