sap.ui.define([
	"sap/ui/core/mvc/Controller"
],
	/**
	 * @param {typeof sap.ui.core.mvc.Controller} Controller
	 */
	function(Controller) {
		"use strict";

		return Controller.extend("fiorivizdemo2.controller.View1", {
			onInit: function() {

			},
			onAfterRendering: function() {
				const oVizFrame = this.oVizFrame = this.getView().byId("idVizFrame");
				const oPopOver = this.getView().byId("idPopOver");
				oPopOver.connect(oVizFrame.getVizUid());
			}
		});
	});
