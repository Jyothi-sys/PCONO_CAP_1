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
    "sap/ui/core/date/UI5Date",
    "sap/m/MessageBox",
    
    "sap/m/BusyDialog"

], function (Controller, Fragment, jsonModel, Export, ExportTypeCSV,
    Spreadsheet, Filter, FilterOperator, MessageToast, Token, UI5Date, MessageBox, BusyDialog) {
    "use strict";

    return Controller.extend("inventoryreport.controller.View1", {

        onInit: function () {
            // initialization of required global variables
            that = this;
            that.filteredData;
            that.busy = new BusyDialog();
            var that = this;
            // setting default date as soon as user logs in
            this.setDefaultDate();

            // setting default Company code
            this.getView().byId("id_Companycode").addToken(new Token({
                text: "US14"
            }));
            
           

this.onReadCallCurrInv();

            var omod = {
                "colVisible1": true, "colVisible2": true, "colVisible3": true,
                "colVisible4": true, "colVisible5": true, "colVisible6": true,
                "colVisible7": true, "colVisible8": true, "colVisible9": true,
                "colVisible10": true, "colVisible11": true, "colVisible12": true, "colVisible12": true
            }
            var json2 = new jsonModel(omod);

            this.getView().setModel(json2, "columnModel");


            this.oFilterBar = this.getView().byId("filterbar");
            this.oTable = this.getView().byId("exportTable");
            //=========================================================
            
             
        },


        onReadCallCurrInv : function(){
            var oModel1 = this.getOwnerComponent().getModel("global_model");
            this.busy.open()
            that=this;
            var userModel = new sap.ui.model.json.JSONModel();
            //var oModel1 = this.getOwnerComponent().getModel("global_model");
          
            oModel1.callFunction("/userInfo", {
                success: function (oData) {
                    userModel.setData(oData.userInfo.scopes);
                    this.getView().setModel(userModel, "userModel");
                    this.userLoggedIn = oData.userInfo.user;
                    
                }.bind(this),
                error: function (err) {
                    }.bind(this)
            });
          

            oModel1.callFunction("/current_inv1",
                {
                    method: "GET",
                    urlParameters: {
                        "DATE": this.completeDate
                    },
                    success: function (oRetrievedResult) {
                        var sUserModel=that.getView().getModel("userModel").getData();
                        if(sUserModel.TISAdmin===true){

                        oRetrievedResult.current_inv1.results.forEach(function (element) {
                            element.selected = true;
                        });
                        that.getView().setModel(oRetrievedResult.current_inv1.results, "globalMainData")
                        var tableMainModel = new jsonModel(that.getView().getModel("globalMainData"));
                        tableMainModel.setSizeLimit(5000)
                        that.onGoToReport()
                        
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

    //     currInvUpdateData : function(){
    //         //=================
    //         var oModel1 = this.getOwnerComponent().getModel("global_model");
    //         oModel1.read("/current_inventory",
    //         {
    //             success: function (odata) {
    //                 var filters = [];
    //                 for (var i = 0; i < odata.results.length; i++) {
    //                     var myDate = new Date(odata.results[i].InventorySnapshotDate);
    //                     odata.results[i].InventorySnapshotDate = myDate.toLocaleDateString().replaceAll("/", "-")
    //                     var myDate1 = new Date(odata.results[i].createdon);
    //                     odata.results[i].createdon = myDate1.toLocaleDateString().replaceAll("/", "-")
                      
    //                 }
    //                 that.chkForCurrDateData = that.getView().getModel("globalMainData")
    //                 that.currInvData = odata.results
    //                 that.chkForCurrDateData.forEach(function (item1) {
    //                     that.matchingItems2 = that.currInvData.filter(function (item2) {
    //                         if (item2.Material === item1.MATERIAL && item2.Plant === item1.PLANT) {
    //                             item1.CURRENT_INVENTORY = item2.inventoryvar                
    //                         }
    //                     });
    //                 });
    //                 that.getView().setModel(that.chkForCurrDateData, "globalMainData");
    //                 var tableMainModel = new jsonModel(that.getView().getModel("globalMainData"));
    //                 tableMainModel.setSizeLimit(5000)
    //                 that.onGoToReport()
    //                 that.busy.close()
    //             },
    //             error: function (oError) {
    //                 that.busy.close()
    //             },

    //         });
    //     //============

    //    },

      

        setDefaultDate: function (oEvent) {
            var date = new Date();
            var day = date.setDate(date.getDate() - 1);
            day = new Date(day).getDate();
            day = day.toString().padStart(2, '0');
            var month = date.getMonth() + 1;
            month = month.toString().padStart(2, '0');
            var year = date.getFullYear().toString();
            this.completeDate = month + '-' + day + '-' + year;
            const dateObject = new Date(year, month - 1, day);
            var oDatePicker = this.getView().byId("id_datePicker1");
            // Set the value and disable future dates
            oDatePicker.setValue(this.completeDate);
            oDatePicker.setMaxDate(dateObject);
        },

        handleChangeDate: function (oEvent) {
            var month = this.getView().byId("id_datePicker1").getValue().split("-")[0]
            var day = this.getView().byId("id_datePicker1").getValue().split("-")[1]
            var year = this.getView().byId("id_datePicker1").getValue().split("-")[2]
            this.completeDate = month + '-' + day + '-' + year;
            const dateObject = new Date(year, month - 1, day)
        },

        onSelectDifferencesCheckBox: function (oEvent) {

            if (oEvent.mParameters.selected === true) {
                that.busy.open()
                this.onGoToReport();
                that.removedzeroData = []
                var data = this.getView().byId("exportTable").getModel("tableModel").getData()

                var i;
                for (i = 0; i < data.length; i++) {
                    if (data[i].VARIANCE !== "0") {

                        that.removedzeroData.push(data[i])
                    }
                }
                var removedZeroValues = new jsonModel(that.removedzeroData)
                this.getView().setModel(removedZeroValues, "tableModel")
                that.busy.close()
            }
            else if (oEvent.mParameters.selected === false) {
                this.onGoToReport();
            }
        },

        // When users click on Export Excel button then this method will call.... 
        //04-04-24 Depprecated calls issue for excel SAP Recommendation @gnaneshwar
        onExportSelected: function (oEvent) {
            this.onGoToReport();
            var selectedItems = this.getView().byId("exportTable").getSelectedItems();
            var selectedEntries = this.getView().getModel("globalMainData");
            var filteredData = this.filteredData;
            var oselectedModel;
        
            if (filteredData === true) {
                oselectedModel = new sap.ui.model.json.JSONModel(this.getView().getModel("tableModel").getData());
            } else {
                oselectedModel = new sap.ui.model.json.JSONModel(selectedEntries.getData());
            }
        
            var aCols = [
                { label: "Date", property: "DATE" },
                { label: "Company Code", property: "COMPANYCODE" },
                { label: "Material", property: "MATERIAL" },
                { label: "Material Group", property: "MATERIAL_GROUP" },
                { label: "Product Hierarchy", property: "PRODUCT_HIERARCHY" },
                { label: "Plant", property: "PLANT" },
                { label: "Current Inventory", property: "CURRENT_INVENTORY",type: "number"},
                { label: "SAP Book quantity", property: "SAP_BOOK_QUANTITY",type: "number" },
                { label: "SAP Open Deliveries Quantity", property: "OPEN_DELIVERIES" ,type: "number"},
                { label: "SAP Open QTY", property: "SAP_OPEN_QUANTITY",type: "number" },
                { label: "3PL Qty", property: "QUANTITY_HWY905" ,type: "number"},
                { label: "Inventory Variance", property: "VARIANCE" ,type: "number"},
                { label: "Inventory Variance Value", property: "VARIANCE_VALUE",type: "number" }
            ];
        
            var oSettings = {
                workbook: { 
                    columns: aCols ,
                    context: {
                        sheetName: 'InventoryExport'+ this.completeDate
                    },

                },
                dataSource: oselectedModel.getData(),
                fileName: "InventoryExport " + this.completeDate + ".xlsx"
                
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
        //             name: "Date",
        //             template: {
        //                 content: "{DATE}"
        //             }
        //         }, {
        //             name: "Company Code",
        //             template: {
        //                 content: "{COMPANYCODE}"
        //             }
        //         }, {
        //             name: "Material",
        //             template: {
        //                 content: "{MATERIAL}"
        //             }
        //         }, {
        //             name: "Material Group",
        //             template: {
        //                 content: "{MATERIAL_GROUP}"
        //             }
        //         }, {
        //             name: "Product Hierarchy",
        //             template: {
        //                 content: "{PRODUCT_HIERARCHY}"
        //             }
        //         }, {
        //             name: "Plant",
        //             template: {
        //                 content: "{PLANT}"
        //             }
        //         }, {
        //             name: "Current Inventory",
        //             template: {
        //                 content: "{CURRENT_INVENTORY}"
        //             }
        //         }, {
        //             name: "SAP Book quantity",
        //             template: {
        //                 content: "{SAP_BOOK_QUANTITY}"
        //             }
        //         }, {
        //             name: "SAP Open Deliveries Quantity",
        //             template: {
        //                 content: "{OPEN_DELIVERIES}"
        //             }
        //         }, {
        //             name: "SAP Open QTY",
        //             template: {
        //                 content: "{SAP_OPEN_QUANTITY}"
        //             }
        //         }, {
        //             name: "3PL Qty",
        //             template: {
        //                 content: "{QUANTITY_HWY905}"
        //             }
        //         }, {
        //             name: "Inventory Variance",
        //             template: {
        //                 content: "{VARIANCE}"
        //             }
        //         }, {
        //             name: "Inventory Variance Value",
        //             template: {
        //                 content: "{VARIANCE_VALUE}"
        //             }
        //         }]

        //     });

        //     //* download exported file

        //     oExport.saveFile("InventoryExport " + that.completeDate).always(function () {

        //         this.destroy();

        //     });
        // },

        //=================
        // Fragments starts here

        onOpenComapnyCodeFragment: function (oEvent) {
            if (this.oComapnyCodeFrag) {
                this.oComapnyCodeFrag = undefined;
            }
            if (!this.oComapnyCodeFrag) {
                that.busy.open()
                this.oComapnyCodeFrag = sap.ui.xmlfragment("inventoryreport.Fragments.companyCode", that);
                this.getView().addDependent(that.oComapnyCodeFrag);
                var oCompanyCode = that.getView().getModel("globalMainData")
                var lookup = {};
                var items = oCompanyCode;
                var result = [];
                for (var item, i = 0; item = items[i++];) {
                    var name = item.COMPANYCODE;
                    if (!(name in lookup)) {
                        lookup[name] = 1;
                        result.push({ "COMPANYCODE": name });
                    }
                }
                var oCompanyCodeModel = new jsonModel(result);
                this.getView().setModel(oCompanyCodeModel, "companyCodeGlobalData")
                this.oComapnyCodeFrag.setModel(oCompanyCodeModel, "companyCodeData");

            }
            that.busy.close()
            this.oComapnyCodeFrag.open();

        },
        // company code selected tokens
        onSelectionCompanyCode: function (oEvent) {
            var aContexts = oEvent.getParameter("selectedContexts");
            var oMultiInput = this.getView().byId("id_Companycode");
            var oSelectedContextCC = [];
            var oModel = this.getView().getModel("companyCodeGlobalData");
            for (var i = 0; i < aContexts.length; i++) {
                oSelectedContextCC.push(aContexts[i]);
            }
            that.oCompanycodeModel = [];
            //Check for Unique Data
            // $.each(oSelectedContextCC, function (i, el) {
            //     if ($.inArray(oSelectedContextCC[i].ProductId, that.oCompanycodeModel) === -1) that.oCompanycodeModel.push(oSelectedContextCC[i].getObject());
            // });

            //03-04-24 SAP Recommendation for slow loops @gnaneshwar.
            $.each(oSelectedContextCC, function (i, el) {
                if ($.inArray(el.ProductId, that.oCompanycodeModel) === -1) that.oCompanycodeModel.push(el.getObject());
            });
            oModel.setProperty("/tokens1", that.oCompanycodeModel);
            var oItemTemplateCC;
            oItemTemplateCC = oMultiInput.getTokens()[0];
            //Create the Template for token
            if (!oItemTemplateCC) {
                oItemTemplateCC = new Token({
                    text: "{COMPANYCODE}",
                    key: "{COMPANYCODE}"
                });
            } else {
                oItemTemplateCC = oMultiInput.getTokens()[0].clone();
            }
            //Bind the tokens
            that.oCompanycodeModel.forEach(function (item) {
                oMultiInput.addToken(new Token({
                    text: item.COMPANYCODE
                }));
            })
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
                    text: "{PLANT}",
                    key: "{PLANT}"
                });
            } else {
                oItemTemplateP = oMultiInput.getTokens()[0].clone();
            }
            //Bind the tokens

            oPlantModel.forEach(function (item) {
                oMultiInput.addToken(new Token({
                    text: item.PLANT
                }));
            })

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
                    text: "{MATERIAL}",
                    key: "{MATERIAL}"
                });
            } else {
                oItemTemplateMat = oMultiInput.getTokens()[0].clone();
            }
            //Bind the tokens
            that.oMaterialModel.forEach(function (item) {
                oMultiInput.addToken(new Token({
                    text: item.MATERIAL
                }));
            })

        },

        // selected material Group
        onSelectionMaterialGroup: function (oEvent) {
            var aContexts = oEvent.getParameter("selectedContexts");
            var oMultiInput = this.getView().byId("id_MaterialGroup");
            var oSelectedContextMG = [];
            var oModel = this.getView().getModel("MatGroupGlobalData");
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
                    text: "{MATERIAL_GROUP}",
                    key: "{MATERIAL_GROUP}"
                });
            } else {
                oItemTemplateMG = oMultiInput.getTokens()[0].clone();
            }
            //Bind the tokens
            oMatGrpModel.forEach(function (item) {
                oMultiInput.addToken(new Token({
                    text: item.MATERIAL_GROUP
                }));
            })
        },


        onOpenPlantFragment: function (oEvent) {
            if (this.oPlantFrag) {
                this.oPlantFrag = undefined;
            }
            if (!this.oPlantFrag) {
                that.busy.open()
                this.oPlantFrag = sap.ui.xmlfragment("inventoryreport.Fragments.plant", this);
                this.getView().addDependent(that.oPlantFrag);
                var data1 = that.getView().getModel("globalMainData")

                var lookup = {};
                var items = data1;
                var result = [];

                for (var item, i = 0; item = items[i++];) {
                    var name = item.PLANT;

                    if (!(name in lookup)) {
                        lookup[name] = 1;
                        result.push({ "PLANT": name });
                    }
                }

                var oPlantModel = new jsonModel(result);
                this.getView().setModel(oPlantModel, "plantGlobalData")
                this.oPlantFrag.setModel(oPlantModel, "plantData");
            }
            that.busy.close()
            this.oPlantFrag.open();

        },

        onOpenMaterialFragment: function (oEvent) {
            if (this.oMaterialFrag) {
                this.oMaterialFrag = undefined;
            }

            if (!this.oMaterialFrag) {
                that.busy.open()
                this.oMaterialFrag = sap.ui.xmlfragment("inventoryreport.Fragments.material", that);
                this.getView().addDependent(that.oMaterialFrag);
                var materialData = that.getView().getModel("globalMainData")

                var lookup = {};
                var items = materialData;
                var result = [];

                for (var item, i = 0; item = items[i++];) {
                    var name = item.MATERIAL;

                    if (!(name in lookup)) {
                        lookup[name] = 1;
                        result.push({ "MATERIAL": name });
                    }
                }


                var oMaterialModel = new jsonModel(result);
                this.getView().setModel(oMaterialModel, "materialGlobalData")
                this.oMaterialFrag.setModel(oMaterialModel, "materialData");

            }
            that.busy.close()
            this.oMaterialFrag.open();

        },

        onOpenMatGroupFragment: function (oEvent) {
            if (this.oMatGroupFrag) {
                this.oMatGroupFrag = undefined;
            }
            if (!this.oMatGroupFrag) {
                that.busy.open()
                this.oMatGroupFrag = sap.ui.xmlfragment("inventoryreport.Fragments.materialGroup", that);
                this.getView().addDependent(that.oMatGroupFrag);
                var matGroupData = that.getView().getModel("globalMainData")

                var lookup = {};
                var items = matGroupData;
                var result = [];

                for (var item, i = 0; item = items[i++];) {
                    var name = item.MATERIAL_GROUP;

                    if (!(name in lookup)) {
                        lookup[name] = 1;
                        result.push({ "MATERIAL_GROUP": name });
                    }
                }
                var oMatGroupModel = new jsonModel(result);
                this.getView().setModel(oMatGroupModel, "MatGroupGlobalData")
                this.oMatGroupFrag.setModel(oMatGroupModel, "MatGroupData");
            }
            that.busy.close()
            this.oMatGroupFrag.open();
        },

        onSearchCompanyCode: function (oEvent) {
            var sValue = oEvent.getParameter("value");
            var oFilter = new Filter("COMPANYCODE", sap.ui.model.FilterOperator.Contains, sValue);
            var oBinding = oEvent.getParameter("itemsBinding");
            oBinding.filter([oFilter]);
        },
        onSearchPlant: function (oEvent) {
            var sValue = oEvent.getParameter("value");
            var oFilter = new Filter("PLANT", sap.ui.model.FilterOperator.Contains, sValue);
            var oBinding = oEvent.getParameter("itemsBinding");
            oBinding.filter([oFilter]);
        },
        onSearchMaterial: function (oEvent) {
            var sValue = oEvent.getParameter("value");
            var oFilter = new Filter("MATERIAL", sap.ui.model.FilterOperator.Contains, sValue);
            var oBinding = oEvent.getParameter("itemsBinding");
            oBinding.filter([oFilter]);
        },
        onSearchMaterialGroup: function (oEvent) {
            var sValue = oEvent.getParameter("value");
            var oFilter = new Filter("MATERIAL_GROUP", sap.ui.model.FilterOperator.Contains, sValue);
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

            // get all plant tokens

            var plantTokens = this.getView().byId("id_Plant").getTokens();
            that.sPlantValues = plantTokens.map(function (oToken) {
                return oToken.getText();
            }).join(",");

            // get all company code tokens
            var companyCodeTokens = this.getView().byId("id_Companycode").getTokens();
            that.sCompanyCodeValues = companyCodeTokens.map(function (oToken) {
                return oToken.getText();
            }).join(",");

            // get all material tokens
            var materialTokens = this.getView().byId("id_Material").getTokens();
            that.sMaterialValues = materialTokens.map(function (oToken) {
                return oToken.getText();
            }).join(",");

            // get all material group tokens
            var materialGroupTokens = this.getView().byId("id_MaterialGroup").getTokens();
            that.sMaterialGroupValues = materialGroupTokens.map(function (oToken) {
                return oToken.getText();
            }).join(",");


            var filters = [];

            if (that.sCompanyCodeValues === "" || this.completeDate === undefined || this.completeDate.toString().includes("undefined")) {
                MessageBox.warning("Please Select Mandatory Fields")
                that.busy.close()
            } else {
                if (that.sMaterialValues !== "") {

                    var matVal = that.sMaterialValues.split(",");
                    if (matVal.length > 0) {
                        $.each(matVal, function (i, UIitem) {
                            filters.push(new sap.ui.model.Filter("MATERIAL", sap.ui.model.FilterOperator.Contains, UIitem));
                        });
                    };
                }
                if (that.sMaterialGroupValues !== "") {
                    var matgRPVal = that.sMaterialGroupValues.split(",");
                    if (matgRPVal.length > 0) {
                        $.each(matgRPVal, function (i, UIitem) {
                            filters.push(new sap.ui.model.Filter("MATERIAL_GROUP", sap.ui.model.FilterOperator.Contains, UIitem));
                        });
                    };
                }
                if (that.sPlantValues !== "") {
                    var plantVal = that.sPlantValues.split(",");
                    if (plantVal.length > 0) {
                        $.each(plantVal, function (i, UIitem) {
                            filters.push(new sap.ui.model.Filter("PLANT", sap.ui.model.FilterOperator.Contains, UIitem));
                        });
                    };
                }
                if (that.sCompanyCodeValues !== "") {
                    var companyCodeVal = that.sCompanyCodeValues.split(",");
                    if (companyCodeVal.length > 0) {
                        $.each(companyCodeVal, function (i, UIitem) {
                            filters.push(new sap.ui.model.Filter("COMPANYCODE", sap.ui.model.FilterOperator.Contains, UIitem));
                        });
                    };
                }


                if (this.completeDate !== "") {
                    var selectedDateVal = this.completeDate;
                    if (selectedDateVal) {
                        filters.push(new sap.ui.model.Filter("DATE", sap.ui.model.FilterOperator.Contains, selectedDateVal));

                    };
                }

                that.tableMainModelfiltereddata = undefined
                that.tableMainModelfiltereddata = new jsonModel(that.getView().getModel("globalMainData"));
                that.getView().setModel(that.tableMainModelfiltereddata, "tableModel")
                // this.chkRemoveZeroValues();
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
                this.chkRemoveZeroValues();
                that.busy.close()

            }


        },

        chkRemoveZeroValues: function () {
            //**********changed by jyothi on 14/8***********/

            var check = this.getView().byId("id_InvChk").getSelected();
            if (check) {
                that.removedzeroData = []
                var data = this.getView().byId("exportTable").getModel("tableModel").getData()
                var i;
                for (i = 0; i < data.length; i++) {
                    if (data[i].VARIANCE !== "0") {

                        that.removedzeroData.push(data[i])
                    }
                }
                var removedZeroValues = new jsonModel(that.removedzeroData)
                this.getView().setModel(removedZeroValues, "tableModel")
            }
        },


        handleSelectionChange: function (oEvent) {


            if (oEvent.mParameters.selected === true) {
                var differenceModel = this.getView().getModel("columnModel")
                that.myselectedcolumnskeys = oEvent.oSource.mProperties.selectedKeys
                if (that.myselectedcolumnskeys.includes('date')) {
                    differenceModel.setProperty("/colVisible1", true);
                }
                if (that.myselectedcolumnskeys.includes('companycode')) {
                    differenceModel.setProperty("/colVisible2", true);
                }
                if (that.myselectedcolumnskeys.includes('material')) {
                    differenceModel.setProperty("/colVisible3", true);
                }
                if (that.myselectedcolumnskeys.includes('Materialgroup')) {
                    differenceModel.setProperty("/colVisible4", true);
                }
                if (that.myselectedcolumnskeys.includes('producthierarchy')) {
                    differenceModel.setProperty("/colVisible5", true);
                }
                if (that.myselectedcolumnskeys.includes('plant')) {
                    differenceModel.setProperty("/colVisible6", true);
                }
                if (that.myselectedcolumnskeys.includes('currentinventory')) {
                    differenceModel.setProperty("/colVisible7", true);
                }
                if (that.myselectedcolumnskeys.includes('sapbookquantity')) {
                    differenceModel.setProperty("/colVisible8", true);
                }
                if (that.myselectedcolumnskeys.includes('sapopendeliveriesquantity')) {
                    differenceModel.setProperty("/colVisible9", true);
                }
                if (that.myselectedcolumnskeys.includes('sapopenqty')) {
                    differenceModel.setProperty("/colVisible10", true);
                }
                if (that.myselectedcolumnskeys.includes('3plqty')) {
                    differenceModel.setProperty("/colVisible11", true);
                }
                if (that.myselectedcolumnskeys.includes('inventoryvariance')) {
                    differenceModel.setProperty("/colVisible12", true);
                }
                if (that.myselectedcolumnskeys.includes('inventoryvariancevalue')) {
                    differenceModel.setProperty("/colVisible13", true);
                }


            }
            else if (oEvent.mParameters.selected === false) {

                var differenceModel = this.getView().getModel("columnModel")
                that.myselectedcolumnskeys = oEvent.oSource.mProperties.selectedKeys
                if (oEvent.mParameters.changedItem.mProperties.key === 'date') {
                    differenceModel.setProperty("/colVisible1", false);
                }
                if (oEvent.mParameters.changedItem.mProperties.key === 'companycode') {
                    differenceModel.setProperty("/colVisible2", false);
                }
                if (oEvent.mParameters.changedItem.mProperties.key === 'material') {
                    differenceModel.setProperty("/colVisible3", false);
                }
                if (oEvent.mParameters.changedItem.mProperties.key === 'Materialgroup') {
                    differenceModel.setProperty("/colVisible4", false);
                }
                if (oEvent.mParameters.changedItem.mProperties.key === 'producthierarchy') {
                    differenceModel.setProperty("/colVisible5", false);
                }
                if (oEvent.mParameters.changedItem.mProperties.key === 'plant') {
                    differenceModel.setProperty("/colVisible6", false);
                }
                if (oEvent.mParameters.changedItem.mProperties.key === 'currentinventory') {
                    differenceModel.setProperty("/colVisible7", false);
                }
                if (oEvent.mParameters.changedItem.mProperties.key === 'sapbookquantity') {
                    differenceModel.setProperty("/colVisible8", false);
                }
                if (oEvent.mParameters.changedItem.mProperties.key === 'sapopendeliveriesquantity') {
                    differenceModel.setProperty("/colVisible9", false);
                }
                if (oEvent.mParameters.changedItem.mProperties.key === 'sapopenqty') {
                    differenceModel.setProperty("/colVisible10", false);
                }
                if (oEvent.mParameters.changedItem.mProperties.key === '3plqty') {
                    differenceModel.setProperty("/colVisible11", false);
                }
                if (oEvent.mParameters.changedItem.mProperties.key === 'inventoryvariance') {
                    differenceModel.setProperty("/colVisible12", false);
                }
                if (oEvent.mParameters.changedItem.mProperties.key === 'inventoryvariancevalue') {
                    differenceModel.setProperty("/colVisible12", false);
                }
            }
        },


        onPressClear: function (oEvent) {
            that.filteredData = false;
            this.getView().byId("id_datePicker1").setValue("");
            this.getView().byId("id_Plant").setTokens([]);
            this.getView().byId("id_Companycode").setTokens([]);
            this.getView().byId("id_Material").setTokens([]);
            this.getView().byId("id_MaterialGroup").setTokens([]);
            var tableMainModel = new jsonModel();
            that.getView().setModel(tableMainModel, "tableModel")
            this.completeDate = ""


        }

    });

});
