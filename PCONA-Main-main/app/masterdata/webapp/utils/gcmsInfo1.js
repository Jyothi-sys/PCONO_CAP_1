var that;
var thisInfo1;
var thatInfo1;
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
    function (JSONModel,  MessageToast, MessageBox, Export, ExportTypeCSV,Spreadsheet,BusyDialog,Filter,FilterOperator,Fragment,Token,Sorter ) {
        "use strict";
        that = this;
        return {

            storeView_1 : function(oCurrentView,oGlbCurrView){
                   thisInfo1 = oCurrentView;
                   thatInfo1 = oGlbCurrView
                    this.currentView = oCurrentView;
                    that.GlbCurrView = oGlbCurrView;
                    that.GlbCurrView.busy = new BusyDialog();
            },
              
       


            handle1SelectionChange: function(oEvent){
                    
                    var oItem = oEvent.getParameter("changedItem"),
                    bSelected = oEvent.getParameter("selected"),
                    oContext = oItem.getBindingContext("columndataInfo_1");
                    oContext.oModel.setProperty(oContext.sPath+"/visible",bSelected)
                    oContext.oModel.refresh(true);
                
            },

            onRead_1TableData : function(){
                
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
                oModel1.read("/zmm_m12_info_1",
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
                      for (var i=0;i<oData.results.length;i++){
                        oData.results[i].changed_on = oDateFormat.format(oData.results[i].changed_on);
                        oData.results[i].created_on = oDateFormat.format(oData.results[i].created_on);
                        oData.results[i].change_time = new Date(oData.results[i].change_time.ms).toISOString().slice(11, 19)
                       // oData.results[i].created_time = new Date(oData.results[i].created_time.ms).toISOString().slice(11, 19)
                      }
                        that.GlbCurrView.getView().setModel(new sap.ui.model.json.JSONModel(oData.results), "globalMainData_Info1")
                        that.GlbCurrView.getView().setModel(new sap.ui.model.json.JSONModel(oData.results), "Info1_Model") 
                        }
                        else{
                            that.getView().setModel([], "globalMainData_Info1");
                              
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
                var oDatePicker1 = this.currentView.getView().byId("id_datePicker_5");
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
                var oDatePicker2 = this.currentView.getView().byId("id_datePicker_6");
                // Set the value and disable future dates
               // oDatePicker.setValue(that.completeDate);
                oDatePicker2.setMaxDate(dateObject1);
            },


            handleChangeCreateDateInfo1Util : function(oEvent){

                that.startDate = oEvent.mParameters.value.substr(0,10);
                that.endDate = oEvent.mParameters.value.substr(13,20);  


            },

            handleChangeDateInfo1Util : function(oEvent){

                that.startDate1 = oEvent.mParameters.value.substr(0,10);
                that.endDate1 = oEvent.mParameters.value.substr(13,20);  


            },




            VisibleColumns_1: function () {
              
              //  var trdPartCols = new JSONModel("model/gcmsInfo1Columns.json")
                var sPath =  jQuery.sap.getResourcePath("masterdata/model")+"/gcmsInfo1Columns.json";
                var trdPartCols = new JSONModel();
                trdPartCols.loadData(sPath).then(function(){

                this.currentView.getView().setModel(trdPartCols,"columndataInfo_1");

                            // this.currentView.getView().byId("columndataInfo_1").setSelectedKeys(["reply_id",
                            // "sales_company_code","issued_date","unified_model_number","suplier_code","created_on","changed_on"]);
                            //changed by Preethi on 17-11-2023
                            this.currentView.getView().byId("columndataInfo_1").setSelectedKeys(["sales_company_code","unified_model_number","suplier_code","min_accept_quantity_unit_code","upc","created_on"]);
                
                        }.bind(this));  },



// INFO_1 Fragment open starts here

// client Frag Start
                            // onOpenClientFragment_Util_Info1: function (oEvent) {
                            //     if (this.currentView.oClient_Info1_Frag) {
                            //         this.currentView.oClient_Info1_Frag = undefined;
                            //     }
                            //     if (!this.currentView.oClient_Info1_Frag) {
                            //         that.GlbCurrView.busy.open()
                            //         this.currentView.oClient_Info1_Frag = sap.ui.xmlfragment("masterdata.fragments.dialogs.Info_1.client_Info1", that.GlbCurrView);
                            //         this.currentView.getView().addDependent(that.GlbCurrView.oClient_Info1_Frag);
                            //         var oClientInfo1 = that.GlbCurrView.getView().getModel("globalMainData_Info1").oData
                            //         var lookup = {};
                            //         var items = oClientInfo1;
                            //         var result = [];
                            //         for (var item, i = 0; item = items[i++];) {
                            //             var name = item.client;
                            //             if (!(name in lookup)) {
                            //                 lookup[name] = 1;
                            //                 result.push({ "client": name });
                            //             }
                            //         }
                            //         var oClientInfo1Model = new JSONModel(result);
                            //         this.currentView.getView().setModel(oClientInfo1Model, "ClientInfo1GlobalData")
                            //         this.currentView.oClient_Info1_Frag.setModel(oClientInfo1Model, "ClientInfo1Data");
                    
                            //     }
                            //     that.GlbCurrView.busy.close()
                            //     this.currentView.oClient_Info1_Frag.open();
                    
                            // },


                            // onSelectionClient_Util_Info1: function (oEvent) {
                            //     var aContexts = oEvent.getParameter("selectedContexts");
                            //     var oMultiInput = this.currentView.getView().byId("id_Info1_Client");
                            //     var oSelectedContextClient_Info1 = [];
                            //     var oModel = this.currentView.getView().getModel("ClientInfo1GlobalData");
                            //     for (var i = 0; i < aContexts.length; i++) {
                            //         oSelectedContextClient_Info1.push(aContexts[i]);
                            //     }
                            //     that.GlbCurrView.oClientInfo1Model = [];
                            //     //Check for Unique Data
                            //     $.each(oSelectedContextClient_Info1, function (i, el) {
                            //         if ($.inArray(oSelectedContextClient_Info1[i].ProductId, that.GlbCurrView.oClientInfo1Model) === -1) that.GlbCurrView.oClientInfo1Model.push(oSelectedContextClient_Info1[i].getObject());
                            //     });
                            //     oModel.setProperty("/tokens1", that.GlbCurrView.oClientInfo1Model);
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
                            //     that.GlbCurrView.oClientInfo1Model.forEach(function (item) {
                            //         oMultiInput.addToken(new Token({
                            //             text: item.client
                            //         }));
                            //     })
                            // },
                    
                            // onSearchClient_Util_Info1: function (oEvent) {
                            //     var sValue = oEvent.getParameter("value");
                            //     var oFilter = new Filter("client", sap.ui.model.FilterOperator.Contains, sValue);
                            //     var oBinding = oEvent.getParameter("itemsBinding");
                            //     oBinding.filter([oFilter]);
                            // },


                          

// client Frag End



// Reply Id Frag Start
onOpenreply_idFragment_Util_Info1: function (oEvent) {
    if (this.currentView.oreply_id_Info1_Frag) {
        this.currentView.oreply_id_Info1_Frag = undefined;
    }
    if (!this.currentView.oreply_id_Info1_Frag) {
        that.GlbCurrView.busy.open()
        this.currentView.oreply_id_Info1_Frag = sap.ui.xmlfragment("masterdata.fragments.dialogs.Info_1.replyId_Info1", that.GlbCurrView);
        this.currentView.getView().addDependent(that.GlbCurrView.oreply_id_Info1_Frag);
        var oreply_idInfo1 = that.GlbCurrView.getView().getModel("globalMainData_Info1").oData
        var lookup = {};
        var items = oreply_idInfo1;
        var result = [];
        for (var item, i = 0; item = items[i++];) {
            var name = item.reply_id;
            if (!(name in lookup)) {
                lookup[name] = 1;
                result.push({ "reply_id": name });
            }
        }
        var oreply_idInfo1Model = new JSONModel(result);
        this.currentView.getView().setModel(oreply_idInfo1Model, "reply_idInfo1GlobalData")
        this.currentView.oreply_id_Info1_Frag.setModel(oreply_idInfo1Model, "reply_idInfo1Data");

    }
    that.GlbCurrView.busy.close()
    this.currentView.oreply_id_Info1_Frag.open();

},


onSelectionreply_id_Util_Info1: function (oEvent) {
    var aContexts = oEvent.getParameter("selectedContexts");
    var oMultiInput = this.currentView.getView().byId("id_Info1_ReplyId");
    var oSelectedContextReplyId_Info1 = [];
    var oModel = this.currentView.getView().getModel("reply_idInfo1GlobalData");
    for (var i = 0; i < aContexts.length; i++) {
        oSelectedContextReplyId_Info1.push(aContexts[i]);
    }
    that.GlbCurrView.oreply_idInfo1Model = [];
    //Check for Unique Data
    // $.each(oSelectedContextReplyId_Info1, function (i, el) {
    //     if ($.inArray(oSelectedContextReplyId_Info1[i].ProductId, that.GlbCurrView.oreply_idInfo1Model) === -1) that.GlbCurrView.oreply_idInfo1Model.push(oSelectedContextReplyId_Info1[i].getObject());
    // });

    //03-04-24 SAP Recommendation for slow loops @gnaneshwar.
    $.each(oSelectedContextReplyId_Info1, function (i, el) {
        if ($.inArray(el.ProductId, that.GlbCurrView.oreply_idInfo1Model) === -1) that.GlbCurrView.oreply_idInfo1Model.push(el.getObject());
    });
    oModel.setProperty("/tokens1", that.GlbCurrView.oreply_idInfo1Model);
    var oItemTemplateCC;
    oItemTemplateCC = oMultiInput.getTokens()[0];
    //Create the Template for token
    if (!oItemTemplateCC) {
        oItemTemplateCC = new Token({
            text: "{reply_id}",
            key: "{reply_id}"
        });
    } else {
        oItemTemplateCC = oMultiInput.getTokens()[0].clone();
    }
    //Bind the tokens
    that.GlbCurrView.oreply_idInfo1Model.forEach(function (item) {
        oMultiInput.addToken(new Token({
            text: item.reply_id
        }));
    })
},

onSearchreply_id_Util_Info1: function (oEvent) {
    var sValue = oEvent.getParameter("value");
    var oFilter = new Filter("reply_id", sap.ui.model.FilterOperator.Contains, sValue);
    var oBinding = oEvent.getParameter("itemsBinding");
    oBinding.filter([oFilter]);
},



// Reply Id Frag End




// sales_company_code Frag Start

onOpensales_company_codeFragment_Util_Info1: function (oEvent) {
    if (this.currentView.osales_company_code_Info1_Frag) {
        this.currentView.osales_company_code_Info1_Frag = undefined;
    }
    if (!this.currentView.osales_company_code_Info1_Frag) {
        that.GlbCurrView.busy.open()
        this.currentView.osales_company_code_Info1_Frag = sap.ui.xmlfragment("masterdata.fragments.dialogs.Info_1.sales_company_code_Info1", that.GlbCurrView);
        this.currentView.getView().addDependent(that.GlbCurrView.osales_company_code_Info1_Frag);
        var osales_company_codeInfo1 = that.GlbCurrView.getView().getModel("globalMainData_Info1").oData
        var lookup = {};
        var items = osales_company_codeInfo1;
        var result = [];
        for (var item, i = 0; item = items[i++];) {
            var name = item.sales_company_code;
            if (!(name in lookup)) {
                lookup[name] = 1;
                result.push({ "sales_company_code": name });
            }
        }
        var osales_company_codeInfo1Model = new JSONModel(result);
        this.currentView.getView().setModel(osales_company_codeInfo1Model, "sales_company_codeInfo1GlobalData")
        this.currentView.osales_company_code_Info1_Frag.setModel(osales_company_codeInfo1Model, "sales_company_codeInfo1Data");

    }
    that.GlbCurrView.busy.close()
    this.currentView.osales_company_code_Info1_Frag.open();

},


onSelectionsales_company_code_Util_Info1: function (oEvent) {
    var aContexts = oEvent.getParameter("selectedContexts");
    var oMultiInput = this.currentView.getView().byId("id_Info1_SalesCompanyCode");
    var oSelectedContextSales_Company_Code_Info1 = [];
    var oModel = this.currentView.getView().getModel("sales_company_codeInfo1GlobalData");
    for (var i = 0; i < aContexts.length; i++) {
        oSelectedContextSales_Company_Code_Info1.push(aContexts[i]);
    }
    that.GlbCurrView.osales_company_codeInfo1Model = [];
    //Check for Unique Data
    // $.each(oSelectedContextSales_Company_Code_Info1, function (i, el) {
    //     if ($.inArray(oSelectedContextSales_Company_Code_Info1[i].ProductId, that.GlbCurrView.osales_company_codeInfo1Model) === -1) that.GlbCurrView.osales_company_codeInfo1Model.push(oSelectedContextSales_Company_Code_Info1[i].getObject());
    // });

    //03-04-24 SAP Recommendation for slow loops @gnaneshwar.
    $.each(oSelectedContextSales_Company_Code_Info1, function (i, el) {
        if ($.inArray(el.ProductId, that.GlbCurrView.osales_company_codeInfo1Model) === -1) that.GlbCurrView.osales_company_codeInfo1Model.push(el.getObject());
    });
    oModel.setProperty("/tokens1", that.GlbCurrView.osales_company_codeInfo1Model);
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
    that.GlbCurrView.osales_company_codeInfo1Model.forEach(function (item) {
        oMultiInput.addToken(new Token({
            text: item.sales_company_code
        }));
    })
},

onSearchsales_company_code_Util_Info1: function (oEvent) {
    var sValue = oEvent.getParameter("value");
    var oFilter = new Filter("sales_company_code", sap.ui.model.FilterOperator.Contains, sValue);
    var oBinding = oEvent.getParameter("itemsBinding");
    oBinding.filter([oFilter]);
},


// sales_company_code Frag End

// issued_date Frag Start

onOpenissued_dateFragment_Util_Info1: function (oEvent) {
    if (this.currentView.oissued_date_Info1_Frag) {
        this.currentView.oissued_date_Info1_Frag = undefined;
    }
    if (!this.currentView.oissued_date_Info1_Frag) {
        that.GlbCurrView.busy.open()
        this.currentView.oissued_date_Info1_Frag = sap.ui.xmlfragment("masterdata.fragments.dialogs.Info_1.issued_date_Info1", that.GlbCurrView);
        this.currentView.getView().addDependent(that.GlbCurrView.oissued_date_Info1_Frag);
        var oissued_dateInfo1 = that.GlbCurrView.getView().getModel("globalMainData_Info1").oData
        var lookup = {};
        var items = oissued_dateInfo1;
        var result = [];
        for (var item, i = 0; item = items[i++];) {
            var name = item.issued_date;
            if (!(name in lookup)) {
                lookup[name] = 1;
                result.push({ "issued_date": name });
            }
        }
        var oissued_dateInfo1Model = new JSONModel(result);
        this.currentView.getView().setModel(oissued_dateInfo1Model, "issued_dateInfo1GlobalData")
        this.currentView.oissued_date_Info1_Frag.setModel(oissued_dateInfo1Model, "issued_dateInfo1Data");

    }
    that.GlbCurrView.busy.close()
    this.currentView.oissued_date_Info1_Frag.open();

},


onSelectionissued_date_Util_Info1: function (oEvent) {
    var aContexts = oEvent.getParameter("selectedContexts");
    var oMultiInput = this.currentView.getView().byId("id_Info1_IssueDate");
    var oSelectedContextissue_date_Info1 = [];
    var oModel = this.currentView.getView().getModel("issued_dateInfo1GlobalData");
    for (var i = 0; i < aContexts.length; i++) {
        oSelectedContextissue_date_Info1.push(aContexts[i]);
    }
    that.GlbCurrView.oissued_dateInfo1Model = [];
    //Check for Unique Data
    // $.each(oSelectedContextissue_date_Info1, function (i, el) {
    //     if ($.inArray(oSelectedContextissue_date_Info1[i].ProductId, that.GlbCurrView.oissued_dateInfo1Model) === -1) that.GlbCurrView.oissued_dateInfo1Model.push(oSelectedContextissue_date_Info1[i].getObject());
    // });

    //03-04-24 SAP Recommendation for slow loops @gnaneshwar.
    $.each(oSelectedContextissue_date_Info1, function (i, el) {
        if ($.inArray(el.ProductId, that.GlbCurrView.oissued_dateInfo1Model) === -1) that.GlbCurrView.oissued_dateInfo1Model.push(el.getObject());
    });
    oModel.setProperty("/tokens1", that.GlbCurrView.oissued_dateInfo1Model);
    var oItemTemplateCC;
    oItemTemplateCC = oMultiInput.getTokens()[0];
    //Create the Template for token
    if (!oItemTemplateCC) {
        oItemTemplateCC = new Token({
            text: "{issued_date}",
            key: "{issued_date}"
        });
    } else {
        oItemTemplateCC = oMultiInput.getTokens()[0].clone();
    }
    //Bind the tokens
    that.GlbCurrView.oissued_dateInfo1Model.forEach(function (item) {
        oMultiInput.addToken(new Token({
            text: item.issued_date
        }));
    })
},

onSearchissued_date_Util_Info1: function (oEvent) {
    var sValue = oEvent.getParameter("value");
    var oFilter = new Filter("issued_date", sap.ui.model.FilterOperator.Contains, sValue);
    var oBinding = oEvent.getParameter("itemsBinding");
    oBinding.filter([oFilter]);
},


// issued_date Frag End



// Info 1 unified model number frag start

onOpenunified_model_numberFragment_Util_Info1: function (oEvent) {
    if (this.currentView.ounified_model_number_Info1_Frag) {
        this.currentView.ounified_model_number_Info1_Frag = undefined;
    }
    if (!this.currentView.ounified_model_number_Info1_Frag) {
        that.GlbCurrView.busy.open()
        this.currentView.ounified_model_number_Info1_Frag = sap.ui.xmlfragment("masterdata.fragments.dialogs.Info_1.unified_model_number_Info1", that.GlbCurrView);
        this.currentView.getView().addDependent(that.GlbCurrView.ounified_model_number_Info1_Frag);
        var ounified_model_numberInfo1 = that.GlbCurrView.getView().getModel("globalMainData_Info1").oData
        var lookup = {};
        var items = ounified_model_numberInfo1;
        var result = [];
        for (var item, i = 0; item = items[i++];) {
            var name = item.unified_model_number;
            if (!(name in lookup)) {
                lookup[name] = 1;
                result.push({ "unified_model_number": name });
            }
        }
        var ounified_model_numberInfo1Model = new JSONModel(result);
        this.currentView.getView().setModel(ounified_model_numberInfo1Model, "unified_model_numberInfo1GlobalData")
        this.currentView.ounified_model_number_Info1_Frag.setModel(ounified_model_numberInfo1Model, "unified_model_numberInfo1Data");

    }
    that.GlbCurrView.busy.close()
    this.currentView.ounified_model_number_Info1_Frag.open();

},


onSelectionunified_model_number_Util_Info1: function (oEvent) {
    var aContexts = oEvent.getParameter("selectedContexts");
    var oMultiInput = this.currentView.getView().byId("id_Info1_UniModelNo");
    var oSelectedContextunified_model_number_Info1 = [];
    var oModel = this.currentView.getView().getModel("unified_model_numberInfo1GlobalData");
    for (var i = 0; i < aContexts.length; i++) {
        oSelectedContextunified_model_number_Info1.push(aContexts[i]);
    }
    that.GlbCurrView.ounified_model_numberInfo1Model = [];
    //Check for Unique Data
    // $.each(oSelectedContextunified_model_number_Info1, function (i, el) {
    //     if ($.inArray(oSelectedContextunified_model_number_Info1[i].ProductId, that.GlbCurrView.ounified_model_numberInfo1Model) === -1) that.GlbCurrView.ounified_model_numberInfo1Model.push(oSelectedContextunified_model_number_Info1[i].getObject());
    // });

    //03-04-24 SAP Recommendation for slow loops @gnaneshwar.
    $.each(oSelectedContextunified_model_number_Info1, function (i, el) {
        if ($.inArray(el.ProductId, that.GlbCurrView.ounified_model_numberInfo1Model) === -1) that.GlbCurrView.ounified_model_numberInfo1Model.push(el.getObject());
    });
    oModel.setProperty("/tokens1", that.GlbCurrView.ounified_model_numberInfo1Model);
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
    that.GlbCurrView.ounified_model_numberInfo1Model.forEach(function (item) {
        oMultiInput.addToken(new Token({
            text: item.unified_model_number
        }));
    })
},

onSearchunified_model_number_Util_Info1: function (oEvent) {
    var sValue = oEvent.getParameter("value");
    var oFilter = new Filter("unified_model_number", sap.ui.model.FilterOperator.Contains, sValue);
    var oBinding = oEvent.getParameter("itemsBinding");
    oBinding.filter([oFilter]);
},


// unified_model_number Frag End

// suplier_code Frag Start

onOpensuplier_codeFragment_Util_Info1: function (oEvent) {
    if (this.currentView.osuplier_code_Info1_Frag) {
        this.currentView.osuplier_code_Info1_Frag = undefined;
    }
    if (!this.currentView.osuplier_code_Info1_Frag) {
        that.GlbCurrView.busy.open()
        this.currentView.osuplier_code_Info1_Frag = sap.ui.xmlfragment("masterdata.fragments.dialogs.Info_1.suplier_code_Info1", that.GlbCurrView);
        this.currentView.getView().addDependent(that.GlbCurrView.osuplier_code_Info1_Frag);
        var osuplier_codeInfo1 = that.GlbCurrView.getView().getModel("globalMainData_Info1").oData
        var lookup = {};
        var items = osuplier_codeInfo1;
        var result = [];
        for (var item, i = 0; item = items[i++];) {
            var name = item.suplier_code;
            if (!(name in lookup)) {
                lookup[name] = 1;
                result.push({ "suplier_code": name });
            }
        }
        var osuplier_codeInfo1Model = new JSONModel(result);
        this.currentView.getView().setModel(osuplier_codeInfo1Model, "suplier_codeInfo1GlobalData")
        this.currentView.osuplier_code_Info1_Frag.setModel(osuplier_codeInfo1Model, "suplier_codeInfo1Data");

    }
    that.GlbCurrView.busy.close()
    this.currentView.osuplier_code_Info1_Frag.open();

},


onSelectionsuplier_code_Util_Info1: function (oEvent) {
    var aContexts = oEvent.getParameter("selectedContexts");
    var oMultiInput = this.currentView.getView().byId("id_Info1_SupplierCode");
    var oSelectedContextsuplier_code_Info1 = [];
    var oModel = this.currentView.getView().getModel("suplier_codeInfo1GlobalData");
    for (var i = 0; i < aContexts.length; i++) {
        oSelectedContextsuplier_code_Info1.push(aContexts[i]);
    }
    that.GlbCurrView.osuplier_codeInfo1Model = [];
    //Check for Unique Data
    // $.each(oSelectedContextsuplier_code_Info1, function (i, el) {
    //     if ($.inArray(oSelectedContextsuplier_code_Info1[i].ProductId, that.GlbCurrView.osuplier_codeInfo1Model) === -1) that.GlbCurrView.osuplier_codeInfo1Model.push(oSelectedContextsuplier_code_Info1[i].getObject());
    // });

    //03-04-24 SAP Recommendation for slow loops @gnaneshwar.
    $.each(oSelectedContextsuplier_code_Info1, function (i, el) {
        if ($.inArray(el.ProductId, that.GlbCurrView.osuplier_codeInfo1Model) === -1) that.GlbCurrView.osuplier_codeInfo1Model.push(el.getObject());
    });
    oModel.setProperty("/tokens1", that.GlbCurrView.osuplier_codeInfo1Model);
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
    that.GlbCurrView.osuplier_codeInfo1Model.forEach(function (item) {
        oMultiInput.addToken(new Token({
            text: item.suplier_code
        }));
    })
},

onSearchsuplier_code_Util_Info1: function (oEvent) {
    var sValue = oEvent.getParameter("value");
    var oFilter = new Filter("suplier_code", sap.ui.model.FilterOperator.Contains, sValue);
    var oBinding = oEvent.getParameter("itemsBinding");
    oBinding.filter([oFilter]);
},


// suplier_code Frag End



// factory_code Frag Start

onOpenfactory_codeFragment_Util_Info1: function (oEvent) { 
    if (this.currentView.ofactory_code_Info1_Frag) {
        this.currentView.ofactory_code_Info1_Frag = undefined;
    }
    if (!this.currentView.ofactory_code_Info1_Frag) {
        that.GlbCurrView.busy.open()
        this.currentView.ofactory_code_Info1_Frag = sap.ui.xmlfragment("masterdata.fragments.dialogs.Info_1.factory_code_Info1", that.GlbCurrView);
        this.currentView.getView().addDependent(that.GlbCurrView.ofactory_code_Info1_Frag);
        var ofactory_codeInfo1 = that.GlbCurrView.getView().getModel("globalMainData_Info1").oData
        var lookup = {};
        var items = ofactory_codeInfo1;
        var result = [];
        for (var item, i = 0; item = items[i++];) {
            var name = item.factory_code;
            if (!(name in lookup)) {
                lookup[name] = 1;
                result.push({ "factory_code": name });
            }
        }
        var ofactory_codeInfo1Model = new JSONModel(result);
        this.currentView.getView().setModel(ofactory_codeInfo1Model, "factory_codeInfo1GlobalData")
        this.currentView.ofactory_code_Info1_Frag.setModel(ofactory_codeInfo1Model, "factory_codeInfo1Data");

    }
    that.GlbCurrView.busy.close()
    this.currentView.ofactory_code_Info1_Frag.open();

},


onSelectionfactory_code_Util_Info1: function (oEvent) {
    var aContexts = oEvent.getParameter("selectedContexts");
    var oMultiInput = this.currentView.getView().byId("id_Info1_FactoryCode");
    var oSelectedContextfactory_code_Info1 = [];
    var oModel = this.currentView.getView().getModel("factory_codeInfo1GlobalData");
    for (var i = 0; i < aContexts.length; i++) {
        oSelectedContextfactory_code_Info1.push(aContexts[i]);
    }
    that.GlbCurrView.ofactory_codeInfo1Model = [];
    //Check for Unique Data
    // $.each(oSelectedContextfactory_code_Info1, function (i, el) {
    //     if ($.inArray(oSelectedContextfactory_code_Info1[i].ProductId, that.GlbCurrView.ofactory_codeInfo1Model) === -1) that.GlbCurrView.ofactory_codeInfo1Model.push(oSelectedContextfactory_code_Info1[i].getObject());
    // });

    //03-04-24 SAP Recommendation for slow loops @gnaneshwar.
    $.each(oSelectedContextfactory_code_Info1, function (i, el) {
        if ($.inArray(el.ProductId, that.GlbCurrView.ofactory_codeInfo1Model) === -1) that.GlbCurrView.ofactory_codeInfo1Model.push(el.getObject());
    });
    oModel.setProperty("/tokens1", that.GlbCurrView.ofactory_codeInfo1Model);
    var oItemTemplateCC;
    oItemTemplateCC = oMultiInput.getTokens()[0];
    //Create the Template for token
    if (!oItemTemplateCC) {
        oItemTemplateCC = new Token({
            text: "{factory_code}",
            key: "{factory_code}"
        });
    } else {
        oItemTemplateCC = oMultiInput.getTokens()[0].clone();
    }
    //Bind the tokens
    that.GlbCurrView.ofactory_codeInfo1Model.forEach(function (item) {
        oMultiInput.addToken(new Token({
            text: item.factory_code
        }));
    })
},

onSearchfactory_code_Util_Info1: function (oEvent) {
    var sValue = oEvent.getParameter("value");
    var oFilter = new Filter("factory_code", sap.ui.model.FilterOperator.Contains, sValue);
    var oBinding = oEvent.getParameter("itemsBinding");
    oBinding.filter([oFilter]);
},


// factory_code Frag End





// closing of fragments _ Info1

onCloseDialog_Util_Info1: function (oEvent) {

    if (that.GlbCurrView.oClient_Info1_Frag) {
       // that.GlbCurrView.oClient_Info1_Frag.close()
       // that.GlbCurrView.oClient_Info1_Frag.destroy()
       // delete that.GlbCurrView.oClient_Info1_Frag;
        that.GlbCurrView.oClient_Info1_Frag = undefined;
        that.GlbCurrView.oClient_Info1_Frag = null
        
    }

    if (that.GlbCurrView.oreply_id_Info1_Frag) {
        //that.GlbCurrView.oreply_id_Info1_Frag.close()
        //that.GlbCurrView.oreply_id_Info1_Frag.destroy()
        //delete that.GlbCurrView.oreply_id_Info1_Frag;
        that.GlbCurrView.oreply_id_Info1_Frag = undefined;
        that.GlbCurrView.oreply_id_Info1_Frag = null;
        
    }
    if (that.GlbCurrView.osales_company_code_Info1_Frag) {
        //that.GlbCurrView.osales_company_code_Info1_Frag.close()
        //that.GlbCurrView.osales_company_code_Info1_Frag.destroy()
        //delete that.GlbCurrView.osales_company_code_Info1_Frag;
        that.GlbCurrView.osales_company_code_Info1_Frag = undefined;
        that.GlbCurrView.osales_company_code_Info1_Frag = null;
        
    }

    if (that.GlbCurrView.oissued_date_Info1_Frag) {
       // that.GlbCurrView.oissued_date_Info1_Frag.close()
       // that.GlbCurrView.oissued_date_Info1_Frag.destroy()
        // delete that.GlbCurrView.oissued_date_Info1_Frag;
        that.GlbCurrView.oissued_date_Info1_Frag = undefined;
        that.GlbCurrView.oissued_date_Info1_Frag = null;
        
    }
    if (that.GlbCurrView.ounified_model_number_Info1_Frag) {
    //    that.GlbCurrView.ounified_model_number_Info1_Frag.close()
     //   that.GlbCurrView.ounified_model_number_Info1_Frag.destroy()
      //  delete that.GlbCurrView.ounified_model_number_Info1_Frag;
        that.GlbCurrView.ounified_model_number_Info1_Frag = undefined;
        that.GlbCurrView.ounified_model_number_Info1_Frag = null;
        
    }
    if (that.GlbCurrView.osuplier_code_Info1_Frag) {
      //  that.GlbCurrView.osuplier_code_Info1_Frag.close()
       // that.GlbCurrView.osuplier_code_Info1_Frag.destroy()
        //delete that.GlbCurrView.osuplier_code_Info1_Frag;
        that.GlbCurrView.osuplier_code_Info1_Frag = undefined;
        that.GlbCurrView.osuplier_code_Info1_Frag = null;
        
    }

    if (that.GlbCurrView.ofactory_code_Info1_Frag) {
       // that.GlbCurrView.ofactory_code_Info1_Frag.close()
        //that.GlbCurrView.ofactory_code_Info1_Frag.destroy()
        // delete that.GlbCurrView.ofactory_code_Info1_Frag;
        that.GlbCurrView.ofactory_code_Info1_Frag = undefined;
        that.GlbCurrView.ofactory_code_Info1_Frag = null;
        
    }

},

//04-04-24 Depprecated calls issue for excel SAP Recommendation @gnaneshwar
on1Export: function (oEvent) {
    var oselectedModel = new sap.ui.model.json.JSONModel(that.GlbCurrView.getView().getModel("Info1_Model").oData);

    var aCols = [
        { label: "Reply Id", property: "reply_id" },
        { label: "Sales Company Code", property: "sales_company_code" },
        { label: "Issued Date", property: "issued_date" },
        { label: "Unified Model Number", property: "unified_model_number" },
        { label: "Supplier Code", property: "supplier_code" },
        { label: "Factory Code", property: "factory_code" },
        { label: "Department Code", property: "department_code" },
        { label: "Legacy Color Code", property: "legacy_color_code" },
        { label: "Brand Code", property: "brand_code" },
        { label: "Old Model Number", property: "old_model_number" },
        { label: "H S Code", property: "h_s_code" },
        { label: "Account Category", property: "account_category" },
        { label: "Overseas Category", property: "overseas_category" },
        { label: "Advertisement Id", property: "advertisement_id" },
        { label: "Temp Model Id", property: "temp_model_id" },
        { label: "Min Accept Quantity", property: "min_accept_quantity" },
        { label: "Min Accept Quantity Unit Code", property: "min_accept_quantity_unit_code" },
        { label: "Printed Model Number", property: "printed_model_number" },
        { label: "Kit Id", property: "kit_id" },
        { label: "E L Id", property: "e_l_id" },
        { label: "Product Name", property: "product_name" },
        { label: "Department Name", property: "department_name" },
        { label: "Personal Name", property: "personal_name" },
        { label: "Parent Code", property: "parent_code" },
        { label: "UPC", property: "upc" },
        { label: "Fiscal Year", property: "fiscal_year" },
        { label: "Sales Date New Model", property: "sales_date_new_model" },
        { label: "Filler 1", property: "filler_1" },
        { label: "Revised Id", property: "revised_id" },
        { label: "Filler 2", property: "filler_2" },
        { label: "Delete Indicator", property: "delete_indicator" },
        { label: "Actual Message Issued Date", property: "actual_message_issued_date" },
        { label: "Created On", property: "created_on" },
        { label: "Changed On", property: "changed_on" },
        { label: "Change Time", property: "change_time" }
    ];

    var oSettings = {
        workbook: { columns: aCols,
            context: {
                sheetName: 'GCMS_INFO_1'
            },
        
        },
        dataSource: oselectedModel.getData(),
        fileName: "GCMS_INFO_1.xlsx",
        
    };

    var oSpreadsheet = new sap.ui.export.Spreadsheet(oSettings);
    oSpreadsheet.build().then(function () {
        oSpreadsheet.destroy();
    });
},



            //                 on1Export: function (oEvent) {
                
            //   //  var selectedITemsLength = this.currentView.getView().byId("idTrdPartTable").getSelectedItems().length
               
                    
            //         var oselectedModel = new sap.ui.model.json.JSONModel(that.GlbCurrView.getView().getModel("Info1_Model").oData)
                
               
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
            //             name: "Reply Id",
            //             template: {
            //                 content: "{reply_id}"
            //             }
            //         }, {
            //             name: "Sales Company Code",
            //             template: {
            //                 content: "{sales_company_code}"
            //             }
            //         }, {
            //             name: "Issued Date",
            //             template: {
            //                 content: "{issued_date}"
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
            //             name: "Factory Code",
            //             template: {
            //                 content: "{factory_code}"
            //             }
            //         }, {
            //             name: "Department Code",
            //             template: {
            //                 content: "{department_code}"
            //             }
            //         }, {
            //             name: "Legacy Color Code",
            //             template: {
            //                 content: "{legacy_color_code}"
            //             }
            //         }, {
            //             name: "Brand Code",
            //             template: {
            //                 content: "{brand_code}"
            //             }
            //         }, {
            //             name: "Old Model Number",
            //             template: {
            //                 content: "{old_model_number}"
            //             }
            //         }, {
            //             name: "H S Code",
            //             template: {
            //                 content: "{h_s_code}"
            //             }
            //         }, {
            //             name: "Account Category",
            //             template: {
            //                 content: "{account_category}"
            //             }
            //         },{
            //             name: "Overseas Category",
            //             template: {
            //                 content: "{overseas_category}"
            //             }
            //         }, {
            //             name: "Advertisement Id",
            //             template: {
            //                 content: "{advertisement_id}"
            //             }
            //         }, {
            //             name: "Temp Model Id",
            //             template: {
            //                 content: "{temp_model_id}"
            //             }
            //         }, {
            //             name: "min Accept Quantity",
            //             template: {
            //                 content: "{min_accept_quantity}"
            //             }
            //         }, {
            //             name: "Min Accept Quantity Unit Code",
            //             template: {
            //                 content: "{min_accept_quantity_unit_code}"
            //             }
            //         }, {
            //             name: "Printed Model Number",
            //             template: {
            //                 content: "{printed_model_number}"
            //             }
            //         }, {
            //             name: "Kit Id",
            //             template: {
            //                 content: "{kit_id}"
            //             }
            //         }, {
            //             name: "E L Id",
            //             template: {
            //                 content: "{e_l_id}"
            //             }
            //         }, {
            //             name: "Product Name",
            //             template: {
            //                 content: "{product_name}"
            //             }
            //         }, {
            //             name: "Department Name",
            //             template: {
            //                 content: "{department_name}"
            //             }
            //         }, {
            //             name: "Personal Name",
            //             template: {
            //                 content: "{personal_name}"
            //             }
            //         }, {
            //             name: "Parent Code",
            //             template: {
            //                 content: "{parent_code}"
            //             }
            //         }, {
            //             name: "UPC",
            //             template: {
            //                 content: "{upc}"
            //             }
            //         }, {
            //             name: "Fiscal Year",
            //             template: {
            //                 content: "{fiscal_year}"
            //             }
            //         }, {
            //             name: "Sales Date New Model",
            //             template: {
            //                 content: "{sales_date_new_model}"
            //             }
            //         }, {
            //             name: "Filler 1",
            //             template: {
            //                 content: "{filler_1}"
            //             }
            //         }, {
            //             name: "Revised Id",
            //             template: {
            //                 content: "{revised_id}"
            //             }
            //         }, {
            //             name: "Filler 2",
            //             template: {
            //                 content: "{filler_2}"
            //             }
            //         }, {
            //             name: "Delete Indicator",
            //             template: {
            //                 content: "{delete_indicator}"
            //             }
            //         }, {
            //             name: "Actual Message Issued Date",
            //             template: {
            //                 content: "{actual_message_issued_date}"
            //             }
            //         }, {
            //             name: "Created On",
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
            //          }
            //         ]
    
            //     });
    
            //     //* download exported file
    
            //     oExport.saveFile("GCMS INFO 1").always(function () {
    
            //         this.destroy();
    
            //     });
            // },

            onGoToReport_Util_Info1: function () {
                that.GlbCurrView.busy.open()
    
                // get all plant tokens
    
                // var Info1_Client_Tokens = this.currentView.getView().byId("id_Info1_Client").getTokens();
                // that.GlbCurrView.sInfo1_ClientValues = Info1_Client_Tokens.map(function (oToken) {
                //     return oToken.getText();
                // }).join(",");
    
               
    
                // get all material tokens
                var Info1_ReplyId_Tokens = this.currentView.getView().byId("id_Info1_ReplyId").getTokens();
                that.GlbCurrView.sInfo1_ReplyId_Values = Info1_ReplyId_Tokens.map(function (oToken) {
                    return oToken.getText();
                }).join(",");
    
                // get all material group tokens
                var Info1_SalesCompanyCode_Tokens = this.currentView.getView().byId("id_Info1_SalesCompanyCode").getTokens();
                that.GlbCurrView.sInfo1_SalesCompanyCode_TokensValues = Info1_SalesCompanyCode_Tokens.map(function (oToken) {
                    return oToken.getText();
                }).join(",");
    
    
                var Info1_issued_date_Tokens = this.currentView.getView().byId("id_Info1_IssueDate").getTokens();
                that.GlbCurrView.sInfo1_issued_date_TokensValues = Info1_issued_date_Tokens.map(function (oToken) {
                    return oToken.getText();
                }).join(",");

                var Info1_unified_model_number_Tokens = this.currentView.getView().byId("id_Info1_UniModelNo").getTokens();
                that.GlbCurrView.sInfo1_unified_model_number_TokensValues = Info1_unified_model_number_Tokens.map(function (oToken) {
                    return oToken.getText();
                }).join(",");

                var Info1_suplier_code_Tokens = this.currentView.getView().byId("id_Info1_SupplierCode").getTokens();
                that.GlbCurrView.sInfo1_suplier_code_TokensValues = Info1_suplier_code_Tokens.map(function (oToken) {
                    return oToken.getText();
                }).join(",");

                var Info1_factory_code_Tokens = this.currentView.getView().byId("id_Info1_FactoryCode").getTokens();
                that.GlbCurrView.sInfo1_factory_code_TokensValues = Info1_factory_code_Tokens.map(function (oToken) {
                    return oToken.getText();
                }).join(",");
                

                var filters = [];
    
                if (that.GlbCurrView.sInfo1_factory_code_TokensValues !== "") {
    
                    var Info1_factory_codeVal = that.GlbCurrView.sInfo1_factory_code_TokensValues.split(",");
                    if (Info1_factory_codeVal.length > 0) {
                        $.each(Info1_factory_codeVal, function (i, UIitem) {
                            filters.push(new sap.ui.model.Filter("factory_code", sap.ui.model.FilterOperator.Contains, UIitem));
                        });
                    };
                }

                if (that.GlbCurrView.sInfo1_suplier_code_TokensValues !== "") {
    
                    var Info1_suplier_codeVal = that.GlbCurrView.sInfo1_suplier_code_TokensValues.split(",");
                    if (Info1_suplier_codeVal.length > 0) {
                        $.each(Info1_suplier_codeVal, function (i, UIitem) {
                            filters.push(new sap.ui.model.Filter("suplier_code", sap.ui.model.FilterOperator.Contains, UIitem));
                        });
                    };
                }

                if (that.GlbCurrView.sInfo1_unified_model_number_TokensValues !== "") {
    
                    var Info1_unified_model_numberVal = that.GlbCurrView.sInfo1_unified_model_number_TokensValues.split(",");
                    if (Info1_unified_model_numberVal.length > 0) {
                        $.each(Info1_unified_model_numberVal, function (i, UIitem) {
                            filters.push(new sap.ui.model.Filter("unified_model_number", sap.ui.model.FilterOperator.Contains, UIitem));
                        });
                    };
                }

                // if (that.GlbCurrView.sInfo1_ClientValues !== "") {
    
                //     var Info1_ClientVal = that.GlbCurrView.sInfo1_ClientValues.split(",");
                //     if (Info1_ClientVal.length > 0) {
                //         $.each(Info1_ClientVal, function (i, UIitem) {
                //             filters.push(new sap.ui.model.Filter("client", sap.ui.model.FilterOperator.Contains, UIitem));
                //         });
                //     };
                // }
              
                if (that.GlbCurrView.sInfo1_ReplyId_Values !== "") {
    
                    var Info1_ReplyIdVal = that.GlbCurrView.sInfo1_ReplyId_Values.split(",");
                    if (Info1_ReplyIdVal.length > 0) {
                        $.each(Info1_ReplyIdVal, function (i, UIitem) {
                            filters.push(new sap.ui.model.Filter("reply_id", sap.ui.model.FilterOperator.Contains, UIitem));
                        });
                    };
                }


                if (that.GlbCurrView.sInfo1_SalesCompanyCode_TokensValues !== "") {
    
                    var Info1_SalesCCVal = that.GlbCurrView.sInfo1_SalesCompanyCode_TokensValues.split(",");
                    if (Info1_SalesCCVal.length > 0) {
                        $.each(Info1_SalesCCVal, function (i, UIitem) {
                            filters.push(new sap.ui.model.Filter("sales_company_code", sap.ui.model.FilterOperator.Contains, UIitem));
                        });
                    };
                }

                    
                if (that.GlbCurrView.sInfo1_issued_date_TokensValues !== "") {
    
                    var Info1_issued_dateVal = that.GlbCurrView.sInfo1_issued_date_TokensValues.split(",");
                    if (Info1_issued_dateVal.length > 0) {
                        $.each(Info1_issued_dateVal, function (i, UIitem) {
                            filters.push(new sap.ui.model.Filter("issued_date", sap.ui.model.FilterOperator.Contains, UIitem));
                        });
                    };
                }

                if ((that.startDate !== "" && that.endDate !== "") || (that.startDate !== undefined && that.endDate !== undefined)) {

                    var startDate = that.startDate;
                    var endDate = that.endDate;
                    
                    if (startDate) {
                        filters.push(new sap.ui.model.Filter("created_on", sap.ui.model.FilterOperator.BT, startDate,endDate));
            
                    };
                }
            
                if ((that.startDate1 !== "" && that.endDate1 !== "") || (that.startDate1 !== undefined && that.endDate1 !== undefined)) {
            
                    var startDate1 = that.startDate1;
                    var endDate1 = that.endDate1;
                    
                    if (startDate1) {
                        filters.push(new sap.ui.model.Filter("changed_on", sap.ui.model.FilterOperator.BT, startDate1,endDate1));
            
                    };
                }
                   
                    

                    that.GlbCurrView.tableMainModelfiltereddata = undefined
                    that.GlbCurrView.tableMainModelfiltereddata = new JSONModel(that.GlbCurrView.getView().getModel("globalMainData_Info1").oData);
                    that.GlbCurrView.getView().setModel(that.GlbCurrView.tableMainModelfiltereddata, "Info1_Model")
                  //  this.getDefaultFilteredDateData();
                    this.currentView.getView().byId("idInfo_1_Table").getBinding("items").filter(filters);
                    that.GlbCurrView.filteredData = true;
                    that.GlbCurrView.filteredDataToExport = []
                    var selectedITemsLength = this.currentView.getView().byId("idInfo_1_Table").getBinding("items").aIndices.length
                    that.GlbCurrView.filteredIndices = this.currentView.getView().byId("idInfo_1_Table").getBinding("items").aIndices
                    for (var i = 0; i < selectedITemsLength; i++) {
    
                        that.GlbCurrView.filteredDataToExport.push(that.GlbCurrView.tableMainModelfiltereddata.oData[that.GlbCurrView.filteredIndices[i]]);
                    }
                    var tableFilteredModel = new JSONModel(that.GlbCurrView.filteredDataToExport)
                    that.GlbCurrView.getView().setModel(tableFilteredModel, "Info1_Model")
                   
                    that.GlbCurrView.busy.close()
                
            },


            handleInfo_1_SortButtonPressedUtil: function (oEvent) {

                if (this.currentView.oInfo_1_SortFrag) {
                    this.currentView.oInfo_1_SortFrag = undefined;
                }
                if (!this.currentView.oInfo_1_SortFrag) {
                    that.GlbCurrView.busy.open()
                    this.currentView.oInfo_1_SortFrag = sap.ui.xmlfragment("masterdata.fragments.dialogs.Info_1.ascAndDscSort_Info1", that);
                    this.currentView.getView().addDependent(that.GlbCurrView.oInfo_1_SortFrag);
    
                }
                that.GlbCurrView.busy.close()
                this.currentView.oInfo_1_SortFrag.open();
    
            },
    
            // handle sort
            Info_1_handleSortDialogConfirmUtil: function (oEvent) {
                
        var oTable = this.currentView.byId("idInfo_1_Table"),
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


            getDefaultFilteredDateData : function(){
                var   oTable = this.currentView.byId("idInfo_1_Table");
                var   oBinding = oTable.getBinding("items");
                 var  aSorters = [];
                   aSorters.push(new Sorter("created_on", true));
                   oBinding.sort(aSorters);
               },

               onClear1Util : function(oEvent){
               
                //   this.currentView.getView().byId("id_Info1_Client").setTokens([]);
                  this.currentView.getView().byId("id_Info1_ReplyId").setTokens([]);
                  this.currentView.getView().byId("id_Info1_SalesCompanyCode").setTokens([]);
                  this.currentView.getView().byId("id_Info1_IssueDate").setTokens([]);
                  this.currentView.getView().byId("id_Info1_SupplierCode").setTokens([]);
                  this.currentView.getView().byId("id_Info1_FactoryCode").setTokens([]);
                  this.currentView.getView().byId("id_Info1_UniModelNo").setTokens([]);
                  this.currentView.getView().byId("id_datePicker_5").setValue("");
                this.currentView.getView().byId("id_datePicker_6").setValue("");
                  var tableModel3 = new sap.ui.model.json.JSONModel();
                  that.getView().setModel(tableModel3, "Info1_Model")
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