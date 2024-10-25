var that;
sap.ui.define(
    [
        "sap/ui/model/json/JSONModel",
        "sap/m/MessageToast",
        "sap/m/MessageBox",
        'sap/ui/core/util/Export',
        'sap/ui/core/util/ExportTypeCSV',
        'sap/ui/export/Spreadsheet',
        "sap/m/BusyDialog",
        "sap/ui/model/Filter",
        "sap/ui/model/FilterOperator",
        "sap/ui/core/Fragment",
        'sap/m/Token',
        'sap/ui/model/Sorter'
    ],
    function (JSONModel, MessageToast, MessageBox, Export, ExportTypeCSV, Spreadsheet, BusyDialog, Filter, FilterOperator, Fragment, Token, Sorter) {
        "use strict";
        that = this;
        return {

            storeView_5: function (oCurrentView, oGlbCurrView) {

                this.currentView = oCurrentView;
                that.GlbCurrView = oGlbCurrView;
                that.GlbCurrView.busy = new BusyDialog();
            },




            handle5SelectionChange_util: function (oEvent) {

                var oItem = oEvent.getParameter("changedItem"),
                    bSelected = oEvent.getParameter("selected"),
                    oContext = oItem.getBindingContext("columndataInfo_5");
                oContext.oModel.setProperty(oContext.sPath + "/visible", bSelected)
                oContext.oModel.refresh(true);

            },

            //     handleTrdPartSelectionChangeUtil: function(oEvent){

            //         var oItem = oEvent.getParameter("changedItem"),
            //         bSelected = oEvent.getParameter("selected"),
            //         oContext = oItem.getBindingContext("columndataTrdPart");
            //         oContext.oModel.setProperty(oContext.sPath+"/visible",bSelected)
            //         oContext.oModel.refresh(true);

            // },

            onRead_5TableData: function () {

                var oModel1 = this.currentView.getOwnerComponent().getModel("masterDataGlobalModel");
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
                oModel1.read("/zmm_m12_info_5",
                    {
                        success: function (oData) {
                             //jyothi changed on 17/04/2024
                        var sUserModel=that.getView().getModel("userModel").getData();
                        if(sUserModel.TISAdmin===true){
                            var oDateFormat = sap.ui.core.format.DateFormat.getDateTimeInstance({
                                pattern: "MM-dd-yyyy"
                            });
                            var passCurrentdate = oDateFormat.format(new Date());
                            //oData.results[0].change_time
                            for (var i = 0; i < oData.results.length; i++) {
                                oData.results[i].created_on = oDateFormat.format(oData.results[i].created_on);
                                oData.results[i].changed_on = oDateFormat.format(oData.results[i].changed_on);
                                oData.results[i].change_time = new Date(oData.results[i].change_time.ms).toISOString().slice(11, 19)
                                //oData.results[i].created_time = new Date(oData.results[i].created_time.ms).toISOString().slice(11, 19)
                            }
                            that.GlbCurrView.getView().setModel(new sap.ui.model.json.JSONModel(oData.results), "globalMainData_Info5")
                            that.GlbCurrView.getView().setModel(new sap.ui.model.json.JSONModel(oData.results), "Info_5_Model")
                        }
                        else{
                            that.getView().setModel([], "globalMainData_Info5");
                              
                        }
                        },
                        error: function (oError) {
                            that.GlbCurrView.busy.close()
                        },

                    });
            },


            setMaxDate_City: function () {
                var date = new Date();
                var day = date.setDate(date.getDate());
                day = new Date(day).getDate();
                day = day.toString().padStart(2, '0');
                var month = date.getMonth() + 1;
                month = month.toString().padStart(2, '0');
                var year = date.getFullYear().toString();
                that.GlbCurrView.completeDate = month + '-' + day + '-' + year;
                const dateObject = new Date(year, month - 1, day);
                var oDatePicker1 = this.currentView.getView().byId("id_datePicker_7");
                //var oDatePicker2 = this.currentView.getView().byId("id_datePicker_2");
                // Set the value and disable future dates
                // oDatePicker.setValue(that.completeDate);
                oDatePicker1.setMaxDate(dateObject);
                //oDatePicker2.setMaxDate(dateObject);
            },

            setMaxDate_City2: function () {
                var date1 = new Date();
                var day1 = date1.setDate(date1.getDate());
                day1 = new Date(day1).getDate();
                day1 = day1.toString().padStart(2, '0');
                var month1 = date1.getMonth() + 1;
                month1 = month1.toString().padStart(2, '0');
                var year1 = date1.getFullYear().toString();
                that.GlbCurrView.completeDate1 = month1 + '-' + day1 + '-' + year1;
                const dateObject1 = new Date(year1, month1 - 1, day1);
                var oDatePicker2 = this.currentView.getView().byId("id_datePicker_8");
                // Set the value and disable future dates
                // oDatePicker.setValue(that.completeDate);
                oDatePicker2.setMaxDate(dateObject1);
            },


            handleChangeCreateDateInfo5Util: function (oEvent) {

                that.startDate = oEvent.mParameters.value.substr(0, 10);
                that.endDate = oEvent.mParameters.value.substr(13, 20);


            },

            handleChangeDateInfo5Util: function (oEvent) {

                that.startDate1 = oEvent.mParameters.value.substr(0, 10);
                that.endDate1 = oEvent.mParameters.value.substr(13, 20);


            },







            VisibleColumns_5: function () {


                var sPath = jQuery.sap.getResourcePath("masterdata/model") + "/gcmsInfo5Columns.json";
                var trdPartCols = new JSONModel()
                trdPartCols.loadData(sPath).then(function () {
                    this.currentView.getView().setModel(trdPartCols, "columndataInfo_5");

                    this.currentView.getView().byId("id_showHideColumns5").setSelectedKeys(["sales_company_code",
                        "unified_model_number", "suplier_code", "package_type_code", "price_available_date", "created_on", "changed_on"]);

                }.bind(this));
            },

            // Info 5 Fragment Starts here

            // Info 5 Client Fragment Start
            // onOpenClientFragment_Util_Info5: function (oEvent) {
            //     if (this.currentView.oClient_Info5_Frag) {
            //         this.currentView.oClient_Info5_Frag = undefined;
            //     }
            //     if (!this.currentView.oClient_Info5_Frag) {
            //         that.GlbCurrView.busy.open()
            //         this.currentView.oClient_Info5_Frag = sap.ui.xmlfragment("masterdata.fragments.dialogs.Info_5.client_Info5", that.GlbCurrView);
            //         this.currentView.getView().addDependent(that.GlbCurrView.oClient_Info5_Frag);
            //         var oClientInfo5 = that.GlbCurrView.getView().getModel("globalMainData_Info5").oData
            //         var lookup = {};
            //         var items = oClientInfo5;
            //         var result = [];
            //         for (var item, i = 0; item = items[i++];) {
            //             var name = item.client;
            //             if (!(name in lookup)) {
            //                 lookup[name] = 1;
            //                 result.push({ "client": name });
            //             }
            //         }
            //         var oClientInfo5Model = new JSONModel(result);
            //         this.currentView.getView().setModel(oClientInfo5Model, "ClientInfo5GlobalData")
            //         this.currentView.oClient_Info5_Frag.setModel(oClientInfo5Model, "ClientInfo5Data");

            //     }
            //     that.GlbCurrView.busy.close()
            //     this.currentView.oClient_Info5_Frag.open();

            // },


            // onSelectionClient_Util_Info5: function (oEvent) {
            //     var aContexts = oEvent.getParameter("selectedContexts");
            //     var oMultiInput = this.currentView.getView().byId("id_Info5_Client");
            //     var oSelectedContextClient_Info5 = [];
            //     var oModel = this.currentView.getView().getModel("ClientInfo5GlobalData");
            //     for (var i = 0; i < aContexts.length; i++) {
            //         oSelectedContextClient_Info5.push(aContexts[i]);
            //     }
            //     that.GlbCurrView.oClientInfo5Model = [];
            //     //Check for Unique Data
            //     $.each(oSelectedContextClient_Info5, function (i, el) {
            //         if ($.inArray(oSelectedContextClient_Info5[i].ProductId, that.GlbCurrView.oClientInfo5Model) === -1) that.GlbCurrView.oClientInfo5Model.push(oSelectedContextClient_Info5[i].getObject());
            //     });
            //     oModel.setProperty("/tokens1", that.GlbCurrView.oClientInfo5Model);
            //     var oItemTemplateCC;
            //     oItemTemplateCC = oMultiInput.getTokens()[0];
            //     //Create the Template for token
            //     if (!oItemTemplateCC) {
            //         oItemTemplateCC = new Token({
            //             text: "{client}",
            //             key: "{client}"
            //         });
            //     } else {
            //         oItemTemplateCC = oMultiInput.getTokens()[0].clone();
            //     }
            //     //Bind the tokens
            //     that.GlbCurrView.oClientInfo5Model.forEach(function (item) {
            //         oMultiInput.addToken(new Token({
            //             text: item.client
            //         }));
            //     })
            // },

            // onSearchClient_Util_Info5: function (oEvent) {
            //     var sValue = oEvent.getParameter("value");
            //     var oFilter = new Filter("client", sap.ui.model.FilterOperator.Contains, sValue);
            //     var oBinding = oEvent.getParameter("itemsBinding");
            //     oBinding.filter([oFilter]);
            // },
            // Info 5 Client Fragment End

            // Info 5 sales_company_code Frag Start 

            onOpensales_company_codeFragment_Util_Info5: function (oEvent) {
                if (this.currentView.osales_company_code_Info5_Frag) {
                    this.currentView.osales_company_code_Info5_Frag = undefined;
                }
                if (!this.currentView.osales_company_code_Info5_Frag) {
                    that.GlbCurrView.busy.open()
                    this.currentView.osales_company_code_Info5_Frag = sap.ui.xmlfragment("masterdata.fragments.dialogs.Info_5.sales_company_code_Info5", that.GlbCurrView);
                    this.currentView.getView().addDependent(that.GlbCurrView.osales_company_code_Info5_Frag);
                    var osales_company_codeInfo5 = that.GlbCurrView.getView().getModel("globalMainData_Info5").oData
                    var lookup = {};
                    var items = osales_company_codeInfo5;
                    var result = [];
                    for (var item, i = 0; item = items[i++];) {
                        var name = item.sales_company_code;
                        if (!(name in lookup)) {
                            lookup[name] = 1;
                            result.push({ "sales_company_code": name });
                        }
                    }
                    var osales_company_codeInfo5Model = new JSONModel(result);
                    this.currentView.getView().setModel(osales_company_codeInfo5Model, "sales_company_codeInfo5GlobalData")
                    this.currentView.osales_company_code_Info5_Frag.setModel(osales_company_codeInfo5Model, "sales_company_codeInfo5Data");

                }
                that.GlbCurrView.busy.close()
                this.currentView.osales_company_code_Info5_Frag.open();

            },


            onSelectionsales_company_code_Util_Info5: function (oEvent) {
                var aContexts = oEvent.getParameter("selectedContexts");
                var oMultiInput = this.currentView.getView().byId("id_Info5_SalesCompanyCode");
                var oSelectedContextSales_Company_Code_Info5 = [];
                var oModel = this.currentView.getView().getModel("sales_company_codeInfo5GlobalData");
                for (var i = 0; i < aContexts.length; i++) {
                    oSelectedContextSales_Company_Code_Info5.push(aContexts[i]);
                }
                that.GlbCurrView.osales_company_codeInfo5Model = [];
                //Check for Unique Data
                // $.each(oSelectedContextSales_Company_Code_Info5, function (i, el) {
                //     if ($.inArray(oSelectedContextSales_Company_Code_Info5[i].ProductId, that.GlbCurrView.osales_company_codeInfo5Model) === -1) that.GlbCurrView.osales_company_codeInfo5Model.push(oSelectedContextSales_Company_Code_Info5[i].getObject());
                // });

                //03-04-24 SAP Recommendation for slow loops @gnaneshwar.
                $.each(oSelectedContextSales_Company_Code_Info5, function (i, el) {
                    if ($.inArray(el.ProductId, that.GlbCurrView.osales_company_codeInfo5Model) === -1) that.GlbCurrView.osales_company_codeInfo5Model.push(el.getObject());
                });
                oModel.setProperty("/tokens1", that.GlbCurrView.osales_company_codeInfo5Model);
                var oItemTemplateCC;
                oItemTemplateCC = oMultiInput.getTokens()[0];
                //Create the Template for token
                if (!oItemTemplateCC) {
                    oItemTemplateCC = new Token({
                        text: "{sales_company_code}",
                        key: "{sales_company_code}"
                    });
                } else {
                    oItemTemplateCC = oMultiInput.getTokens()[0].clone();
                }
                //Bind the tokens
                that.GlbCurrView.osales_company_codeInfo5Model.forEach(function (item) {
                    oMultiInput.addToken(new Token({
                        text: item.sales_company_code
                    }));
                })
            },

            onSearchsales_company_code_Util_Info5: function (oEvent) {
                var sValue = oEvent.getParameter("value");
                var oFilter = new Filter("sales_company_code", sap.ui.model.FilterOperator.Contains, sValue);
                var oBinding = oEvent.getParameter("itemsBinding");
                oBinding.filter([oFilter]);
            },
            // Info 5 sales_company_code Frag End



            // Info 5 unified model number frag start

            onOpenunified_model_numberFragment_Util_Info5: function (oEvent) {
                if (this.currentView.ounified_model_number_Info5_Frag) {
                    this.currentView.ounified_model_number_Info5_Frag = undefined;
                }
                if (!this.currentView.ounified_model_number_Info5_Frag) {
                    that.GlbCurrView.busy.open()
                    this.currentView.ounified_model_number_Info5_Frag = sap.ui.xmlfragment("masterdata.fragments.dialogs.Info_5.unified_model_number_Info5", that.GlbCurrView);
                    this.currentView.getView().addDependent(that.GlbCurrView.ounified_model_number_Info5_Frag);
                    var ounified_model_numberInfo5 = that.GlbCurrView.getView().getModel("globalMainData_Info5").oData
                    var lookup = {};
                    var items = ounified_model_numberInfo5;
                    var result = [];
                    for (var item, i = 0; item = items[i++];) {
                        var name = item.unified_model_number;
                        if (!(name in lookup)) {
                            lookup[name] = 1;
                            result.push({ "unified_model_number": name });
                        }
                    }
                    var ounified_model_numberInfo5Model = new JSONModel(result);
                    this.currentView.getView().setModel(ounified_model_numberInfo5Model, "unified_model_numberInfo5GlobalData")
                    this.currentView.ounified_model_number_Info5_Frag.setModel(ounified_model_numberInfo5Model, "unified_model_numberInfo5Data");

                }
                that.GlbCurrView.busy.close()
                this.currentView.ounified_model_number_Info5_Frag.open();

            },


            onSelectionunified_model_number_Util_Info5: function (oEvent) {
                var aContexts = oEvent.getParameter("selectedContexts");
                var oMultiInput = this.currentView.getView().byId("id_Info5_unified_model_number");
                var oSelectedContextunified_model_number_Info5 = [];
                var oModel = this.currentView.getView().getModel("unified_model_numberInfo5GlobalData");
                for (var i = 0; i < aContexts.length; i++) {
                    oSelectedContextunified_model_number_Info5.push(aContexts[i]);
                }
                that.GlbCurrView.ounified_model_numberInfo5Model = [];
                //Check for Unique Data
                // $.each(oSelectedContextunified_model_number_Info5, function (i, el) {
                //     if ($.inArray(oSelectedContextunified_model_number_Info5[i].ProductId, that.GlbCurrView.ounified_model_numberInfo5Model) === -1) that.GlbCurrView.ounified_model_numberInfo5Model.push(oSelectedContextunified_model_number_Info5[i].getObject());
                // });

                //03-04-24 SAP Recommendation for slow loops @gnaneshwar.
                $.each(oSelectedContextunified_model_number_Info5, function (i, el) {
                    if ($.inArray(el.ProductId, that.GlbCurrView.ounified_model_numberInfo5Model) === -1) that.GlbCurrView.ounified_model_numberInfo5Model.push(el.getObject());
                });
                oModel.setProperty("/tokens1", that.GlbCurrView.ounified_model_numberInfo5Model);
                var oItemTemplateCC;
                oItemTemplateCC = oMultiInput.getTokens()[0];
                //Create the Template for token
                if (!oItemTemplateCC) {
                    oItemTemplateCC = new Token({
                        text: "{unified_model_number}",
                        key: "{unified_model_number}"
                    });
                } else {
                    oItemTemplateCC = oMultiInput.getTokens()[0].clone();
                }
                //Bind the tokens
                that.GlbCurrView.ounified_model_numberInfo5Model.forEach(function (item) {
                    oMultiInput.addToken(new Token({
                        text: item.unified_model_number
                    }));
                })
            },

            onSearchunified_model_number_Util_Info5: function (oEvent) {
                var sValue = oEvent.getParameter("value");
                var oFilter = new Filter("unified_model_number", sap.ui.model.FilterOperator.Contains, sValue);
                var oBinding = oEvent.getParameter("itemsBinding");
                oBinding.filter([oFilter]);
            },

            // Info 5 unified model number frag End


            // Info 5 suplier_code Frag Start

            onOpensuplier_codeFragment_Util_Info5: function (oEvent) {
                if (this.currentView.osuplier_code_Info5_Frag) {
                    this.currentView.osuplier_code_Info5_Frag = undefined;
                }
                if (!this.currentView.osuplier_code_Info5_Frag) {
                    that.GlbCurrView.busy.open()
                    this.currentView.osuplier_code_Info5_Frag = sap.ui.xmlfragment("masterdata.fragments.dialogs.Info_5.suplier_code_Info5", that.GlbCurrView);
                    this.currentView.getView().addDependent(that.GlbCurrView.osuplier_code_Info5_Frag);
                    var osuplier_codeInfo5 = that.GlbCurrView.getView().getModel("globalMainData_Info5").oData
                    var lookup = {};
                    var items = osuplier_codeInfo5;
                    var result = [];
                    for (var item, i = 0; item = items[i++];) {
                        var name = item.suplier_code;
                        if (!(name in lookup)) {
                            lookup[name] = 1;
                            result.push({ "suplier_code": name });
                        }
                    }
                    var osuplier_codeInfo5Model = new JSONModel(result);
                    this.currentView.getView().setModel(osuplier_codeInfo5Model, "suplier_codeInfo5GlobalData")
                    this.currentView.osuplier_code_Info5_Frag.setModel(osuplier_codeInfo5Model, "suplier_codeInfo5Data");

                }
                that.GlbCurrView.busy.close()
                this.currentView.osuplier_code_Info5_Frag.open();

            },


            onSelectionsuplier_code_Util_Info5: function (oEvent) {
                var aContexts = oEvent.getParameter("selectedContexts");
                var oMultiInput = this.currentView.getView().byId("id_Info5_suplier_code");
                var oSelectedContextsuplier_code_Info5 = [];
                var oModel = this.currentView.getView().getModel("suplier_codeInfo5GlobalData");
                for (var i = 0; i < aContexts.length; i++) {
                    oSelectedContextsuplier_code_Info5.push(aContexts[i]);
                }
                that.GlbCurrView.osuplier_codeInfo5Model = [];
                //Check for Unique Data
                // $.each(oSelectedContextsuplier_code_Info5, function (i, el) {
                //     if ($.inArray(oSelectedContextsuplier_code_Info5[i].ProductId, that.GlbCurrView.osuplier_codeInfo5Model) === -1) that.GlbCurrView.osuplier_codeInfo5Model.push(oSelectedContextsuplier_code_Info5[i].getObject());
                // });

                //03-04-24 SAP Recommendation for slow loops @gnaneshwar.
                $.each(oSelectedContextsuplier_code_Info5, function (i, el) {
                    if ($.inArray(el.ProductId, that.GlbCurrView.osuplier_codeInfo5Model) === -1) that.GlbCurrView.osuplier_codeInfo5Model.push(el.getObject());
                });
                oModel.setProperty("/tokens1", that.GlbCurrView.osuplier_codeInfo5Model);
                var oItemTemplateCC;
                oItemTemplateCC = oMultiInput.getTokens()[0];
                //Create the Template for token
                if (!oItemTemplateCC) {
                    oItemTemplateCC = new Token({
                        text: "{suplier_code}",
                        key: "{suplier_code}"
                    });
                } else {
                    oItemTemplateCC = oMultiInput.getTokens()[0].clone();
                }
                //Bind the tokens
                that.GlbCurrView.osuplier_codeInfo5Model.forEach(function (item) {
                    oMultiInput.addToken(new Token({
                        text: item.suplier_code
                    }));
                })
            },

            onSearchsuplier_code_Util_Info5: function (oEvent) {
                var sValue = oEvent.getParameter("value");
                var oFilter = new Filter("suplier_code", sap.ui.model.FilterOperator.Contains, sValue);
                var oBinding = oEvent.getParameter("itemsBinding");
                oBinding.filter([oFilter]);
            },


            onCloseDialog_Util_Info5: function (oEvent) {

                // if (that.GlbCurrView.oClient_Info5_Frag) {
                //     // that.GlbCurrView.oClient_Info5_Frag.close()
                //     // that.GlbCurrView.oClient_Info5_Frag.destroy()
                //     // delete that.GlbCurrView.oClient_Info5_Frag;
                //      that.GlbCurrView.oClient_Info5_Frag = undefined;
                //      that.GlbCurrView.oClient_Info5_Frag = null

                //  }


                if (that.GlbCurrView.osales_company_code_Info5_Frag) {
                    //that.GlbCurrView.osales_company_code_Info5_Frag.close()
                    //that.GlbCurrView.osales_company_code_Info5_Frag.destroy()
                    //delete that.GlbCurrView.osales_company_code_Info5_Frag;
                    that.GlbCurrView.osales_company_code_Info5_Frag = undefined;
                    that.GlbCurrView.osales_company_code_Info5_Frag = null;

                }


                if (that.GlbCurrView.ounified_model_number_Info5_Frag) {
                    //   that.GlbCurrView.ounified_model_number_Info5_Frag.close()
                    //   that.GlbCurrView.ounified_model_number_Info5_Frag.destroy()
                    //  delete that.GlbCurrView.ounified_model_number_Info5_Frag;
                    that.GlbCurrView.ounified_model_number_Info5_Frag = undefined;
                    that.GlbCurrView.ounified_model_number_Info5_Frag = null;

                }
                if (that.GlbCurrView.osuplier_code_Info5_Frag) {
                    //  that.GlbCurrView.osuplier_code_Info5_Frag.close()
                    // that.GlbCurrView.osuplier_code_Info5_Frag.destroy()
                    // delete that.GlbCurrView.osuplier_code_Info5_Frag;
                    that.GlbCurrView.osuplier_code_Info5_Frag = undefined;
                    that.GlbCurrView.osuplier_code_Info5_Frag = null;

                }


            },

            // Info 5 suplier_code Frag End
            on5Export: function (oEvent) {
                var oselectedModel = new sap.ui.model.json.JSONModel(that.GlbCurrView.getView().getModel("Info_5_Model").oData);

                var aCols = [
                    { label: "Sales Company Code", property: "sales_company_code" },
                    { label: "Unified Model Number", property: "unified_model_number" },
                    { label: "Supplier Code", property: "supplier_code" },
                    { label: "Package Type Code", property: "package_type_code" },
                    { label: "Price Available Date", property: "price_available_date" },
                    { label: "Price Validity Date", property: "price_validity_date" },
                    { label: "End User Code", property: "end_user_code" },
                    { label: "Sales Trade Term Code", property: "sales_trade_term_code" },
                    { label: "Sales Term Rate Id", property: "sales_term_rate_id" },
                    { label: "Sales Currency Code", property: "sales_currency_code" },
                    { label: "Quantity Per Package", property: "quantity_per_package" },
                    { label: "Quantity Per Package Per Decimal", property: "quantity_per_package_per_decimal" },
                    { label: "Net Weight", property: "net_weight" },
                    { label: "Gross Weight", property: "gross_weight" },
                    { label: "Measurement", property: "measurement" },
                    { label: "Width", property: "width" },
                    { label: "Depth", property: "depth" },
                    { label: "Height", property: "height" },
                    { label: "Payer Code", property: "payer_code" },
                    { label: "Sales Unit Price Basis", property: "sales_unit_price_basis" },
                    { label: "Sales Unit Price Basis Dec", property: "sales_unit_price_basis_dec" },
                    { label: "Sales Unit Price Unit Code", property: "sales_unit_price_unit_code" },
                    { label: "Sales Unit Price", property: "sales_unit_price" },
                    { label: "Sales Unit Price Exchange Rate", property: "sales_unit_price_exchange_rate" },
                    { label: "Price Available Date 2", property: "price_available_date_2" },
                    { label: "Price Validity Date 2", property: "price_validity_date_2" },
                    { label: "Sales Unit Price 2", property: "sales_unit_price_2" },
                    { label: "Sales Unit Price Exchange Rate 2", property: "sales_unit_price_exchange_rate_2" },
                    { label: "Tent Price Mark 1", property: "tent_price_mark_1" },
                    { label: "Tent Price Mark 2", property: "tent_price_mark_2" },
                    { label: "Route", property: "route" },
                    { label: "Plu Supplier Perm Id", property: "plu_supplier_perm_id" },
                    { label: "Filler", property: "filler" },
                    { label: "Revised Flag", property: "revised_flag" },
                    { label: "Filler 2", property: "filler_2" },
                    { label: "Delete Indicator", property: "delete_indicator" },
                    { label: "Created On", property: "created_on" },
                    { label: "Changed On", property: "changed_on" },
                    { label: "Change Time", property: "change_time" },
                    { label: "Actual Message Issued Date", property: "actual_message_issued_date" }
                ];

                var oSettings = {
                    workbook: { columns: aCols ,
                        context: {
                            sheetName: 'GCMS_INFO_5'
                        },
                    },
                    dataSource: oselectedModel.getData(),
                    fileName: "GCMS_INFO_5.xlsx",

                };

                var oSpreadsheet = new sap.ui.export.Spreadsheet(oSettings);
                oSpreadsheet.build().then(function () {
                    oSpreadsheet.destroy();
                });
            },


            //                 on5Export: function (oEvent) {

            //   //  var selectedITemsLength = this.currentView.getView().byId("idTrdPartTable").getSelectedItems().length


            //         var oselectedModel = new sap.ui.model.json.JSONModel(that.GlbCurrView.getView().getModel("Info_5_Model").oData)


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
            //             name: "Sales Company Code",
            //             template: {
            //                 content: "{sales_company_code}"
            //             }
            //         }, {
            //             name: "Unified Model Number",
            //             template: {
            //                 content: "{unified_model_number}"
            //             }
            //         }, {
            //             name: "Suplier Code",
            //             template: {
            //                 content: "{suplier_code}"
            //             }
            //         }, {
            //             name: "Package Type Code",
            //             template: {
            //                 content: "{package_type_code}"
            //             }
            //         }, {
            //             name: "Price Available Date",
            //             template: {
            //                 content: "{price_available_date}"
            //             }
            //         }, {
            //             name: "Price Validity Date",
            //             template: {
            //                 content: "{price_validity_date}"
            //             }
            //         }, {
            //             name: "End User Code",
            //             template: {
            //                 content: "{end_user_code}"
            //             }
            //         }, {
            //             name: "Sales Trade Term Code",
            //             template: {
            //                 content: "{sales_trade_term_code}"
            //             }
            //         }, {
            //             name: "Sales Term Rate Id",
            //             template: {
            //                 content: "{sales_term_rate_id}"
            //             }
            //         }, {
            //             name: "Sales Currency Code",
            //             template: {
            //                 content: "{sales_currency_code}"
            //             }
            //         }, {
            //             name: "Quantity Per Package",
            //             template: {
            //                 content: "{quantity_per_package}"
            //             }
            //         }, {
            //             name: "Quantity Per Package Per Decimal",
            //             template: {
            //                 content: "{quantity_per_package_per_decimal}"
            //             }
            //         },{
            //             name: "Net Weight",
            //             template: {
            //                 content: "{net_weight}"
            //             }
            //         }, {
            //             name: "Gross Weight",
            //             template: {
            //                 content: "{gross_weight}"
            //             }
            //         }, {
            //             name: "Measurement",
            //             template: {
            //                 content: "{measurement}"
            //             }
            //         }, {
            //             name: "Width",
            //             template: {
            //                 content: "{width}"
            //             }
            //         }, {
            //             name: "Depth",
            //             template: {
            //                 content: "{depth}"
            //             }
            //         }, {
            //             name: "Height",
            //             template: {
            //                 content: "{height}"
            //             }
            //         }, {
            //             name: "Payer Code",
            //             template: {
            //                 content: "{payer_code}"
            //             }
            //         }, {
            //             name: "Sales Unit Price Basis",
            //             template: {
            //                 content: "{sales_unit_price_basis}"
            //             }
            //         }, {
            //             name: "Sales Unit Price Basis Dec",
            //             template: {
            //                 content: "{sales_unit_price_basis_dec}"
            //             }
            //         }, {
            //             name: "Sales Unit Price Unit Code",
            //             template: {
            //                 content: "{sales_unit_price_unit_code}"
            //             }
            //         }, {
            //             name: "Sales Unit Price",
            //             template: {
            //                 content: "{sales_unit_price}"
            //             }
            //         }, {
            //             name: "Sales Unit Price Exchange Rate",
            //             template: {
            //                 content: "{sales_unit_price_exchange_rate}"
            //             }
            //         }, {
            //             name: "Price Available Date 2",
            //             template: {
            //                 content: "{price_available_date_2}"
            //             }
            //         }, {
            //             name: "Price Validity Date 2",
            //             template: {
            //                 content: "{price_validity_date_2}"
            //             }
            //         }, {
            //             name: "Sales Unit Price 2",
            //             template: {
            //                 content: "{sales_unit_price_2}"
            //             }
            //         }, {
            //             name: "Sales Unit Price Exchange Rate 2",
            //             template: {
            //                 content: "{sales_unit_price_exchange_rate_2}"
            //             }
            //         }, {
            //             name: "Tent Price Mark 1",
            //             template: {
            //                 content: "{tent_price_mark_1}"
            //             }
            //         }, {
            //             name: "Tent Price Mark 2",
            //             template: {
            //                 content: "{tent_price_mark_2}"
            //             }
            //         }, {
            //             name: "Route",
            //             template: {
            //                 content: "{route}"
            //             }
            //         }, {
            //             name: "Plu Supplier Perm Id",
            //             template: {
            //                 content: "{plu_supplier_perm_id}"
            //             }
            //         }, {
            //             name: "Filler",
            //             template: {
            //                 content: "{filler}"
            //             }
            //         }, {
            //             name: "Revised Flag",
            //             template: {
            //                 content: "{revised_flag}"
            //             }
            //         }, {
            //             name: "Filler 2",
            //             template: {
            //                 content: "{filler_2}"
            //             }
            //          }, {
            //             name: "Delete Indicator",
            //             template: {
            //                 content: "{delete_indicator}"
            //             }
            //         }, {
            //             name: "Created on",
            //             template: {
            //                 content: "{created_on}"
            //             }
            //         }, {
            //             name: "Changed On",
            //             template: {
            //                 content: "{changed_on}"
            //             }
            //         }, {
            //             name: "Change Time",
            //             template: {
            //                 content: "{change_time}"
            //             }
            //         }, {
            //             name: "Actual Message Issued Date",
            //             template: {
            //                 content: "{actual_message_issued_date}"
            //             }
            //         }]

            //     });

            //     //* download exported file

            //     oExport.saveFile("GCMS INFO 5").always(function () {

            //         this.destroy();

            //     });
            // },

            onGoToReport_Util_Info5: function () {
                that.GlbCurrView.busy.open()

                // get all plant tokens

                // var Info5_Client_Tokens = this.currentView.getView().byId("id_Info5_Client").getTokens();
                // that.GlbCurrView.sInfo5_ClientValues = Info5_Client_Tokens.map(function (oToken) {
                //     return oToken.getText();
                // }).join(",");


                // get all material group tokens
                var Info5_SalesCompanyCode_Tokens = this.currentView.getView().byId("id_Info5_SalesCompanyCode").getTokens();
                that.GlbCurrView.sInfo5_SalesCompanyCode_TokensValues = Info5_SalesCompanyCode_Tokens.map(function (oToken) {
                    return oToken.getText();
                }).join(",");

                var Info5_unified_model_number_Tokens = this.currentView.getView().byId("id_Info5_unified_model_number").getTokens();
                that.GlbCurrView.sInfo5_unified_model_number_TokensValues = Info5_unified_model_number_Tokens.map(function (oToken) {
                    return oToken.getText();
                }).join(",");

                var Info5_suplier_code_Tokens = this.currentView.getView().byId("id_Info5_suplier_code").getTokens();
                that.GlbCurrView.sInfo5_suplier_code_TokensValues = Info5_suplier_code_Tokens.map(function (oToken) {
                    return oToken.getText();
                }).join(",");


                var filters = [];

                // if (that.GlbCurrView.sInfo5_factory_code_TokensValues !== "") {

                //     var Info5_factory_codeVal = that.GlbCurrView.sInfo5_factory_code_TokensValues.split(",");
                //     if (Info5_factory_codeVal.length > 0) {
                //         $.each(Info5_factory_codeVal, function (i, UIitem) {
                //             filters.push(new sap.ui.model.Filter("factory_code", sap.ui.model.FilterOperator.Contains, UIitem));
                //         });
                //     };
                // }

                if (that.GlbCurrView.sInfo5_suplier_code_TokensValues !== "") {

                    var Info5_suplier_codeVal = that.GlbCurrView.sInfo5_suplier_code_TokensValues.split(",");
                    if (Info5_suplier_codeVal.length > 0) {
                        $.each(Info5_suplier_codeVal, function (i, UIitem) {
                            filters.push(new sap.ui.model.Filter("suplier_code", sap.ui.model.FilterOperator.Contains, UIitem));
                        });
                    };
                }

                if (that.GlbCurrView.sInfo5_unified_model_number_TokensValues !== "") {

                    var Info5_unified_model_numberVal = that.GlbCurrView.sInfo5_unified_model_number_TokensValues.split(",");
                    if (Info5_unified_model_numberVal.length > 0) {
                        $.each(Info5_unified_model_numberVal, function (i, UIitem) {
                            filters.push(new sap.ui.model.Filter("unified_model_number", sap.ui.model.FilterOperator.Contains, UIitem));
                        });
                    };
                }

                // if (that.GlbCurrView.sInfo5_ClientValues !== "") {

                //     var Info5_ClientVal = that.GlbCurrView.sInfo5_ClientValues.split(",");
                //     if (Info5_ClientVal.length > 0) {
                //         $.each(Info5_ClientVal, function (i, UIitem) {
                //             filters.push(new sap.ui.model.Filter("client", sap.ui.model.FilterOperator.Contains, UIitem));
                //         });
                //     };
                // }



                if (that.GlbCurrView.sInfo5_SalesCompanyCode_TokensValues !== "") {

                    var Info5_SalesCCVal = that.GlbCurrView.sInfo5_SalesCompanyCode_TokensValues.split(",");
                    if (Info5_SalesCCVal.length > 0) {
                        $.each(Info5_SalesCCVal, function (i, UIitem) {
                            filters.push(new sap.ui.model.Filter("sales_company_code", sap.ui.model.FilterOperator.Contains, UIitem));
                        });
                    };
                }

                if ((that.startDate !== "" && that.endDate !== "") || (that.startDate !== undefined && that.endDate !== undefined)) {

                    var startDate = that.startDate;
                    var endDate = that.endDate;

                    if (startDate) {
                        filters.push(new sap.ui.model.Filter("created_on", sap.ui.model.FilterOperator.BT, startDate, endDate));

                    };
                }

                if ((that.startDate1 !== "" && that.endDate1 !== "") || (that.startDate1 !== undefined && that.endDate1 !== undefined)) {

                    var startDate1 = that.startDate1;
                    var endDate1 = that.endDate1;

                    if (startDate1) {
                        filters.push(new sap.ui.model.Filter("changed_on", sap.ui.model.FilterOperator.BT, startDate1, endDate1));

                    };
                }


                // if (that.GlbCurrView.sInfo5_issued_date_TokensValues !== "") {

                //     var Info5_issued_dateVal = that.GlbCurrView.sInfo5_issued_date_TokensValues.split(",");
                //     if (Info5_issued_dateVal.length > 0) {
                //         $.each(Info5_issued_dateVal, function (i, UIitem) {
                //             filters.push(new sap.ui.model.Filter("issued_date", sap.ui.model.FilterOperator.Contains, UIitem));
                //         });
                //     };
                // }



                that.GlbCurrView.tableMainModelfiltereddata = undefined
                that.GlbCurrView.tableMainModelfiltereddata = new JSONModel(that.GlbCurrView.getView().getModel("globalMainData_Info5").oData);
                that.GlbCurrView.getView().setModel(that.GlbCurrView.tableMainModelfiltereddata, "Info_5_Model")
                //  this.getDefaultFilteredDateData();
                this.currentView.getView().byId("idInfo_5_Table").getBinding("items").filter(filters);
                that.GlbCurrView.filteredData = true;
                that.GlbCurrView.filteredDataToExport = []
                var selectedITemsLength = this.currentView.getView().byId("idInfo_5_Table").getBinding("items").aIndices.length
                that.GlbCurrView.filteredIndices = this.currentView.getView().byId("idInfo_5_Table").getBinding("items").aIndices
                for (var i = 0; i < selectedITemsLength; i++) {

                    that.GlbCurrView.filteredDataToExport.push(that.GlbCurrView.tableMainModelfiltereddata.oData[that.GlbCurrView.filteredIndices[i]]);
                }
                var tableFilteredModel = new JSONModel(that.GlbCurrView.filteredDataToExport)
                that.GlbCurrView.getView().setModel(tableFilteredModel, "Info_5_Model")

                that.GlbCurrView.busy.close()

            },


            handleInfo_5_SortButtonPressedUtil: function (oEvent) {

                if (this.currentView.oInfo_5_SortFrag) {
                    this.currentView.oInfo_5_SortFrag = undefined;
                }
                if (!this.currentView.oInfo_5_SortFrag) {
                    that.GlbCurrView.busy.open()
                    this.currentView.oInfo_5_SortFrag = sap.ui.xmlfragment("masterdata.fragments.dialogs.Info_5.ascAndDscSort_Info5", that);
                    this.currentView.getView().addDependent(that.GlbCurrView.oInfo_5_SortFrag);

                }
                that.GlbCurrView.busy.close()
                this.currentView.oInfo_5_SortFrag.open();
            },

            // handle sort
            Info_5_handleSortDialogConfirmUtil: function (oEvent) {

                var oTable = this.currentView.byId("idInfo_5_Table"),
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



            onClear5Util: function (oEvent) {
                //  this.currentView.getView().byId("id_datePickerTrdPart").setValue("");                

                //this.currentView.getView().byId("id_Info5_Client").setTokens([]);
                this.currentView.getView().byId("id_Info5_SalesCompanyCode").setTokens([]);
                this.currentView.getView().byId("id_Info5_unified_model_number").setTokens([]);
                this.currentView.getView().byId("id_Info5_suplier_code").setTokens([]);
                this.currentView.getView().byId("id_datePicker_7").setValue("");
                this.currentView.getView().byId("id_datePicker_8").setValue("");
                var tableModel4 = new sap.ui.model.json.JSONModel();
                that.getView().setModel(tableModel4, "Info_5_Model")
                that.GlbCurrView.completeDate = ""
                that.GlbCurrView.completeDate1 = ""
                //that.statusKey = ""
                //that.indicatorKey = ""
                that.startDate = ""
                that.endDate = ""
                that.startDate1 = ""
                that.endDate1 = ""

            },

        }
    }
);