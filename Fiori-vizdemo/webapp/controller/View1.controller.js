sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/viz/ui5/data/FlattenedDataset",
    "sap/viz/ui5/controls/common/feeds/FeedItem"
], function (Controller, FlattenedDataset, FeedItem) {
    "use strict";

    return Controller.extend("project2.controller.View1", {
        onInit: function () {
            var data = [{
                "Category": "Category 1",
                "Revenue": 100
            }, {
                "Category": "Category 2",
                "Revenue": 200
            }, {
                "Category": "Category 3",
                "Revenue": 300
            }, {
                "Category": "Category 4",
                "Revenue": 400
            }, {
                "Category": "Category 5",
                "Revenue": 500
            }];
            // Load local JSON data
            var oDataModel = new sap.ui.model.json.JSONModel(data);
            // Use this line in case you are loading from external OData url
            // oDataModel.loadData(data);

            // Get the VizFrame control
            var oChartContainer = this.getView().byId("chartContainer");

            // Set the data model to the VizFrame
            oChartContainer.setModel(oDataModel);

            // Create a FlattenedDataset
            var oDataset = new FlattenedDataset({
                dimensions: [{
                    name: "Category",
                    value: "{Category}"
                }],
                measures: [{
                    name: "Revenue",
                    value: "{Revenue}"
                }],
                data: {
                    path: "/"
                }
            });

            // Add the dataset to the VizFrame
            oChartContainer.setDataset(oDataset);

            // Create a FeedItem for Category dimension
            var oCategoryFeed = new FeedItem({
                uid: "categoryAxis",
                type: "Dimension",
                values: ["Category"]
            });

            // Create a FeedItem for Revenue measure
            var oRevenueFeed = new FeedItem({
                uid: "valueAxis",
                type: "Measure",
                values: ["Revenue"]
            });

            // Add the FeedItems to the VizFrame
            oChartContainer.addFeed(oCategoryFeed);
            oChartContainer.addFeed(oRevenueFeed);
        },

        onDatasetSelectedLine: function(oEvent){
            this.byId("chartContainer").setVizType('line');
        },

        onDatasetSelecteColumn: function(oEvent){
            this.byId("chartContainer").setVizType('column');
        },

        onDatasetSelecteBullet: function(oEvent){
            this.byId("chartContainer").setVizType('bullet');
        },

        onDatasetSelecteArea: function(oEvent){
            this.byId("chartContainer").setVizType('area');
        },
        onDatasetSelecteScatter: function(oEvent){
            this.byId("chartContainer").setVizType('waterfall');
        },

    });
});


