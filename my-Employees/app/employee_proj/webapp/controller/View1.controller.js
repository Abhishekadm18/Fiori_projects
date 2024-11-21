sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/Fragment",
     "sap/m/MessageBox"
],
function (Controller,Fragment,MessageBox) {
    "use strict";

    return Controller.extend("employeeproj.controller.View1", {
        onInit: function () {
        },
        onCreate: function () {
            var oView = this.getView();
            if (!this.byId("helloDialog")) {
                Fragment.load({
                    id: oView.getId(),
                    name: "employeeproj.view.dailog",
                    controller: this
                }).then(function (oDialog) {
                    oView.addDependent(oDialog);
                    oDialog.open();
                });
            } else {
                this.byId("helloDialog").open();
            }
        },
        onCancel: function () {
            this.byId("helloDialog").close();
            var a = this.byId("name2");
            a.setValue("");
            var b = this.byId("name3");
            b.setValue("");
            var c = this.byId("name1");
            c.setValue("");
        },
        savedata: function () {

            var b = this.byId("ID");
            var fID = b.getValue();

            var c = this.byId("name");
            var fname = c.getValue();
            

            var a = this.byId("email");
            var femail = a.getValue();
            

            var d = this.byId("manager");
            var fmanager = d.getSelectedKey();


            var record = {
                "ID": fID,
                "name": fname,
                "email_id": femail,
                "manager": fmanager,
            }
            console.log(record);
            jQuery.ajax({
                type: "POST",
                contentType: "application/json",
                url: "/v2/odata/v4/employee-services/Employees",
                data: JSON.stringify(record),
                success: function (data) {
                    MessageBox.success("Data saved to local database successfully!");
                    that.onCancel();
                    that.onReadEmpData();
                },
                error: function (err) {
                    MessageBox.error("Error saving data to local database: " + err.responseText);
                }
            });

        },
        
    });
});
