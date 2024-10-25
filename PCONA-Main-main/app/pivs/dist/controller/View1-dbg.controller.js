var that;
sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/Fragment",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/m/MessageToast",
    'sap/m/Token',
    "sap/ui/core/date/UI5Date",
    "sap/m/MessageBox",
    "sap/m/BusyDialog",
    'sap/ui/model/Sorter',
    'sap/ui/core/util/Export',
    'sap/ui/core/util/ExportTypeCSV',
    'sap/ui/export/Spreadsheet',

], function (Controller, Fragment, jsonModel, Filter, FilterOperator, MessageToast, Token, UI5Date, MessageBox, BusyDialog, Sorter, Export,
    ExportTypeCSV, Spreadsheet) {
    "use strict";

    return Controller.extend("pivs.controller.View1", {

        onInit: function () {
            // initialization of required global variables
            that = this;
            that.filteredData;
            that.busy = new BusyDialog();
            // setting default date as soon as user logs in
            this.setMaxDateforDateRange();
            // setting default Plant code
            // this.getView().byId("id_Plant").addToken(new Token({
            //     text: "14DN"
            // }));
            this.pivsReadCall();
            this.oFilterBar = this.getView().byId("filterbar");
            this.oTable = this.getView().byId("PIVSTable");
            //=========================================================            

        },

        pivsReadCall: function () {
            var oModel1 = this.getOwnerComponent().getModel("SalesSrv_global_model");
            that.busy.open()
            //jyothi cahanged on 17-04-2024
            var userModel = new sap.ui.model.json.JSONModel();
            oModel1.callFunction("/userInfo", {
                success: function (oData) {
                    userModel.setData(oData.userInfo.scopes);
                    that.getView().setModel(userModel, "userModel");
                    that.userLoggedIn = oData.userInfo.user;
                    
                }.bind(that),
                error: function (err) {
                    }.bind(that)
            })
            oModel1.read("/pivs_records",
                {
                    success: function (oRetrievedResult) {
                        var sUserModel=that.getView().getModel("userModel").getData();
                        if(sUserModel.TISAdmin===true){
                        that.getView().setModel(oRetrievedResult.results, "globalMainData")
                        }
                        else{
                            that.getView().setModel([], "globalMainData");
                              
                        }
                        that.busy.close()
                    },
                    error: function (oError) {
                        that.busy.close()
                    },

                });
        },

        setMaxDateforDateRange: function (oEvent) {
            var date = new Date();
            //var day = date.setDate(date.getDate() - 1);
            var day = date.setDate(date.getDate());
            day = new Date(day).getDate();
            day = day.toString().padStart(2, '0');
            var month = date.getMonth() + 1;
            month = month.toString().padStart(2, '0');
            var year = date.getFullYear().toString();
            that.completeDate = month + '-' + day + '-' + year;
            const dateObject = new Date(year, month - 1, day);
            var oDatePicker = this.getView().byId("id_datePicker1");
            // Set the value and disable future dates
            //oDatePicker.setValue(that.completeDate);
            oDatePicker.setMaxDate(dateObject);
        },

        handleChangeDate: function (oEvent) {

            that.startDate = oEvent.mParameters.value.substr(0, 10);
            that.endDate = oEvent.mParameters.value.substr(13, 20);

        },

        //=================
        // Fragments starts here           

        onOpenPlantFragment: function (oEvent) {
            if (this.oPlantFrag) {
                this.oPlantFrag = undefined;
            }
            if (!this.oPlantFrag) {
                that.busy.open()
                this.oPlantFrag = sap.ui.xmlfragment("pivs.Fragments.plant", this);
                this.getView().addDependent(that.oPlantFrag);
                var data1 = that.getView().getModel("globalMainData")

                var lookup = {};
                var items = data1;
                var result = [];

                for (var item, i = 0; item = items[i++];) {
                    var name = item.plant;

                    if (!(name in lookup)) {
                        lookup[name] = 1;
                        result.push({ "plant": name });
                    }
                }

                var oPlantModel = new jsonModel(result);
                this.getView().setModel(oPlantModel, "plantGlobalData")
                this.oPlantFrag.setModel(oPlantModel, "plantData");
            }
            that.busy.close()
            this.oPlantFrag.open();

        },

        // plant selected tokens
        onSelectionPlant: function (oEvent) {
            var aContexts = oEvent.getParameter("selectedContexts");
            var oMultiInput = this.getView().byId("id_Plant");
            var oSelectedContextP = [];
            var oModel = that.getView().getModel("plantGlobalData");
            for (var i = 0; i < aContexts.length; i++) {
                oSelectedContextP.push(aContexts[i]);
            }
            var oPlantModel = [];
            //Check for Unique Data
            // $.each(oSelectedContextP, function (i, el) {
            //     if ($.inArray(oSelectedContextP[i].ProductId, oPlantModel) === -1) oPlantModel.push(oSelectedContextP[i].getObject());
            // });

            //03-04-24 SAP Recommendation for slow loops @gnaneshwar.
            $.each(oSelectedContextP, function (i, el) {
                if ($.inArray(el.ProductId, oPlantModel) === -1) oPlantModel.push(el.getObject());
            });
            oModel.setProperty("/tokens2", oPlantModel);
            var oItemTemplateP;
            oItemTemplateP = oMultiInput.getTokens()[0];
            //Create the Template for token
            if (!oItemTemplateP) {
                oItemTemplateP = new Token({
                    text: "{plant}",
                    key: "{plant}"
                });
            } else {
                oItemTemplateP = oMultiInput.getTokens()[0].clone();
            }
            //Bind the tokens
            oPlantModel.forEach(function (item) {
                oMultiInput.addToken(new Token({
                    text: item.plant
                }));
            })

        },

        onOpenMaterialFragment: function (oEvent) {
            if (this.oMaterialFrag) {
                this.oMaterialFrag = undefined;
            }

            if (!this.oMaterialFrag) {
                that.busy.open()
                this.oMaterialFrag = sap.ui.xmlfragment("pivs.Fragments.material", that);
                this.getView().addDependent(that.oMaterialFrag);
                var materialData = that.getView().getModel("globalMainData")

                var lookup = {};
                var items = materialData;
                var result = [];

                for (var item, i = 0; item = items[i++];) {
                    var name = item.material;

                    if (!(name in lookup)) {
                        lookup[name] = 1;
                        result.push({ "material": name });
                    }
                }


                var oMaterialModel = new jsonModel(result);
                this.getView().setModel(oMaterialModel, "materialGlobalData")
                this.oMaterialFrag.setModel(oMaterialModel, "materialData");

            }
            that.busy.close()
            this.oMaterialFrag.open();

        },

        handleChangeStatus: function (oEvent) {

            var oValidatedComboBox = oEvent.getSource();
            that.statusKey = oValidatedComboBox.getSelectedKey();
            var sValue = oValidatedComboBox._getSelectedItemText();

        },

        handleChangeIndicator: function (oEvent) {

            var oValidatedComboBox = oEvent.getSource();
            that.indicatorKey = oValidatedComboBox.getSelectedKey();
            var sindicatorValue = oValidatedComboBox._getSelectedItemText();

        },

        // selected material
        onSelectionMaterial: function (oEvent) {
            this.getView().byId("id_Material").setTokens([]);
            that.oMaterialModel = [];
            var aContexts = oEvent.getParameter("selectedContexts");
            var oMultiInput = this.getView().byId("id_Material");
            var oSelectedContextM = [];
            var oModel = this.getView().getModel("materialGlobalData");
            for (var i = 0; i < aContexts.length; i++) {
                oSelectedContextM.push(aContexts[i]);
            }
            that.oMaterialModel = [];
            //Check for Unique Data
            // $.each(oSelectedContextM, function (i, el) {
            //     if ($.inArray(oSelectedContextM[i].ProductId, that.oMaterialModel) === -1) that.oMaterialModel.push(oSelectedContextM[i].getObject());
            // });

            //03-04-24 SAP Recommendation for slow loops @gnaneshwar.
            $.each(oSelectedContextM, function (i, el) {
                if ($.inArray(el.ProductId, that.oMaterialModel) === -1) that.oMaterialModel.push(el.getObject());
            });
            oModel.setProperty("/tokens3", that.oMaterialModel);
            var oItemTemplateMat;
            oItemTemplateMat = oMultiInput.getTokens()[0];
            //Create the Template for token
            if (!oItemTemplateMat) {
                oItemTemplateMat = new Token({
                    text: "{material}",
                    key: "{material}"
                });
            } else {
                oItemTemplateMat = oMultiInput.getTokens()[0].clone();
            }
            //Bind the tokens
            that.oMaterialModel.forEach(function (item) {
                oMultiInput.addToken(new Token({
                    text: item.material
                }));
            })

        },

        onOpenSalesOrderFragment: function (oEvent) {
            if (this.oSalesOrderFrag) {
                this.oSalesOrderFrag = undefined;
            }
            if (!this.oSalesOrderFrag) {
                that.busy.open()
                this.oSalesOrderFrag = sap.ui.xmlfragment("pivs.Fragments.salesOrder", that);
                this.getView().addDependent(that.oSalesOrderFrag);
                var salesOrderData = that.getView().getModel("globalMainData")

                var lookup = {};
                var items = salesOrderData;
                var result = [];

                for (var item, i = 0; item = items[i++];) {
                    var name = item.salesOrder;

                    if (!(name in lookup)) {
                        lookup[name] = 1;
                        result.push({ "salesOrder": name });
                    }
                }
                var oMatGroupModel = new jsonModel(result);
                this.getView().setModel(oMatGroupModel, "salesOrderGlobalData")
                this.oSalesOrderFrag.setModel(oMatGroupModel, "salesOrderData");
            }
            that.busy.close()
            this.oSalesOrderFrag.open();
        },

        // selected material Group
        onSelectionSalesOrder: function (oEvent) {
            var aContexts = oEvent.getParameter("selectedContexts");
            var oMultiInput = this.getView().byId("id_SalesOrder");
            var oSelectedContextMG = [];
            var oModel = this.getView().getModel("salesOrderGlobalData");
            for (var i = 0; i < aContexts.length; i++) {
                oSelectedContextMG.push(aContexts[i]);
            }
            var oMatGrpModel = [];
            //Check for Unique Data
            // $.each(oSelectedContextMG, function (i, el) {
            //     if ($.inArray(oSelectedContextMG[i].ProductId, oMatGrpModel) === -1) oMatGrpModel.push(oSelectedContextMG[i].getObject());
            // });

            //03-04-24 SAP Recommendation for slow loops @gnaneshwar.
            $.each(oSelectedContextMG, function (i, el) {
                if ($.inArray(el.ProductId, oMatGrpModel) === -1) oMatGrpModel.push(el.getObject());
            });
            oModel.setProperty("/tokens4", oMatGrpModel);
            var oItemTemplateMG;
            oItemTemplateMG = oMultiInput.getTokens()[0];
            //Create the Template for token
            if (!oItemTemplateMG) {
                oItemTemplateMG = new Token({
                    text: "{salesOrder}",
                    key: "{salesOrder}"
                });
            } else {
                oItemTemplateMG = oMultiInput.getTokens()[0].clone();
            }
            //Bind the tokens
            oMatGrpModel.forEach(function (item) {
                oMultiInput.addToken(new Token({
                    text: item.salesOrder
                }));
            })
        },

        onSearchPlant: function (oEvent) {
            var sValue = oEvent.getParameter("value");
            var oFilter = new Filter("plant", sap.ui.model.FilterOperator.Contains, sValue);
            var oBinding = oEvent.getParameter("itemsBinding");
            oBinding.filter([oFilter]);
        },
        onSearchMaterial: function (oEvent) {
            var sValue = oEvent.getParameter("value");
            var oFilter = new Filter("material", sap.ui.model.FilterOperator.Contains, sValue);
            var oBinding = oEvent.getParameter("itemsBinding");
            oBinding.filter([oFilter]);
        },
        onSearchSalesOrder: function (oEvent) {
            var sValue = oEvent.getParameter("value");
            var oFilter = new Filter("salesOrder", sap.ui.model.FilterOperator.Contains, sValue);
            var oBinding = oEvent.getParameter("itemsBinding");
            oBinding.filter([oFilter]);
        },

        onDialogClose: function (oEvent) {
            if (this.oSalesOrderFrag) {
                this.oSalesOrderFrag = undefined;
                this.oSalesOrderFrag = null
            }
            else if (this.oMaterialFrag) {
                this.oMaterialFrag = undefined;
                this.oMaterialFrag = null
            }
            else if (this.oPlantFrag) {
                this.oPlantFrag = undefined;
                //this.oPlantFrag = ;
            }

        },

        // 04-04-24 SAP recommendation for filter issue @gnaneshwar
        // onFilterChange: function (oEvent) {
        //     var aFilters = [];
        //     var sValue = oEvent.getParameter("value");
        //     var sPath = oEvent.getSource().getBindingContext().getPath();
        //     var sColumn = sPath.split("/").pop(); // Get the column name from the binding path
        //     if (sValue) {
        //         var oFilter = new sap.ui.model.Filter(sColumn, sap.ui.model.FilterOperator.Contains, sValue);
        //         aFilters.push(oFilter);
        //     }
        //     var oTable = this.byId("PIVSTable");
        //     var oBinding = oTable.getBinding("items");
        //     oBinding.filter(aFilters, sap.ui.model.FilterType.Application);
        // },
        // on click of Go button
        onGoToReport: function () {
            that.busy.open()

            // get all plant tokens

            var plantTokens = this.getView().byId("id_Plant").getTokens();
            that.sPlantValues = plantTokens.map(function (oToken) {
                return oToken.getText();
            }).join(",");



            // get all material tokens
            var materialTokens = this.getView().byId("id_Material").getTokens();
            that.sMaterialValues = materialTokens.map(function (oToken) {
                return oToken.getText();
            }).join(",");

            // get all material group tokens
            var salesOrderTokens = this.getView().byId("id_SalesOrder").getTokens();
            that.sSalesOrderValues = salesOrderTokens.map(function (oToken) {
                return oToken.getText();
            }).join(",");


            var filters = [];
            //  if (that.completeDate === undefined || that.completeDate.toString().includes("undefined")) {
            if ((that.startDate === "" && that.endDate === "") || (that.startDate === undefined && that.endDate === undefined)) {
                MessageBox.warning("Please Select Mandatory Fields")
                that.busy.close()
            } else {
                if (that.sMaterialValues !== "") {

                    var matVal = that.sMaterialValues.split(",");
                    if (matVal.length > 0) {
                        $.each(matVal, function (i, UIitem) {
                            filters.push(new sap.ui.model.Filter("material", sap.ui.model.FilterOperator.Contains, UIitem));
                        });
                    };
                }
                if (that.sSalesOrderValues !== "") {
                    var matgRPVal = that.sSalesOrderValues.split(",");
                    if (matgRPVal.length > 0) {
                        $.each(matgRPVal, function (i, UIitem) {
                            filters.push(new sap.ui.model.Filter("salesOrder", sap.ui.model.FilterOperator.Contains, UIitem));
                        });
                    };
                }
                if (that.sPlantValues !== "") {
                    var plantVal = that.sPlantValues.split(",");
                    if (plantVal.length > 0) {
                        $.each(plantVal, function (i, UIitem) {
                            filters.push(new sap.ui.model.Filter("plant", sap.ui.model.FilterOperator.Contains, UIitem));
                        });
                    };
                }

                if ((that.startDate !== "" && that.endDate !== "") || (that.startDate !== undefined && that.endDate !== undefined)) {

                    var startDate = that.startDate;
                    var endDate = that.endDate;

                    if (startDate) {
                        filters.push(new sap.ui.model.Filter("transmissionDate", sap.ui.model.FilterOperator.BT, startDate, endDate));

                    };
                }

                if (that.statusKey !== "" && that.statusKey !== undefined) {
                    var selectedStatusKey = that.statusKey;
                    if (selectedStatusKey) {
                        filters.push(new sap.ui.model.Filter("status", sap.ui.model.FilterOperator.Contains, selectedStatusKey));

                    };
                }

                if (that.indicatorKey !== "" && that.indicatorKey !== undefined) {
                    var selectedindicatorKey = that.indicatorKey;
                    if (selectedindicatorKey) {
                        filters.push(new sap.ui.model.Filter("indicator", sap.ui.model.FilterOperator.Contains, selectedindicatorKey));

                    };
                }






                that.tableMainModelfiltereddata = undefined
                that.tableMainModelfiltereddata = new jsonModel(that.getView().getModel("globalMainData"));
                that.getView().setModel(that.tableMainModelfiltereddata, "tableModel")
                this.getDefaultFilteredDateData();
                this.getView().byId("PIVSTable").getBinding("items").filter(filters);
                that.filteredData = true;
                that.filteredDataToExport = []
                var selectedITemsLength = this.getView().byId("PIVSTable").getBinding("items").aIndices.length
                that.filteredIndices = this.getView().byId("PIVSTable").getBinding("items").aIndices
                for (var i = 0; i < selectedITemsLength; i++) {

                    that.filteredDataToExport.push(that.tableMainModelfiltereddata.oData[that.filteredIndices[i]]);
                }
                var tableFilteredModel = new jsonModel(that.filteredDataToExport)
                that.getView().setModel(tableFilteredModel, "tableModel")

                that.busy.close()
            }
        },

        attachDateToExcel: function () {
            var oDateFormat = sap.ui.core.format.DateFormat.getDateTimeInstance({
                pattern: "MM-dd-yyyy"
            });
            var passCurrentdate = oDateFormat.format(new Date());
            return passCurrentdate;

        },

        // When users click on Export Excel button then this method will call.... 

        //04-04-24 Depprecated calls issue for excel SAP Recommendation @gnaneshwar
        onExportSelected: function (oEvent) {
            this.onGoToReport();
            var selectedItems = this.getView().byId("PIVSTable").getSelectedItems();
            var selectedEntries = this.getView().getModel("globalMainData");
            var filteredData = this.filteredData;
            var oselectedModel;

            if (filteredData === true) {
                oselectedModel = new sap.ui.model.json.JSONModel(this.getView().getModel("tableModel").getData());
            } else {
                oselectedModel = new sap.ui.model.json.JSONModel(selectedEntries.getData());
            }

            var aCols = [
                { label: "Indicator", property: "indicator" },
                { label: "Transmission Date", property: "transmissionDate" },
                { label: "Timestamp", property: "timestamp" },
                { label: "Sales Order", property: "salesOrder" },
                { label: "Scheduled Line No", property: "scheduledLineNo" },
                { label: "Material", property: "material" },
                { label: "Plant", property: "plant" },
                { label: "Confirm Quantity", property: "confirmQuantity" },
                { label: "Factory Confirm Quantity", property: "factoryConfirmQuantity" },
                { label: "UOM", property: "uom" },
                { label: "Confirm Date", property: "confirmDate" },
                { label: "Status", property: "status" },
                { label: "Message", property: "message" }
            ];

            var oSettings = {
                workbook: { columns: aCols,
                    context: {
                        sheetName: 'PIVSExport_'+ this.attachDateToExcel()
                    },
                 },
                dataSource: oselectedModel.getData(),
                fileName: "PIVSExport_" + this.attachDateToExcel() + ".xlsx",
            };

            var oSpreadsheet = new sap.ui.export.Spreadsheet(oSettings);
            oSpreadsheet.build().finally(function () {
                oSpreadsheet.destroy();
            });
        },
        //    onExportSelected: function (oEvent) {
        //     this.onGoToReport();
        //     var selectedITemsLength = this.getView().byId("PIVSTable").getSelectedItems().length
        //     that.oItem = this.getView().byId("PIVSTable").getSelectedItem();
        //     that.selectedEntries = that.getView().getModel("globalMainData")
        //     if (that.filteredData === true) {

        //         var oselectedModel = new sap.ui.model.json.JSONModel(that.getView().getModel("tableModel").oData)
        //     }
        //     else {
        //         var oselectedModel = new sap.ui.model.json.JSONModel(that.selectedEntries)
        //     }
        //     var oExport = new sap.ui.core.util.Export({
        //         exportType: new sap.ui.core.util.ExportTypeCSV({
        //             separatorChar: "\t",
        //             mimeType: "application/vnd.ms-excel",
        //             charset: "utf-8",
        //             fileExtension: "xls"
        //         }),

        //         models: oselectedModel,

        //         rows: {
        //             path: "/"
        //         },
        //         columns: [{
        //             name: "Indicator",
        //             template: {
        //                 content: "{indicator}"
        //             }
        //         }, {
        //             name: "Transmission Date",
        //             template: {
        //                 content: "{transmissionDate}"
        //             }
        //         }, {
        //             name: "Timestamp",
        //             template: {
        //                 content: "{timestamp}"
        //             }
        //         }, {
        //             name: "Sales Order",
        //             template: {
        //                 content: "{salesOrder}"
        //             }
        //         }, {
        //             name: "Scheduled Line No",
        //             template: {
        //                 content: "{scheduledLineNo}"
        //             }
        //         }, {
        //             name: "Material",
        //             template: {
        //                 content: "{material}"
        //             }
        //         }, {
        //             name: "Plant",
        //             template: {
        //                 content: "{plant}"
        //             }
        //         }, {
        //             name: "Confirm Quantity",
        //             template: {
        //                 content: "{confirmQuantity}"
        //             }
        //         }, {
        //             name: "Factory Confirm Quantity",
        //             template: {
        //                 content: "{factoryConfirmQuantity}"
        //             }
        //         }, {
        //             name: "UOM",
        //             template: {
        //                 content: "{uom}"
        //             }
        //         }, {
        //             name: "Confirm Date",
        //             template: {
        //                 content: "{confirmDate}"
        //             }
        //         }, {
        //             name: "Status",
        //             template: {
        //                 content: "{status}"
        //             }
        //         }, {
        //             name: "Message",
        //             template: {
        //                 content: "{message}"
        //             }
        //         }]

        //     });

        //     //* download exported file

        //     oExport.saveFile("PIVSExport_"+this.attachDateToExcel()).always(function () {

        //         this.destroy();

        //     });
        // },


        handleSortButtonPressed: function (oEvent) {

            if (this.oSortFrag) {
                this.oSortFrag = undefined;
            }
            if (!this.oSortFrag) {
                that.busy.open()
                this.oSortFrag = sap.ui.xmlfragment("pivs.Fragments.ascAndDscSort", that);
                this.getView().addDependent(that.oSortFrag);

            }
            that.busy.close()
            this.oSortFrag.open();

        },

        getDefaultFilteredDateData: function () {
            var oTable = this.byId("PIVSTable");
            var oBinding = oTable.getBinding("items");
            var aSorters = [];
            aSorters.push(new Sorter("transmissionDate", true));
            oBinding.sort(aSorters);
        },

        // handle sort
        handleSortDialogConfirm: function (oEvent) {

            var oTable = this.byId("PIVSTable"),
                mParams = oEvent.getParameters(),
                oBinding = oTable.getBinding("items"),
                sPath,
                bDescending,
                aSorters = [];

            sPath = mParams.sortItem.getKey();
            bDescending = mParams.sortDescending;
            aSorters.push(new Sorter(sPath, bDescending));

            // apply the selected sort and group settings
            oBinding.sort(aSorters);
        },


        onPressClear: function (oEvent) {
            that.filteredData = false;
            this.getView().byId("id_datePicker1").setValue("");
            this.getView().byId("id_Plant").setTokens([]);
            this.getView().byId("id_Material").setTokens([]);
            this.getView().byId("id_SalesOrder").setTokens([]);
            this.getView().byId("id_PIVSStatus").setSelectedKey();
            this.getView().byId("id_Indicator").setSelectedKey();
            var tableMainModel = new jsonModel();
            that.getView().setModel(tableMainModel, "tableModel")
            that.completeDate = ""
            that.statusKey = ""
            that.indicatorKey = ""
            that.startDate = ""
            that.endDate = ""


        }

    });

});
