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
    function (JSONModel,  MessageToast, MessageBox, Export, ExportTypeCSV,Spreadsheet,BusyDialog,Filter,FilterOperator,Fragment,Token,Sorter) {
        "use strict";
        that = this;
        return {

            storeView234 : function(oCurrentView,oGlbCurrView){
                
                    this.currentView = oCurrentView;
                    that.GlbCurrView = oGlbCurrView;
                    that.GlbCurrView.busy = new BusyDialog();
            },
              
       


            handle234SelectionChangeUtil: function(oEvent){
                    
                    var oItem = oEvent.getParameter("changedItem"),
                    bSelected = oEvent.getParameter("selected"),
                    oContext = oItem.getBindingContext("columndataInfo234");
                    oContext.oModel.setProperty(oContext.sPath+"/visible",bSelected)
                    oContext.oModel.refresh(true);
                
            },

            onRead234TableData : function(){
                
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
                oModel1.read("/zmm_m12_info_234",
                {
                    success: function (oData) { 
                        var sUserModel=that.getView().getModel("userModel").getData();
                        if(sUserModel.TISAdmin===true){ 
                        var oDateFormat = sap.ui.core.format.DateFormat.getDateTimeInstance({
                            pattern: "MM-dd-yyyy"
                        });
                      var passCurrentdate = oDateFormat.format(new Date());
                        //oData.results[0].change_time
                      for (var i=0;i<oData.results.length;i++){                        
                        oData.results[i].created_on = oDateFormat.format(oData.results[i].created_on);
                        oData.results[i].changed_on = oDateFormat.format(oData.results[i].changed_on);
                       oData.results[i].change_time = new Date(oData.results[i].change_time.ms).toISOString().slice(11, 19)
                       //oData.results[i].created_time = new Date(oData.results[i].created_time.ms).toISOString().slice(11, 19)
                      }                                              
                        that.GlbCurrView.getView().setModel(new sap.ui.model.json.JSONModel(oData.results), "globalMainData_Info234")
                        that.GlbCurrView.getView().setModel(new sap.ui.model.json.JSONModel(oData.results), "Info234_Model")
                        }
                        else{
                            that.getView().setModel([], "globalMainData_Info234");
                              
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
                var oDatePicker1 = this.currentView.getView().byId("id_datePicker_9");
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
                var oDatePicker2 = this.currentView.getView().byId("id_datePicker_10");
                // Set the value and disable future dates
               // oDatePicker.setValue(that.completeDate);
                oDatePicker2.setMaxDate(dateObject1);
            },


            handleChangeCreateDateInfo234Util : function(oEvent){

                that.startDate = oEvent.mParameters.value.substr(0,10);
                that.endDate = oEvent.mParameters.value.substr(13,20);  


            },

            handleChangeDateInfo234Util : function(oEvent){

                that.startDate1 = oEvent.mParameters.value.substr(0,10);
                that.endDate1 = oEvent.mParameters.value.substr(13,20);  


            },





            VisibleColumns234: function () {
              
                var sPath =  jQuery.sap.getResourcePath("masterdata/model")+"/gcmsInfo234Column.json";

                var trdPartCols = new JSONModel();

            trdPartCols.loadData(sPath).then(function(){
    this.currentView.getView().setModel(trdPartCols,"columndataInfo234");
                            this.currentView.getView().byId("id_showHideColumns234").setSelectedKeys(["record_type",
                            "reply_id","sales_order_code","issued_date","created_on","changed_on"]); 
}.bind(this));


               
                
                            },


// INFO_234 Fragment open starts here

// client Frag Start
// onOpenClientFragment_Util_Info234: function (oEvent) {
//     if (this.currentView.oClient_Info234_Frag) {
//         this.currentView.oClient_Info234_Frag = undefined;
//     } 
//     if (!this.currentView.oClient_Info234_Frag) {
//         that.GlbCurrView.busy.open()
//         this.currentView.oClient_Info234_Frag = sap.ui.xmlfragment("masterdata.fragments.dialogs.Info_234.client_Info234", that.GlbCurrView);
//         this.currentView.getView().addDependent(that.GlbCurrView.oClient_Info234_Frag);
//         var oClientInfo234 = that.GlbCurrView.getView().getModel("globalMainData_Info234").oData
//         var lookup = {};
//         var items = oClientInfo234;
//         var result = [];
//         for (var item, i = 0; item = items[i++];) {
//             var name = item.client;
//             if (!(name in lookup)) {
//                 lookup[name] = 1;
//                 result.push({ "client": name });
//             }
//         }
//         var oClientInfo234Model = new JSONModel(result);
//         this.currentView.getView().setModel(oClientInfo234Model, "ClientInfo234GlobalData")
//         this.currentView.oClient_Info234_Frag.setModel(oClientInfo234Model, "ClientInfo234Data");

//     }
//     that.GlbCurrView.busy.close()
//     this.currentView.oClient_Info234_Frag.open();

// },


// onSelectionClient_Util_Info234: function (oEvent) {
//     var aContexts = oEvent.getParameter("selectedContexts");
//     var oMultiInput = this.currentView.getView().byId("id_Info234_Client");
//     var oSelectedContextClient_Info234 = [];
//     var oModel = this.currentView.getView().getModel("ClientInfo234GlobalData");
//     for (var i = 0; i < aContexts.length; i++) {
//         oSelectedContextClient_Info234.push(aContexts[i]);
//     }
//     that.GlbCurrView.oClientInfo234Model = [];
//     //Check for Unique Data
//     $.each(oSelectedContextClient_Info234, function (i, el) {
//         if ($.inArray(oSelectedContextClient_Info234[i].ProductId, that.GlbCurrView.oClientInfo234Model) === -1) that.GlbCurrView.oClientInfo234Model.push(oSelectedContextClient_Info234[i].getObject());
//     });
//     oModel.setProperty("/tokens1", that.GlbCurrView.oClientInfo234Model);
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
//     that.GlbCurrView.oClientInfo234Model.forEach(function (item) {
//         oMultiInput.addToken(new Token({
//             text: item.client
//         }));
//     })
// },

// onSearchClient_Util_Info234: function (oEvent) {
//     var sValue = oEvent.getParameter("value");
//     var oFilter = new Filter("client", sap.ui.model.FilterOperator.Contains, sValue);
//     var oBinding = oEvent.getParameter("itemsBinding");
//     oBinding.filter([oFilter]);
// },

// client Frag End

// Record Type Frag Start
onOpenrecord_typeFragment_Util_Info234: function (oEvent) {
    if (this.currentView.orecord_type_Info234_Frag) {
        this.currentView.orecord_type_Info234_Frag = undefined;
    } 
    if (!this.currentView.orecord_type_Info234_Frag) {
        that.GlbCurrView.busy.open()
        this.currentView.orecord_type_Info234_Frag = sap.ui.xmlfragment("masterdata.fragments.dialogs.Info_234.recordType_Info234", that.GlbCurrView);
        this.currentView.getView().addDependent(that.GlbCurrView.orecord_type_Info234_Frag);
        var orecord_typeInfo234 = that.GlbCurrView.getView().getModel("globalMainData_Info234").oData
        var lookup = {};
        var items = orecord_typeInfo234;
        var result = [];
        for (var item, i = 0; item = items[i++];) {
            var name = item.record_type;
            if (!(name in lookup)) {
                lookup[name] = 1;
                result.push({ "record_type": name });
            }
        }
        var orecord_typeInfo234Model = new JSONModel(result);
        this.currentView.getView().setModel(orecord_typeInfo234Model, "record_typeInfo234GlobalData")
        this.currentView.orecord_type_Info234_Frag.setModel(orecord_typeInfo234Model, "record_typeInfo234Data");

    }
    that.GlbCurrView.busy.close()
    this.currentView.orecord_type_Info234_Frag.open();

},


onSelectionrecord_type_Util_Info234: function (oEvent) {
    var aContexts = oEvent.getParameter("selectedContexts");
    var oMultiInput = this.currentView.getView().byId("id_Info234_record_type");
    var oSelectedContextrecord_type_Info234 = [];
    var oModel = this.currentView.getView().getModel("record_typeInfo234GlobalData");
    for (var i = 0; i < aContexts.length; i++) {
        oSelectedContextrecord_type_Info234.push(aContexts[i]);
    }
    that.GlbCurrView.orecord_typeInfo234Model = [];
    //Check for Unique Data
    // $.each(oSelectedContextrecord_type_Info234, function (i, el) {
    //     if ($.inArray(oSelectedContextrecord_type_Info234[i].ProductId, that.GlbCurrView.orecord_typeInfo234Model) === -1) that.GlbCurrView.orecord_typeInfo234Model.push(oSelectedContextrecord_type_Info234[i].getObject());
    // });


    //03-04-24 SAP Recommendation for slow loops @gnaneshwar.
    $.each(oSelectedContextrecord_type_Info234, function (i, el) {
        if ($.inArray(el.ProductId, that.GlbCurrView.orecord_typeInfo234Model) === -1) that.GlbCurrView.orecord_typeInfo234Model.push(el.getObject());
    });
    oModel.setProperty("/tokens1", that.GlbCurrView.orecord_typeInfo234Model);
    var oItemTemplateCC;
    oItemTemplateCC = oMultiInput.getTokens()[0];
    //Create the Template for token
    if (!oItemTemplateCC) {
        oItemTemplateCC = new Token({
            text: "{record_type}",
            key: "{record_type}"
        });
    } else {
        oItemTemplateCC = oMultiInput.getTokens()[0].clone();
    }
    //Bind the tokens
    that.GlbCurrView.orecord_typeInfo234Model.forEach(function (item) {
        oMultiInput.addToken(new Token({
            text: item.record_type
        }));
    })
},

onSearchrecord_type_Util_Info234: function (oEvent) {
    var sValue = oEvent.getParameter("value");
    var oFilter = new Filter("record_type", sap.ui.model.FilterOperator.Contains, sValue);
    var oBinding = oEvent.getParameter("itemsBinding");
    oBinding.filter([oFilter]);
},

// Record Type Frag End

// Reply Id Frag Start
onOpenreply_idFragment_Util_Info234: function (oEvent) {
    if (this.currentView.oreply_id_Info234_Frag) {
        this.currentView.oreply_id_Info234_Frag = undefined;
    } 
    if (!this.currentView.oreply_id_Info234_Frag) {
        that.GlbCurrView.busy.open()
        this.currentView.oreply_id_Info234_Frag = sap.ui.xmlfragment("masterdata.fragments.dialogs.Info_234.replyId_Info234", that.GlbCurrView);
        this.currentView.getView().addDependent(that.GlbCurrView.oreply_id_Info234_Frag);
        var oreply_idInfo234 = that.GlbCurrView.getView().getModel("globalMainData_Info234").oData
        var lookup = {};
        var items = oreply_idInfo234;
        var result = [];
        for (var item, i = 0; item = items[i++];) {
            var name = item.reply_id;
            if (!(name in lookup)) {
                lookup[name] = 1;
                result.push({ "reply_id": name });
            }
        }
        var oreply_idInfo234Model = new JSONModel(result);
        this.currentView.getView().setModel(oreply_idInfo234Model, "reply_idInfo234GlobalData")
        this.currentView.oreply_id_Info234_Frag.setModel(oreply_idInfo234Model, "reply_idInfo234Data");

    }
    that.GlbCurrView.busy.close()
    this.currentView.oreply_id_Info234_Frag.open();

},


onSelectionreply_id_Util_Info234: function (oEvent) {
    var aContexts = oEvent.getParameter("selectedContexts");
    var oMultiInput = this.currentView.getView().byId("id_Info234_reply_id");
    var oSelectedContextreply_id_Info234 = [];
    var oModel = this.currentView.getView().getModel("reply_idInfo234GlobalData");
    for (var i = 0; i < aContexts.length; i++) {
        oSelectedContextreply_id_Info234.push(aContexts[i]);
    }
    that.GlbCurrView.oreply_idInfo234Model = [];
    //Check for Unique Data
    // $.each(oSelectedContextreply_id_Info234, function (i, el) {
    //     if ($.inArray(oSelectedContextreply_id_Info234[i].ProductId, that.GlbCurrView.oreply_idInfo234Model) === -1) that.GlbCurrView.oreply_idInfo234Model.push(oSelectedContextreply_id_Info234[i].getObject());
    // });


    //03-04-24 SAP Recommendation for slow loops @gnaneshwar.
    $.each(oSelectedContextreply_id_Info234, function (i, el) {
        if ($.inArray(el.ProductId, that.GlbCurrView.oreply_idInfo234Model) === -1) that.GlbCurrView.oreply_idInfo234Model.push(el.getObject());
    });
    oModel.setProperty("/tokens1", that.GlbCurrView.oreply_idInfo234Model);
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
    that.GlbCurrView.oreply_idInfo234Model.forEach(function (item) {
        oMultiInput.addToken(new Token({
            text: item.reply_id
        }));
    })
},

onSearchreply_id_Util_Info234: function (oEvent) {
    var sValue = oEvent.getParameter("value");
    var oFilter = new Filter("reply_id", sap.ui.model.FilterOperator.Contains, sValue);
    var oBinding = oEvent.getParameter("itemsBinding");
    oBinding.filter([oFilter]);
},

// Reply Id Frag End


// sales_order_code Frag Start
onOpensales_order_codeFragment_Util_Info234: function (oEvent) {
    if (this.currentView.osales_order_code_Info234_Frag) {
        this.currentView.osales_order_code_Info234_Frag = undefined;
    } 
    if (!this.currentView.osales_order_code_Info234_Frag) {
        that.GlbCurrView.busy.open()
        this.currentView.osales_order_code_Info234_Frag = sap.ui.xmlfragment("masterdata.fragments.dialogs.Info_234.sales_order_code_Info234", that.GlbCurrView);
        this.currentView.getView().addDependent(that.GlbCurrView.osales_order_code_Info234_Frag);
        var osales_order_codeInfo234 = that.GlbCurrView.getView().getModel("globalMainData_Info234").oData
        var lookup = {};
        var items = osales_order_codeInfo234;
        var result = [];
        for (var item, i = 0; item = items[i++];) {
            var name = item.sales_order_code;
            if (!(name in lookup)) {
                lookup[name] = 1;
                result.push({ "sales_order_code": name });
            }
        }
        var osales_order_codeInfo234Model = new JSONModel(result);
        this.currentView.getView().setModel(osales_order_codeInfo234Model, "sales_order_codeInfo234GlobalData")
        this.currentView.osales_order_code_Info234_Frag.setModel(osales_order_codeInfo234Model, "sales_order_codeInfo234Data");

    }
    that.GlbCurrView.busy.close()
    this.currentView.osales_order_code_Info234_Frag.open();

},


onSelectionsales_order_code_Util_Info234: function (oEvent) {
    var aContexts = oEvent.getParameter("selectedContexts");
    var oMultiInput = this.currentView.getView().byId("id_Info234_sales_order_code");
    var oSelectedContextsales_order_code_Info234 = [];
    var oModel = this.currentView.getView().getModel("sales_order_codeInfo234GlobalData");
    for (var i = 0; i < aContexts.length; i++) {
        oSelectedContextsales_order_code_Info234.push(aContexts[i]);
    }
    that.GlbCurrView.osales_order_codeInfo234Model = [];
    //Check for Unique Data
    // $.each(oSelectedContextsales_order_code_Info234, function (i, el) {
    //     if ($.inArray(oSelectedContextsales_order_code_Info234[i].ProductId, that.GlbCurrView.osales_order_codeInfo234Model) === -1) that.GlbCurrView.osales_order_codeInfo234Model.push(oSelectedContextsales_order_code_Info234[i].getObject());
    // });

    //03-04-24 SAP Recommendation for slow loops @gnaneshwar.
    $.each(oSelectedContextsales_order_code_Info234, function (i, el) {
        if ($.inArray(el.ProductId, that.GlbCurrView.osales_order_codeInfo234Model) === -1) that.GlbCurrView.osales_order_codeInfo234Model.push(el.getObject());
    });
    oModel.setProperty("/tokens1", that.GlbCurrView.osales_order_codeInfo234Model);
    var oItemTemplateCC;
    oItemTemplateCC = oMultiInput.getTokens()[0];
    //Create the Template for token
    if (!oItemTemplateCC) {
        oItemTemplateCC = new Token({
            text: "{sales_order_code}",
            key: "{sales_order_code}"
        });
    } else {
        oItemTemplateCC = oMultiInput.getTokens()[0].clone();
    }
    //Bind the tokens
    that.GlbCurrView.osales_order_codeInfo234Model.forEach(function (item) {
        oMultiInput.addToken(new Token({
            text: item.sales_order_code
        }));
    })
},

onSearchsales_order_code_Util_Info234: function (oEvent) {
    var sValue = oEvent.getParameter("value");
    var oFilter = new Filter("sales_order_code", sap.ui.model.FilterOperator.Contains, sValue);
    var oBinding = oEvent.getParameter("itemsBinding");
    oBinding.filter([oFilter]);
},

// sales_order_code Frag End


// issued_date Frag Start
onOpenissued_dateFragment_Util_Info234: function (oEvent) {
    if (this.currentView.oissued_date_Info234_Frag) {
        this.currentView.oissued_date_Info234_Frag = undefined;
    } 
    if (!this.currentView.oissued_date_Info234_Frag) {
        that.GlbCurrView.busy.open()
        this.currentView.oissued_date_Info234_Frag = sap.ui.xmlfragment("masterdata.fragments.dialogs.Info_234.issued_date_Info234", that.GlbCurrView);
        this.currentView.getView().addDependent(that.GlbCurrView.oissued_date_Info234_Frag);
        var oissued_dateInfo234 = that.GlbCurrView.getView().getModel("globalMainData_Info234").oData
        var lookup = {};
        var items = oissued_dateInfo234;
        var result = [];
        for (var item, i = 0; item = items[i++];) {
            var name = item.issued_date;
            if (!(name in lookup)) {
                lookup[name] = 1;
                result.push({ "issued_date": name });
            }
        }
        var oissued_dateInfo234Model = new JSONModel(result);
        this.currentView.getView().setModel(oissued_dateInfo234Model, "issued_dateInfo234GlobalData")
        this.currentView.oissued_date_Info234_Frag.setModel(oissued_dateInfo234Model, "issued_dateInfo234Data");

    }
    that.GlbCurrView.busy.close()
    this.currentView.oissued_date_Info234_Frag.open();

},


onSelectionissued_date_Util_Info234: function (oEvent) {
    var aContexts = oEvent.getParameter("selectedContexts");
    var oMultiInput = this.currentView.getView().byId("id_Info234_issued_date");
    var oSelectedContextissued_date_Info234 = [];
    var oModel = this.currentView.getView().getModel("issued_dateInfo234GlobalData");
    for (var i = 0; i < aContexts.length; i++) {
        oSelectedContextissued_date_Info234.push(aContexts[i]);
    }
    that.GlbCurrView.oissued_dateInfo234Model = [];
    //Check for Unique Data
    // $.each(oSelectedContextissued_date_Info234, function (i, el) {
    //     if ($.inArray(oSelectedContextissued_date_Info234[i].ProductId, that.GlbCurrView.oissued_dateInfo234Model) === -1) that.GlbCurrView.oissued_dateInfo234Model.push(oSelectedContextissued_date_Info234[i].getObject());
    // });

    //03-04-24 SAP Recommendation for slow loops @gnaneshwar.
    $.each(oSelectedContextissued_date_Info234, function (i, el) {
        if ($.inArray(el.ProductId, that.GlbCurrView.oissued_dateInfo234Model) === -1) that.GlbCurrView.oissued_dateInfo234Model.push(el.getObject());
    });
    oModel.setProperty("/tokens1", that.GlbCurrView.oissued_dateInfo234Model);
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
    that.GlbCurrView.oissued_dateInfo234Model.forEach(function (item) {
        oMultiInput.addToken(new Token({
            text: item.issued_date
        }));
    })
},

onSearchissued_date_Util_Info234: function (oEvent) {
    var sValue = oEvent.getParameter("value");
    var oFilter = new Filter("issued_date", sap.ui.model.FilterOperator.Contains, sValue);
    var oBinding = oEvent.getParameter("itemsBinding");
    oBinding.filter([oFilter]);
},

// issued_date Frag End


// unified_model_number Frag Start
onOpenunified_model_numberFragment_Util_Info234: function (oEvent) {
    if (this.currentView.ounified_model_number_Info234_Frag) {
        this.currentView.ounified_model_number_Info234_Frag = undefined;
    } 
    if (!this.currentView.ounified_model_number_Info234_Frag) {
        that.GlbCurrView.busy.open()
        this.currentView.ounified_model_number_Info234_Frag = sap.ui.xmlfragment("masterdata.fragments.dialogs.Info_234.unified_model_number_Info234", that.GlbCurrView);
        this.currentView.getView().addDependent(that.GlbCurrView.ounified_model_number_Info234_Frag);
        var ounified_model_numberInfo234 = that.GlbCurrView.getView().getModel("globalMainData_Info234").oData
        var lookup = {};
        var items = ounified_model_numberInfo234;
        var result = [];
        for (var item, i = 0; item = items[i++];) {
            var name = item.unified_model_number;
            if (!(name in lookup)) {
                lookup[name] = 1;
                result.push({ "unified_model_number": name });
            }
        }
        var ounified_model_numberInfo234Model = new JSONModel(result);
        this.currentView.getView().setModel(ounified_model_numberInfo234Model, "unified_model_numberInfo234GlobalData")
        this.currentView.ounified_model_number_Info234_Frag.setModel(ounified_model_numberInfo234Model, "unified_model_numberInfo234Data");

    }
    that.GlbCurrView.busy.close()
    this.currentView.ounified_model_number_Info234_Frag.open();

},


onSelectionunified_model_number_Util_Info234: function (oEvent) {
    var aContexts = oEvent.getParameter("selectedContexts");
    var oMultiInput = this.currentView.getView().byId("id_Info234_unified_model_number");
    var oSelectedContextunified_model_number_Info234 = [];
    var oModel = this.currentView.getView().getModel("unified_model_numberInfo234GlobalData");
    for (var i = 0; i < aContexts.length; i++) {
        oSelectedContextunified_model_number_Info234.push(aContexts[i]);
    }
    that.GlbCurrView.ounified_model_numberInfo234Model = [];
    //Check for Unique Data
    // $.each(oSelectedContextunified_model_number_Info234, function (i, el) {
    //     if ($.inArray(oSelectedContextunified_model_number_Info234[i].ProductId, that.GlbCurrView.ounified_model_numberInfo234Model) === -1) that.GlbCurrView.ounified_model_numberInfo234Model.push(oSelectedContextunified_model_number_Info234[i].getObject());
    // });

    //03-04-24 SAP Recommendation for slow loops @gnaneshwar.
    $.each(oSelectedContextunified_model_number_Info234, function (i, el) {
        if ($.inArray(el.ProductId, that.GlbCurrView.ounified_model_numberInfo234Model) === -1) that.GlbCurrView.ounified_model_numberInfo234Model.push(el.getObject());
    });
    oModel.setProperty("/tokens1", that.GlbCurrView.ounified_model_numberInfo234Model);
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
    that.GlbCurrView.ounified_model_numberInfo234Model.forEach(function (item) {
        oMultiInput.addToken(new Token({
            text: item.unified_model_number
        }));
    })
},

onSearchunified_model_number_Util_Info234: function (oEvent) {
    var sValue = oEvent.getParameter("value");
    var oFilter = new Filter("unified_model_number", sap.ui.model.FilterOperator.Contains, sValue);
    var oBinding = oEvent.getParameter("itemsBinding");
    oBinding.filter([oFilter]);
},

// unified_model_number Frag End

// suplier_code Frag Start
onOpensuplier_codeFragment_Util_Info234: function (oEvent) {
    if (this.currentView.osuplier_code_Info234_Frag) {
        this.currentView.osuplier_code_Info234_Frag = undefined;
    } 
    if (!this.currentView.osuplier_code_Info234_Frag) {
        that.GlbCurrView.busy.open()
        this.currentView.osuplier_code_Info234_Frag = sap.ui.xmlfragment("masterdata.fragments.dialogs.Info_234.suplier_code_Info234", that.GlbCurrView);
        this.currentView.getView().addDependent(that.GlbCurrView.osuplier_code_Info234_Frag);
        var osuplier_codeInfo234 = that.GlbCurrView.getView().getModel("globalMainData_Info234").oData
        var lookup = {};
        var items = osuplier_codeInfo234;
        var result = [];
        for (var item, i = 0; item = items[i++];) {
            var name = item.suplier_code;
            if (!(name in lookup)) {
                lookup[name] = 1;
                result.push({ "suplier_code": name });
            }
        }
        var osuplier_codeInfo234Model = new JSONModel(result);
        this.currentView.getView().setModel(osuplier_codeInfo234Model, "suplier_codeInfo234GlobalData")
        this.currentView.osuplier_code_Info234_Frag.setModel(osuplier_codeInfo234Model, "suplier_codeInfo234Data");

    }
    that.GlbCurrView.busy.close()
    this.currentView.osuplier_code_Info234_Frag.open();

},


onSelectionsuplier_code_Util_Info234: function (oEvent) {
    var aContexts = oEvent.getParameter("selectedContexts");
    var oMultiInput = this.currentView.getView().byId("id_Info234_suplier_code");
    var oSelectedContextsuplier_code_Info234 = [];
    var oModel = this.currentView.getView().getModel("suplier_codeInfo234GlobalData");
    for (var i = 0; i < aContexts.length; i++) {
        oSelectedContextsuplier_code_Info234.push(aContexts[i]);
    }
    that.GlbCurrView.osuplier_codeInfo234Model = [];
    //Check for Unique Data
    // $.each(oSelectedContextsuplier_code_Info234, function (i, el) {
    //     if ($.inArray(oSelectedContextsuplier_code_Info234[i].ProductId, that.GlbCurrView.osuplier_codeInfo234Model) === -1) that.GlbCurrView.osuplier_codeInfo234Model.push(oSelectedContextsuplier_code_Info234[i].getObject());
    // });

    //03-04-24 SAP Recommendation for slow loops @gnaneshwar.
    $.each(oSelectedContextsuplier_code_Info234, function (i, el) {
        if ($.inArray(el.ProductId, that.GlbCurrView.osuplier_codeInfo234Model) === -1) that.GlbCurrView.osuplier_codeInfo234Model.push(el.getObject());
    });
    oModel.setProperty("/tokens1", that.GlbCurrView.osuplier_codeInfo234Model);
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
    that.GlbCurrView.osuplier_codeInfo234Model.forEach(function (item) {
        oMultiInput.addToken(new Token({
            text: item.suplier_code
        }));
    })
},

onSearchsuplier_code_Util_Info234: function (oEvent) {
    var sValue = oEvent.getParameter("value");
    var oFilter = new Filter("suplier_code", sap.ui.model.FilterOperator.Contains, sValue);
    var oBinding = oEvent.getParameter("itemsBinding");
    oBinding.filter([oFilter]);
},

// suplier_code Frag End


onCloseDialog_Util_Info234: function (oEvent) {

    if (that.GlbCurrView.oClient_Info234_Frag) {
       // that.GlbCurrView.oClient_Info234_Frag.close()
       // that.GlbCurrView.oClient_Info234_Frag.destroy()
       // delete that.GlbCurrView.oClient_Info234_Frag;
        that.GlbCurrView.oClient_Info234_Frag = undefined;
        that.GlbCurrView.oClient_Info234_Frag = null
        
    }

    if (that.GlbCurrView.oreply_id_Info234_Frag) {
        //that.GlbCurrView.oreply_id_Info234_Frag.close()
        //that.GlbCurrView.oreply_id_Info234_Frag.destroy()
        //delete that.GlbCurrView.oreply_id_Info234_Frag;
        that.GlbCurrView.oreply_id_Info234_Frag = undefined;
        that.GlbCurrView.oreply_id_Info234_Frag = null;
        
    }
    if (that.GlbCurrView.orecord_type_Info234_Frag) {
        //that.GlbCurrView.orecord_type_Info234_Frag.close()
        //that.GlbCurrView.orecord_type_Info234_Frag.destroy()
        //delete that.GlbCurrView.orecord_type_Info234_Frag;
        that.GlbCurrView.orecord_type_Info234_Frag = undefined;
        that.GlbCurrView.orecord_type_Info234_Frag = null;
        
    }

    if (that.GlbCurrView.osales_order_code_Info234_Frag) {
      //  that.GlbCurrView.osales_order_code_Info234_Frag.close()
       // that.GlbCurrView.osales_order_code_Info234_Frag.destroy()
       // delete that.GlbCurrView.osales_order_code_Info234_Frag;
        that.GlbCurrView.osales_order_code_Info234_Frag = undefined;
        that.GlbCurrView.osales_order_code_Info234_Frag = null;
        
    }
    if (that.GlbCurrView.oissued_date_Info234_Frag) {
     //   that.GlbCurrView.oissued_date_Info234_Frag.close()
      //  that.GlbCurrView.oissued_date_Info234_Frag.destroy()
       // delete that.GlbCurrView.oissued_date_Info234_Frag;
        that.GlbCurrView.oissued_date_Info234_Frag = undefined;
        that.GlbCurrView.oissued_date_Info234_Frag = null;
        
    }
    if (that.GlbCurrView.ounified_model_number_Info234_Frag) {
       // that.GlbCurrView.ounified_model_number_Info234_Frag.close()
       // that.GlbCurrView.ounified_model_number_Info234_Frag.destroy()
       // delete that.GlbCurrView.ounified_model_number_Info234_Frag;
        that.GlbCurrView.ounified_model_number_Info234_Frag = undefined;
        that.GlbCurrView.ounified_model_number_Info234_Frag = null;
        
    }

    if (that.GlbCurrView.osuplier_code_Info234_Frag) {
       // that.GlbCurrView.osuplier_code_Info234_Frag.close()
       // that.GlbCurrView.osuplier_code_Info234_Frag.destroy()
       // delete that.GlbCurrView.osuplier_code_Info234_Frag;
        that.GlbCurrView.osuplier_code_Info234_Frag = undefined;
        that.GlbCurrView.osuplier_code_Info234_Frag = null;
        
    }

},

//04-04-24 Depprecated calls issue for excel SAP Recommendation @gnaneshwar 
onExportSelectedInfo_234Table: function (oEvent) {
    var oselectedModel = new sap.ui.model.json.JSONModel(that.GlbCurrView.getView().getModel("Info234_Model").oData);

    var aCols = [
        { label: "Record Type", property: "record_type" },
        { label: "Reply Id", property: "reply_id" },
        { label: "Sales Order Code", property: "sales_order_code" },
        { label: "Issued Date", property: "issued_date" },
        { label: "Unified Model Number", property: "unified_model_number" },
        { label: "Supplier Code", property: "supplier_code" },
        { label: "Description 1", property: "description_1" },
        { label: "Description 2", property: "description_2" },
        { label: "Description 3", property: "description_3" },
        { label: "Description 4", property: "description_4" },
        { label: "Description 5", property: "description_5" },
        { label: "Description 6", property: "description_6" },
        { label: "Description 7", property: "description_7" },
        { label: "Filler", property: "filler" },
        { label: "Revised Id", property: "revised_id" },
        { label: "Filler 2", property: "filler_2" },
        { label: "Printer Spec 8", property: "printer_spec_8" },
        { label: "Printer Spec 9", property: "printer_spec_9" },
        { label: "Printer Spec 10", property: "printer_spec_10" },
        { label: "Printer Spec 11", property: "printer_spec_11" },
        { label: "Printer Spec 12", property: "printer_spec_12" },
        { label: "Printer Spec 13", property: "printer_spec_13" },
        { label: "Printer Spec 14", property: "printer_spec_14" },
        { label: "Revised Id 3", property: "revised_id_3" },
        { label: "Filler 3", property: "filler_3" },
        { label: "Printer Spec 15", property: "printer_spec_15" },
        { label: "Printer Spec 16", property: "printer_spec_16" },
        { label: "Printer Spec 17", property: "printer_spec_17" },
        { label: "Printer Spec 18", property: "printer_spec_18" },
        { label: "Printer Spec 19", property: "printer_spec_19" },
        { label: "Printer Spec 20", property: "printer_spec_20" },
        { label: "Filler 4", property: "filler_4" },
        { label: "Revised Id 4", property: "revised_id_4" },
        { label: "Filler 5", property: "filler_5" },
        { label: "Delete Indicator", property: "delete_indicator" },
        { label: "Created On", property: "created_on" },
        { label: "Changed On", property: "changed_on" },
        { label: "Change Time", property: "change_time" }
    ];

    var oSettings = {
        workbook: { columns: aCols,
            context: {
                sheetName: 'GCMS_INFO_234'
            },
         },
        dataSource: oselectedModel.getData(),
        fileName: "GCMS_INFO_234.xlsx",
        
    };

    var oSpreadsheet = new sap.ui.export.Spreadsheet(oSettings);
    oSpreadsheet.build().then(function () {
        oSpreadsheet.destroy();
    });
},







            //                 onExportSelectedInfo_234Table: function (oEvent) {
                
            //   //  var selectedITemsLength = this.currentView.getView().byId("idTrdPartTable").getSelectedItems().length
               
                    
            //         var oselectedModel = new sap.ui.model.json.JSONModel(that.GlbCurrView.getView().getModel("Info234_Model").oData)
                
               
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
            //             name: "Record Type",
            //             template: {
            //                 content: "{record_type}"
            //             }
            //         }, {
            //             name: "Reply Id",
            //             template: {
            //                 content: "{reply_id}"
            //             }
            //         }, {
            //             name: "Sales Order Code",
            //             template: {
            //                 content: "{sales_order_code}"
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
            //             name: "Description 1",
            //             template: {
            //                 content: "{description_1}"
            //             }
            //         }, {
            //             name: "Description 2",
            //             template: {
            //                 content: "{description_2}"
            //             }
            //         }, {
            //             name: "Description 3",
            //             template: {
            //                 content: "{description_3}"
            //             }
            //         }, {
            //             name: "Description 4",
            //             template: {
            //                 content: "{description_4}"
            //             }
            //         }, {
            //             name: "Description 5",
            //             template: {
            //                 content: "{description_5}"
            //             }
            //         }, {
            //             name: "Description 6",
            //             template: {
            //                 content: "{description_6}"
            //             }
            //         },{
            //             name: "Description 7",
            //             template: {
            //                 content: "{description_7}"
            //             }
            //         }, {
            //             name: "Filler",
            //             template: {
            //                 content: "{filler}"
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
            //             name: "Printer Spec 8",
            //             template: {
            //                 content: "{printer_spec_8}"
            //             }
            //         }, {
            //             name: "Printer Spec 9",
            //             template: {
            //                 content: "{printer_spec_9}"
            //             }
            //         }, {
            //             name: "Printer Spec 10",
            //             template: {
            //                 content: "{printer_spec_10}"
            //             }
            //         }, {
            //             name: "Printer Spec 11",
            //             template: {
            //                 content: "{printer_spec_11}"
            //             }
            //         }, {
            //             name: "Printer Spec 12",
            //             template: {
            //                 content: "{printer_spec_12}"
            //             }
            //         }, {
            //             name: "Printer Spec 13",
            //             template: {
            //                 content: "{printer_spec_13}"
            //             }
            //         }, {
            //             name: "Printer Spec 14",
            //             template: {
            //                 content: "{printer_spec_14}"
            //             }
            //         }, {
            //             name: "Revised Id 3",
            //             template: {
            //                 content: "{revised_id_3}"
            //             }
            //         }, {
            //             name: "Filler 3",
            //             template: {
            //                 content: "{filler_3}"
            //             }
            //         }, {
            //             name: "Printer Spec 15",
            //             template: {
            //                 content: "{printer_spec_15}"
            //             }
            //         }, {
            //             name: "Printer Spec 16",
            //             template: {
            //                 content: "{printer_spec_16}"
            //             }
            //         }, {
            //             name: "Printer Spec 17",
            //             template: {
            //                 content: "{printer_spec_17}"
            //             }
            //         }, {
            //             name: "Printer Spec 18",
            //             template: {
            //                 content: "{printer_spec_18}"
            //             }
            //         }, {
            //             name: "Printer Spec 19",
            //             template: {
            //                 content: "{printer_spec_19}"
            //             }
            //         }, {
            //             name: "Printer Spec 20",
            //             template: {
            //                 content: "{printer_spec_20}"
            //             }
            //         }, {
            //             name: "Filler 4",
            //             template: {
            //                 content: "{filler_4}"
            //             }
            //         }, {
            //             name: "Revised Id 4",
            //             template: {
            //                 content: "{revised_id_4}"
            //             }
            //         }, {
            //             name: "Filler 5",
            //             template: {
            //                 content: "{filler_5}"
            //             }
            //         }, {
            //             name: "Delete Indicator",
            //             template: {
            //                 content: "{delete_indicator}"
            //             }
            //          }, {
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
            //         }]
    
            //     });
    
            //     //* download exported file
    
            //     oExport.saveFile("GCMS INFO 234").always(function () {
    
            //         this.destroy();
    
            //     });
            // },

            onGoToReport_Util_Info234: function () {
                that.GlbCurrView.busy.open()
    
                // get all plant tokens
    
                // var Info234_Client_Tokens = this.currentView.getView().byId("id_Info234_Client").getTokens();
                // that.GlbCurrView.sInfo234_ClientValues = Info234_Client_Tokens.map(function (oToken) {
                    // return oToken.getText();
                // }).join(",");
    
                var Info234_record_type_Tokens = this.currentView.getView().byId("id_Info234_record_type").getTokens();
                that.GlbCurrView.sInfo234_record_type_TokensValues = Info234_record_type_Tokens.map(function (oToken) {
                    return oToken.getText();
                }).join(",");                 
            
                var Info234_reply_id_Tokens = this.currentView.getView().byId("id_Info234_reply_id").getTokens();
                that.GlbCurrView.sInfo234_reply_id_Values = Info234_reply_id_Tokens.map(function (oToken) {
                    return oToken.getText();
                }).join(",");
    
                // get all material group tokens
                var Info234_sales_order_code_Tokens = this.currentView.getView().byId("id_Info234_sales_order_code").getTokens();
                that.GlbCurrView.sInfo234_sales_order_code_TokensValues = Info234_sales_order_code_Tokens.map(function (oToken) {
                    return oToken.getText();
                }).join(",");
    
    
                var Info234_issued_date_Tokens = this.currentView.getView().byId("id_Info234_issued_date").getTokens();
                that.GlbCurrView.sInfo234_issued_date_TokensValues = Info234_issued_date_Tokens.map(function (oToken) {
                    return oToken.getText();
                }).join(",");

                var Info234_unified_model_number_Tokens = this.currentView.getView().byId("id_Info234_unified_model_number").getTokens();
                that.GlbCurrView.sInfo234_unified_model_number_TokensValues = Info234_unified_model_number_Tokens.map(function (oToken) {
                    return oToken.getText();
                }).join(",");

                var Info234_suplier_code_Tokens = this.currentView.getView().byId("id_Info234_suplier_code").getTokens();
                that.GlbCurrView.sInfo234_suplier_code_TokensValues = Info234_suplier_code_Tokens.map(function (oToken) {
                    return oToken.getText();
                }).join(",");

             

                var filters = [];
    
                // if (that.GlbCurrView.sInfo234_ClientValues !== "") {
    
                //     var Info234_ClientVal = that.GlbCurrView.sInfo234_ClientValues.split(",");
                //     if (Info234_ClientVal.length > 0) {
                //         $.each(Info234_ClientVal, function (i, UIitem) {
                //             filters.push(new sap.ui.model.Filter("client", sap.ui.model.FilterOperator.Contains, UIitem));
                //         });
                //     };
                // }
              
                if (that.GlbCurrView.sInfo234_record_type_TokensValues !== "") {
    
                    var Info234_record_typeVal = that.GlbCurrView.sInfo234_record_type_TokensValues.split(",");
                    if (Info234_record_typeVal.length > 0) {
                        $.each(Info234_record_typeVal, function (i, UIitem) {
                            filters.push(new sap.ui.model.Filter("record_type", sap.ui.model.FilterOperator.Contains, UIitem));
                        });
                    };
                }

                if (that.GlbCurrView.sInfo234_reply_id_Values !== "") {
    
                    var Info234_ReplyIdVal = that.GlbCurrView.sInfo234_reply_id_Values.split(",");
                    if (Info234_ReplyIdVal.length > 0) {
                        $.each(Info234_ReplyIdVal, function (i, UIitem) {
                            filters.push(new sap.ui.model.Filter("reply_id", sap.ui.model.FilterOperator.Contains, UIitem));
                        });
                    };
                }

                
                if (that.GlbCurrView.sInfo234_sales_order_code_TokensValues !== "") {
    
                    var Info234_SalesCCVal = that.GlbCurrView.sInfo234_sales_order_code_TokensValues.split(",");
                    if (Info234_SalesCCVal.length > 0) {
                        $.each(Info234_SalesCCVal, function (i, UIitem) {
                            filters.push(new sap.ui.model.Filter("sales_order_code", sap.ui.model.FilterOperator.Contains, UIitem));
                        });
                    };
                }

                      
                if (that.GlbCurrView.sInfo234_issued_date_TokensValues !== "") {
    
                    var Info234_issued_dateVal = that.GlbCurrView.sInfo234_issued_date_TokensValues.split(",");
                    if (Info234_issued_dateVal.length > 0) {
                        $.each(Info234_issued_dateVal, function (i, UIitem) {
                            filters.push(new sap.ui.model.Filter("issued_date", sap.ui.model.FilterOperator.Contains, UIitem));
                        });
                    };
                }

                if (that.GlbCurrView.sInfo234_unified_model_number_TokensValues !== "") {
    
                    var Info234_unified_model_numberVal = that.GlbCurrView.sInfo234_unified_model_number_TokensValues.split(",");
                    if (Info234_unified_model_numberVal.length > 0) {
                        $.each(Info234_unified_model_numberVal, function (i, UIitem) {
                            filters.push(new sap.ui.model.Filter("unified_model_number", sap.ui.model.FilterOperator.Contains, UIitem));
                        });
                    };
                }

           

                if (that.GlbCurrView.sInfo234_suplier_code_TokensValues !== "") {
    
                    var Info234_suplier_codeVal = that.GlbCurrView.sInfo234_suplier_code_TokensValues.split(",");
                    if (Info234_suplier_codeVal.length > 0) {
                        $.each(Info234_suplier_codeVal, function (i, UIitem) {
                            filters.push(new sap.ui.model.Filter("suplier_code", sap.ui.model.FilterOperator.Contains, UIitem));
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
                    that.GlbCurrView.tableMainModelfiltereddata = new JSONModel(that.GlbCurrView.getView().getModel("globalMainData_Info234").oData);
                    that.GlbCurrView.getView().setModel(that.GlbCurrView.tableMainModelfiltereddata, "Info234_Model")
                  //  this.getDefaultFilteredDateData();
                    this.currentView.getView().byId("idInfo_234_Table").getBinding("items").filter(filters);
                    that.GlbCurrView.filteredData = true;
                    that.GlbCurrView.filteredDataToExport = []
                    var selectedITemsLength = this.currentView.getView().byId("idInfo_234_Table").getBinding("items").aIndices.length
                    that.GlbCurrView.filteredIndices = this.currentView.getView().byId("idInfo_234_Table").getBinding("items").aIndices
                    for (var i = 0; i < selectedITemsLength; i++) {
    
                        that.GlbCurrView.filteredDataToExport.push(that.GlbCurrView.tableMainModelfiltereddata.oData[that.GlbCurrView.filteredIndices[i]]);
                    }
                    var tableFilteredModel = new JSONModel(that.GlbCurrView.filteredDataToExport)
                    that.GlbCurrView.getView().setModel(tableFilteredModel, "Info234_Model")
                   
                    that.GlbCurrView.busy.close()
                
            },



            handleInfo_234_SortButtonPressedUtil: function (oEvent) {

                if (this.currentView.oInfo_234_SortFrag) {
                    this.currentView.oInfo_234_SortFrag = undefined;
                }
                if (!this.currentView.oInfo_234_SortFrag) {
                    that.GlbCurrView.busy.open()
                    this.currentView.oInfo_234_SortFrag = sap.ui.xmlfragment("masterdata.fragments.dialogs.Info_234.ascAndDscSort_Info234", that);
                    this.currentView.getView().addDependent(that.GlbCurrView.oInfo_234_SortFrag);
    
                }
                that.GlbCurrView.busy.close()
                this.currentView.oInfo_234_SortFrag.open();
    
            },
    
            // handle sort
            Info_234_handleSortDialogConfirmUtil: function (oEvent) {
                
        var oTable = this.currentView.byId("idInfo_234_Table"),
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
                var   oTable = this.currentView.byId("idInfo_234_Table");
                var   oBinding = oTable.getBinding("items");
                 var  aSorters = [];
                   aSorters.push(new Sorter("created_on", true));
                   oBinding.sort(aSorters);
               },
          

               onClear234Util : function(oEvent){
              //  this.currentView.getView().byId("id_datePickerTrdPart").setValue("");                
               // this.currentView.getView().byId("id_Info234_Client").setTokens([]);
                this.currentView.getView().byId("id_Info234_record_type").setTokens([]);
                this.currentView.getView().byId("id_Info234_reply_id").setTokens([]);
                this.currentView.getView().byId("id_Info234_sales_order_code").setTokens([]);
                this.currentView.getView().byId("id_Info234_issued_date").setTokens([]);
                this.currentView.getView().byId("id_Info234_unified_model_number").setTokens([]);
                this.currentView.getView().byId("id_Info234_suplier_code").setTokens([]);
                this.currentView.getView().byId("id_datePicker_9").setValue("");
                this.currentView.getView().byId("id_datePicker_10").setValue("");
                var tableModel4 = new sap.ui.model.json.JSONModel();
                that.getView().setModel(tableModel4, "Info234_Model")
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