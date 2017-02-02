jQuery.sap.registerPreloadedModules({
	"name": "sap.ui.demo.Component-preload",
	"version": "2.0",
	"modules": {
		"sap/ui/demo/Component.js": "sap.ui.define([\"sap/ui/core/UIComponent\",\"sap/ui/model/resource/ResourceModel\"],function(e,i){\"use strict\";return e.extend(\"sap.ui.demo.Component\",{metadata:{rootView:\"sap.ui.demo.view.App\",includes:[\"css/style.css\"]},init:function(){e.prototype.init.apply(this,arguments);var n=new i({bundleName:\"sap.ui.demo.i18n.i18n\"});this.setModel(n,\"i18n\")}})});",
		"sap/ui/demo/controller/App.controller.js": "sap.ui.define([\"sap/ui/core/mvc/Controller\",\"sap/m/MessageToast\",\"sap/ui/model/json/JSONModel\"],function(e,o,n){\"use strict\";return e.extend(\"sap.ui.demo.controller.App\",{onInit:function(){var e={recipient:{name:\"World\"}},o=new n(e);this.getView().setModel(o)},onShowHello:function(){o.show(\"Hello World\")}})});",
		"sap/ui/demo/view/App.view.xml": "<mvc:View\r\n   controllerName=\"sap.ui.demo.controller.App\"\r\n   xmlns=\"sap.m\"\r\n   xmlns:mvc=\"sap.ui.core.mvc\"\r\n   displayBlock=\"true\"><App><pages><Page title=\"{i18n>homePageTitle}\"><content><Panel\r\n                  headerText=\"{i18n>helloPanelTitle}\"><content><Button\r\n                        text=\"{i18n>showHelloButtonText}\"\r\n                        press=\"onShowHello\"/><Input\r\n                        value=\"{/recipient/name}\"\r\n                        description=\"Hello {/recipient/name}\"\r\n                        valueLiveUpdate=\"true\"\r\n                        width=\"60%\"/></content></Panel></content></Page></pages></App></mvc:View>"
	}
});