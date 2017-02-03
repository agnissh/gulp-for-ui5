/**
 * {{controller_name}} controller
 * 
 * @module controller.{{controller_name}}
 * @type {Controller}
 */
sap.ui.define([
    "sap/ui/core/mvc/Controller"
], function (Controller) {
    "use strict";
    return Controller.extend("{{namespace}}.controller.{{controller_name}}", {
        /**
         * Called when a controller is instantiated and its View controls (if available) are already created.
         * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
         *
         * @instance
         * @method onInit
         */
        onInit: function () {

        }
    });
});