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
    'sap/ui/model/Sorter',
    'byplantproposal/utils/formatter',
    'sap/ui/export/library',

], function (Controller, Fragment, jsonModel, Export, ExportTypeCSV,
    Spreadsheet, Filter, FilterOperator, MessageToast, Token, MessageBox, BusyDialog, Sorter, formatter, library) {
    "use strict";

    return Controller.extend("byplantproposal.controller.View1", {
        customFormatter: formatter,
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
            var oModel1 = this.getOwnerComponent().getModel("byplantproposal_Model");

            that.busy.open()
            //jyothi changed on 17/04/2024
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
            oModel1.read("//pcona_by_plant_proposal_rules",
                {
                    success: function (oRetrievedResult) {
                        var sUserModel=that.getView().getModel("userModel").getData();
                        if(sUserModel.TISAdmin===true){

                        for (var i = 0; i < oRetrievedResult.results.length; i++) {
                            oRetrievedResult.results[i].Days = parseInt(oRetrievedResult.results[i].Days)

                        }

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


        onOpenIdentifierFragment: function (oEvent) {
            if (this.oIdentifierFrag) {
                this.oIdentifierFrag = undefined;
            }
            if (!this.oIdentifierFrag) {
                that.busy.open()
                this.oIdentifierFrag = sap.ui.xmlfragment("byplantproposal.Fragments.Identifier", that);
                this.getView().addDependent(that.oIdentifierFrag);
                var oIdentifier = that.getView().getModel("globalMainData")
                var lookup = {};
                var items = oIdentifier;
                var result = [];
                for (var item, i = 0; item = items[i++];) {
                    var name = item.Identifier;
                    if (!(name in lookup)) {
                        lookup[name] = 1;
                        result.push({ "Identifier": name });
                    }
                }
                var oIdentifierModel = new jsonModel(result);
                this.getView().setModel(oIdentifierModel, "IdentifierGlobalData")
                this.oIdentifierFrag.setModel(oIdentifierModel, "IdentifierData");

            }
            that.busy.close()
            this.oIdentifierFrag.open();

        },

        // plant selected tokens
        onSelectionIdentifier: function (oEvent) {
            var aContexts = oEvent.getParameter("selectedContexts");
            var oMultiInput = this.getView().byId("id_Identifier");
            var oSelectedContextP = [];
            var oModel = that.getView().getModel("IdentifierGlobalData");
            for (var i = 0; i < aContexts.length; i++) {
                oSelectedContextP.push(aContexts[i]);
            }
            var oIdentifierModel = [];
            //Check for Unique Data
            // $.each(oSelectedContextP, function (i, el) {
            //     if ($.inArray(oSelectedContextP[i].ProductId, oIdentifierModel) === -1) oIdentifierModel.push(oSelectedContextP[i].getObject());
            // });

            //03-04-24 SAP Recommendation for slow loops @gnaneshwar.
            $.each(oSelectedContextP, function (i, el) {
                if ($.inArray(el.ProductId, oIdentifierModel) === -1) oIdentifierModel.push(el.getObject());
            });
            oModel.setProperty("/tokens2", oIdentifierModel);
            var oItemTemplateP;
            oItemTemplateP = oMultiInput.getTokens()[0];
            //Create the Template for token
            if (!oItemTemplateP) {
                oItemTemplateP = new Token({
                    text: "{Identifier}",
                    key: "{Identifier}"
                });
            } else {
                oItemTemplateP = oMultiInput.getTokens()[0].clone();
            }
            //Bind the tokens

            oIdentifierModel.forEach(function (item) {
                oMultiInput.addToken(new Token({
                    text: item.Identifier
                }));
            })

        },

        onSearchIdentifier: function (oEvent) {
            var sValue = oEvent.getParameter("value");
            var oFilter = new Filter("Identifier", sap.ui.model.FilterOperator.Contains, sValue);
            var oBinding = oEvent.getParameter("itemsBinding");
            oBinding.filter([oFilter]);
        },


        onOpenCustomerFragment: function (oEvent) {
            if (this.oCustomerFrag) {
                this.oCustomerFrag = undefined;
            }
            if (!this.oCustomerFrag) {
                that.busy.open()
                this.oCustomerFrag = sap.ui.xmlfragment("byplantproposal.Fragments.Customer", that);
                this.getView().addDependent(that.oCustomerFrag);
                var oCustomer = that.getView().getModel("globalMainData")
                var lookup = {};
                var items = oCustomer;
                var result = [];
                for (var item, i = 0; item = items[i++];) {
                    var name = item.Customer;
                    if (!(name in lookup)) {
                        lookup[name] = 1;
                        result.push({ "Customer": name });
                    }
                }
                var oCustomerModel = new jsonModel(result);
                this.getView().setModel(oCustomerModel, "CustomerGlobalData")
                this.oCustomerFrag.setModel(oCustomerModel, "CustomerData");

            }
            that.busy.close()
            this.oCustomerFrag.open();

        },
        // Customer selected tokens
        onSelectionCustomer: function (oEvent) {
            var aContexts = oEvent.getParameter("selectedContexts");
            var oMultiInput = this.getView().byId("id_Customer");
            var oSelectedContextCC = [];
            var oModel = this.getView().getModel("CustomerGlobalData");
            for (var i = 0; i < aContexts.length; i++) {
                oSelectedContextCC.push(aContexts[i]);
            }
            that.oCustomerModel = [];
            //Check for Unique Data
            // $.each(oSelectedContextCC, function (i, el) {
            //     if ($.inArray(oSelectedContextCC[i].ProductId, that.oCustomerModel) === -1) that.oCustomerModel.push(oSelectedContextCC[i].getObject());
            // });

            //03-04-24 SAP Recommendation for slow loops @gnaneshwar.
            $.each(oSelectedContextCC, function (i, el) {
                if ($.inArray(el.ProductId, that.oCustomerModel) === -1) that.oCustomerModel.push(el.getObject());
            });
            oModel.setProperty("/tokens1", that.oCustomerModel);
            var oItemTemplateCC;
            oItemTemplateCC = oMultiInput.getTokens()[0];
            //Create the Template for token
            if (!oItemTemplateCC) {
                oItemTemplateCC = new Token({
                    text: "{Customer}",
                    key: "{Customer}"
                });
            } else {
                oItemTemplateCC = oMultiInput.getTokens()[0].clone();
            }
            //Bind the tokens
            that.oCustomerModel.forEach(function (item) {
                oMultiInput.addToken(new Token({
                    text: item.Customer
                }));
            })
        },

        onSearchCustomer: function (oEvent) {
            var sValue = oEvent.getParameter("value");
            var oFilter = new Filter("Customer", sap.ui.model.FilterOperator.Contains, sValue);
            var oBinding = oEvent.getParameter("itemsBinding");
            oBinding.filter([oFilter]);
        },


        onOpenGroupFragment: function (oEvent) {
            if (this.oGroupFrag) {
                this.oGroupFrag = undefined;
            }
            if (!this.oGroupFrag) {
                that.busy.open()
                this.oGroupFrag = sap.ui.xmlfragment("byplantproposal.Fragments.Group", that);
                this.getView().addDependent(that.oGroupFrag);
                var oGroupDataModel = that.getView().getModel("globalMainData")
                var lookup = {};
                var items = oGroupDataModel;
                var result = [];
                for (var item, i = 0; item = items[i++];) {
                    var name = item.Group;
                    if (!(name in lookup)) {
                        lookup[name] = 1;
                        result.push({ "Group": name });
                    }

                }
                var oGrouplModel = new jsonModel(result);
                this.getView().setModel(oGrouplModel, "GroupGlobalData")
                this.oGroupFrag.setModel(oGrouplModel, "GroupData");

            }
            that.busy.close()
            this.oGroupFrag.open();

        },


        // selected material
        onSelectionGroup: function (oEvent) {
            this.getView().byId("id_Group").setTokens([]);
            that.oGroupSelectedModel = [];
            var aContexts = oEvent.getParameter("selectedContexts");
            var oMultiInput = this.getView().byId("id_Group");
            var oSelectedContextM = [];
            var oModel = this.getView().getModel("GroupGlobalData");
            for (var i = 0; i < aContexts.length; i++) {
                oSelectedContextM.push(aContexts[i]);
            }
            that.oGroupSelectedModel = [];
            //Check for Unique Data
            // $.each(oSelectedContextM, function (i, el) {
            //     if ($.inArray(oSelectedContextM[i].ProductId, that.oGroupSelectedModel) === -1) that.oGroupSelectedModel.push(oSelectedContextM[i].getObject());
            // });

            //03-04-24 SAP Recommendation for slow loops @gnaneshwar.
            $.each(oSelectedContextM, function (i, el) {
                if ($.inArray(el.ProductId, that.oGroupSelectedModel) === -1) that.oGroupSelectedModel.push(el.getObject());
            });
            oModel.setProperty("/tokens3", that.oGroupSelectedModel);
            var oItemTemplateMat;
            oItemTemplateMat = oMultiInput.getTokens()[0];
            //Create the Template for token
            if (!oItemTemplateMat) {
                oItemTemplateMat = new Token({
                    text: "{Group}",
                    key: "{Group}"
                });
            } else {
                oItemTemplateMat = oMultiInput.getTokens()[0].clone();
            }
            //Bind the tokens
            that.oGroupSelectedModel.forEach(function (item) {
                oMultiInput.addToken(new Token({
                    text: item.Group
                }));
            })

        },



        onOpenShipPlantFragment: function (oEvent) {
            if (this.oShipPlantFrag) {
                this.oShipPlantFrag = undefined;
            }
            if (!this.oShipPlantFrag) {
                that.busy.open()
                this.oShipPlantFrag = sap.ui.xmlfragment("byplantproposal.Fragments.ShipPlant", that);
                this.getView().addDependent(that.oShipPlantFrag);
                var oShipPlantDataModel = that.getView().getModel("globalMainData")
                var lookup = {};
                var items = oShipPlantDataModel;
                var result = [];
                for (var item, i = 0; item = items[i++];) {
                    var name = item.ShipPlant;
                    if (!(name in lookup)) {
                        lookup[name] = 1;
                        result.push({ "ShipPlant": name });
                    }
                }
                var oShipPlantModel = new jsonModel(result);
                this.getView().setModel(oShipPlantModel, "ShipPlant_GlobalData")
                this.oShipPlantFrag.setModel(oShipPlantModel, "ShipPlantData");

            }
            that.busy.close()
            this.oShipPlantFrag.open();

        },

        // selected ShipPlant
        onSelectionShipPlant: function (oEvent) {
            var aContexts = oEvent.getParameter("selectedContexts");
            var oMultiInput = this.getView().byId("id_ShipPlant");
            var oSelectedContextShipPlant = [];
            var oModel = this.getView().getModel("ShipPlant_GlobalData");
            for (var i = 0; i < aContexts.length; i++) {
                oSelectedContextShipPlant.push(aContexts[i]);
            }
            var oShipPlantModel = [];
            //Check for Unique Data
            // $.each(oSelectedContextShipPlant, function (i, el) {
            //     if ($.inArray(oSelectedContextShipPlant[i].ProductId, oShipPlantModel) === -1) oShipPlantModel.push(oSelectedContextShipPlant[i].getObject());
            // });

            //03-04-24 SAP Recommendation for slow loops @gnaneshwar.
            $.each(oSelectedContextShipPlant, function (i, el) {
                if ($.inArray(el.ProductId, oShipPlantModel) === -1) oShipPlantModel.push(el.getObject());
            });
            oModel.setProperty("/tokens4", oShipPlantModel);
            var oItemTemplateShipPlant;
            oItemTemplateShipPlant = oMultiInput.getTokens()[0];
            //Create the Template for token
            if (!oItemTemplateShipPlant) {
                oItemTemplateShipPlant = new Token({
                    text: "{ShipPlant}",
                    key: "{ShipPlant}"
                });
            } else {
                oItemTemplateShipPlant = oMultiInput.getTokens()[0].clone();
            }
            //Bind the tokens
            oShipPlantModel.forEach(function (item) {
                oMultiInput.addToken(new Token({
                    text: item.ShipPlant
                }));
            })
        },

        onSearchShipPlant: function (oEvent) {
            var sValue = oEvent.getParameter("value");
            var oFilter = new Filter("ShipPlant", sap.ui.model.FilterOperator.Contains, sValue);
            var oBinding = oEvent.getParameter("itemsBinding");
            oBinding.filter([oFilter]);
        },



        onOpenDaysFragment: function (oEvent) {
            if (this.oDaysFrag) {
                this.oDaysFrag = undefined;
            }
            if (!this.oDaysFrag) {
                that.busy.open()
                this.oDaysFrag = sap.ui.xmlfragment("byplantproposal.Fragments.Days", that);
                this.getView().addDependent(that.oDaysFrag);
                var oDaysDataModel = that.getView().getModel("globalMainData")
                var lookup = {};
                var items = oDaysDataModel;
                var result = [];
                for (var item, i = 0; item = items[i++];) {
                    var name = item.Days;
                    if (!(name in lookup)) {
                        lookup[name] = 1;
                        result.push({ "Days": name });
                    }
                }
                var oDaysModel = new jsonModel(result);
                this.getView().setModel(oDaysModel, "Days_GlobalData")
                this.oDaysFrag.setModel(oDaysModel, "DaysData");

            }
            that.busy.close()
            this.oDaysFrag.open();

        },

        // selected Days
        onSelectionDays: function (oEvent) {
            var aContexts = oEvent.getParameter("selectedContexts");
            var oMultiInput = this.getView().byId("id_Days");
            var oSelectedContextDays = [];
            var oModel = this.getView().getModel("Days_GlobalData");
            for (var i = 0; i < aContexts.length; i++) {
                oSelectedContextDays.push(aContexts[i]);
            }
            var oDaysModel = [];
            //Check for Unique Data
            // $.each(oSelectedContextDays, function (i, el) {
            //     if ($.inArray(oSelectedContextDays[i].ProductId, oDaysModel) === -1) oDaysModel.push(oSelectedContextDays[i].getObject());
            // });

            //03-04-24 SAP Recommendation for slow loops @gnaneshwar.
            $.each(oSelectedContextDays, function (i, el) {
                if ($.inArray(el.ProductId, oDaysModel) === -1) oDaysModel.push(el.getObject());
            });
            oModel.setProperty("/tokens4", oDaysModel);
            var oItemTemplateDays;
            oItemTemplateDays = oMultiInput.getTokens()[0];
            //Create the Template for token
            if (!oItemTemplateDays) {
                oItemTemplateDays = new Token({
                    text: "{Days}",
                    key: "{Days}"
                });
            } else {
                oItemTemplateDays = oMultiInput.getTokens()[0].clone();
            }
            //Bind the tokens
            oDaysModel.forEach(function (item) {
                oMultiInput.addToken(new Token({
                    text: item.Days
                }));
            })
        },

        onSearchDays: function (oEvent) {
            var sValue = oEvent.getParameter("value");
            var oFilter = new Filter("Days", sap.ui.model.FilterOperator.Contains, sValue);
            var oBinding = oEvent.getParameter("itemsBinding");
            oBinding.filter([oFilter]);
        },




        onSearchGroup: function (oEvent) {
            var sValue = oEvent.getParameter("value");
            var oFilter = new Filter("Group", sap.ui.model.FilterOperator.Contains, sValue);
            var oBinding = oEvent.getParameter("itemsBinding");
            oBinding.filter([oFilter]);
        },







        onDialogClose: function (oEvent) {
            this.onCancelUpload();
            if (this.oShipPlantFrag) {
                this.oShipPlantFrag = undefined;
                this.oShipPlantFrag = null
            }
            if (this.oDaysFrag) {
                this.oDaysFrag = undefined;
                this.oDaysFrag = null
            }
            if (this.oMaterialFrag) {
                this.oMaterialFrag = undefined;
                this.oMaterialFrag = null
            }
            if (this.oGroupFrag) {
                this.oGroupFrag = undefined;
                //this.oGroupFrag = ;
            }
            if (this.oComapnyCodeFrag) {
                this.oComapnyCodeFrag = undefined;
                this.oComapnyCodeFrag = null;
            }

            if (that.oEditTableRowFrag) {
                that.oEditTableRowFrag.close()
                that.oEditTableRowFrag = undefined;
                that.oEditTableRowFrag = null
                var jsondataobject = new jsonModel()
                this.getView().setModel(jsondataobject, "curSelTableRow")

            }
            if (that.oCreatePlantProposalFrag) {
                that.oCreatePlantProposalFrag.close()
                that.oCreatePlantProposalFrag = undefined;
                that.oCreatePlantProposalFrag = null
                var jsondataobject = new jsonModel()
                this.getView().setModel(jsondataobject, "createTableRow")

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
        //     var oTable = this.byId("exportTable");
        //     var oBinding = oTable.getBinding("items");
        //     oBinding.filter(aFilters, sap.ui.model.FilterType.Application);
        // },
        // on click of Go button
        onGoToReport: function () {
            that.busy.open()


            //Customer

            // get all Identifier Channel tokens
            var IdentifierTokens = this.getView().byId("id_Identifier").getTokens();
            that.sIdentifierValues = IdentifierTokens.map(function (oToken) {
                return oToken.getText();
            }).join(",");

            // get all Customer Channel tokens
            var CustomerTokens = this.getView().byId("id_Customer").getTokens();
            that.sCustomerValues = CustomerTokens.map(function (oToken) {
                return oToken.getText();
            }).join(",");


            // get all Group Channel tokens
            var GroupTokens = this.getView().byId("id_Group").getTokens();
            that.sGroupValues = GroupTokens.map(function (oToken) {
                return oToken.getText();
            }).join(",");

            // get all ShipPlant Channel tokens
            var ShipPlantTokens = this.getView().byId("id_ShipPlant").getTokens();
            that.sShipPlantValues = ShipPlantTokens.map(function (oToken) {
                return oToken.getText();
            }).join(",");


            // get all Days Channel tokens
            var DaysTokens = this.getView().byId("id_Days").getTokens();
            that.sDaysValues = DaysTokens.map(function (oToken) {
                return oToken.getText();
            }).join(",");




            var filters = [];

            if (that.sIdentifierValues !== "") {

                var IdentifierVal = that.sIdentifierValues.split(",");
                if (IdentifierVal.length > 0) {
                    $.each(IdentifierVal, function (i, UIitem) {
                        filters.push(new sap.ui.model.Filter("Identifier", sap.ui.model.FilterOperator.Contains, UIitem));
                    });
                };
            }

            if (that.sCustomerValues !== "") {

                var CustomerVal = that.sCustomerValues.split(",");
                if (CustomerVal.length > 0) {
                    $.each(CustomerVal, function (i, UIitem) {
                        filters.push(new sap.ui.model.Filter("Customer", sap.ui.model.FilterOperator.Contains, UIitem));
                    });
                };
            }

            if (that.sGroupValues !== "") {

                var GroupVal = that.sGroupValues.split(",");
                if (GroupVal.length > 0) {
                    $.each(GroupVal, function (i, UIitem) {
                        filters.push(new sap.ui.model.Filter("Group", sap.ui.model.FilterOperator.Contains, UIitem));
                    });
                };
            }

            if (that.sShipPlantValues !== "") {

                var ShipPlantVal = that.sShipPlantValues.split(",");
                if (ShipPlantVal.length > 0) {
                    $.each(ShipPlantVal, function (i, UIitem) {
                        filters.push(new sap.ui.model.Filter("ShipPlant", sap.ui.model.FilterOperator.Contains, UIitem));
                    });
                };
            }



            if (that.sDaysValues !== "") {

                var DaysVal = that.sDaysValues.split(",");
                if (DaysVal.length > 0) {
                    $.each(DaysVal, function (i, UIitem) {
                        filters.push(new sap.ui.model.Filter("Days", sap.ui.model.FilterOperator.EQ, UIitem));
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

            this.getView().byId("id_Customer").setTokens([]);
            this.getView().byId("id_Identifier").setTokens([]);
            this.getView().byId("id_Group").setTokens([]);
            this.getView().byId("id_ShipPlant").setTokens([]);
            this.getView().byId("id_Days").setTokens([]);
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
                oselectedModel = new sap.ui.model.json.JSONModel(that.getView().getModel("tableModel").oData);
            } else {
                oselectedModel = new sap.ui.model.json.JSONModel(that.selectedEntries.getData());
            }
        
            var aCols = [
                { label: "Rule_ID_TVARVC", property: "Identifier" },
                { label: "Customer", property: "Customer" },
                { label: "Del_Group", property: "Group" },
                { label: "ShipPlant", property: "ShipPlant" },
                { label: "Days", property: "Days" },
                { label: "Created_By", property: "created_by" },
                { label: "Created_On", property: "created_on" },
                { label: "Changed_By", property: "changed_by" },
                { label: "Changed_On", property: "changed_on" }
            ];
        
            var oSettings = {
                workbook: { columns: aCols,
                    context: {
                        sheetName: 'byplantproposal_'+ this.attachDateToExcel()
                    },
                 },
                dataSource: oselectedModel.getData(),
                fileName: "byplantproposal_" + this.attachDateToExcel() + ".xlsx",
                
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
        //         columns: [
        //             {
        //                 name: "Rule_ID_TVARVC",
        //                 template: {
        //                     content: "{Identifier}"
        //                 }
        //             },
        //             {
        //                 name: "Customer",
        //                 template: {
        //                     content: "{Customer}"
        //                 }
        //             }, {
        //                 name: "Del_Group",
        //                 template: {
        //                     content: "{Group}"
        //                 }
        //             }, {
        //                 name: "ShipPlant",
        //                 template: {
        //                     content: "{ShipPlant}"
        //                 }
        //             }, {
        //                 name: "Days",
        //                 template: {
        //                     content: "{Days}"
        //                 }
        //             }, {
        //                 name: "Created_By",
        //                 template: {
        //                     content: "{created_by}"
        //                 }
        //             }, {
        //                 name: "Created_On",
        //                 template: {
        //                     content: "{created_on}"
        //                 }
        //             }, {
        //                 name: "Changed_By",
        //                 template: {
        //                     content: "{changed_by}"
        //                 }
        //             }, {
        //                 name: "Changed_On",
        //                 template: {
        //                     content: "{changed_on}"
        //                 }
        //             }]

        //     });

        //     //* download exported file

        //     oExport.saveFile("byplantproposal_" + this.attachDateToExcel()).always(function () {

        //         this.destroy();

        //     });
        // },



        handleSortButtonPressed: function (oEvent) {

            if (this.oSortFrag) {
                this.oSortFrag = undefined;
            }
            if (!this.oSortFrag) {
                that.busy.open()
                this.oSortFrag = sap.ui.xmlfragment("byplantproposal.Fragments.ascAndDscSort", that);
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


        onOpenCreatePlantProposalFragment: function (oEvent) {

            if (this.oCreatePlantProposalFrag) {
                this.oCreatePlantProposalFrag = undefined;
            }
            if (!this.oCreatePlantProposalFrag) {
                that.busy.open()
                this.oCreatePlantProposalFrag = sap.ui.xmlfragment("byplantproposal.Fragments.createPlantProposal", that);
                this.getView().addDependent(that.oCreatePlantProposalFrag);
                var x = {
                    "Customer": "",
                    "Identifier": "",
                    "Group": "",
                    "ShipPlant": "",
                    "Days": ""
                }
                var jsondataobjectCreateModel = new jsonModel(x)
                this.getView().setModel(jsondataobjectCreateModel, "createTableRow")

            }
            that.busy.close()
            this.oCreatePlantProposalFrag.open();

        },
        onCreateSave: function () {

            var oDateFormat = sap.ui.core.format.DateFormat.getDateTimeInstance({
                pattern: "yyyy-MM-dd"
            });
            var passCurrentdate = oDateFormat.format(new Date());

            var oModel2 = this.getOwnerComponent().getModel("byplantproposal_Model");
            oModel2.callFunction("/byplant_create", {
                method: "GET",
                urlParameters: {
                    "Identifier": that.getView().getModel("createTableRow").oData.Identifier,
                    "Customer": that.getView().getModel("createTableRow").oData.Customer,
                    "Group": that.getView().getModel("createTableRow").oData.Group,
                    "ShipPlant": that.getView().getModel("createTableRow").oData.ShipPlant,
                    "Days": that.getView().getModel("createTableRow").oData.Days

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

        onCreateSave_copy: function () {

            var oDateFormat = sap.ui.core.format.DateFormat.getDateTimeInstance({
                pattern: "yyyy-MM-dd"
            });
            var passCurrentdate = oDateFormat.format(new Date());

            var oModel2 = this.getOwnerComponent().getModel("byplantproposal_Model");
            oModel2.callFunction("/byplant_create", {
                method: "GET",
                urlParameters: {
                    "Identifier": that.getView().getModel("curSelTableRow").oData.Identifier,
                    "Customer": that.getView().getModel("curSelTableRow").oData.Customer,
                    "Group": that.getView().getModel("curSelTableRow").oData.Group,
                    "ShipPlant": that.getView().getModel("curSelTableRow").oData.ShipPlant,
                    "Days": that.getView().getModel("curSelTableRow").oData.Days

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
            if (oItem) {
                var jsondataobject = new jsonModel(oItem.getBindingContext("tableModel").getObject())
                this.getView().setModel(jsondataobject, "curSelTableRow")
            }



        },


        onCreateTableRow: function (oEvent) {

            if (this.getView().byId("exportTable").getSelectedItems().length < 1) {
                this.onOpenCreatePlantProposalFragment();
            }
            else {
                if (this.oEditTableRowFrag) {
                    this.oEditTableRowFrag = undefined;
                }
                if (!this.oEditTableRowFrag) {
                    that.busy.open()
                    var opath = oEvent.getSource().getParent().getParent().getSelectedContextPaths()
                    if (opath.length !== 0) {
                        var omod = this.getView().getModel("tableModel").getProperty(opath[0]);

                        // var oItem= this.getView().byId("exportTable").getSelectedItem();
                        var jsondataobject = {
                            "Identifier": omod.Identifier,
                            "Customer": omod.Customer,
                            "Group": omod.Group,
                            "ShipPlant": omod.ShipPlant,
                            "Days": omod.Days
                        }

                        var jsondataobjectModel = new jsonModel(jsondataobject)
                        this.getView().setModel(jsondataobjectModel, "curSelTableRow")
                        this.oEditTableRowFrag = sap.ui.xmlfragment("byplantproposal.Fragments.createPlantProposalCopy", that);
                        this.getView().addDependent(that.oEditTableRowFrag);

                    }
                    that.busy.close()
                    this.oEditTableRowFrag.open();
                }
            }



        },


        onEditTableRow: function (oEvent) {

            if (this.getView().byId("exportTable").getSelectedItems().length < 1) {
                MessageBox.warning("Please select line item to edit")
            }
            else {
                if (this.oEditTableRowFrag) {
                    this.oEditTableRowFrag = undefined;
                }
                if (!this.oEditTableRowFrag) {
                    that.busy.open()
                    var opath = oEvent.getSource().getParent().getParent().getSelectedContextPaths()
                    if (opath.length !== 0) {
                        var omod = this.getView().getModel("tableModel").getProperty(opath[0]);

                        // var oItem= this.getView().byId("exportTable").getSelectedItem();
                        var jsondataobject = {
                            "Identifier": omod.Identifier,
                            "Customer": omod.Customer,
                            "Group": omod.Group,
                            "ShipPlant": omod.ShipPlant,
                            "Days": omod.Days
                        }

                        var jsondataobjectModel = new jsonModel(jsondataobject)
                        this.getView().setModel(jsondataobjectModel, "curSelTableRow")
                        this.oEditTableRowFrag = sap.ui.xmlfragment("byplantproposal.Fragments.editTableRow", that);
                        this.getView().addDependent(that.oEditTableRowFrag);

                    }
                    that.busy.close()
                    this.oEditTableRowFrag.open();
                }
            }



        },




        onSaveEdit: function () {
            // var oItem= this.getView().byId("exportTable").getSelectedItem();
            //var jsondataobject = new jsonModel(oItem.getBindingContext("tableModel").getObject())
            //this.getView().setModel(jsondataobject,"curSelTableRow")

            var oDateFormat = sap.ui.core.format.DateFormat.getDateTimeInstance({
                pattern: "yyyy-MM-dd"
            });
            var passCurrentdate = oDateFormat.format(new Date());


            var oModel2 = this.getOwnerComponent().getModel("byplantproposal_Model");
            oModel2.callFunction("/byplant_create", {
                method: "GET",
                urlParameters: {
                    "Identifier": that.getView().getModel("curSelTableRow").oData.Identifier,
                    "Customer": that.getView().getModel("curSelTableRow").oData.Customer,
                    "Group": that.getView().getModel("curSelTableRow").oData.Group,
                    "ShipPlant": that.getView().getModel("curSelTableRow").oData.ShipPlant,
                    "Days": that.getView().getModel("curSelTableRow").oData.Days
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
        onDelete: function () {


            if (this.getView().byId("exportTable").getSelectedItems().length < 1) {
                MessageBox.warning("Please select line item to delete")
            }
            else {
                var oModel2 = this.getOwnerComponent().getModel("byplantproposal_Model");

                this._oTable = this.getView().byId("exportTable");
                var oTableData = this._oTable.getModel("tableModel").getData();
                var aContexts = this._oTable.getSelectedContexts();
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
                            oModel2.callFunction("/byplant_delete", {
                                method: "GET",
                                urlParameters: {
                                    "Identifier": oThisObj.Identifier,
                                    "Customer": oThisObj.Customer,
                                    "Group": oThisObj.Group,
                                    "ShipPlant": oThisObj.ShipPlant,
                                    "Days": oThisObj.Days
                                },
                                groupId: "delete"

                            });
                            // that.onDeleteCall(oThisObj)
                            return index;
                        }
                    })
                }

                oModel2.submitChanges({
                    groupId: "delete",
                    success: function (oData) {
                        that.onReadCall();
                        // console.log(oData)


                    }.bind(this),

                    error: function (oErrror) {
                        // console.log(oErrror)
                    }
                })
            }



        },


        // onDialogClose: function (oEvent) {
        //     if (that.oEditTableRowFrag) {
        //         that.oEditTableRowFrag.close()
        //         that.oEditTableRowFrag = undefined;
        //         that.oEditTableRowFrag = null
        //         var jsondataobject = new jsonModel()
        //         this.getView().setModel(jsondataobject,"curSelTableRow")

        //     }
        //     else if (that.oCreatePlantProposalFrag) {
        //         that.oCreatePlantProposalFrag.close()
        //         that.oCreatePlantProposalFrag = undefined;
        //         that.oCreatePlantProposalFrag = null
        //         var jsondataobject = new jsonModel()
        //         this.getView().setModel(jsondataobject,"createTableRow")

        //     }

        // },

        onSelectFile: function (oEvent) {

            this._import(oEvent.getParameter("files") && oEvent.getParameter("files")[0]);

        },
        _import: function (file) {
            var uploadModel = this.getOwnerComponent().getModel("uploadModel");
            uploadModel.setData({
                aPlantProp: []
            });

            var that = this;
            var aResults = [];
            var propResult = [];
            if (file && window.FileReader) {
                var reader = new FileReader();
                reader.onload = function (e) {
                    var data = e.target.result;
                    var workbook = XLSX.read(data, {
                        type: 'binary'
                    });
                    workbook.SheetNames.forEach(function (sheetName) {

                        aResults = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
                        propResult = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
                    });


                    // var selTabModelProperties = that.getView().getModel("seltabPropModel").oData;

                    // var modeldata = selTabModelProperties;

                    // for (var i = 0; i < aResults.length; i++) {

                    //     for (var j = 0; j < modeldata.length; j++) {

                    //         if (!aResults[i].hasOwnProperty(modeldata[j].name)) {

                    //             aResults[i][modeldata[j].name] = "";
                    //         }
                    //     }
                    // }





                    // if (selTabModelProperties.length === Object.keys(aResults[0]).length) {
                    //     // for (var i = 0; i < selTabModelProperties.length; i++) {
                    //     //     if (selTabModelProperties[i].name == Object.keys(aResults[0])[i]) {
                    //     //         console.log(selTabModelProperties[i].name + "==" + Object.keys(aResults[0])[i])
                    //     //     }
                    //     //     else {
                    //     //         console.log()
                    //     //     }
                    //     // }


                    //     that.getOwnerComponent().getModel("uploadModel").getData().aPlantProp = aResults;
                    //     that.getOwnerComponent().getModel("uploadModel").refresh(true);


                    //     // showing message popup if user entered quantity exceeds actual quantity
                    //     MessageBox.warning("Do you want to upload file?", {
                    //         icon: MessageBox.Icon.WARNING,
                    //         title: "Confirm...!",
                    //         actions: [MessageBox.Action.OK, MessageBox.Action.CANCEL],
                    //         emphasizedAction: MessageBox.Action.OK,
                    //         //when user clicks ok button of message box then it will move to print
                    //         onClose: function (sAction) {
                    //             if (sAction === MessageBox.Action.OK) {

                    //                 that.uploadFile();

                    //             } else if (sAction === MessageBox.Action.CANCEL) {

                    //             }

                    //         }
                    //     });
                    // }
                    // else {
                    //     MessageBox.warning("Kindly fill the data and update the file with exact columns as per report")
                    // }




                    that.getOwnerComponent().getModel("uploadModel").getData().aPlantProp = aResults;
                    that.getOwnerComponent().getModel("uploadModel").refresh(true);


                    // showing message popup if user entered quantity exceeds actual quantity
                    MessageBox.warning("Do you want to upload file?", {
                        icon: MessageBox.Icon.WARNING,
                        title: "Confirm...!",
                        actions: [MessageBox.Action.OK, MessageBox.Action.CANCEL],
                        emphasizedAction: MessageBox.Action.OK,
                        //when user clicks ok button of message box then it will move to print
                        onClose: function (sAction) {
                            if (sAction === MessageBox.Action.OK) {

                                that.uploadFile();

                            } else if (sAction === MessageBox.Action.CANCEL) {

                            }

                        }
                    });

                };
                reader.onerror = function (ex) {

                };
                reader.readAsBinaryString(file);
            }
        },

    //05-04-24 changes done in urlParameters @Gnaneshwar.
        uploadFile: function () {
            var aPlantProp = this.getOwnerComponent().getModel("uploadModel").getData().aPlantProp;

            for (var i = 0; i < aPlantProp.length; i++) {
                var oModel2 = this.getOwnerComponent().getModel("byplantproposal_Model");
                oModel2.callFunction("/byplant_create", {
                    method: "GET",
                    async: false,
                    urlParameters: {
                        "Identifier": aPlantProp[i].Rule_ID_TVARVC ? aPlantProp[i].Rule_ID_TVARVC : "",
                        "Customer": aPlantProp[i].Customer ? aPlantProp[i].Customer : "",
                        "Group": aPlantProp[i].Del_Group ? aPlantProp[i].Del_Group : "",
                        "ShipPlant": aPlantProp[i].ShipPlant,
                        "Days": aPlantProp[i].Days

                    }
                }, this)
            }

            oModel2.submitChanges({
                success: function (e) {
                    MessageBox.success("Data Uploaded Successfully...", {
                        icon: MessageBox.Icon.SUCCESS,
                        title: "Upload Successful...",
                        actions: [MessageBox.Action.OK],
                        emphasizedAction: MessageBox.Action.OK,
                        onClose: function (sAction) {
                            if (sAction === MessageBox.Action.OK) {
                                that.onReadCall()
                            }
                        }
                    })
                }
                    .bind(this),
                error: function (e) {
                    MessageBox.error(JSON.parse(e.responseText).error.message.value)
                }
            });

            this.onCancelUpload();
            that.onDialogClose();


            //     for (var i = 0; i < aPlantProp.length; i++) {

            // var oModel2 = this.getOwnerComponent().getModel("byplantproposal_Model");
            // oModel2.callFunction("/byplant_create", {
            //     method: "GET",
            //     async:false,
            //     urlParameters: {
            //        "Identifier": aPlantProp[i].Rule_ID_TVARVC,
            //         "Customer": aPlantProp[i].Customer,
            //         "Group": aPlantProp[i].Del_Group,
            //         "ShipPlant": aPlantProp[i].ShipPlant,
            //         "Days": aPlantProp[i].Days

            //     },

            //     success: function (oData) {




            //     }.bind(this),

            //     error: function (oError) {

            //        MessageBox.error(JSON.parse(oError.responseText).error.message.value);

            //     }
            // });
            //     }

            // that.onReadCall();
            // that.onDialogClose();
        },

        onUploadFileDialog: function (oEvent) {
            this.onCancelUpload();


            var that = this;
            if (this.oComapnyCodeFrag) {
                this.oComapnyCodeFrag = undefined;
                this.oComapnyCodeFrag = null
            }
            if (!this.oComapnyCodeFrag) {


                this.oComapnyCodeFrag = sap.ui.xmlfragment("byplantproposal.Fragments.uploadDialog", that);
                this.getView().addDependent(that.oComapnyCodeFrag);
            }
            this.oComapnyCodeFrag.open();
        },

        onCancelUpload: function (oEvent) {
            if (this.oComapnyCodeFrag) {
                this.oComapnyCodeFrag.close()
                this.oComapnyCodeFrag.destroy()
                this.oComapnyCodeFrag = undefined;
                this.oComapnyCodeFrag = null;
            }
        },

    });

});
