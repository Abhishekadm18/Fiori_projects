sap.ui.define(["sap/ui/core/mvc/Controller", "sap/ui/export/library", "sap/ui/export/Spreadsheet", "sap/ui/model/odata/v2/ODataModel",
	"sap/ui/model/json/JSONModel", "sap/m/MessageToast"
], function (e, t, o, n, a, i) {
	"use strict";
	var u = t.EdmType;
	return e.extend("com.ZpmAutoTmpl.ZPMAutoTmpl.controller.View2", {
		onInit: function () {
			var e = sap.ui.core.UIComponent.getRouterFor(this);
			e.getRoute("View2Route").attachMatched(this._onRouteMatched, this);
			// 			var view = this.getView();
			// 		var oModel=	sap.ui.getCore().getModel("outModel");
			// 			view.setModel(oModel);

			// view.byId("ProductsSmartTable").rebindTable();
		},
		_onRouteMatched: function (e) {
			var t = sap.ui.getCore().getModel("outModel");
			var o = new sap.ui.model.json.JSONModel;
			o.setProperty("/jOutputDataSet", t.jOutputDataSet);
			this.getView().setModel(o, "outModel")
		},
		goTo1Previous: function () {
			// sap.ui.getCore().getModel("outModel").setData(null); 
			this.getOwnerComponent().getRouter().navTo("View1Route")
		},
		initializedSmartFilterbar: function (e) {
			var t = this.getOwnerComponent().getModel("i18n");
			this.oBundle = t.getResourceBundle();
			var o = e.getSource()._oSearchButton;
			o.setText(this.oBundle.getText("goBtn"))
		},
		onBeforeRendering: function () {
			// var data=this.getView().getModel("model1");
			// 	this.getView().byId("ProductsSmartTable");
		},
		onBeforeRebindTable: function (oSource) {
			var binding = oSource.getParameter("bindingParams");
			var oTable = this.getView().byId("ProductsSmartTable");
			var oModel = sap.ui.getCore().getModel("outModel");
			// oModel.getData().jOutputDataSet[1].PId ="T304";

			for (var i = 0; i < oModel.oData.jOutputDataSet.length; i++) {
				var obj = oModel.oData.jOutputDataSet[i].uniqueid;

				var oFilter = new sap.ui.model.Filter("Aa0uniqueid", sap.ui.model.FilterOperator.EQ, obj);
				binding.filters.push(oFilter);
			}

		}
	});
});