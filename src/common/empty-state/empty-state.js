(function() {
  "use strict";

  var EMPTY_STATE_TPL = [
    "<div class='item-empty-state-container'>",
    " <div class='row text-center'>",
    "   <div class='col col-80 col-offset-10'>",
    "     <div class='item-empty-state-icon' ng-class='{letterpress: $ctrl.props.letterpress}'>",
    "       <img ng-if='$ctrl.props.picture && !$ctrl.props.icon' ng-src='{{$ctrl.props.picture}}' class='item-empty-state-picture'>",
    "       <ui-icon ng-if='$ctrl.props.platform && $ctrl.props.icon && !$ctrl.props.picture' platform='{{$ctrl.props.platform}}' name='{{$ctrl.props.icon}}'></ui-icon>",
    "       <ui-icon ng-if='!$ctrl.props.platform && $ctrl.props.icon && !$ctrl.props.picture' name='{{$ctrl.props.icon}}'></ui-icon>",
    "     </div>",
    "     <div class='item-empty-state-description'>",
    "       <div class='item-empty-state-title' ng-bind='$ctrl.props.title'></div>",
    "       <div class='item-empty-state-subtitle' ng-bind-html='$ctrl.props.subtitle'></div>",
    "     </div>",
    "     <div ng-transclude></div>",
    "   </div>",
    " </div>",
    "</div>"
  ].join("");

  var EMPTY_STATE_COMP = {
    transclude: true,
    template: EMPTY_STATE_TPL,
    bindings: { props: "=" }
  };

  angular.module("app.common").component("uiEmptyState", EMPTY_STATE_COMP);
})();
