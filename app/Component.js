/**
 * Component
 * 
 * @module Component
 * @type {Component}
 */
sap.ui.define([
    "sap/ui/core/UIComponent",
    "sap/ui/model/resource/ResourceModel"
], function (UIComponent, ResourceModel) {
    "use strict";
    return UIComponent.extend("{{namespace}}.Component", {

        /**
         * Application metadata
         * 
         * @name metadata
         * @instance 
         * @type {Object}
         */
        metadata: {
            rootView: "{{namespace}}.view.App",
            includes: ["css/style.css"]
        },

        /**
         * Application init
         * 
         * @name init
         * @instance 
         * @type {Object}
         */
        init: function () {
            // call the init function of the parent
            UIComponent.prototype.init.apply(this, arguments);
            // set i18n model
            var i18nModel = new ResourceModel({
                bundleName: "{{namespace}}.i18n.i18n"
            });
            this.setModel(i18nModel, "i18n");
        }
    });
});