sap.ui.define([
	"sap/ui/core/mvc/Controller", 
	"sap/m/MessageToast", 
	"sap/ui/model/json/JSONModel", 
	"sap/m/MessageBox",
	"sap/ui/core/Fragment"
], function (t, e, a, i, Fragment,s) {
	"use strict";
	var d = "sapUiResponsivePadding--header sapUiResponsivePadding--content sapUiResponsivePadding--footer";
	var o, l, r, n, h, c = [];
	var K = {
		json: true
	};
	return t.extend("com.ZpmAutoTmpl.ZPMAutoTmpl.controller.View1", {
		onInit: function () {
			this._tabData = {};
			this.getView().byId("addButton").setEnabled(false);
			n = this.getOwnerComponent().getModel().sServiceUrl;
			h = new sap.ui.model.odata.ODataModel(n, K);
			this._dataRead = {
				jKitDetailsSet: []
			};
			this.oModel = this.getOwnerComponent().getModel();
			this.oModel.read("/KitDetailsSet", {
				success: function (t, e) {
					this.jModelRead = new sap.ui.model.json.JSONModel;
					this.jModelRead.setProperty("/jKitDetailsSet", t.results);
					this.getView().setModel(this.jModelRead, "readModel")
				}.bind(this),
				error: function (t) {
					e.show("Error" + t.message)
				}
			});
			this.jModelPad = new sap.ui.model.json.JSONModel;
			this.getView().setModel(this.jModelPad, "padModel");
			this.jModelPad.setData(this._dataPad);
			this._selectedKey = this.getView().byId("idIconTabBar").getSelectedKey();
			this._dataPad = {
				jPadDetailsSet: [{
					Pid: 1001,
					PadCode: "",
					PadDesc: "",
					CostCenter: "",
					GenEquip: "",
					WellId: ""

				}]
			};
			this._dataWell = {
				jWellDetailsSet: []
			};
			this._dataKit = {
				jKitDescUpdSet: [{
					Kid: 1001,
					KitSerialNo: "1",
					Kit: "",
					KitMaxCnt: "",
					KitUnused: "",
					KitUsed: "",
					KitDescNew: ""
				}]
			};
			this._datakittotsel = {
				jTotKitSelCombox: [{}]
			};
			this._dataCBox = {
				jKitDropdown: []
			};
			this._dataPadFinal = {
				jPadFinalSet: []
			};
			this._oDescData = {
				jKitDescription: []
			};
			this.jModelPad = new sap.ui.model.json.JSONModel;
			this.getView().setModel(this.jModelPad, "padModel");
			this.jModelPad.setData(this._dataPad);
			this.jModelWell = new sap.ui.model.json.JSONModel;
			this.getView().setModel(this.jModelWell, "wellModel");
			this.jModelWell.setData(this._dataWell);
			this.jModelKit = new sap.ui.model.json.JSONModel;
			this.getView().setModel(this.jModelKit, "kitModel");
			this.jModelKit.setData(this._dataKit);
			this.jModelPadFinal = new sap.ui.model.json.JSONModel;
			this.getView().setModel(this.jModelPadFinal, "finalPadModel");
			this.jModelPadFinal.setData(this.jModelPadFinal);
			this.oModelOut = new sap.ui.model.json.JSONModel;
			this.getView().setModel(this.oModelOut, "createModel");
			this.oModelOut.setData(this._dataOut);
			this.oModelCBox = new sap.ui.model.json.JSONModel;
			this.getView().setModel(this.oModelCBox, "cBoxModel");
			this.oModelCBox.setData(this._dataCBox);
			// kit structure model
			this.selectedKitModel = new sap.ui.model.json.JSONModel;
			this.getView().setModel(this.selectedKitModel, "selectedKitModel");
			this.selectedKitModel.setData({
				aSelectedRowData: []
			});

		},
		onRefresh: function () {
			var oTable = this.byId("idTabPad");
			var aItems = oTable.getItems();
			aItems.forEach(function (oItem) {
				var aCells = oItem.getCells();
				aCells.forEach(function (oCell) {
					if (oCell instanceof sap.m.Input) {
						oCell.setValue("");
					}
				})
			})
		},
		onWellRefresh: function () {
			var oTable = this.byId("idTabWell");
			var aItems = oTable.getItems();
			aItems.forEach(function (oItem) {
				var aCells = oItem.getCells();
				aCells.forEach(function (oCell) {
					if (oCell instanceof sap.m.Input) {
						oCell.setValue("");
					}
				})
			})
		},

		onItemSelected: function (oEvent) {
			var a = oEvent.getSource().mAggregations.cells[0].mProperties.text;
			var b = oEvent.getSource().mAggregations.cells[1].mProperties.text;

			if (!this._frag) {
				this._frag = sap.ui.xmlfragment("idfrag", "com.ZpmAutoTmpl.ZPMAutoTmpl.fragment.hreflink", this);

			}
			this.getView().addDependent(this._frag);
			var oFilter1 = new sap.ui.model.Filter("Kitposition", sap.ui.model.FilterOperator.EQ, a);
			var oFilter = new sap.ui.model.Filter("Kittype", sap.ui.model.FilterOperator.EQ, b);

			var aFilter = [oFilter1, oFilter];
			var tab = Fragment.byId("idfrag", "idTab").getBinding("items").filter(aFilter);
			//select two rows default
			var oMTable = Fragment.byId("idfrag", "idTab");

			oMTable.attachEventOnce("updateFinished", function () {
				var aItems = oMTable.getItems();

				if (aItems.length > 0) {
					oMTable.setSelectedItem(aItems[0], true);
					if (aItems.length > 1) {
						oMTable.setSelectedItem(aItems[1], true);
						//select three rows default
						if (aItems.length > 2) {
							oMTable.setSelectedItem(aItems[2], true);
						}
					}

				}

			});

			this._frag.open();

		},

		onChange: function (oEvent) {
			var oTable = Fragment.byId("idfrag", "idTab");
			var selectedRowData = oTable.getSelectedItems();

			var aSelectedIndices = [];
			var aSelectedData = [];
			for (var i = 0; i < selectedRowData.length; i++) {
				var oContext = selectedRowData[i].getBindingContext();
				var oData = oContext.getObject();
				aSelectedIndices.push(oContext.getPath());
				aSelectedData.push(oData);
			}
			aSelectedIndices.splice(selectedRowData.length, 1);

			//greyd out selected Rows
			var oTab = selectedRowData;
			//greyd out for 3 rows
			for (var j = 0; j < oTab.length && j < 3; j++) {
				var oItem = oTab[j];

				oItem.addStyleClass("disabledRow");
				oItem.setType("Inactive");

			}

		},

		onContinue: function () {

			var oTable = Fragment.byId("idfrag", "idTab");
			var aSelectedRowData = [];
			var preSelectedRowData = this.selectedKitModel.getData().aSelectedRowData;
			var selectedItems = oTable.getSelectedItems();

			for (var i = 0; i < selectedItems.length; i++) {
				var item = selectedItems[i].getBindingContext().getObject();
				aSelectedRowData.push(item);
			}
			var jsonModel = new sap.ui.model.json.JSONModel();
			this.getView().setModel(jsonModel, "ddModel2");

			jsonModel.setData(aSelectedRowData);

			var equiptab = this.getView().byId("idTabKitEquip");
			equiptab.setModel(jsonModel);
			if (preSelectedRowData.length >= 0) {
				preSelectedRowData = preSelectedRowData.filter((rowData) => {
					return rowData.Kittype !== aSelectedRowData[0].Kittype || rowData.Kitposition !== aSelectedRowData[0].Kitposition
				})

				aSelectedRowData = preSelectedRowData.concat(aSelectedRowData);
			}

			this.selectedKitModel.setData({
				aSelectedRowData: aSelectedRowData
			});
			this._frag.close();

		},
		onClose: function (oEvent) {
			this._frag.close();
		},
		onBeforeRendering: function () {
			this.byId("idTabPad").setModel(this.jModelPad);
			this.byId("idTabWell").setModel(this.jModelWell);
			this.byId("idTabKitU").setModel(this.jModelKit)
		},
		handleIconTabBarSelect: function (t) {
			var i = t.getParameter("key");
			// this.storeCurrentInputValues();
			// this.restoreStoredInputValues(i);
			switch (i) {
			case "KEY1":
				this.getView().byId("addButton").setEnabled(false);
				break;
			case "KEY2":
				this.getView().byId("addButton").setEnabled(false);
				var s = this._dataPad.jPadDetailsSet[0].WellId;

				var d = parseInt(s);
				if (s <= 0) {
					e.show("Function Location must not be empty.");
					var o = t.getSource();
					o.setSelectedKey(self._selectedKey)
				}
				break;
			case "KEY3":
				this.getView().byId("addButton").setEnabled(false);
				var s = this._dataPad.jPadDetailsSet[0].WellId;

				var d = parseInt(s);

				if (s <= 0) {
					e.show("Function Location must not be empty.");
					var o = t.getSource();
					o.setSelectedKey(self._selectedKey)
				}

				break;
			case "KEY4":
				this.getView().byId("addButton").setEnabled(true);
				e.show("Selected KIT Type & Count");
				var s = this._dataPad.jPadDetailsSet[0].WellId;

				var d = parseInt(s);

				if (s <= 0) {
					e.show("Function Location must not be empty.");
					var o = t.getSource();
					o.setSelectedKey(self._selectedKey)
				}
				var l = this.byId("idTabKit");
				var r = l.getSelectedContexts();
				this._oDescData = {
					jKitDescription: []
				};

				var n = 0;
				var b = [];
				var length = this.getView().getModel("selectedKitModel").getProperty("/aSelectedRowData");

				for (var h = 0; h < r.length; h++) {
					var c = {};
					var K = 1;
					var g = r[h].getObject("Count");
					var count = parseInt(g);

					for (var d = 0; d < g; d++) {
						if (r[h].getObject("Kit").match("TANK")) {
							n = n + 1;
							c["slno"] = h;
							c["key"] = r[h].getObject("KitPos");
							var S = r[h].getObject("Kit") + " (" + r[h].getObject("Count") + ")";
							c["name"] = S;
							c["cont"] = K + d;
							var u = "(" + r[h].getObject("Count") + ")";
							var j = K + d;
							var D = u + "-" + j;
							var kitNewDesc = "";
							var wellData = this.jModelWell.oData.jWellDetailsSet;
							if (this.getView().getModel("selectedKitModel") && h < this.getView().getModel("selectedKitModel").getProperty(
									"/aSelectedRowData").length) {

								kitNewDesc = this.getView().getModel("selectedKitModel").getProperty("/aSelectedRowData")[h].KitDescNew;

							}
							this._oDescData.jKitDescription.push({
								kitSlNo: n,
								kitTyp: r[h].getObject("KitPos"),
								kit: S,
								KitMaxCnt: r[h].getObject("Count"),
								KitDescNew: kitNewDesc,
								PnidCntVal: D,
								pnidCont: K + d
							})
						}
					}
				}
				var p = new a(this._oDescData);
				this.getView().setModel(p, "ddModel");
				for (var i = 0; i < this.getView().getModel("ddModel").getData().jKitDescription.length; i++) {
					for (var l = 0; l < this.getView().getModel("selectedKitModel").getProperty("/aSelectedRowData").filter(item =>
							item.Kittype.includes("TANK")).length; l++) {
						if (this.getView().getModel("ddModel").getData().jKitDescription[i].kitTyp == this.getView().getModel("selectedKitModel").getProperty(
								"/aSelectedRowData").filter(item => item.Kittype.includes("TANK"))[l].Kitposition && this.getView().getModel("ddModel").getData()
							.jKitDescription[i].kit.slice(0, -4) == this.getView().getModel("selectedKitModel").getProperty(
								"/aSelectedRowData").filter(item => item.Kittype.includes("TANK"))[l].Kittype) {
							this.getView().getModel("selectedKitModel").getProperty("/aSelectedRowData").filter(item =>
								item.Kittype.includes("TANK"))[l].count = this.getView().getModel("ddModel").getData().jKitDescription[i].KitMaxCnt
						}
					}
				}

				var tankDetail = new a(this.getView().getModel("selectedKitModel").getProperty("/aSelectedRowData").filter(item =>
					item.Kittype.includes("TANK")));

				for (var j = 0; j < this.getView().getModel("selectedKitModel").getProperty("/aSelectedRowData").filter(item =>
						item.Kittype.includes("TANK")).length; j++) {
					var tankData = this.getView().getModel("selectedKitModel").getProperty("/aSelectedRowData").filter(item =>
						item.Kittype.includes("TANK"))[j];

					for (var k = 0; k < tankData.count; k++) {

						//two diffrent sets adding -27-06-2024

						tankData.Set = k + 1;

						var row = {...tankData
						};
						//var row = tankData;

						b.push(row);
						//first line and others except two rows  of input field disabled

						// first line of input field disabled

						b.forEach(function (item) {

							// 	if (item.Counter === "_0002" || item.Counter === "_0003") {
							// 		item.enabled = true;
							if (item.Counter === "_0001") {
								item.enabled = false;
							} else {
								item.enabled = true;
							}
							// 	} else {
							// 		item.enabled = false;
							// 	}
						});

						b.forEach(function (item) {

							if (item.Counter === "_0001" || item.Counter === "_0002" || item.Counter === "_0003") {
								item.enabled1 = false;

							} else {
								item.enabled1 = true;
							}
						});

					}
				}

				var newTankModel = new a(b);
				this.getView().setModel(newTankModel, "tankModel");

				var len = this.getView().getModel("tankModel").getData().length;
				var count = len;
				var tankcount = this.byId("idtext1").setText('(' + count + ')');

				if (this.getView().getModel("tankModel") === undefined) {
					this.getView().setModel(newTankModel, "tankModel");
				} else if (this.getView().getModel("tankModel").getData().length < b.length) {
					this.getView().setModel(newTankModel, "tankModel");
				} 
			
				
				
					else {
			
				var tankData = [];
			
				for(var q=0;q<this.getView().getModel("ddModel").getData().jKitDescription.length;q++){
				if (this.getView().getModel("ddModel").getData().jKitDescription[q].kitTyp === "WELL" ) {
					
					for (var s = 1; s < wellData[s].SerialNo; s++) {
				var	tankData = tankData.concat(this.getView().getModel("selectedKitModel").getProperty("/aSelectedRowData").filter(item =>
						   item.Kittype.includes("TANK")&& !item.Kitposition.includes("PAD")));
																

						// for (var u = 0; u < tankData.count; u++) {

						// 	tankData.Set = u + 1;
							var row = {...tankData
							};

						// 	tankData.push(row);

							// first line of input field disbaled 

							tankData.forEach(function (item1) {
								if (item1.Counter === "_0001") {
									item1.enabled = false;
								} else {
									item1.enabled = true;
								}
							});

							tankData.forEach(function (item1) {

								if (item1.Counter === "_0001" || item1.Counter === "_0002" || item1.Counter === "_0003") {
									item1.enabled1 = false;

								} else {
									item1.enabled1 = true;
								}
							});
							
						// 		var newtankModel = new a(tankData);
						// this.getView().setModel(newtankModel, "tankModel");
						// var length = this.getView().getModel("tankModel").getData().length;
			
						// var count = length;
						// var tankcount = this.byId("idtext1").setText('(' + count + ')');
						// }

							var tankData1=tankData.concat(b);
						var newtankModel = new a(tankData1);
						this.getView().setModel(newtankModel, "tankModel");
						var length = this.getView().getModel("tankModel").getData().length;
			
						var count = length;
						var tankcount = this.byId("idtext1").setText('(' + count + ')');
					
					}
				}
				// else{
				// if(this.getView().getModel("ddModel").getData().jKitDescription[q].kitTyp === "PAD"){
				// 	var	tankData = tankData.concat(this.getView().getModel("selectedKitModel").getProperty("/aSelectedRowData").filter(item =>
				// 			item.Kittype.includes("TANK")&& !item.Kitposition.includes("WELL")));

				// 		// for (var u = 0; u < tankData.count; u++) {

				// 		// 	tankData.Set = u + 1;
				// 		// 	var row = {...tankData
				// 		// 	};

				// 		// 	tankData.push(row);

				// 		// first line of input field disbaled 

				// 			tankData.forEach(function (item1) {
				// 				if (item1.Counter === "_0001") {
				// 					item1.enabled = false;
				// 				} else {
				// 					item1.enabled = true;
				// 				}
				// 			});

				// 			tankData.forEach(function (item1) {

				// 				if (item1.Counter === "_0001" || item1.Counter === "_0002" || item1.Counter === "_0003") {
				// 					item1.enabled1 = false;

				// 				} else {
				// 					item1.enabled1 = true;
				// 				}
				// 			});
							
				// 					var newtankModel = new a(tankData);
				// this.getView().setModel(newtankModel, "tankModel");
				// var length = this.getView().getModel("tankModel").getData().length;
				// 	var count = length;
				// 		var tankcount = this.byId("idtext1").setText('(' + count + ')');
				// 		// }
				
				// }
				// }
			
			
			
}
}
			
                 
			
                 

				break;
			case "KEY5":

				var oTable = Fragment.byId("idfrag", "idTab");
				var aSelectedRowData = [];
				this._oDescData = {
					jKitDescription: []
				};

				var selectedItems = oTable.getSelectedItems();

				for (var i = 0; i < selectedItems.length; i++) {
					var item = selectedItems[i].getBindingContext().getObject();
					aSelectedRowData.push(item);
				}
				var jsonModel = new sap.ui.model.json.JSONModel();
				this.getView().setModel(jsonModel, "ddModel2");
				jsonModel.setData(aSelectedRowData);

				this.getView().byId("addButton").setEnabled(true);
				e.show("Selected KIT Type & Count");
				var s = this._dataPad.jPadDetailsSet[0].WellId;
				var input1 = this.getView().byId("idKitdescu1").getValue();

				var wellData = this.jModelWell.oData.jWellDetailsSet;

				var d = parseInt(s);

				if (s <= 0) {
					e.show("Function Location must not be empty.");
					var o = t.getSource();
					o.setSelectedKey(self._selectedKey)
				}
				var l = this.byId("idTabKit");
				var r = l.getSelectedContexts();
				this._oDescData = {
					jKitDescription: []
				};

				var n = 0;
				var b = [];
				for (var h = 0; h < r.length; h++) {
					if (r[h].getObject("Kit").match("TANK") == null) {
						var c = {};
						var K = 1;
						var g = r[h].getObject("Count");
						var count = parseInt(g);
						// this.getView().getModel("selectedKitModel").getProperty("/aSelectedRowData")[h].count = count;
						for (var d = 0; d < g; d++) {

							n = n + 1;
							c["slno"] = h;
							c["key"] = r[h].getObject("KitPos");
							var S = r[h].getObject("Kit") + " (" + r[h].getObject("Count") + ")";
							c["name"] = S;
							c["cont"] = K + d;
							var u = "(" + r[h].getObject("Count") + ")";
							var j = K + d;
							var D = u + "-" + j;
							var kitNewDesc = "";
						
							if (this.getView().getModel("selectedKitModel") && h < this.getView().getModel("selectedKitModel").getProperty(
									"/aSelectedRowData").length) {

								kitNewDesc = this.getView().getModel("selectedKitModel").getProperty("/aSelectedRowData")[h].KitDescNew;

							}

							this._oDescData.jKitDescription.push({
								kitSlNo: n,
								kitTyp: r[h].getObject("KitPos"),
								kit: S,
								KitMaxCnt: r[h].getObject("Count"),
								KitDescNew: kitNewDesc,
								PnidCntVal: D,
								pnidCont: K + d
							
							})

						}

					}
				}
				var p = new a(this._oDescData);

				this.getView().setModel(p, "ddModel1");
				for (var i = 0; i < this.getView().getModel("ddModel1").getData().jKitDescription.length; i++) {
					for (var l = 0; l < this.getView().getModel("selectedKitModel").getProperty("/aSelectedRowData").filter(item =>
							!item.Kittype.includes("TANK")).length; l++) {
						if (this.getView().getModel("ddModel1").getData().jKitDescription[i].kitTyp == this.getView().getModel("selectedKitModel").getProperty(
								"/aSelectedRowData").filter(item => !item.Kittype.includes("TANK"))[l].Kitposition && this.getView().getModel("ddModel1").getData()
							.jKitDescription[i].kit.slice(0, -4) == this.getView().getModel("selectedKitModel").getProperty(
								"/aSelectedRowData").filter(item => !item.Kittype.includes("TANK"))[l].Kittype) {
							this.getView().getModel("selectedKitModel").getProperty("/aSelectedRowData").filter(item =>
								!item.Kittype.includes("TANK"))[l].count = this.getView().getModel("ddModel1").getData().jKitDescription[i].KitMaxCnt
						}
					}
				}
				for (var j = 0; j < this.getView().getModel("selectedKitModel").getProperty("/aSelectedRowData").filter(item =>
						!item.Kittype.includes("TANK")).length; j++) {
					var equipData = this.getView().getModel("selectedKitModel").getProperty("/aSelectedRowData").filter(item =>
						!item.Kittype.includes("TANK"))[j];

					for (var k = 0; k < equipData.count; k++) {

						equipData.Set = k + 1;
						var row = {...equipData
						};
						//var row = equipData;
						b.push(row);
						//first line of input field disbaled 
						var setFirstRow = {};
						b.forEach(function (item) {
							if (!setFirstRow[item.Set] || item.Counter === "_0001") {
								item.enabled = false;
								setFirstRow[item.Set] = true;
							} else {
								item.enabled = true;
							}
						});

					}

				}

				var newEquipModel = new a(b);
				this.getView().setModel(newEquipModel, "equipModel");
				var length = this.getView().getModel("equipModel").getData().length;

				var count = length;
				var equipcount = this.byId("idtext").setText('(' + count + ')');

				if (this.getView().getModel("equipModel") === undefined) {
					this.getView().setModel(newEquipModel, "equipModel");
				} else if (this.getView().getModel("equipModel").getData().length < b.length) {
					this.getView().setModel(newEquipModel, "equipModel");
				} 
				else {
			
				var equipData = [];
			
			
				for(var q=0;q<this.getView().getModel("ddModel1").getData().jKitDescription.length;q++){
				if (this.getView().getModel("ddModel1").getData().jKitDescription[q].kitTyp === "WELL" ) {
					
					for (var s = 1; s < wellData[s].SerialNo; s++) {
				var	equipData = equipData.concat(this.getView().getModel("selectedKitModel").getProperty("/aSelectedRowData").filter(item =>
							!item.Kittype.includes("TANK")&& !item.Kitposition.includes("PAD")));
																

						// for (var u = 0; u < equipData[q].count; u++) {

							// equipData[s].Set = s + 1;
							var row = {...equipData
							};

							// equipData.push(row);

							//first line of input field disbaled 
							var setFirstRow = {};
							equipData.forEach(function (item) {
								if (!setFirstRow[item.Set] || item.Counter === "_0001") {
									item.enabled = false;
									setFirstRow[item.Set] = true;
								} else {
									item.enabled = true;
								}
							
							});
						
							var equipData1=equipData.concat(b);
								var newEquipModel = new a(equipData1);
						this.getView().setModel(newEquipModel, "equipModel");
						var length = this.getView().getModel("equipModel").getData().length;
			
						var count = length;
						var equipcount = this.byId("idtext").setText('(' + count + ')');
						// }

						
				
					
					}
				}
// 				else if(this.getView().getModel("ddModel1").getData().jKitDescription[q].kitTyp === "PAD"){
// 					var	equipData = equipData.concat(this.getView().getModel("selectedKitModel").getProperty("/aSelectedRowData").filter(item =>
// 							!item.Kittype.includes("TANK")&& !item.Kitposition.includes("WELL")));

// 						// for (var u = 0; u < equipData[q].count; u++) {

// 						// 	equipData[q].Set = u + 1;
// 						// 	var row = {...equipData
// 						// 	};

// 						// 	equipData.push(row);
// 						var equipData=equipData.filter((value,index,self)=>index===self.findIndex((t)=>(
// 							t.Funclocequip===value.Funclocequip && t.Kittype===value.Kittype )));
							
// 								for (var u = 0; u < equipData[q].count; u++) {
// var	equipData = equipData.concat(this.getView().getModel("selectedKitModel").getProperty("/aSelectedRowData").filter(item =>
// 							!item.Kittype.includes("TANK")&& !item.Kitposition.includes("WELL")));
// 							equipData.Set[q] = u + 1;
// 							var row = {...equipData
// 							};

// 							equipData.push(row);

// 							//first line of input field disbaled 
// 							var setFirstRow = {};
// 						equipData.forEach(function (item) {
// 								if (!setFirstRow[item.Set] || item.Counter === "_0001"|| item.Counter==="_0002") {
// 									item.enabled = false;
// 									setFirstRow[item.Set] = true;
// 								} else {
// 									item.enabled = true;
// 								}
// 								//oProjectModel.push(item);
// 							});
// 							//oProjectModel.updateBindings(true);
								
// 									var newEquipModel = new a(equipData);
// 				this.getView().setModel(newEquipModel, "equipModel");
// 				var length = this.getView().getModel("equipModel").getData().length;
// 					var count = length;
// 						var equipcount = this.byId("idtext").setText('(' + count + ')');
// 						}
				
// 				}
				
			
			
			
			
}
}
			

				break;

			}

		},

		goToWell: function (t) {
			var a = this._dataPad.jPadDetailsSet[0].WellId;

			var i = parseInt(a);

			if (a <= 0) {
				e.show("Function Location must not be empty.");
				var s = t.getSource();
				s.setSelectedKey(self._selectedKey)
			} else {
				this.getView().byId("idIconTabBar").setSelectedKey("KEY2")
			}
		},
		onAddWell: function (t) {
			var e = this._dataPad.jPadDetailsSet[0].WellId;

			var a = parseInt(e);
			var i = this._dataWell.jWellDetailsSet.length;

			if (i == 0) {
				var s = 1;
				this._dataWell.jWellDetailsSet.push({
					Wid: 2002,
					WellIdOld: a,
					SerialNo: s,
					WellId: a + s,

					Desc: "",
					SysId: "",
					CostCenter: ""
				})
			} else if (i > 0) {
				var d = this._dataWell.jWellDetailsSet.slice(-1).pop().SerialNo;

				this._dataWell.jWellDetailsSet.push({
					Wid: 2002,
					WellIdOld: a,
					SerialNo: parseInt(d) + 1,
					WellId: a + (parseInt(d) + 1), //added 1 ,26-06-2024

					Desc: "",
					SysId: "",
					CostCenter: ""
				})
			}
			this.jModelWell.refresh()
		},
		onAddKitU: function (t) {
			var e = this._dataKit.jKitDescUpdSet.length;
			if (e == 0) {
				var a = 1;
				this._dataKit.jKitDescUpdSet.push({
					Kid: 1001,
					KitSerialNo: a,
					Kit: "",
					KitMaxCnt: "",
					KitUnused: "",
					KitUsed: "",
					KitDescNew: ""
				});
				this.jModelKit.refresh()
			} else if (e > 0) {
				var i = this._dataKit.jKitDescUpdSet.slice(-1).pop().KitSerialNo;
				for (var a = 0; a <= this._dataKit.jKitDescUpdSet.length; a++) {}
				this._dataKit.jKitDescUpdSet.push({
					Kid: 1001,
					KitSerialNo: parseInt(i) + 1,
					Kit: "",
					KitMaxCnt: "",
					KitUnused: "",
					KitUsed: "",
					KitDescNew: ""
				});
				this.jModelKit.refresh()
			}
		},
		onDeleteWell: function (t) {
			var e = t.getSource().getBindingContext().getObject();
			for (var a = 0; a < this._dataWell.jWellDetailsSet.length; a++) {
				if (this._dataWell.jWellDetailsSet[a] == e) {
					this._dataWell.jWellDetailsSet.splice(a, 1);
					this.jModelWell.refresh();
					break
				}
			}
		},
		onDeleteKitU: function (t) {
			var e = t.getSource().getBindingContext().getObject();
			for (var a = 0; a < this._dataKit.jKitDescUpdSet.length; a++) {
				if (this._dataKit.jKitDescUpdSet[a] == e) {
					this._dataKit.jKitDescUpdSet.splice(a, 1);
					this.jModelKit.refresh();
					break
				}
			}
		},
		onKitDropdownChange: function (t, a) {
			e.show(t.getSource().getValue());
			var i = t.getSource().getBindingContext();
			var s = 0;
			var d = t.getSource().getBindingContext().getObject();
			for (var o = 0; o < this._dataKit.jKitDescUpdSet.length; o++) {
				if (this._dataKit.jKitDescUpdSet[o] == d) {
					this._dataKit.jKitDescUpdSet[o].Kit = t.getSource().getValue();
					var l = t.getSource().getValue();
					var r = l.split("(");
					var n = r[1].split(")");
					this._dataKit.jKitDescUpdSet[o].KitMaxCnt = n[0];
					this._dataKit.jKitDescUpdSet[o].KitUsed = 1;
					if (s == 0) {
						var h = parseInt(n[0]) - 1
					} else {
						var h = parseInt(s) - 1
					}
					this._dataKit.jKitDescUpdSet[o].KitUnused = h;
					this._datakittotsel.jTotKitSelCombox.push({
						KitSerialNo: "",
						Kit: t.getSource().getValue(),
						KitMaxCnt: n[0],
						KitUnused: h,
						KitUsed: 1,
						KitDescNew: ""
					});
					for (var c = 0; c < this._datakittotsel.jTotKitSelCombox.length; c++) {
						if (this._datakittotsel.jTotKitSelCombox[c].Kit == t.getSource().getValue()) {
							s = this._datakittotsel.jTotKitSelCombox[c].KitUnused
						}
					}
					this.jModelKitPPP = new sap.ui.model.json.JSONModel;
					this.getView().setModel(this.jModelKitPPP, "kitModelPPP");
					this.jModelKit.setData(this._dataKit)
				}
			}
		},
		onSelectKit: function (t) {
			var e, a, i, s, d, o;
			e = t.getSource();
			s = e.getSelectedContexts("readModel");
			var l = this.byId("idTabKit");

			var r = l.getSelectedContexts();
			var n = t.getParameter("selected");
			for (var h = 0; h < r.length; h++) {
				var c = r[h].sPath.split("/")[2];
				if (n) {
					if (r[h].getObject().Count === "") {
						this.jModelRead.oData.jKitDetailsSet[c].Count = 1;
						this.jModelRead.oData.jKitDetailsSet[c].KitReq = "OK";
						this.jModelRead.oData.jKitDetailsSet[c].KitSta = true
					}
					this.byId("idTabKit").setModel(this.jModelRead);
					this.jModelRead.refresh()
				}
			}
		},
		onLiveChange: function (t) {
			var e = t.getSource();
			var a = e.getValue();
			a = a.replace("0000000000", "");
			a = a.replace(/[^\d]/g, "");
			e.setValue(a)
		},
		onKitCnt2: function (t) {
			var e = this.getView().byId("idTabKit");
			var a = e.getSelectedItems();
			var i = e.getSelectedContexts();
			var s, d, o;
			s = t.getSource();
			d = s.getBindingContext("readModel");
			var l = d.sPath.split("/")[2];
			for (var r = 0; r < a.length; r++) {
				e.setSelectedItem(a[r], false)
			}
		},
		onKitCnt: function (t) {
			var e = t.getSource();
			var a = e.getValue();
			a = a.replace(0, "");
			a = a.replace(/[^\d]/g, "");
			e.setValue(a);
			var i, s, d;
			i = t.getSource();
			s = i.getBindingContext("readModel");
			var o = this.getView().byId("idTabKit");
			var l = s.sPath.split("/")[2];
			o.setSelectedItem(o.getItems()[l]);
			var r = parseInt(t.getParameter("value"));
			if (r > 0) {
				if (r > 10) {
					s.getModel().setProperty("KitReq", "Invalid Count", s)
				} else {
					s.getModel().setProperty("KitReq", "Ok", s);
					o.setSelectedItem(o.getItems()[l], true)
				}
				s.getModel().setProperty("KitSta", true, s)
			} else {
				s.getModel().setProperty("KitReq", "", s);
				s.getModel().setProperty("KitSta", false, s);
				o.setSelectedItem(o.getItems()[l], false)
			}
			this.jModelRead.refresh()
		},

		onTankChange: function (oEvent) {
			var a = oEvent.getSource().getValue();
			var NewValue = oEvent.getParameter("value");
			var sPath = oEvent.getSource().getBindingContext("tankModel").getPath().split("/")[1];
			var sSet = this.getView().getModel("tankModel").getData()[sPath].Set;
			var sKittype = this.getView().getModel("tankModel").getData()[sPath].Kittype;
			//first input field value not be updated.
			var oContext = oEvent.getSource().getBindingContext("tankModel");
			var sPath1 = oContext.getPath();
			var oModel = oContext.getModel();
			var oData = oModel.getProperty(sPath1);
			var aItems = this.getView().getModel("tankModel").getData();
			// if(oData.Counter!== "_0001"){
			for (var j = 0; j < aItems.length; j++) {
				//first row of the table should not update pnid detail
				// if (aItems[j].Counter === "_0002" || aItems[j].Counter === "_0003") {
				if (aItems[j].Counter !== "_0001") {
					if (this.getView().getModel("tankModel").getProperty("/" + j + "/Set") === sSet && this.getView().getModel("tankModel").getProperty(
							"/" + j + "/Kittype") === sKittype) {
						oModel.setProperty("/" + j + "/KitDescNew", a);
						oModel.setProperty("/" + j + "/KitStat", true);
					}
				}
			}
			// }

			var Kitposition = this.getView().getModel("tankModel").getProperty(oEvent.getSource().getBindingContext("tankModel").getPath() +
				"/Kitposition");
			var Kittype = this.getView().getModel("tankModel").getProperty(oEvent.getSource().getBindingContext("tankModel").getPath() +
				"/Kittype");
			// if (this.getView().getModel("tankModel").getData().length > 0) {
			// 	for (var i = 0; i < this.getView().getModel("tankModel").getData().length; i++) {
			// 		//values for input field updated -27-06-2024
			// 		if (this.getView().getModel("tankModel").getProperty("/" + i + "/Set") == sSet) {
			// 			this.getView().getModel("tankModel").setProperty("/" + i + "/KitDescNew", a);
			// 			this.getView().getModel("tankModel").setProperty("/" + i + "/KitStat", true, a);

			// 		}

			// 	}
			// }

		},
		toggleStatus: function (oEvent) {
			IsSwitchOn: false;
			var oSwitch = oEvent.getSource();
			if (IsSwitchOn) {
				oSwitch.setState(true);
			}
			IsSwitchOn = !IsSwitchOn;
		},
		onKitDesc: function (t) {
			var e, a, i;
			e = t.getSource();
			a = e.getBindingContext("tankModel");

			var s = t.getParameter("value");
			if (s === "") {
				a.getModel().setProperty("KitStat", false, a)
			} else {
				a.getModel().setProperty("KitStat", true, a)
			}

		},
		onKitEquiDesc: function (t) {
			var e, a, i;
			e = t.getSource();
			a = e.getBindingContext("tankModel");

			var s = t.getParameter("value");
			if (s === "") {
				a.getModel().setProperty("KitStat", false, a)
			} else {
				a.getModel().setProperty("KitStat", true, a)
			}

		},

		onKitDesc1: function (t) {
			var e, a, i;
			e = t.getSource();
			a = e.getBindingContext("equipModel");

			var s = t.getParameter("value");
			if (s === "") {
				a.getModel().setProperty("KitStat", false, a)
			} else {
				a.getModel().setProperty("KitStat", true, a)
			}

		},

		onDeepCreate: function (t) {
			sap.ui.core.BusyIndicator.show();
			var a = this.byId("idTabKitU");
			var i = a.getModel();
			this.jKitDesc = a.getModel().getData().jKitDescUpdSet;
			var s = this.byId("idTabKit");
			var d = s.getModel();
			var o = s.getSelectedContexts();
			var l = {};
			var oTable = Fragment.byId("idfrag", "idTab");

			l.WellId = this._dataPad.jPadDetailsSet[0].WellId;

			l.Pid = "1001";
			l.PadCode = this._dataPad.jPadDetailsSet[0].PadCode;
			l.PadDesc = this._dataPad.jPadDetailsSet[0].PadDesc;
			l.CostCenter = this._dataPad.jPadDetailsSet[0].CostCenter;
			l.SysId = this._dataPad.jPadDetailsSet[0].SysId,
				l.GenEquip = this._dataPad.jPadDetailsSet[0].GenEquip;
			var r = [];
			if (this._dataPad.jPadDetailsSet.length > 0) {
				for (var n = 0; n < this._dataPad.jPadDetailsSet.length; n++) {
					var c = this._dataPad.jPadDetailsSet[n].WellId;

					var K = {
						WellId: c.toString(),

						Pid: "1001",
						PadCode: this._dataPad.jPadDetailsSet[n].PadCode,
						PadDesc: this._dataPad.jPadDetailsSet[n].PadDesc,
						CostCenter: this._dataPad.jPadDetailsSet[n].CostCenter.toString(),
						SysId: this._dataPad.jPadDetailsSet[n].SysId,
						GenEquip: this._dataPad.jPadDetailsSet[n].GenEquip
					};
					r.push(K)
				}
			}
			var g = [];
			if (this._dataWell.jWellDetailsSet.length > 0) {
				for (var n = 0; n < this._dataWell.jWellDetailsSet.length; n++) {
					var S = this._dataWell.jWellDetailsSet[n].SerialNo;
					var c = this._dataWell.jWellDetailsSet[n].WellId;
					var u = this._dataWell.jWellDetailsSet[n].WellIdOld;

					var j = {
						Wid: "1001",
						SerialNo: S.toString(),
						WellId: c.toString(),
						WellIdOld: u.toString(),

						Desc: this._dataWell.jWellDetailsSet[n].Desc,
						SysId: this._dataWell.jWellDetailsSet[n].SysId,
						CostCenter: this._dataWell.jWellDetailsSet[n].CostCenter
					};
					g.push(j)
				}
			}
			var D = [];
			var a = this.byId("idTabKit");
			var p = a.getSelectedContexts();
			if (p.length > 0) {
				for (var n = 0; n < p.length; n++) {
					var v = {
						Kid: "1001",
						KitPos: p[n].getObject("KitPos"),
						Kit: p[n].getObject("Kit"),
						KitDesc: p[n].getObject("KitDesc"),
						Count: p[n].getObject("Count").toString(),
						KitSta: p[n].getObject("KitSta"),
						KitMsg: p[n].getObject("KitMsg")
					};
					D.push(v)
				}
			}

			var E = [];
			var length = this.getView().getModel("tankModel").getData().length;
			if (length > 0) {
				for (var n = 0; n < length; n++) {
					this.obj = this.getView().getModel("tankModel").getData()[n].KitDescNew;
					var j = {
						Kitposition: this.getView().getModel("tankModel").getData()[n].Kitposition,
						Kittype: this.getView().getModel("tankModel").getData()[n].Kittype,
						Funclocequip: this.getView().getModel("tankModel").getData()[n].Funclocequip,
						Description: this.getView().getModel("tankModel").getData()[n].Description,
						Superiorflocequip: this.getView().getModel("tankModel").getData()[n].Superiorflocequip,
						KitDescNew: this.obj,
						EquipKitDescNew: this.getView().getModel("tankModel").getData()[n].EquipKitDescNew,
						Plant: this.getView().getModel("tankModel").getData()[n].Plant,
						Counter: this.getView().getModel("tankModel").getData()[n].Counter,
					};
					E.push(j)

				}
			}

			var F = [];
			var length = this.getView().getModel("equipModel").getData().length;
			if (length > 0) {
				for (var n = 0; n < length; n++) {
					this.obj = this.getView().getModel("equipModel").getData()[n].KitDescNew;
					var j = {
						Kitposition: this.getView().getModel("equipModel").getData()[n].Kitposition,
						Kittype: this.getView().getModel("equipModel").getData()[n].Kittype,
						Funclocequip: this.getView().getModel("equipModel").getData()[n].Funclocequip,
						Description: this.getView().getModel("equipModel").getData()[n].Description,
						Superiorflocequip: this.getView().getModel("equipModel").getData()[n].Superiorflocequip,
						KitDescNew: this.obj,
							EquipKitDescNew: this.getView().getModel("equipModel").getData()[n].EquipKitDescNew,
						Plant: this.getView().getModel("equipModel").getData()[n].Plant,
						Counter: this.getView().getModel("equipModel").getData()[n].Counter
					// WellId:	this.jModelWell.oData.jWellDetailsSet[n].WellId
					};
					F.push(j)

				}
			}

			var M = [];
			if (this._oDescData.jKitDescription.length > 0) {
				for (var n = 0; n < this._oDescData.jKitDescription.length; n++) {
					var P = this._oDescData.jKitDescription[n].pnidCont;
					var C = {
						Kid: "1001",
						KitSlno: this._oDescData.jKitDescription[n].kitSlNo.toString(),
						KitTyp: this._oDescData.jKitDescription[n].kitTyp,
						Kit: this._oDescData.jKitDescription[n].kit,
						KitNewDesc: this._oDescData.jKitDescription[n].KitDescNew,

						KitMaxcnt: this._oDescData.jKitDescription[n].KitMaxCnt.toString(),
						KitStat: this._oDescData.jKitDescription[n].KitStat,
						PnidCntVal: this._oDescData.jKitDescription[n].PnidCntVal.toString(),
						PnidCnt: P.toString(),

						KitStatcnt: this._oDescData.jKitDescription[n].KitStatCnt
					};
					M.push(C)
				}
			}
			var _ = [];
			l.PadToWellNav = g;
			l.PadToKidNav = D;
			l.PadToKitNav = M;
			var aKkitFlocSet = [];
			for (var i = 0; i < E.length; i++) {
				aKkitFlocSet.push(E[i]);
			}
			for (var i = 0; i < F.length; i++) {
				aKkitFlocSet.push(F[i]);
			}

			l.PadToKitFloc = aKkitFlocSet;
			l.PadToOutNav = _;

			h.create("/PadDetailsSet", l, "null", function (t, a) {
				e.show("Data Sent Success");

				var iM = new sap.ui.model.json.JSONModel;
				var filteredArray = [];

				for (var i = 0; i < this.selectedKitModel.getData().aSelectedRowData.length; i++) {
					if (this.selectedKitModel.getData().aSelectedRowData[i].Kitposition == "PAD") {
						// var filteredArray_Pad = a.data.PadToOutNav.results.filter(obj1 => this.selectedKitModel.getData().aSelectedRowData.some(obj2 =>
						// 	obj1.FunctionalLocEquipment === obj2.Funclocequip.substr(3) && obj1.Kit.slice(0, -1) === obj2.Kitposition + "-" + obj2.Kittype
						// ));
						var filteredArray_Pad = a.data.PadToOutNav.results.filter(obj1 => this.selectedKitModel.getData().aSelectedRowData.some(obj2 =>
							obj1.Plant === obj2.Plant && obj1.Kit.slice(0, -1) === obj2.Kitposition + "-" + obj2.Kittype
						));
						filteredArray = filteredArray.concat(filteredArray_Pad);
					}
					if (this.selectedKitModel.getData().aSelectedRowData[i].Kitposition == "WELL") {
						var filteredArray_Well = a.data.PadToOutNav.results.filter(obj1 => this.selectedKitModel.getData().aSelectedRowData.some(obj2 =>
							obj1.Plant === obj2.Plant && obj1.Kit.slice(0, -1) === obj2.Kitposition + "-" + obj2.Kittype));
						filteredArray = filteredArray.concat(filteredArray_Well);

					}
				}

				// i.setProperty("/jOutputDataSet", a.data.PadToOutNav.results);
				iM.setProperty("/jOutputDataSet", filteredArray);
				sap.ui.getCore().setModel(iM, "outModel");
				// sap.ui.getCore().getModel("outModel").refresh(true);
				e.show("Template is being generated, \n Please wait...", {
					duration: 8e3
				});
				$(".sapMMessageToast").addClass("sapMMessageToastSuccess ");
				var s = sap.ui.core.UIComponent.getRouterFor(this);
				s.navTo("View2Route");
				sap.ui.core.BusyIndicator.hide()
			}.bind(this), function (t) {
				var a = JSON.parse(t.response.body);
				e.show(a.error.message.value);
				$(".sapMMessageToast").addClass("sapMMessageToastDanger")
			});

		},
		goTo2Next: function (t) {
			var e = sap.ui.core.UIComponent.getRouterFor(this);
			e.navTo("View2Route");
			i.show("Are you sure you want to submit the form", {
				icon: i.Icon.WARNING,
				title: "Do you want to Save and Move to Next Page",
				actions: [i.Action.YES, i.Action.NO],
				emphasizedAction: i.Action.YES,
				onClose: function (t) {
					if (t === i.Action.YES) {} else if (t === i.Action.NO) {}
				}
			})
		}
	})
});