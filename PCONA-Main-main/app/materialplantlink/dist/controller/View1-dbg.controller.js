var that;
sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/Fragment",
    "sap/ui/model/json/JSONModel",
    'sap/ui/core/util/Export',
    'sap/ui/core/util/ExportTypeCSV',
    'sap/ui/export/Spreadsheet',
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/m/MessageToast",
    'sap/m/Token',
    "sap/m/MessageBox",
    "sap/m/BusyDialog",
    'sap/ui/model/Sorter'

], function (Controller, Fragment, jsonModel, Export, ExportTypeCSV,
    Spreadsheet, Filter, FilterOperator, MessageToast, Token, MessageBox, BusyDialog, Sorter) {
    "use strict";

    return Controller.extend("materialplantlink.controller.View1", {

        onInit: function () {
            // initialization of required global variables
            that = this;
            that.filteredData;
            that.busy = new BusyDialog();
            this.onReadCall();
            this.oFilterBar = this.getView().byId("filterbar");
            this.oTable = this.getView().byId("exportTable");
            //=========================================================


        },

        onReadCall: function () {
            var oModel1 = this.getOwnerComponent().getModel("mdgSrv_GlobalModel");

            that.busy.open()
            var userModel = new sap.ui.model.json.JSONModel();
            //var oModel1 = this.getOwnerComponent().getModel("global_model");
            oModel1.callFunction("/userInfo", {
                success: function (oData) {
                    userModel.setData(oData.userInfo.scopes);
                    that.getView().setModel(userModel, "userModel");
                    that.userLoggedIn = oData.userInfo.user;
                    
                }.bind(that),
                error: function (err) {
                    }.bind(that)
            })

            oModel1.read("/zplink_records",
                {
                    success: function (oRetrievedResult) {
                        var sUserModel=that.getView().getModel("userModel").getData();
                        if(sUserModel.TISAdmin===true){

                        that.getView().setModel(oRetrievedResult.results, "globalMainData")

                        that.tableModelToView = new jsonModel(that.getView().getModel("globalMainData"));
                        that.getView().setModel(that.tableModelToView, "tableModel")
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

        // When users click on Export Excel button then this method will call.... 


        //=================
        // Fragments starts here

        onOpenSalesOrgFragment: function (oEvent) {
            if (this.oSalesOrgFrag) {
                this.oSalesOrgFrag = undefined;
            }
            if (!this.oSalesOrgFrag) {
                that.busy.open()
                this.oSalesOrgFrag = sap.ui.xmlfragment("materialplantlink.Fragments.salesOrg", that);
                this.getView().addDependent(that.oSalesOrgFrag);
                var oSales_org = that.getView().getModel("globalMainData")
                var lookup = {};
                var items = oSales_org;
                var result = [];
                for (var item, i = 0; item = items[i++];) {
                    var name = item.sales_org;
                    if (!(name in lookup)) {
                        lookup[name] = 1;
                        result.push({ "sales_org": name });
                    }
                }
                var oSales_OrgModel = new jsonModel(result);
                this.getView().setModel(oSales_OrgModel, "sales_OrgGlobalData")
                this.oSalesOrgFrag.setModel(oSales_OrgModel, "sales_OrgData");

            }
            that.busy.close()
            this.oSalesOrgFrag.open();

        },
        // Sales Org selected tokens
        onSelectionSalesOrg: function (oEvent) {
            var aContexts = oEvent.getParameter("selectedContexts");
            var oMultiInput = this.getView().byId("id_salesorg");
            var oSelectedContextCC = [];
            var oModel = this.getView().getModel("sales_OrgGlobalData");
            for (var i = 0; i < aContexts.length; i++) {
                oSelectedContextCC.push(aContexts[i]);
            }
            that.oSalesOrgModel = [];
            //Check for Unique Data
            // $.each(oSelectedContextCC, function (i, el) {
            //     if ($.inArray(oSelectedContextCC[i].ProductId, that.oSalesOrgModel) === -1) that.oSalesOrgModel.push(oSelectedContextCC[i].getObject());
            // });

            //03-04-24 SAP Recommendation for slow loops @gnaneshwar.
            $.each(oSelectedContextCC, function (i, el) {
                if ($.inArray(el.ProductId, that.oSalesOrgModel) === -1) that.oSalesOrgModel.push(el.getObject());
            });
            oModel.setProperty("/tokens1", that.oSalesOrgModel);
            var oItemTemplateCC;
            oItemTemplateCC = oMultiInput.getTokens()[0];
            //Create the Template for token
            if (!oItemTemplateCC) {
                oItemTemplateCC = new Token({
                    text: "{sales_org}",
                    key: "{sales_org}"
                });
            } else {
                oItemTemplateCC = oMultiInput.getTokens()[0].clone();
            }
            //Bind the tokens
            that.oSalesOrgModel.forEach(function (item) {
                oMultiInput.addToken(new Token({
                    text: item.sales_org
                }));
            })
        },

        onOpenDCFragment: function (oEvent) {
            if (this.oDCFrag) {
                this.oDCFrag = undefined;
            }
            if (!this.oDCFrag) {
                that.busy.open()
                this.oDCFrag = sap.ui.xmlfragment("materialplantlink.Fragments.distributionChannel", that);
                this.getView().addDependent(that.oDCFrag);
                var oDistribution_channel = that.getView().getModel("globalMainData")
                var lookup = {};
                var items = oDistribution_channel;
                var result = [];
                for (var item, i = 0; item = items[i++];) {
                    var name = item.dist_channel;
                    if (!(name in lookup)) {
                        lookup[name] = 1;
                        result.push({ "dist_channel": name });
                    }
                }
                var odist_channelModel = new jsonModel(result);
                this.getView().setModel(odist_channelModel, "dist_channelGlobalData")
                this.oDCFrag.setModel(odist_channelModel, "dist_channelData");

            }
            that.busy.close()
            this.oDCFrag.open();

        },

        // plant selected tokens
        onSelectionDC: function (oEvent) {
            var aContexts = oEvent.getParameter("selectedContexts");
            var oMultiInput = this.getView().byId("id_distributionChnl");
            var oSelectedContextP = [];
            var oModel = that.getView().getModel("dist_channelGlobalData");
            for (var i = 0; i < aContexts.length; i++) {
                oSelectedContextP.push(aContexts[i]);
            }
            var odist_channelModel = [];
            //Check for Unique Data
            // $.each(oSelectedContextP, function (i, el) {
            //     if ($.inArray(oSelectedContextP[i].ProductId, odist_channelModel) === -1) odist_channelModel.push(oSelectedContextP[i].getObject());
            // });


            //03-04-24 SAP Recommendation for slow loops @gnaneshwar.
            $.each(oSelectedContextP, function (i, el) {
                if ($.inArray(el.ProductId, odist_channelModel) === -1) odist_channelModel.push(el.getObject());
            });
            oModel.setProperty("/tokens2", odist_channelModel);
            var oItemTemplateP;
            oItemTemplateP = oMultiInput.getTokens()[0];
            //Create the Template for token
            if (!oItemTemplateP) {
                oItemTemplateP = new Token({
                    text: "{dist_channel}",
                    key: "{dist_channel}"
                });
            } else {
                oItemTemplateP = oMultiInput.getTokens()[0].clone();
            }
            //Bind the tokens

            odist_channelModel.forEach(function (item) {
                oMultiInput.addToken(new Token({
                    text: item.dist_channel
                }));
            })

        },

        onOpenPlantFragment: function (oEvent) {
            if (this.oPlantFrag) {
                this.oPlantFrag = undefined;
            }
            if (!this.oPlantFrag) {
                that.busy.open()
                this.oPlantFrag = sap.ui.xmlfragment("materialplantlink.Fragments.plant", that);
                this.getView().addDependent(that.oPlantFrag);
                var oPlantDataModel = that.getView().getModel("globalMainData")
                var lookup = {};
                var items = oPlantDataModel;
                var result = [];
                for (var item, i = 0; item = items[i++];) {
                    var name = item.plant;
                    if (!(name in lookup)) {
                        lookup[name] = 1;
                        result.push({ "plant": name });
                    }

                }
                var oPlantlModel = new jsonModel(result);
                this.getView().setModel(oPlantlModel, "PlantGlobalData")
                this.oPlantFrag.setModel(oPlantlModel, "PlantData");

            }
            that.busy.close()
            this.oPlantFrag.open();

        },


        // selected material
        onSelectionPlant: function (oEvent) {
            this.getView().byId("id_Plant").setTokens([]);
            that.oPlantSelectedModel = [];
            var aContexts = oEvent.getParameter("selectedContexts");
            var oMultiInput = this.getView().byId("id_Plant");
            var oSelectedContextM = [];
            var oModel = this.getView().getModel("PlantGlobalData");
            for (var i = 0; i < aContexts.length; i++) {
                oSelectedContextM.push(aContexts[i]);
            }
            that.oPlantSelectedModel = [];
            //Check for Unique Data
            // $.each(oSelectedContextM, function (i, el) {
            //     if ($.inArray(oSelectedContextM[i].ProductId, that.oPlantSelectedModel) === -1) that.oPlantSelectedModel.push(oSelectedContextM[i].getObject());
            // });

            //03-04-24 SAP Recommendation for slow loops @gnaneshwar.
            $.each(oSelectedContextM, function (i, el) {
                if ($.inArray(el.ProductId, that.oPlantSelectedModel) === -1) that.oPlantSelectedModel.push(el.getObject());
            });
            oModel.setProperty("/tokens3", that.oPlantSelectedModel);
            var oItemTemplateMat;
            oItemTemplateMat = oMultiInput.getTokens()[0];
            //Create the Template for token
            if (!oItemTemplateMat) {
                oItemTemplateMat = new Token({
                    text: "{plant}",
                    key: "{plant}"
                });
            } else {
                oItemTemplateMat = oMultiInput.getTokens()[0].clone();
            }
            //Bind the tokens
            that.oPlantSelectedModel.forEach(function (item) {
                oMultiInput.addToken(new Token({
                    text: item.plant
                }));
            })

        },



        onOpenMaterialGroupFragment: function (oEvent) {
            if (this.oMatGrpFrag) {
                this.oMatGrpFrag = undefined;
            }
            if (!this.oMatGrpFrag) {
                that.busy.open()
                this.oMatGrpFrag = sap.ui.xmlfragment("materialplantlink.Fragments.materialGroup", that);
                this.getView().addDependent(that.oMatGrpFrag);
                var oMGDataModel = that.getView().getModel("globalMainData")
                var lookup = {};
                var items = oMGDataModel;
                var result = [];
                for (var item, i = 0; item = items[i++];) {
                    var name = item.material_group;
                    if (!(name in lookup)) {
                        lookup[name] = 1;
                        result.push({ "material_group": name });
                    }
                }
                var oMGModel = new jsonModel(result);
                this.getView().setModel(oMGModel, "MG_GlobalData")
                this.oMatGrpFrag.setModel(oMGModel, "MGData");

            }
            that.busy.close()
            this.oMatGrpFrag.open();

        },

        // selected material Group
        onSelectionMaterialGroup: function (oEvent) {
            var aContexts = oEvent.getParameter("selectedContexts");
            var oMultiInput = this.getView().byId("id_MaterialGroup");
            var oSelectedContextMG = [];
            var oModel = this.getView().getModel("MG_GlobalData");
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
                    text: "{material_group}",
                    key: "{material_group}"
                });
            } else {
                oItemTemplateMG = oMultiInput.getTokens()[0].clone();
            }
            //Bind the tokens
            oMatGrpModel.forEach(function (item) {
                oMultiInput.addToken(new Token({
                    text: item.material_group
                }));
            })
        },




        onSearchSalesOrg: function (oEvent) {
            var sValue = oEvent.getParameter("value");
            var oFilter = new Filter("sales_org", sap.ui.model.FilterOperator.Contains, sValue);
            var oBinding = oEvent.getParameter("itemsBinding");
            oBinding.filter([oFilter]);
        },
        onSearchDistributionChannel: function (oEvent) {
            var sValue = oEvent.getParameter("value");
            var oFilter = new Filter("dist_channel", sap.ui.model.FilterOperator.Contains, sValue);
            var oBinding = oEvent.getParameter("itemsBinding");
            oBinding.filter([oFilter]);
        },
        onSearchPlant: function (oEvent) {
            var sValue = oEvent.getParameter("value");
            var oFilter = new Filter("plant", sap.ui.model.FilterOperator.Contains, sValue);
            var oBinding = oEvent.getParameter("itemsBinding");
            oBinding.filter([oFilter]);
        },


        onSearchMaterialGroup: function (oEvent) {
            var sValue = oEvent.getParameter("value");
            var oFilter = new Filter("material_group", sap.ui.model.FilterOperator.Contains, sValue);
            var oBinding = oEvent.getParameter("itemsBinding");
            oBinding.filter([oFilter]);
        },




        onDialogClose: function (oEvent) {
            if (this.oMatGroupFrag) {
                this.oMatGroupFrag = undefined;
                this.oMatGroupFrag = null
            }
            else if (this.oMaterialFrag) {
                this.oMaterialFrag = undefined;
                this.oMaterialFrag = null
            }
            else if (this.oPlantFrag) {
                this.oPlantFrag = undefined;
                //this.oPlantFrag = ;
            }
            else if (this.oComapnyCodeFrag) {
                this.oComapnyCodeFrag = undefined;
                this.oComapnyCodeFrag = null;
            }
        },

        // 08-04-24 SAP recommendation for filter issue @gnaneshwar
        // onFilterChange: function (oEvent) {
        //     var aFilters = [];
        //     var sValue = oEvent.getParameter("value");
        //     var sPath = oEvent.getSource().getBindingContext().getPath();
        //     var sColumn = sPath.split("/").pop(); // Get the column name from the binding path
        //     if (sValue) {
        //         var oFilter = new sap.ui.model.Filter(sColumn, sap.ui.model.FilterOperator.Contains, sValue);
        //         aFilters.push(oFilter);
        //     }
        //     var oTable = this.byId("exportTable");
        //     var oBinding = oTable.getBinding("items");
        //     oBinding.filter(aFilters, sap.ui.model.FilterType.Application);
        // },
        // on click of Go button
        onGoToReport: function () {
            that.busy.open()


            // get all sales Org tokens
            var salesOrgTokens = this.getView().byId("id_salesorg").getTokens();
            that.sSalesOrgValues = salesOrgTokens.map(function (oToken) {
                return oToken.getText();
            }).join(",");

            // get all Distribution Channel tokens
            var DCTokens = this.getView().byId("id_distributionChnl").getTokens();
            that.sDCValues = DCTokens.map(function (oToken) {
                return oToken.getText();
            }).join(",");

            // get all plant tokens

            var plantTokens = this.getView().byId("id_Plant").getTokens();
            that.sPlantValues = plantTokens.map(function (oToken) {
                return oToken.getText();
            }).join(",");




            // get all material group tokens
            var materialGroupTokens = this.getView().byId("id_MaterialGroup").getTokens();
            that.sMaterialGroupValues = materialGroupTokens.map(function (oToken) {
                return oToken.getText();
            }).join(",");



            var filters = [];


            if (that.sSalesOrgValues !== "") {

                var SOVal = that.sSalesOrgValues.split(",");
                if (SOVal.length > 0) {
                    $.each(SOVal, function (i, UIitem) {
                        filters.push(new sap.ui.model.Filter("sales_org", sap.ui.model.FilterOperator.Contains, UIitem));
                    });
                };
            }
            if (that.sDCValues !== "") {

                var DCVal = that.sDCValues.split(",");
                if (DCVal.length > 0) {
                    $.each(DCVal, function (i, UIitem) {
                        filters.push(new sap.ui.model.Filter("dist_channel", sap.ui.model.FilterOperator.Contains, UIitem));
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


            if (that.sMaterialGroupValues !== "") {
                var matgRPVal = that.sMaterialGroupValues.split(",");
                if (matgRPVal.length > 0) {
                    $.each(matgRPVal, function (i, UIitem) {
                        filters.push(new sap.ui.model.Filter("material_group", sap.ui.model.FilterOperator.Contains, UIitem));
                    });
                };
            }





            that.tableMainModelfiltereddata = undefined
            that.tableMainModelfiltereddata = new jsonModel(that.getView().getModel("globalMainData"));
            that.getView().setModel(that.tableMainModelfiltereddata, "tableModel")

            this.getView().byId("exportTable").getBinding("items").filter(filters);
            that.filteredData = true;
            that.filteredDataToExport = []
            var selectedITemsLength = this.getView().byId("exportTable").getBinding("items").aIndices.length
            that.filteredIndices = this.getView().byId("exportTable").getBinding("items").aIndices
            for (var i = 0; i < selectedITemsLength; i++) {

                that.filteredDataToExport.push(that.tableMainModelfiltereddata.oData[that.filteredIndices[i]]);


            }
            var tableFilteredModel = new jsonModel(that.filteredDataToExport)
            that.getView().setModel(tableFilteredModel, "tableModel")

            that.busy.close()




        },



        onPressClear: function (oEvent) {
            that.filteredData = false;

            this.getView().byId("id_salesorg").setTokens([]);
            this.getView().byId("id_distributionChnl").setTokens([]);
            this.getView().byId("id_Plant").setTokens([]);
            this.getView().byId("id_MaterialGroup").setTokens([]);
            var tableMainModel = new jsonModel();
            that.getView().setModel(tableMainModel, "tableModel")



        },

        // attach date on export
        attachDateToExcel: function () {
            var oDateFormat = sap.ui.core.format.DateFormat.getDateTimeInstance({
                pattern: "MM-dd-yyyy"
            });
            var passCurrentdate = oDateFormat.format(new Date());
            return passCurrentdate;

        },


        // When users click on Export Excel button then this method will call.... 

        //05-04-24 Depprecated calls issue for excel SAP Recommendation @gnaneshwar
        onExportSelected: function (oEvent) {
            this.onGoToReport();
            var selectedItemsLength = this.getView().byId("exportTable").getSelectedItems().length;
            var oItem = this.getView().byId("exportTable").getSelectedItem();
            var selectedEntries = this.getView().getModel("globalMainData");
            var oselectedModel;

            if (that.filteredData === true) {
                oselectedModel = new sap.ui.model.json.JSONModel(this.getView().getModel("tableModel").oData);
            } else {
                oselectedModel = new sap.ui.model.json.JSONModel(selectedEntries.getData());
            }

            var aCols = [
                { label: "Sales Org", property: "sales_org" },
                { label: "Distribution Channel", property: "dist_channel" },
                { label: "Plant", property: "plant" },
                { label: "Material Group", property: "material_group" }
            ];

            var oSettings = {
                workbook: {
                    columns: aCols,
                    context: {
                        sheetName: 'MaterialPlantLinkExport_' + this.attachDateToExcel()
                    },
                },
                dataSource: oselectedModel.getData(),
                fileName: "MaterialPlantLinkExport_" + this.attachDateToExcel() + ".xlsx",

            };

            var oSpreadsheet = new sap.ui.export.Spreadsheet(oSettings);
            oSpreadsheet.build().then(function () {
                oSpreadsheet.destroy();
            });
        },

        // onExportSelected: function (oEvent) {
        //     this.onGoToReport();
        //     var selectedITemsLength = this.getView().byId("exportTable").getSelectedItems().length
        //     that.oItem = this.getView().byId("exportTable").getSelectedItem();
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
        //             name: "Sales Org",
        //             template: {
        //                 content: "{sales_org}"
        //             }
        //         }, {
        //             name: "Distribution Channel",
        //             template: {
        //                 content: "{dist_channel}"
        //             }
        //         }, {
        //             name: "Plant",
        //             template: {
        //                 content: "{plant}"
        //             }
        //         }, {
        //             name: "Material Group",
        //             template: {
        //                 content: "{material_group}"
        //             }
        //         }]

        //     });

        //     //* download exported file

        //     oExport.saveFile("MaterialPlantLinkExport_"+this.attachDateToExcel()).always(function () {

        //         this.destroy();

        //     });
        // },



        handleSortButtonPressed: function (oEvent) {

            if (this.oSortFrag) {
                this.oSortFrag = undefined;
            }
            if (!this.oSortFrag) {
                that.busy.open()
                this.oSortFrag = sap.ui.xmlfragment("materialplantlink.Fragments.ascAndDscSort", that);
                this.getView().addDependent(that.oSortFrag);

            }
            that.busy.close()
            this.oSortFrag.open();

        },



        // handle sort
        handleSortDialogConfirm: function (oEvent) {
            var oTable = this.byId("exportTable"),
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


        // Create Material Plant Link 


        onOpenCreateMatPlantFragment: function (oEvent) {

            if (this.oCreateMatPlantFrag) {
                this.oCreateMatPlantFrag = undefined;
            }
            if (!this.oCreateMatPlantFrag) {
                that.busy.open()
                this.oCreateMatPlantFrag = sap.ui.xmlfragment("materialplantlink.Fragments.createMatPlantLink", that);
                this.getView().addDependent(that.oCreateMatPlantFrag);
                var x = {
                    "sales_org": "",
                    "dist_channel": "",
                    "plant": "",
                    "material_group": ""
                }
                var jsondataobjectCreateModel = new jsonModel(x)
                this.getView().setModel(jsondataobjectCreateModel, "createTableRow")

            }
            that.busy.close()
            this.oCreateMatPlantFrag.open();

        },
        onCreateSave: function () {

            var oDateFormat = sap.ui.core.format.DateFormat.getDateTimeInstance({
                pattern: "yyyy-MM-dd"
            });
            var passCurrentdate = oDateFormat.format(new Date());

            var oModel2 = this.getOwnerComponent().getModel("mdgSrv_GlobalModel");
            oModel2.callFunction("/zplink_create", {
                method: "GET",
                urlParameters: {
                    "sales_org": that.getView().getModel("createTableRow").oData.sales_org,
                    "dist_channel": that.getView().getModel("createTableRow").oData.dist_channel,
                    "plant": that.getView().getModel("createTableRow").oData.plant,
                    "material_group": that.getView().getModel("createTableRow").oData.material_group,
                    "created_on": passCurrentdate,
                    "changed_on": passCurrentdate
                },

                success: function (oData) {


                    that.onReadCall();
                    that.onDialogClose();

                }.bind(this),

                error: function (oError) {

                    MessageBox.error(JSON.parse(oError.responseText).error.message.value);

                }
            });
        },

        onselectionChange: function (oEvent) {

            var oTableSelectedItem = this.getView().byId("exportTable").getSelectedItems().length;
            if (oTableSelectedItem > 1) {
                this.getView().byId("editModeButton").setEnabled(false)
            }
            else if (oTableSelectedItem == 1) {
                this.getView().byId("editModeButton").setEnabled(true)
            }
            var oItem = this.getView().byId("exportTable").getSelectedItem();
            var jsondataobject = new jsonModel(oItem.getBindingContext("tableModel").getObject())
            this.getView().setModel(jsondataobject, "curSelTableRow")


        },

        //15-04-24 if no record selected popup should appear @Gnaneshwar
        onEditTableRow: function (oEvent) {
            if (this.oEditTableRowFrag) {
                this.oEditTableRowFrag = undefined;
            }
            if (!this.oEditTableRowFrag) {
                var opath = oEvent.getSource().getParent().getParent().getSelectedContextPaths();
                if (opath.length !== 0) {
                    that.busy.open();
                    var omod = this.getView().getModel("tableModel").getProperty(opath[0]);
        
                    var jsondataobject = {
                        "sales_org": omod.sales_org,
                        "dist_channel": omod.dist_channel,
                        "plant": omod.plant,
                        "material_group": omod.material_group
                    };
        
                    var jsondataobjectModel = new jsonModel(jsondataobject);
                    this.getView().setModel(jsondataobjectModel, "curSelTableRow");
                    this.oEditTableRowFrag = sap.ui.xmlfragment("materialplantlink.Fragments.editTableRow", this);
                    this.getView().addDependent(this.oEditTableRowFrag);
                    that.busy.close();
                    this.oEditTableRowFrag.open();
                } else {
                    MessageBox.warning("Please select a line item to edit.");
                }
            }
        },
        

        // onEditTableRow: function (oEvent) {

        //     if (this.oEditTableRowFrag) {
        //         this.oEditTableRowFrag = undefined;
        //     }
        //     if (!this.oEditTableRowFrag) {
        //         that.busy.open()
        //         var opath = oEvent.getSource().getParent().getParent().getSelectedContextPaths()
        //         if (opath.length !== 0) {
        //             var omod = this.getView().getModel("tableModel").getProperty(opath[0]);

        //             // var oItem= this.getView().byId("exportTable").getSelectedItem();
        //             var jsondataobject = {
        //                 "sales_org": omod.sales_org,
        //                 "dist_channel": omod.dist_channel,
        //                 "plant": omod.plant,
        //                 "material_group": omod.material_group
        //             }

        //             var jsondataobjectModel = new jsonModel(jsondataobject)
        //             this.getView().setModel(jsondataobjectModel, "curSelTableRow")
        //             this.oEditTableRowFrag = sap.ui.xmlfragment("materialplantlink.Fragments.editTableRow", that);
        //             this.getView().addDependent(that.oEditTableRowFrag);

        //         }
        //         that.busy.close()
        //         this.oEditTableRowFrag.open();
        //     }
        //     else {
        //         MessageBox.warning("Please select line item to edit")
        //     }
        // },




        onSaveEdit: function () {
            // var oItem= this.getView().byId("exportTable").getSelectedItem();
            //var jsondataobject = new jsonModel(oItem.getBindingContext("tableModel").getObject())
            //this.getView().setModel(jsondataobject,"curSelTableRow")

            var oDateFormat = sap.ui.core.format.DateFormat.getDateTimeInstance({
                pattern: "yyyy-MM-dd"
            });
            var passCurrentdate = oDateFormat.format(new Date());


            var oModel2 = this.getOwnerComponent().getModel("mdgSrv_GlobalModel");
            oModel2.callFunction("/zplink_create", {
                method: "GET",
                urlParameters: {
                    "sales_org": that.getView().getModel("curSelTableRow").oData.sales_org,
                    "dist_channel": that.getView().getModel("curSelTableRow").oData.dist_channel,
                    "plant": that.getView().getModel("curSelTableRow").oData.plant,
                    "material_group": that.getView().getModel("curSelTableRow").oData.material_group,
                    "created_on": passCurrentdate,
                    "changed_on": passCurrentdate
                },

                success: function (oData) {

                    that.onReadCall();
                    that.onDialogClose();


                }.bind(this),

                error: function (oError) {

                    MessageBox.error(JSON.parse(oError.responseText).error.message.value);

                }
            });
        },


        //15-04-23 on click of delete button without selction of any record warning should be shown@Gnaneshwar
        onDelete: function () {
            var oModel2 = this.getOwnerComponent().getModel("mdgSrv_GlobalModel");
        
            this._oTable = this.getView().byId("exportTable");
            var aContexts = this._oTable.getSelectedContexts();
        
            if (aContexts.length === 0) {
                MessageBox.warning("Please select at least one record to delete.");
                return;
            }
        
            var oTableData = this._oTable.getModel("tableModel").getData();
            var oModel = this._oTable.getModel("tableModel");
        
            var aDeffergroupd = oModel2.getDeferredGroups();
            if (aDeffergroupd.indexOf('delete') === -1) {
                aDeffergroupd.push("delete")
            }
            oModel2.setDeferredGroups(aDeffergroupd);
        
            for (var i = 0; i < aContexts.length; i++) {
                var oThisObj = aContexts[i].getObject();
                var index = $.map(oTableData, function (obj, index) {
                    if (obj === oThisObj) {
                        oModel2.callFunction("/zplink_delete", {
                            method: "GET",
                            urlParameters: {
                                "sales_org": oThisObj.sales_org,
                                "dist_channel": oThisObj.dist_channel,
                                "plant": oThisObj.plant,
                                "material_group": oThisObj.material_group
                            },
                            groupId: "delete"
                        });
                        return index;
                    }
                });
            }
        
            oModel2.submitChanges({
                groupId: "delete",
                success: function (oData) {
                    that.onReadCall();
                    // console.log(oData);
                }.bind(this),
                error: function (oErrror) {
                    // console.log(oErrror);
                }
            });
        },
        // onDelete: function () {
        //     var oModel2 = this.getOwnerComponent().getModel("mdgSrv_GlobalModel");

        //     this._oTable = this.getView().byId("exportTable");
        //     var oTableData = this._oTable.getModel("tableModel").getData();
        //     var aContexts = this._oTable.getSelectedContexts();
        //     var oModel = this._oTable.getModel("tableModel");

        //     var aDeffergroupd = oModel2.getDeferredGroups();
        //     if (aDeffergroupd.indexOf('delete') === -1) {
        //         aDeffergroupd.push("delete")
        //     }
        //     oModel2.setDeferredGroups(aDeffergroupd);
        //     for (var i = 0; i < aContexts.length; i++) {
        //         var oThisObj = aContexts[i].getObject();
        //         var index = $.map(oTableData, function (obj, index) {
        //             if (obj === oThisObj) {
        //                 oModel2.callFunction("/zplink_delete", {
        //                     method: "GET",
        //                     urlParameters: {
        //                         "sales_org": oThisObj.sales_org,
        //                         "dist_channel": oThisObj.dist_channel,
        //                         "plant": oThisObj.plant,
        //                         "material_group": oThisObj.material_group
        //                     },
        //                     groupId: "delete"

        //                 });
        //                 // that.onDeleteCall(oThisObj)
        //                 return index;
        //             }
        //         })
        //     }

        //     oModel2.submitChanges({
        //         groupId: "delete",
        //         success: function (oData) {
        //             that.onReadCall();
        //             console.log(oData)


        //         }.bind(this),

        //         error: function (oErrror) {
        //             console.log(oErrror)
        //         }
        //     })

        // },


        onDialogClose: function (oEvent) {
            if (that.oEditTableRowFrag) {
                that.oEditTableRowFrag.close()
                that.oEditTableRowFrag = undefined;
                that.oEditTableRowFrag = null
                var jsondataobject = new jsonModel()
                this.getView().setModel(jsondataobject, "curSelTableRow")

            }
            else if (that.oCreateMatPlantFrag) {
                that.oCreateMatPlantFrag.close()
                that.oCreateMatPlantFrag = undefined;
                that.oCreateMatPlantFrag = null
                var jsondataobject = new jsonModel()
                this.getView().setModel(jsondataobject, "createTableRow")

            }

        },

    });

});
