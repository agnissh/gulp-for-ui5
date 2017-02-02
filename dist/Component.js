sap.ui.define([
    "sap/ui/core/UIComponent",
    "sap/ui/model/resource/ResourceModel"
], function (UIComponent, ResourceModel) {
    "use strict";
    return UIComponent.extend("sap.ui.demo.Component", {
        metadata: {
            rootView: "sap.ui.demo.view.App",
            includes: ["css/style.css"]
        },
        init: function () {
            // call the init function of the parent
            UIComponent.prototype.init.apply(this, arguments);

            // set i18n model
            var i18nModel = new ResourceModel({
                bundleName: "sap.ui.demo.i18n.i18n"
            });
            this.setModel(i18nModel, "i18n");
        }
    });
});