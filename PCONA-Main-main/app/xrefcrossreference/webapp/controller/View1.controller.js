var that;
var aData = [];
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
    "sap/ui/model/odata/v2/ODataModel",
    "sap/m/BusyDialog"

], function (Controller, Fragment, jsonModel, Export, ExportTypeCSV,
    Spreadsheet, Filter, FilterOperator, MessageToast, Token, MessageBox, ODataModel, BusyDialog) {
    "use strict";

    return Controller.extend("xrefcrossreference.controller.View1", {
        onInit: function (oRetrievedResult) {
            that = this
           
            var oView = this.getView();
            var oModel = new sap.ui.model.json.JSONModel();
            this.getView().byId("id_Companycode").addToken(new Token({
                text: "US14"
            }));
            oView.byId("exportTable").setModel(oModel, "tableModel");
            this.onReadCall();

        },

        onReadCall: function () {
            var oModel1 = this.getOwnerComponent().getModel("tableModel2");
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

            oModel1.read("/zxref_zone",
                {

                    success: function (datao) {
                        //jyothi changed on 17/04/2024
                        var sUserModel=that.getView().getModel("userModel").getData();
                        if(sUserModel.TISAdmin===true){
                        var oData1 = new sap.ui.model.json.JSONModel(datao.results);
                        that.getView().setModel(oData1, "readModel"); 
                        that.getView().setModel(oData1, "GlobalReadModel");                                             

                        }
                        else{
                            that.getView().setModel([], "readModel");
                              
                        }
                    },

                    error: function (oError) {
                        
                    },


                });

        },
        onOpenPlantFragment: function (oEvent) {
            if (this.oPlantFrag) {
                this.oPlantFrag = undefined;
            }
            if (!this.oPlantFrag) {
                // that.busy.open()
                this.oPlantFrag = sap.ui.xmlfragment("xrefcrossreference.Fragments.plant", this);
                this.getView().addDependent(that.oPlantFrag);
                var data1 = that.getView().getModel("GlobalReadModel").getData()

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

                var oPlantModel = new sap.ui.model.json.JSONModel(result);
                this.getView().setModel(oPlantModel, "plantGlobalData")
                this.oPlantFrag.setModel(oPlantModel, "plantData");
            }
            // that.busy.close()
            this.oPlantFrag.open();

        },
        onOpenComapnyCodeFragment: function () {
            if (this.oComapnyCodeFrag) {
                this.oComapnyCodeFrag = undefined;
            }
            if (!this.oComapnyCodeFrag) {
                //  that.busy.open()
                this.oComapnyCodeFrag = sap.ui.xmlfragment("xrefcrossreference.Fragments.companyCode", that);
                this.getView().addDependent(that.oComapnyCodeFrag);
                var oCompanyCode = that.getView().getModel("GlobalReadModel").getData()
                var lookup = {};
                var items = oCompanyCode;
                var result = [];
                for (var item, i = 0; item = items[i++];) {
                    var name = item.companycode;
                    if (!(name in lookup)) {
                        lookup[name] = 1;
                        result.push({ "companycode": name });
                    }
                }
                var oCompanyCodeModel = new sap.ui.model.json.JSONModel(result);
                this.getView().setModel(oCompanyCodeModel, "companyCodeGlobalData")
                this.oComapnyCodeFrag.setModel(oCompanyCodeModel, "companyCodeData");

            }
            //that.busy.close()
            this.oComapnyCodeFrag.open();

        },
        onOpendcFragment: function () {
            if (this.oDcFrag) {
                this.oDcFrag = undefined;
            }
            if (!this.oDcFrag) {
                //that.busy.open()
                this.oDcFrag = sap.ui.xmlfragment("xrefcrossreference.Fragments.dc", that);
                this.getView().addDependent(that.oDcFrag);
                var dcData = that.getView().getModel("GlobalReadModel").getData()

                var lookup = {};
                var items = dcData;
                var result = [];

                for (var item, i = 0; item = items[i++];) {
                    var name = item.dc;

                    if (!(name in lookup)) {
                        lookup[name] = 1;
                        result.push({ "dc": name });
                    }
                }

                var oDcModel = new sap.ui.model.json.JSONModel(result);
                this.getView().setModel(oDcModel, "dcGlobalData")
                this.oDcFrag.setModel(oDcModel, "dcData");

            }
            // that.busy.close()
            this.oDcFrag.open();

        },

        onOpenWarehouseFragment: function (oEvent) {
            if (this.oWarehouseFrag) {
                this.oWarehouseFrag = undefined;
            }
            if (!this.oWarehouseFrag) {
                // that.busy.open()
                this.oWarehouseFrag = sap.ui.xmlfragment("xrefcrossreference.Fragments.highway905", that);
                this.getView().addDependent(that.oWarehouseFrag);
                var warehouseData = that.getView().getModel("GlobalReadModel").getData()

                var lookup = {};
                var items = warehouseData;
                var result = [];

                for (var item, i = 0; item = items[i++];) {
                    var name = item.warehouse_hwy905;

                    if (!(name in lookup)) {
                        lookup[name] = 1;
                        result.push({ "warehouse_hwy905": name });
                    }
                }
                var oWarehouseModel = new sap.ui.model.json.JSONModel(result);
                this.getView().setModel(oWarehouseModel, "WarehouseGlobalData")
                this.oWarehouseFrag.setModel(oWarehouseModel, "WarehouseData");
            }
            //that.busy.close()
            this.oWarehouseFrag.open();
        },

        onOpenPartneridFragment: function () {
            if (this.oPartnerFrag) {
                this.oPartnerFrag = undefined;
            }
            if (!this.oPartnerFrag) {
                // that.busy.open()
                this.oPartnerFrag = sap.ui.xmlfragment("xrefcrossreference.Fragments.partner", that);
                this.getView().addDependent(that.oPartnerFrag);
                var partnerData = that.getView().getModel("GlobalReadModel").getData()

                var lookup = {};
                var items = partnerData;
                var result = [];

                for (var item, i = 0; item = items[i++];) {
                    var name = item.partner_id;

                    if (!(name in lookup)) {
                        lookup[name] = 1;
                        result.push({ "partner_id": name });
                    }
                }
                var oPartnerModel = new sap.ui.model.json.JSONModel(result);
                this.getView().setModel(oPartnerModel, "PartnerGlobalData")
                this.oPartnerFrag.setModel(oPartnerModel, "PartnerData");
            }
            //that.busy.close()
            this.oPartnerFrag.open();
        },
        onOpenzoneFragment: function () {
            if (this.oZoneFrag) {
                this.oZoneFrag = undefined;
            }
            if (!this.oZoneFrag) {
                // that.busy.open()
                this.oZoneFrag = sap.ui.xmlfragment("xrefcrossreference.Fragments.zone", that);
                this.getView().addDependent(that.oZoneFrag);
                var zoneData = that.getView().getModel("GlobalReadModel").getData()

                var lookup = {};
                var items = zoneData;
                var result = [];

                for (var item, i = 0; item = items[i++];) {
                    var name = item.zone;

                    if (!(name in lookup)) {
                        lookup[name] = 1;
                        result.push({ "zone": name });
                    }
                }
                var oZoneModel = new sap.ui.model.json.JSONModel(result);
                this.getView().setModel(oZoneModel, "ZoneGlobalData")
                this.oZoneFrag.setModel(oZoneModel, "ZoneData");
            }
            //that.busy.close()
            this.oZoneFrag.open();
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
            oModel.setProperty("/tokens2", that.oCompanycodeModel);
            var oItemTemplateCC;
            oItemTemplateCC = oMultiInput.getTokens()[0];
            //Create the Template for token
            if (!oItemTemplateCC) {
                oItemTemplateCC = new Token({
                    text: "{companycode}",
                    key: "{companycode}"
                });
            } else {
                oItemTemplateCC = oMultiInput.getTokens()[0].clone();
            }
            //Bind the tokens
            that.oCompanycodeModel.forEach(function (item) {
                oMultiInput.addToken(new Token({
                    text: item.companycode
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
            oModel.setProperty("/tokens1", oPlantModel);
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

        // selected dc
        onSelectionDc: function (oEvent) {
            this.getView().byId("id_Dc").setTokens([]);
            that.oDcModel = [];
            var aContexts = oEvent.getParameter("selectedContexts");
            var oMultiInput = this.getView().byId("id_Dc");
            var oSelectedContextM = [];
            var oModel = this.getView().getModel("dcGlobalData");
            for (var i = 0; i < aContexts.length; i++) {
                oSelectedContextM.push(aContexts[i]);
            }
            that.oDcModel = [];
            //Check for Unique Data
            // $.each(oSelectedContextM, function (i, el) {
            //     if ($.inArray(oSelectedContextM[i].ProductId, that.oDcModel) === -1) that.oDcModel.push(oSelectedContextM[i].getObject());
            // });

            //03-04-24 SAP Recommendation for slow loops @gnaneshwar.
            $.each(oSelectedContextM, function (i, el) {
                if ($.inArray(el.ProductId, that.oDcModel) === -1) that.oDcModel.push(el.getObject());
            });
            oModel.setProperty("/tokens3", that.oDcModel);
            var oItemTemplateMat;
            oItemTemplateMat = oMultiInput.getTokens()[0];
            //Create the Template for token
            if (!oItemTemplateMat) {
                oItemTemplateMat = new Token({
                    text: "{dc}",
                    key: "{dc}"
                });
            } else {
                oItemTemplateMat = oMultiInput.getTokens()[0].clone();
            }
            //Bind the tokens
            that.oDcModel.forEach(function (item) {
                oMultiInput.addToken(new Token({
                    text: item.dc
                }));
            })

        },
        // selected warehouse
        onSelectionHighway: function (oEvent) {
            var aContexts = oEvent.getParameter("selectedContexts");
            var oMultiInput = this.getView().byId("id_Warehouse");
            var oSelectedContextMG = [];
            var oModel = this.getView().getModel("WarehouseGlobalData");
            for (var i = 0; i < aContexts.length; i++) {
                oSelectedContextMG.push(aContexts[i]);
            }
            var oWarehouseModel = [];
            //Check for Unique Data
            // $.each(oSelectedContextMG, function (i, el) {
            //     if ($.inArray(oSelectedContextMG[i].ProductId, oWarehouseModel) === -1) oWarehouseModel.push(oSelectedContextMG[i].getObject());
            // });

            //03-04-24 SAP Recommendation for slow loops @gnaneshwar.
            $.each(oSelectedContextMG, function (i, el) {
                if ($.inArray(el.ProductId, oWarehouseModel) === -1) oWarehouseModel.push(el.getObject());
            });
            oModel.setProperty("/tokens4", oWarehouseModel);
            var oItemTemplateMG;
            oItemTemplateMG = oMultiInput.getTokens()[0];
            //Create the Template for token
            if (!oItemTemplateMG) {
                oItemTemplateMG = new Token({
                    text: "{warehouse_hwy905}",
                    key: "{warehouse_hwy905}"
                });
            } else {
                oItemTemplateMG = oMultiInput.getTokens()[0].clone();
            }
            //Bind the tokens
            oWarehouseModel.forEach(function (item) {
                oMultiInput.addToken(new Token({
                    text: item.warehouse_hwy905
                }));
            })
        },

        onSelectionPartner: function (oEvent) {
            var aContexts = oEvent.getParameter("selectedContexts");
            var oMultiInput = this.getView().byId("id_Partner");
            var oSelectedContextMG = [];
            var oModel = this.getView().getModel("PartnerGlobalData");
            for (var i = 0; i < aContexts.length; i++) {
                oSelectedContextMG.push(aContexts[i]);
            }
            var oPartnerModel = [];
            //Check for Unique Data
            // $.each(oSelectedContextMG, function (i, el) {
            //     if ($.inArray(oSelectedContextMG[i].ProductId, oPartnerModel) === -1) oPartnerModel.push(oSelectedContextMG[i].getObject());
            // });

            //03-04-24 SAP Recommendation for slow loops @gnaneshwar.
            $.each(oSelectedContextMG, function (i, el) {
                if ($.inArray(el.ProductId, oPartnerModel) === -1) oPartnerModel.push(el.getObject());
            });
            oModel.setProperty("/tokens5", oPartnerModel);
            var oItemTemplateMG;
            oItemTemplateMG = oMultiInput.getTokens()[0];
            //Create the Template for token
            if (!oItemTemplateMG) {
                oItemTemplateMG = new Token({
                    text: "{partner_id}",
                    key: "{partner_id}"
                });
            } else {
                oItemTemplateMG = oMultiInput.getTokens()[0].clone();
            }
            //Bind the tokens
            oPartnerModel.forEach(function (item) {
                oMultiInput.addToken(new Token({
                    text: item.partner_id
                }));
            })
        },
        onSelectionZone: function (oEvent) {
            var aContexts = oEvent.getParameter("selectedContexts");
            var oMultiInput = this.getView().byId("id_Zone");
            var oSelectedContextMG = [];
            var oModel = this.getView().getModel("ZoneGlobalData");
            for (var i = 0; i < aContexts.length; i++) {
                oSelectedContextMG.push(aContexts[i]);
            }
            var oZoneModel = [];
            //Check for Unique Data
            // $.each(oSelectedContextMG, function (i, el) {
            //     if ($.inArray(oSelectedContextMG[i].ProductId, oZoneModel) === -1) oZoneModel.push(oSelectedContextMG[i].getObject());
            // });

            //03-04-24 SAP Recommendation for slow loops @gnaneshwar.
            $.each(oSelectedContextMG, function (i, el) {
                if ($.inArray(el.ProductId, oZoneModel) === -1) oZoneModel.push(el.getObject());
            });
            oModel.setProperty("/tokens6", oZoneModel);
            var oItemTemplateMG;
            oItemTemplateMG = oMultiInput.getTokens()[0];
            //Create the Template for token
            if (!oItemTemplateMG) {
                oItemTemplateMG = new Token({
                    text: "{zone}",
                    key: "{zone}"
                });
            } else {
                oItemTemplateMG = oMultiInput.getTokens()[0].clone();
            }
            //Bind the tokens
            oZoneModel.forEach(function (item) {
                oMultiInput.addToken(new Token({
                    text: item.zone
                }));
            })
        },

        onDialogClose: function (oEvent) {
            if (this.oWarehouseFrag) {
                this.oWarehouseFrag = undefined;
                this.oWarehouseFrag = null
            }
            else if (this.oDcFrag) {
                this.oDcFrag = undefined;
                this.oDcFrag = null
            }
            else if (this.oPlantFrag) {
                this.oPlantFrag = undefined;
                this.oPlantFrag = null;
            }
            else if (this.oComapnyCodeFrag) {
                this.oComapnyCodeFrag = undefined;
                this.oComapnyCodeFrag = null;
            }
            else if (this.oPartnerFrag) {
                this.oPartnerFrag = undefined;
                this.oPartnerFrag = null;
            }
            else if (this.oZoneFrag) {
                this.oZoneFrag = undefined;
                this.oZoneFrag = null;
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
           // that.busy.open()

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

            // get all dc tokens
            var dcTokens = this.getView().byId("id_Dc").getTokens();
            that.sDcValues = dcTokens.map(function (oToken) {
                return oToken.getText();
            }).join(",");

            // get all highway tokens
            var warehouseTokens = this.getView().byId("id_Warehouse").getTokens();
            that.sWarehouseValues = warehouseTokens.map(function (oToken) {
                return oToken.getText();
            }).join(",");

            // get all partner tokens
            var partnerTokens = this.getView().byId("id_Partner").getTokens();
            that.sPartnerValues = partnerTokens.map(function (oToken) {
                return oToken.getText();
            }).join(",");

            // get all zone tokens
            var zoneTokens = this.getView().byId("id_Zone").getTokens();
            that.sZoneValues = zoneTokens.map(function (oToken) {
                return oToken.getText();
            }).join(",");

            var filters = [];

            // if (that.sCompanyCodeValues === "" || that.sPlantValues === "" ) {
            //     MessageBox.warning("Please Select Mandatory Fields")
            //     that.busy.close()
            // } 
             //else {
                if (that.sDcValues !== "") {

                    var dcVal = that.sDcValues.split(",");
                    if (dcVal.length > 0) {
                        $.each(dcVal, function (i, UIitem) {
                            filters.push(new sap.ui.model.Filter("dc", sap.ui.model.FilterOperator.Contains, UIitem));
                        });
                    };
                }
                if (that.sWarehouseValues !== "") {
                    var warehouseVal = that.sWarehouseValues.split(",");
                    if (warehouseVal.length > 0) {
                        $.each(warehouseVal, function (i, UIitem) {
                            filters.push(new sap.ui.model.Filter("warehouse_hwy905", sap.ui.model.FilterOperator.Contains, UIitem));
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
                if (that.sCompanyCodeValues !== "") {
                    var companyCodeVal = that.sCompanyCodeValues.split(",");
                    if (companyCodeVal.length > 0) {
                        $.each(companyCodeVal, function (i, UIitem) {
                            filters.push(new sap.ui.model.Filter("companycode", sap.ui.model.FilterOperator.Contains, UIitem));
                        });
                    };
                }
                if (that.sPartnerValues !== "") {
                    var partnerVal = that.sPartnerValues.split(",");
                    if (partnerVal.length > 0) {
                        $.each(partnerVal, function (i, UIitem) {
                            filters.push(new sap.ui.model.Filter("partner_id", sap.ui.model.FilterOperator.Contains, UIitem));
                        });
                    };
                }
                if (that.sZoneValues !== "") {
                    var zoneVal = that.sZoneValues.split(",");
                    if (zoneVal.length > 0) {
                        $.each(zoneVal, function (i, UIitem) {
                            filters.push(new sap.ui.model.Filter("zone", sap.ui.model.FilterOperator.Contains, UIitem));
                        });
                    };
                }
                that.tableMainModelfiltereddata = undefined
                that.tableMainModelfiltereddata = new jsonModel(that.getView().getModel("GlobalReadModel").getData());
                that.getView().setModel(that.tableMainModelfiltereddata, "readModel")
                this.getView().byId("exportTable").getBinding("items").filter(filters);
                that.filteredData = true;
                that.filteredDataToExport = []
                var selectedITemsLength = this.getView().byId("exportTable").getBinding("items").aIndices.length
                that.filteredIndices = this.getView().byId("exportTable").getBinding("items").aIndices
                for (var i = 0; i < selectedITemsLength; i++) {
                    that.filteredDataToExport.push(that.tableMainModelfiltereddata.oData[that.filteredIndices[i]]);

                }
                var tableFilteredModel = new jsonModel(that.filteredDataToExport)
                that.getView().setModel(tableFilteredModel, "readModel")

               // that.busy.close()

           // }
        },        

        onPressClear: function (oEvent) {
            that.filteredData = false;
            this.getView().byId("id_Plant").setTokens([]);
            this.getView().byId("id_Companycode").setTokens([]);
            this.getView().byId("id_Dc").setTokens([]);
            this.getView().byId("id_Warehouse").setTokens([]);
            this.getView().byId("id_Partner").setTokens([]);
            this.getView().byId("id_Zone").setTokens([]);
            var tableMainModel = new jsonModel();
            that.getView().setModel(tableMainModel, "readModel")
        },        

        onCreate: function (oEvent) {

            this.getView().byId("OpenDialog").open();
            this.mode = "Add";
        },

        onCancel: function (oEvent) {
            oEvent.getSource().getParent().close();
        },

        onSave: function (oEvent) {

            if (this.mode === "Add") {
                var nMandatoryField = 0
                var sDC = this.getView().byId("idDc").getValue();
                var sCompCode = this.getView().byId("idCompCode").getValue();
                var sPlant = this.getView().byId("idPlant").getValue();
                var sWareHouse = this.getView().byId("idWarehouse").getValue();
                var sPartner = this.getView().byId("idPartner").getValue();
                var sZone = this.getView().byId("idZone").getValue();

                if (sCompCode === "") {
                    nMandatoryField = 1;
                }
                else if (sPlant === "") {
                    nMandatoryField = 1;
                }

                if (nMandatoryField === 1) {
                   // alert("Please enter all mandatory Fields");
                }
                else {
                    aData.push({
                        'dc': sDC,
                        'companycode': sCompCode,
                        'plant': sPlant,
                        'warehouse_hwy905': sWareHouse,
                        'partner_id': sPartner,
                        'zone': sZone
                    });
                }
                
                oEvent.getSource().getParent().close();
                this.getView().byId("idDc").setValue("");
                this.getView().byId("idCompCode").setValue("");
                this.getView().byId("idPlant").setValue("");
                this.getView().byId("idWarehouse").setValue("");
                this.getView().byId("idPartner").setValue("");
                this.getView().byId("idZone").setValue("");
                
                var oModel2 = this.getOwnerComponent().getModel("tableModel2");
                
                oModel2.callFunction("/zxref_create", {
                    method: "GET",
                    urlParameters: {
                        "plant": sPlant,
                        "companycode": sCompCode,
                        "dc": sDC,
                        "warehouse_hwy905": sWareHouse,
                        "partner_id": sPartner,
                        "zone": sZone
                    },

                    success: function (oData) {
                        
                        that.onReadCall();
                        // console.log(oData)

                    }.bind(this),

                    error: function (oErrror) {

                        // console.log(oErrror)

                    }
                });
            }          


        },

        onDeleteCall: function(dataDeleted){           
            
            var oModel2 = this.getOwnerComponent().getModel("tableModel2");
            var oTable = this.getView().byId("exportTable");                
                oModel2.callFunction("/zxref_delete", {
                    method: "GET",
                    urlParameters: {
                        "plant": dataDeleted.plant,                        
                        "partner_id": dataDeleted.partner_id                      
                    },

                    success: function (oData) {                       
                        that.onReadCall();
                       // console.log(oData)
                        

                    }.bind(this),

                    error: function (oErrror) {
                        // console.log(oErrror)
                    }
                });
            },   
            
            //15-04-24 changes done to show warning if user doesn't select any record @Gnaneshwar
            onDelete: function () {
                var oModel2 = this.getOwnerComponent().getModel("tableModel2");
            
                this._oTable = this.getView().byId("exportTable");
                var aContexts = this._oTable.getSelectedContexts();
            
                if (aContexts.length === 0) {
                    MessageBox.warning("Please select at least one record to delete.");
                    return;
                }
            
                var oTableData = this._oTable.getModel("readModel").getData();
                var oModel = this._oTable.getModel("readModel");
            
                var aDeffergroupd = oModel2.getDeferredGroups();
                if (aDeffergroupd.indexOf('delete') === -1) {
                    aDeffergroupd.push("delete")
                }
                oModel2.setDeferredGroups(aDeffergroupd);
            
                for (var i = 0; i < aContexts.length; i++) {
                    var oThisObj = aContexts[i].getObject();
                    var index = $.map(oTableData, function (obj, index) {
                        if (obj === oThisObj) {
                            oModel2.callFunction("/zxref_delete", {
                                method: "GET",
                                urlParameters: {
                                    "plant": oThisObj.plant,
                                    "partner_id": oThisObj.partner_id
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
        //     var oModel2 = this.getOwnerComponent().getModel("tableModel2");
           
        //     this._oTable = this.getView().byId("exportTable");
        //     var oTableData = this._oTable.getModel("readModel").getData();
        //     var aContexts = this._oTable.getSelectedContexts();
        //     var oModel = this._oTable.getModel("readModel");

        //     var aDeffergroupd = oModel2.getDeferredGroups();
        //     if(aDeffergroupd.indexOf('delete')=== -1){
        //         aDeffergroupd.push("delete")
        //     }
        //     oModel2.setDeferredGroups(aDeffergroupd);
        //     for (var i =0;i<aContexts.length; i++) {
        //         var oThisObj = aContexts[i].getObject();
        //         var index = $.map(oTableData, function (obj, index) {
        //             if (obj === oThisObj) {
        //                 oModel2.callFunction("/zxref_delete", {
        //                     method: "GET",
        //                     urlParameters: {
        //                         "plant": oThisObj.plant,                        
        //                         "partner_id": oThisObj.partner_id 
                                                     
        //                     },
        //                     groupId : "delete"       
                            
        //                 });
        //                // that.onDeleteCall(oThisObj)
        //                 return index;
        //             }
        //         })                
        //     }

        //     oModel2.submitChanges({
        //         groupId : "delete",
        //         success: function (oData) {                       
        //             that.onReadCall();
        //             console.log(oData)
                    

        //         }.bind(this),

        //         error: function (oErrror) {
        //             console.log(oErrror)
        //         }
        //     })         
           
        // },        

        onCreateCall: function(){
            var sDC = this.getView().byId("idDc").getValue();
                var sCompCode = this.getView().byId("idCompCode").getValue();
                var sPlant = this.getView().byId("idPlant").getValue();
                var sWareHouse = this.getView().byId("idWarehouse").getValue();
                var sPartner = this.getView().byId("idPartner").getValue();
                var sZone = this.getView().byId("idZone").getValue();
            var oModel2 = this.getOwnerComponent().getModel("tableModel2");
                
                oModel2.callFunction("/zxref_create", {
                    method: "GET",
                    urlParameters: {
                        "plant": sPlant,
                        "companycode": sCompCode,
                        "dc": sDC,
                        "warehouse_hwy905": sWareHouse,
                        "partner_id": sPartner,
                        "zone": sZone
                    },

                    success: function (oData) {
                        
                        that.onReadCall();
                        // console.log(oData)

                    }.bind(this),

                    error: function (oErrror) {

                        // console.log(oErrror)

                    }
                });
            },

            onUpdateCall: function(updatedData){
                    var oModel2 = this.getOwnerComponent().getModel("tableModel2");
                    
                    oModel2.callFunction("/zxref_create", {
                        method: "GET",
                        urlParameters: {
                            "plant": updatedData.plant,
                            "companycode": updatedData.companycode,
                            "dc": updatedData.dc,
                            "warehouse_hwy905": updatedData.warehouse_hwy905,
                            "partner_id": updatedData.partner_id,
                            "zone": updatedData.zone
                        },
    
                        success: function (oData) {
                            
                            that.onReadCall();
                            // console.log(oData)
    
                        }.bind(this),
    
                        error: function (oErrror) {
    
                            // console.log(oErrror)
    
                        }   
    
                    });
                },          
        

            onselectionChange: function (oEvent) {

            
            that.oItem = this.getView().byId("exportTable").getSelectedItem();

            var oTableSelectedItem = this.getView().byId("exportTable").getSelectedItems().length;
            if (oTableSelectedItem > 1) {
                this.getView().byId("editModeButton").setEnabled(false)
            }
            else if (oTableSelectedItem == 1) {
                this.getView().byId("editModeButton").setEnabled(true)
            }

            var oSelectedItem = oEvent.getParameter("listItem");
            that.oRowPath = oSelectedItem.getBindingContext("readModel").sPath;
            that.oRowPath = that.oRowPath.substring(11);
            oSelectedItem.getBindingContext("readModel").getObject();
           

        },
        onEdit: function () {
            this.mode = "Edit";
            var oTable = this.getView().byId("exportTable");
            var oSelectedItem = oTable.getSelectedItem();

            if (!oSelectedItem) {
                alert("Please select a row to edit.");
                return;
            }
            
            var oSelectedData = oSelectedItem.getBindingContext("readModel").getObject();
            this.getView().byId("idCompCode1").setEnabled(false);
            this.getView().byId("idPlant1").setEnabled(false);
            // Populate the input fields with the selected row's data
            this.getView().byId("idDc1").setValue(oSelectedData.dc);
            this.getView().byId("idCompCode1").setValue(oSelectedData.companycode);
            this.getView().byId("idPlant1").setValue(oSelectedData.plant);
            this.getView().byId("idWarehouse1").setValue(oSelectedData.warehouse_hwy905);
            this.getView().byId("idPartner1").setValue(oSelectedData.partner_id);
            this.getView().byId("idZone1").setValue(oSelectedData.zone);

            // Open the dialog for editing
            this.getView().byId("OpenDialog1").open();
        },

        onUpdate: function () {
            if (this.mode === "Edit") {
                var that = this; // Store the reference to 'this'

                var sDC = that.getView().byId("idDc1").getValue();
                var sCompCode = that.getView().byId("idCompCode1").getValue();
                var sPlant = that.getView().byId("idPlant1").getValue();
                var sWareHouse = that.getView().byId("idWarehouse1").getValue();
                var sPartner = that.getView().byId("idPartner1").getValue();
                var sZone = that.getView().byId("idZone1").getValue();

                var oTable = that.getView().byId("exportTable");
                var oSelectedItem = oTable.getSelectedItem();

                if (!oSelectedItem) {
                    alert("Please select a row to update.");
                    return;
                }              

                var oUpdatedRecord = {
                    "plant": sPlant,
                    "companycode": sCompCode,
                    "dc": sDC,
                    "warehouse_hwy905": sWareHouse,
                    "partner_id": sPartner,
                    "zone": sZone
                };
                
                that.onUpdateCall(oUpdatedRecord);              

                // Close the dialog after updating
                this.getView().byId("OpenDialog1").close();
            }
        }
    });
});


