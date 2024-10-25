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
    function (JSONModel,  MessageToast, MessageBox, Export, ExportTypeCSV,Spreadsheet,BusyDialog,Filter,FilterOperator,Fragment,Token,Sorter ) {
        "use strict";
        that = this;
        return {

            storeView : function(oCurrentView,oGlbCurrView){
                    this.currentView = oCurrentView;
                    that.GlbCurrView = oGlbCurrView;
                    that.GlbCurrView.busy = new BusyDialog();
            },
              
            trdPartVisibleColumns: function () {
              
var sPath =  jQuery.sap.getResourcePath("masterdata/model")+"/tradingPartnerColumns.json";

var trdPartCols = new JSONModel()
trdPartCols.loadData(sPath).then(function(){
    this.currentView.getView().setModel(trdPartCols,"columndataTrdPart");
    this.currentView.getView().byId("id_showHideColumns").setSelectedKeys(["customer_number",
    "parent_code","company_class","area","country_code",
    "short_name","global_group_code","created_on","changed_on"]);
}.bind(this));
      

            },


            handleTrdPartSelectionChangeUtil: function(oEvent){
                    
                    var oItem = oEvent.getParameter("changedItem"),
                    bSelected = oEvent.getParameter("selected"),
                    oContext = oItem.getBindingContext("columndataTrdPart");
                    oContext.oModel.setProperty(oContext.sPath+"/visible",bSelected)
                    oContext.oModel.refresh(true);
                
            },

            setMaxDate_TrdPart: function () {
                var date = new Date();
                var day = date.setDate(date.getDate());
                day = new Date(day).getDate();
                day = day.toString().padStart(2, '0');
                var month = date.getMonth() + 1;
                month = month.toString().padStart(2, '0');
                var year = date.getFullYear().toString();
                that.GlbCurrView.completeDate = month + '-' + day + '-' + year;
                const dateObject = new Date(year, month - 1, day);
                var oDatePicker = this.currentView.getView().byId("id_datePickerTrdPart");
                // Set the value and disable future dates
               // oDatePicker.setValue(that.completeDate);
                oDatePicker.setMaxDate(dateObject);
            },

            setMaxDate_TrdPart2: function () {
                var date1 = new Date();
                var day1 = date1.setDate(date1.getDate());
                day1 = new Date(day1).getDate();
                day1 = day1.toString().padStart(2, '0');
                var month1 = date1.getMonth() + 1;
                month1 = month1.toString().padStart(2, '0');
                var year1 = date1.getFullYear().toString();
                that.GlbCurrView.completeDate1 = month1 + '-' + day1 + '-' + year1;
                const dateObject1 = new Date(year1, month1 - 1, day1);
                var oDatePicker2 = this.currentView.getView().byId("id_datePicker_TrdPart_3");
                // Set the value and disable future dates
               // oDatePicker.setValue(that.completeDate);
                oDatePicker2.setMaxDate(dateObject1);
            },

            onClearTrdPartUtil : function(oEvent){
                that.GlbCurrView.filteredData = false;
                this.currentView.getView().byId("id_datePickerTrdPart").setValue(""); 
                this.currentView.getView().byId("id_datePicker_TrdPart_3").setValue("");               
                this.currentView.getView().byId("id_customer_number_TrdPart").setTokens([]);
                this.currentView.getView().byId("id_company_class_TrdPart").setTokens([]);
                this.currentView.getView().byId("id_area_TrdPart").setTokens([]);
                this.currentView.getView().byId("id_country_code_TrdPart").setTokens([]);
                this.currentView.getView().byId("id_global_group_code_TrdPart").setTokens([]);
            var tableMainModel = new sap.ui.model.json.JSONModel();
            that.getView().setModel(tableMainModel, "TradingPartnerModel")
            that.GlbCurrView.completeDate = ""
            that.GlbCurrView.completeDate1 = ""
            //that.statusKey = ""
            //that.indicatorKey = ""
            that.startDate = ""
            that.endDate = ""
            that.startDate1 = ""
                that.endDate1 = ""
            },

            onReadTradingPartnerTableData : function(){
                
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
                oModel1.read("/zumm_trd_partner",
                {
                    success: function (oData) {      
                        // var oDateFormat = sap.ui.core.format.DateFormat.getDateTimeInstance({
                        //     pattern: "MM-dd-yyyy"
                        // });
                        // for (var i=0;i<oData.results.length;i++){
                        //     oData.results[i].changed_on = oDateFormat.format(oData.results[i].changed_on);
                        // }
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
                        oData.results[i].created_time = new Date(oData.results[i].created_time.ms).toISOString().slice(11, 19)
                      }
                        
                        that.GlbCurrView.getView().setModel(new sap.ui.model.json.JSONModel(oData.results), "globalMainData_TrdPart")
                        that.GlbCurrView.getView().setModel(new sap.ui.model.json.JSONModel(oData.results), "TradingPartnerModel")
                    }
                    else{
                        that.getView().setModel([], "globalMainData_TrdPart");
                          
                    }
                      //this.currentView.getDefaultFilteredDateData();

                    },
                    error: function (oError) {
                        that.GlbCurrView.busy.close()
                    },

                });
            },

            

// Start of filters Trading partner
// Changed On trading Partner
            handleDateChangedOnTrpPartUtil : function(oEvent){

                that.startDate = oEvent.mParameters.value.substr(0,10);
                that.endDate = oEvent.mParameters.value.substr(13,20);  


            },

            handleChangeCreatedOnTrpPartUtil : function(oEvent){

                that.startDate1 = oEvent.mParameters.value.substr(0,10);
                that.endDate1 = oEvent.mParameters.value.substr(13,20);


            },


// customer_number Frag start trading Partner

onOpencustomer_numberFragment_Util_TrpPart: function (oEvent) {
    if (this.currentView.ocustomer_number_TrdPart_Frag) {
        this.currentView.ocustomer_number_TrdPart_Frag = undefined;
    }
    if (!this.currentView.ocustomer_number_TrdPart_Frag) {
        that.GlbCurrView.busy.open()
        this.currentView.ocustomer_number_TrdPart_Frag = sap.ui.xmlfragment("masterdata.fragments.dialogs.TrdPart.customer_number_TrdPart", that.GlbCurrView);
        this.currentView.getView().addDependent(that.GlbCurrView.ocustomer_number_TrdPart_Frag);
        var ocustomer_numberTrdPart = that.GlbCurrView.getView().getModel("globalMainData_TrdPart").oData
        var lookup = {};
        var items = ocustomer_numberTrdPart;
        var result = [];
        for (var item, i = 0; item = items[i++];) {
            var name = item.customer_number;
            if (!(name in lookup)) {
                lookup[name] = 1;
                result.push({ "customer_number": name });
            }
        }
        var ocustomer_numberTrdPartModel = new JSONModel(result);
        this.currentView.getView().setModel(ocustomer_numberTrdPartModel, "customer_numberTrdPartGlobalData")
        this.currentView.ocustomer_number_TrdPart_Frag.setModel(ocustomer_numberTrdPartModel, "customer_numberTrdPartData");

    }
    that.GlbCurrView.busy.close()
    this.currentView.ocustomer_number_TrdPart_Frag.open();

},


onSelectioncustomer_number_Util_TrpPart: function (oEvent) {
    var aContexts = oEvent.getParameter("selectedContexts");
    var oMultiInput = this.currentView.getView().byId("id_customer_number_TrdPart");
    var oSelectedContextcustomer_number_TrdPart = [];
    var oModel = this.currentView.getView().getModel("customer_numberTrdPartGlobalData");
    for (var i = 0; i < aContexts.length; i++) {
        oSelectedContextcustomer_number_TrdPart.push(aContexts[i]);
    }
    that.GlbCurrView.ocustomer_numberTrdPartModel = [];
    //Check for Unique Data
    // $.each(oSelectedContextcustomer_number_TrdPart, function (i, el) {
    //     if ($.inArray(oSelectedContextcustomer_number_TrdPart[i].ProductId, that.GlbCurrView.ocustomer_numberTrdPartModel) === -1) that.GlbCurrView.ocustomer_numberTrdPartModel.push(oSelectedContextcustomer_number_TrdPart[i].getObject());
    // });

    //03-04-24 SAP Recommendation for slow loops @gnaneshwar.
    $.each(oSelectedContextcustomer_number_TrdPart, function (i, el) {
        if ($.inArray(el.ProductId, that.GlbCurrView.ocustomer_numberTrdPartModel) === -1) that.GlbCurrView.ocustomer_numberTrdPartModel.push(el.getObject());
    });
    oModel.setProperty("/tokens1", that.GlbCurrView.ocustomer_numberTrdPartModel);
    var oItemTemplateCC;
    oItemTemplateCC = oMultiInput.getTokens()[0];
    //Create the Template for token
    if (!oItemTemplateCC) {
        oItemTemplateCC = new Token({
            text: "{customer_number}",
            key: "{customer_number}"
        });
    } else {
        oItemTemplateCC = oMultiInput.getTokens()[0].clone();
    }
    //Bind the tokens
    that.GlbCurrView.ocustomer_numberTrdPartModel.forEach(function (item) {
        oMultiInput.addToken(new Token({
            text: item.customer_number
        }));
    })
},

onSearchcustomer_number_Util_TrpPart: function (oEvent) {
    var sValue = oEvent.getParameter("value");
    var oFilter = new Filter("customer_number", sap.ui.model.FilterOperator.Contains, sValue);
    var oBinding = oEvent.getParameter("itemsBinding");
    oBinding.filter([oFilter]);
},


// company_class Frag start trading Partner  

onOpencompany_classFragment_Util_TrpPart: function (oEvent) {
    if (this.currentView.ocompany_class_TrdPart_Frag) {
        this.currentView.ocompany_class_TrdPart_Frag = undefined;
    }
    if (!this.currentView.ocompany_class_TrdPart_Frag) {
        that.GlbCurrView.busy.open()
        this.currentView.ocompany_class_TrdPart_Frag = sap.ui.xmlfragment("masterdata.fragments.dialogs.TrdPart.company_class_TrdPart", that.GlbCurrView);
        this.currentView.getView().addDependent(that.GlbCurrView.ocompany_class_TrdPart_Frag);
        var ocompany_classTrdPart = that.GlbCurrView.getView().getModel("globalMainData_TrdPart").oData
        var lookup = {};
        var items = ocompany_classTrdPart;
        var result = [];
        for (var item, i = 0; item = items[i++];) {
            var name = item.company_class;
            if (!(name in lookup)) {
                lookup[name] = 1;
                result.push({ "company_class": name });
            }
        }
        var ocompany_classTrdPartModel = new JSONModel(result);
        this.currentView.getView().setModel(ocompany_classTrdPartModel, "company_classTrdPartGlobalData")
        this.currentView.ocompany_class_TrdPart_Frag.setModel(ocompany_classTrdPartModel, "company_classTrdPartData");

    }
    that.GlbCurrView.busy.close()
    this.currentView.ocompany_class_TrdPart_Frag.open();

},


onSelectioncompany_class_Util_TrpPart: function (oEvent) {
    var aContexts = oEvent.getParameter("selectedContexts");
    var oMultiInput = this.currentView.getView().byId("id_company_class_TrdPart");
    var oSelectedContextcompany_class_TrdPart = [];
    var oModel = this.currentView.getView().getModel("company_classTrdPartGlobalData");
    for (var i = 0; i < aContexts.length; i++) {
        oSelectedContextcompany_class_TrdPart.push(aContexts[i]);
    }
    that.GlbCurrView.ocompany_classTrdPartModel = [];
    //Check for Unique Data
    // $.each(oSelectedContextcompany_class_TrdPart, function (i, el) {
    //     if ($.inArray(oSelectedContextcompany_class_TrdPart[i].ProductId, that.GlbCurrView.ocompany_classTrdPartModel) === -1) that.GlbCurrView.ocompany_classTrdPartModel.push(oSelectedContextcompany_class_TrdPart[i].getObject());
    // });

    //03-04-24 SAP Recommendation for slow loops @gnaneshwar.
    $.each(oSelectedContextcompany_class_TrdPart, function (i, el) {
        if ($.inArray(el.ProductId, that.GlbCurrView.ocompany_classTrdPartModel) === -1) that.GlbCurrView.ocompany_classTrdPartModel.push(el.getObject());
    });
    oModel.setProperty("/tokens1", that.GlbCurrView.ocompany_classTrdPartModel);
    var oItemTemplateCC;
    oItemTemplateCC = oMultiInput.getTokens()[0];
    //Create the Template for token
    if (!oItemTemplateCC) {
        oItemTemplateCC = new Token({
            text: "{company_class}",
            key: "{company_class}"
        });
    } else {
        oItemTemplateCC = oMultiInput.getTokens()[0].clone();
    }
    //Bind the tokens
    that.GlbCurrView.ocompany_classTrdPartModel.forEach(function (item) {
        oMultiInput.addToken(new Token({
            text: item.company_class
        }));
    })
},

onSearchcompany_class_Util_TrpPart: function (oEvent) {
    var sValue = oEvent.getParameter("value");
    var oFilter = new Filter("company_class", sap.ui.model.FilterOperator.Contains, sValue);
    var oBinding = oEvent.getParameter("itemsBinding");
    oBinding.filter([oFilter]);
},


// area Frag start trading Partner  

onOpenareaFragment_Util_TrpPart: function (oEvent) {
    if (this.currentView.oarea_TrdPart_Frag) {
        this.currentView.oarea_TrdPart_Frag = undefined;
    }
    if (!this.currentView.oarea_TrdPart_Frag) {
        that.GlbCurrView.busy.open()
        this.currentView.oarea_TrdPart_Frag = sap.ui.xmlfragment("masterdata.fragments.dialogs.TrdPart.area_TrdPart", that.GlbCurrView);
        this.currentView.getView().addDependent(that.GlbCurrView.oarea_TrdPart_Frag);
        var oareaTrdPart = that.GlbCurrView.getView().getModel("globalMainData_TrdPart").oData
        var lookup = {};
        var items = oareaTrdPart;
        var result = [];
        for (var item, i = 0; item = items[i++];) {
            var name = item.area;
            if (!(name in lookup)) {
                lookup[name] = 1;
                result.push({ "area": name });
            }
        }
        var oareaTrdPartModel = new JSONModel(result);
        this.currentView.getView().setModel(oareaTrdPartModel, "areaTrdPartGlobalData")
        this.currentView.oarea_TrdPart_Frag.setModel(oareaTrdPartModel, "areaTrdPartData");

    }
    that.GlbCurrView.busy.close()
    this.currentView.oarea_TrdPart_Frag.open();

},


onSelectionarea_Util_TrpPart: function (oEvent) {
    var aContexts = oEvent.getParameter("selectedContexts");
    var oMultiInput = this.currentView.getView().byId("id_area_TrdPart");
    var oSelectedContextarea_TrdPart = [];
    var oModel = this.currentView.getView().getModel("areaTrdPartGlobalData");
    for (var i = 0; i < aContexts.length; i++) {
        oSelectedContextarea_TrdPart.push(aContexts[i]);
    }
    that.GlbCurrView.oareaTrdPartModel = [];
    //Check for Unique Data
    // $.each(oSelectedContextarea_TrdPart, function (i, el) {
    //     if ($.inArray(oSelectedContextarea_TrdPart[i].ProductId, that.GlbCurrView.oareaTrdPartModel) === -1) that.GlbCurrView.oareaTrdPartModel.push(oSelectedContextarea_TrdPart[i].getObject());
    // });

    //03-04-24 SAP Recommendation for slow loops @gnaneshwar.
    $.each(oSelectedContextarea_TrdPart, function (i, el) {
        if ($.inArray(el.ProductId, that.GlbCurrView.oareaTrdPartModel) === -1) that.GlbCurrView.oareaTrdPartModel.push(el.getObject());
    });
    oModel.setProperty("/tokens1", that.GlbCurrView.oareaTrdPartModel);
    var oItemTemplateCC;
    oItemTemplateCC = oMultiInput.getTokens()[0];
    //Create the Template for token
    if (!oItemTemplateCC) {
        oItemTemplateCC = new Token({
            text: "{area}",
            key: "{area}"
        });
    } else {
        oItemTemplateCC = oMultiInput.getTokens()[0].clone();
    }
    //Bind the tokens
    that.GlbCurrView.oareaTrdPartModel.forEach(function (item) {
        oMultiInput.addToken(new Token({
            text: item.area
        }));
    })
},

onSearcharea_Util_TrpPart: function (oEvent) {
    var sValue = oEvent.getParameter("value");
    var oFilter = new Filter("area", sap.ui.model.FilterOperator.Contains, sValue);
    var oBinding = oEvent.getParameter("itemsBinding");
    oBinding.filter([oFilter]);
},



// country_code Frag start trading Partner  

onOpencountry_codeFragment_Util_TrpPart: function (oEvent) {
    if (this.currentView.ocountry_code_TrdPart_Frag) {
        this.currentView.ocountry_code_TrdPart_Frag = undefined;
    }
    if (!this.currentView.ocountry_code_TrdPart_Frag) {
        that.GlbCurrView.busy.open()
        this.currentView.ocountry_code_TrdPart_Frag = sap.ui.xmlfragment("masterdata.fragments.dialogs.TrdPart.country_code_TrdPart", that.GlbCurrView);
        this.currentView.getView().addDependent(that.GlbCurrView.ocountry_code_TrdPart_Frag);
        var ocountry_codeTrdPart = that.GlbCurrView.getView().getModel("globalMainData_TrdPart").oData
        var lookup = {};
        var items = ocountry_codeTrdPart;
        var result = [];
        for (var item, i = 0; item = items[i++];) {
            var name = item.country_code;
            if (!(name in lookup)) {
                lookup[name] = 1;
                result.push({ "country_code": name });
            }
        }
        var ocountry_codeTrdPartModel = new JSONModel(result);
        this.currentView.getView().setModel(ocountry_codeTrdPartModel, "country_codeTrdPartGlobalData")
        this.currentView.ocountry_code_TrdPart_Frag.setModel(ocountry_codeTrdPartModel, "country_codeTrdPartData");

    }
    that.GlbCurrView.busy.close()
    this.currentView.ocountry_code_TrdPart_Frag.open();

},


onSelectioncountry_code_Util_TrpPart: function (oEvent) {
    var aContexts = oEvent.getParameter("selectedContexts");
    var oMultiInput = this.currentView.getView().byId("id_country_code_TrdPart");
    var oSelectedContextcountry_code_TrdPart = [];
    var oModel = this.currentView.getView().getModel("country_codeTrdPartGlobalData");
    for (var i = 0; i < aContexts.length; i++) {
        oSelectedContextcountry_code_TrdPart.push(aContexts[i]);
    }
    that.GlbCurrView.ocountry_codeTrdPartModel = [];
    //Check for Unique Data
    // $.each(oSelectedContextcountry_code_TrdPart, function (i, el) {
    //     if ($.inArray(oSelectedContextcountry_code_TrdPart[i].ProductId, that.GlbCurrView.ocountry_codeTrdPartModel) === -1) that.GlbCurrView.ocountry_codeTrdPartModel.push(oSelectedContextcountry_code_TrdPart[i].getObject());
    // });

    //03-04-24 SAP Recommendation for slow loops @gnaneshwar.
    $.each(oSelectedContextcountry_code_TrdPart, function (i, el) {
        if ($.inArray(el.ProductId, that.GlbCurrView.ocountry_codeTrdPartModel) === -1) that.GlbCurrView.ocountry_codeTrdPartModel.push(el.getObject());
    });
    oModel.setProperty("/tokens1", that.GlbCurrView.ocountry_codeTrdPartModel);
    var oItemTemplateCC;
    oItemTemplateCC = oMultiInput.getTokens()[0];
    //Create the Template for token
    if (!oItemTemplateCC) {
        oItemTemplateCC = new Token({
            text: "{country_code}",
            key: "{country_code}"
        });
    } else {
        oItemTemplateCC = oMultiInput.getTokens()[0].clone();
    }
    //Bind the tokens
    that.GlbCurrView.ocountry_codeTrdPartModel.forEach(function (item) {
        oMultiInput.addToken(new Token({
            text: item.country_code
        }));
    })
},

onSearchcountry_code_Util_TrpPart: function (oEvent) {
    var sValue = oEvent.getParameter("value");
    var oFilter = new Filter("country_code", sap.ui.model.FilterOperator.Contains, sValue);
    var oBinding = oEvent.getParameter("itemsBinding");
    oBinding.filter([oFilter]);
},


// global_group_code Frag start trading Partner  

onOpenglobal_group_codeFragment_Util_TrpPart: function (oEvent) {
    if (this.currentView.oglobal_group_code_TrdPart_Frag) {
        this.currentView.oglobal_group_code_TrdPart_Frag = undefined;
    }
    if (!this.currentView.oglobal_group_code_TrdPart_Frag) {
        that.GlbCurrView.busy.open()
        this.currentView.oglobal_group_code_TrdPart_Frag = sap.ui.xmlfragment("masterdata.fragments.dialogs.TrdPart.global_group_code_TrdPart", that.GlbCurrView);
        this.currentView.getView().addDependent(that.GlbCurrView.oglobal_group_code_TrdPart_Frag);
        var oglobal_group_codeTrdPart = that.GlbCurrView.getView().getModel("globalMainData_TrdPart").oData
        var lookup = {};
        var items = oglobal_group_codeTrdPart;
        var result = [];
        for (var item, i = 0; item = items[i++];) {
            var name = item.global_group_code;
            if (!(name in lookup)) {
                lookup[name] = 1;
                result.push({ "global_group_code": name });
            }
        }
        var oglobal_group_codeTrdPartModel = new JSONModel(result);
        this.currentView.getView().setModel(oglobal_group_codeTrdPartModel, "global_group_codeTrdPartGlobalData")
        this.currentView.oglobal_group_code_TrdPart_Frag.setModel(oglobal_group_codeTrdPartModel, "global_group_codeTrdPartData");

    }
    that.GlbCurrView.busy.close()
    this.currentView.oglobal_group_code_TrdPart_Frag.open();

},


onSelectionglobal_group_code_Util_TrpPart: function (oEvent) {
    var aContexts = oEvent.getParameter("selectedContexts");
    var oMultiInput = this.currentView.getView().byId("id_global_group_code_TrdPart");
    var oSelectedContextglobal_group_code_TrdPart = [];
    var oModel = this.currentView.getView().getModel("global_group_codeTrdPartGlobalData");
    for (var i = 0; i < aContexts.length; i++) {
        oSelectedContextglobal_group_code_TrdPart.push(aContexts[i]);
    }
    that.GlbCurrView.oglobal_group_codeTrdPartModel = [];
    //Check for Unique Data
    // $.each(oSelectedContextglobal_group_code_TrdPart, function (i, el) {
    //     if ($.inArray(oSelectedContextglobal_group_code_TrdPart[i].ProductId, that.GlbCurrView.oglobal_group_codeTrdPartModel) === -1) that.GlbCurrView.oglobal_group_codeTrdPartModel.push(oSelectedContextglobal_group_code_TrdPart[i].getObject());
    // });

    //03-04-24 SAP Recommendation for slow loops @gnaneshwar.
    $.each(oSelectedContextglobal_group_code_TrdPart, function (i, el) {
        if ($.inArray(el.ProductId, that.GlbCurrView.oglobal_group_codeTrdPartModel) === -1) that.GlbCurrView.oglobal_group_codeTrdPartModel.push(el.getObject());
    });
    oModel.setProperty("/tokens1", that.GlbCurrView.oglobal_group_codeTrdPartModel);
    var oItemTemplateCC;
    oItemTemplateCC = oMultiInput.getTokens()[0];
    //Create the Template for token
    if (!oItemTemplateCC) {
        oItemTemplateCC = new Token({
            text: "{global_group_code}",
            key: "{global_group_code}"
        });
    } else {
        oItemTemplateCC = oMultiInput.getTokens()[0].clone();
    }
    //Bind the tokens
    that.GlbCurrView.oglobal_group_codeTrdPartModel.forEach(function (item) {
        oMultiInput.addToken(new Token({
            text: item.global_group_code
        }));
    })
},

onSearchglobal_group_code_Util_TrpPart: function (oEvent) {
    var sValue = oEvent.getParameter("value");
    var oFilter = new Filter("global_group_code", sap.ui.model.FilterOperator.Contains, sValue);
    var oBinding = oEvent.getParameter("itemsBinding");
    oBinding.filter([oFilter]);
},




// closing of alll dialogs trading partner 

onCloseDialog_Util_TradPart: function (oEvent) {

    if (that.GlbCurrView.ocustomer_number_TrdPart_Frag) {
       // that.GlbCurrView.ocustomer_number_TrdPart_Frag.close()
       // that.GlbCurrView.ocustomer_number_TrdPart_Frag.destroy()
       // delete that.GlbCurrView.ocustomer_number_TrdPart_Frag;
        that.GlbCurrView.ocustomer_number_TrdPart_Frag = undefined;
        that.GlbCurrView.ocustomer_number_TrdPart_Frag = null
        
    }

    if (that.GlbCurrView.ocompany_class_TrdPart_Frag) {
        // that.GlbCurrView.ocompany_class_TrdPart_Frag.close()
        // that.GlbCurrView.ocompany_class_TrdPart_Frag.destroy()
        // delete that.GlbCurrView.ocompany_class_TrdPart_Frag;
         that.GlbCurrView.ocompany_class_TrdPart_Frag = undefined;
         that.GlbCurrView.ocompany_class_TrdPart_Frag = null
         
     }
     if (that.GlbCurrView.oarea_TrdPart_Frag) {
        // that.GlbCurrView.oarea_TrdPart_Frag.close()
        // that.GlbCurrView.oarea_TrdPart_Frag.destroy()
        // delete that.GlbCurrView.oarea_TrdPart_Frag;
         that.GlbCurrView.oarea_TrdPart_Frag = undefined;
         that.GlbCurrView.oarea_TrdPart_Frag = null
         
     }     if (that.GlbCurrView.ocountry_code_TrdPart_Frag) {
        // that.GlbCurrView.ocountry_code_TrdPart_Frag.close()
        // that.GlbCurrView.ocountry_code_TrdPart_Frag.destroy()
        // delete that.GlbCurrView.ocountry_code_TrdPart_Frag;
         that.GlbCurrView.ocountry_code_TrdPart_Frag = undefined;
         that.GlbCurrView.ocountry_code_TrdPart_Frag = null
         
     }
     if (that.GlbCurrView.oglobal_group_code_TrdPart_Frag) {
        // that.GlbCurrView.oglobal_group_code_TrdPart_Frag.close()
        // that.GlbCurrView.oglobal_group_code_TrdPart_Frag.destroy()
        // delete that.GlbCurrView.oglobal_group_code_TrdPart_Frag;
         that.GlbCurrView.oglobal_group_code_TrdPart_Frag = undefined;
         that.GlbCurrView.oglobal_group_code_TrdPart_Frag = null
         
     }

},
//04-04-24 Depprecated calls issue for excel SAP Recommendation @gnaneshwar
onExportSelectedTrdPartTable: function (oEvent) {
    var selectedItemsLength = this.currentView.getView().byId("idTrdPartTable").getSelectedItems().length;

    var oselectedModel = new sap.ui.model.json.JSONModel(that.GlbCurrView.getView().getModel("TradingPartnerModel").oData);

    var aCols = [
        { label: "Customer Number", property: "customer_number" },
        { label: "Status", property: "status" },
        { label: "Date", property: "date" },
        { label: "Parent Code", property: "parent_code" },
        { label: "Company Class", property: "company_class" },
        { label: "Area", property: "area" },
        { label: "Country Code", property: "country_code" },
        { label: "City Code", property: "city_code" },
        { label: "Name1", property: "name1" },
        { label: "Name2", property: "name2" },
        { label: "Short Name", property: "short_name" },
        { label: "Address Line1", property: "address_line1" },
        { label: "Address Line2", property: "address_line2" },
        { label: "Consolidated", property: "consolidated" },
        { label: "Telephone Number", property: "telephone_number" },
        { label: "Fax Number", property: "fax_number" },
        { label: "Telex Number", property: "telex_number" },
        { label: "Procurement Flag", property: "procurement_flag" },
        { label: "Deletion Indicator", property: "deletion_indicator" },
        { label: "Created On", property: "created_on" },
        { label: "Created Time", property: "created_time" },
        { label: "Changed On", property: "changed_on" },
        { label: "Changed Time", property: "changed_time" },
        { label: "Global Group Code", property: "global_group_code" },
        { label: "Created By", property: "created_by" },
        { label: "Changed By", property: "changed_by" }
    ];

    var oSettings = {
        workbook: { columns: aCols,
            context: {
                sheetName: 'TradingPartner'
            },
        },
        dataSource: oselectedModel.getData(),
        fileName: "TradingPartner.xlsx",
        
    };

    var oSpreadsheet = new sap.ui.export.Spreadsheet(oSettings);
    oSpreadsheet.build().then(function () {
        oSpreadsheet.destroy();
    });
},


            // onExportSelectedTrdPartTable: function (oEvent) {
                
            //     var selectedITemsLength = this.currentView.getView().byId("idTrdPartTable").getSelectedItems().length
               
                    
            //         var oselectedModel = new sap.ui.model.json.JSONModel(that.GlbCurrView.getView().getModel("TradingPartnerModel").oData)
                
               
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
            //             name: "Customer Number",
            //             template: {
            //                 content: "{customer_number}"
            //             }
            //         }, {
            //             name: "Status",
            //             template: {
            //                 content: "{status}"
            //             }
            //         }, {
            //             name: "Date",
            //             template: {
            //                 content: "{date}"
            //             }
            //         }, {
            //             name: "Parent Code",
            //             template: {
            //                 content: "{parent_code}"
            //             }
            //         }, {
            //             name: "Company Class",
            //             template: {
            //                 content: "{company_class}"
            //             }
            //         }, {
            //             name: "Area",
            //             template: {
            //                 content: "{area}"
            //             }
            //         }, {
            //             name: "Country Code",
            //             template: {
            //                 content: "{country_code}"
            //             }
            //         }, {
            //             name: "City Code",
            //             template: {
            //                 content: "{city_code}"
            //             }
            //         }, {
            //             name: "Name1",
            //             template: {
            //                 content: "{name1}"
            //             }
            //         }, {
            //             name: "Name2",
            //             template: {
            //                 content: "{name2}"
            //             }
            //         }, {
            //             name: "Short Name",
            //             template: {
            //                 content: "{short_name}"
            //             }
            //         },{
            //             name: "Address Line1",
            //             template: {
            //                 content: "{address_line1}"
            //             }
            //         }, {
            //             name: "Address Line2",
            //             template: {
            //                 content: "{address_line2}"
            //             }
            //         }, {
            //             name: "Consolidated",
            //             template: {
            //                 content: "{consolidated}"
            //             }
            //         }, {
            //             name: "Telephone Number",
            //             template: {
            //                 content: "{telephone_number}"
            //             }
            //         }, {
            //             name: "Fax Number",
            //             template: {
            //                 content: "{fax_number}"
            //             }
            //         }, {
            //             name: "Telex Number",
            //             template: {
            //                 content: "{telex_number}"
            //             }
            //         }, {
            //             name: "Procurement Flag",
            //             template: {
            //                 content: "{procurement_flag}"
            //             }
            //         }, {
            //             name: "Deletion Indicator",
            //             template: {
            //                 content: "{deletion_indicator}"
            //             }
            //         }, {
            //             name: "Created On",
            //             template: {
            //                 content: "{created_on}"
            //             }
            //         }, {
            //             name: "Created Time",
            //             template: {
            //                 content: "{created_time}"
            //             }
            //         }, {
            //             name: "Changed On",
            //             template: {
            //                 content: "{changed_on}"
            //             }
            //         }, {
            //             name: "Changed Time",
            //             template: {
            //                 content: "{change_time}"
            //             }
            //          }, {
            //             name: "Global Group Code",
            //             template: {
            //                 content: "{global_group_code}"
            //             }
            //          }, {
            //             name: "Created By",
            //             template: {
            //                 content: "{created_by}"
            //             }
            //          }, {
            //             name: "Changed By",
            //             template: {
            //                 content: "{changed_by}"
            //             }
            //          }]
    
            //     });
    
            //     //* download exported file
    
            //     oExport.saveFile("TradingPartner").always(function () {
    
            //         this.destroy();
    
            //     });
            // },


            onGoToReport_Util_TrdPart: function () {
                that.GlbCurrView.busy.open()
    
                // get all plant tokens
    
                var TrdPart_customer_number_Tokens = this.currentView.getView().byId("id_customer_number_TrdPart").getTokens();
                that.GlbCurrView.sTrdPart_customer_number_TokensValues = TrdPart_customer_number_Tokens.map(function (oToken) {
                    return oToken.getText();
                }).join(",");
    
                // get all company_class tokens
                var TrdPart_company_class_Tokens = this.currentView.getView().byId("id_company_class_TrdPart").getTokens();
                that.GlbCurrView.sTrdPart_TrdPart_company_class_Tokens_Values = TrdPart_company_class_Tokens.map(function (oToken) {
                    return oToken.getText();
                }).join(",");
    
                // get all area tokens
                var TrdPart_area_Tokens = this.currentView.getView().byId("id_area_TrdPart").getTokens();
                that.GlbCurrView.sTrdPart_area_TokensValues = TrdPart_area_Tokens.map(function (oToken) {
                    return oToken.getText();
                }).join(",");
    
    
                var TrdPart_country_code_Tokens = this.currentView.getView().byId("id_country_code_TrdPart").getTokens();
                that.GlbCurrView.sTrdPart_country_code_TokensValues = TrdPart_country_code_Tokens.map(function (oToken) {
                    return oToken.getText();
                }).join(",");

                var TrdPart_global_group_code_Tokens = this.currentView.getView().byId("id_global_group_code_TrdPart").getTokens();
                that.GlbCurrView.sTrdPart_global_group_code_TokensValues = TrdPart_global_group_code_Tokens.map(function (oToken) {
                    return oToken.getText();
                }).join(",");

                var filters = [];
    

                if (that.GlbCurrView.sTrdPart_customer_number_TokensValues !== "") {
    
                    var TrdPart_customer_numberVal = that.GlbCurrView.sTrdPart_customer_number_TokensValues.split(",");
                    if (TrdPart_customer_numberVal.length > 0) {
                        $.each(TrdPart_customer_numberVal, function (i, UIitem) {
                            filters.push(new sap.ui.model.Filter("customer_number", sap.ui.model.FilterOperator.Contains, UIitem));
                        });
                    };
                }

                if (that.GlbCurrView.sTrdPart_TrdPart_company_class_Tokens_Values !== "") {
    
                    var TrdPart_company_classVal = that.GlbCurrView.sTrdPart_TrdPart_company_class_Tokens_Values.split(",");
                    if (TrdPart_company_classVal.length > 0) {
                        $.each(TrdPart_company_classVal, function (i, UIitem) {
                            filters.push(new sap.ui.model.Filter("company_class", sap.ui.model.FilterOperator.Contains, UIitem));
                        });
                    };
                }

                if (that.GlbCurrView.sTrdPart_area_TokensValues !== "") {
    
                    var TrdPart_areaVal = that.GlbCurrView.sTrdPart_area_TokensValues.split(",");
                    if (TrdPart_areaVal.length > 0) {
                        $.each(TrdPart_areaVal, function (i, UIitem) {
                            filters.push(new sap.ui.model.Filter("area", sap.ui.model.FilterOperator.Contains, UIitem));
                        });
                    };
                }
                  

                if (that.GlbCurrView.sTrdPart_global_group_code_TokensValues !== "") {
    
                    var TrdPart_global_group_codeVal = that.GlbCurrView.sTrdPart_global_group_code_TokensValues.split(",");
                    if (TrdPart_global_group_codeVal.length > 0) {
                        $.each(TrdPart_global_group_codeVal, function (i, UIitem) {
                            filters.push(new sap.ui.model.Filter("global_group_code", sap.ui.model.FilterOperator.Contains, UIitem));
                        });
                    };
                }
                   
                if (that.GlbCurrView.sTrdPart_country_code_TokensValues !== "") {
    
                    var TrdPart_country_codeVal = that.GlbCurrView.sTrdPart_country_code_TokensValues.split(",");
                    if (TrdPart_country_codeVal.length > 0) {
                        $.each(TrdPart_country_codeVal, function (i, UIitem) {
                            filters.push(new sap.ui.model.Filter("country_code", sap.ui.model.FilterOperator.Contains, UIitem));
                        });
                    };
                }

                if ((that.startDate !== "" && that.endDate !== "") || (that.startDate !== undefined && that.endDate !== undefined)) {

                    var startDate = that.startDate;
                    var endDate = that.endDate;
                    
                    if (startDate) {
                        filters.push(new sap.ui.model.Filter("changed_on", sap.ui.model.FilterOperator.BT, startDate,endDate));

                    };
                }

                if ((that.startDate1 !== "" && that.endDate1 !== "") || (that.startDate1 !== undefined && that.endDate1 !== undefined)) {

                    var startDate1 = that.startDate1;
                    var endDate1 = that.endDate1;
                    
                    if (startDate1) {
                        filters.push(new sap.ui.model.Filter("created_on", sap.ui.model.FilterOperator.BT, startDate1,endDate1));
            
                    };
                }
                                       
                    that.GlbCurrView.tableMainModelfiltereddata = undefined
                    that.GlbCurrView.tableMainModelfiltereddata = new JSONModel(that.GlbCurrView.getView().getModel("globalMainData_TrdPart").oData);
                    that.GlbCurrView.getView().setModel(that.GlbCurrView.tableMainModelfiltereddata, "TradingPartnerModel")
                    this.getDefaultFilteredDateData();
                    this.currentView.getView().byId("idTrdPartTable").getBinding("items").filter(filters);
                    that.GlbCurrView.filteredData = true;
                    that.GlbCurrView.filteredDataToExport = []
                    var selectedITemsLength = this.currentView.getView().byId("idTrdPartTable").getBinding("items").aIndices.length
                    that.GlbCurrView.filteredIndices = this.currentView.getView().byId("idTrdPartTable").getBinding("items").aIndices
                    for (var i = 0; i < selectedITemsLength; i++) {
    
                        that.GlbCurrView.filteredDataToExport.push(that.GlbCurrView.tableMainModelfiltereddata.oData[that.GlbCurrView.filteredIndices[i]]);
                    }
                    var tableFilteredModel = new JSONModel(that.GlbCurrView.filteredDataToExport)
                    that.GlbCurrView.getView().setModel(tableFilteredModel, "TradingPartnerModel")
                   
                    that.GlbCurrView.busy.close()
                
            },

          

            handleTrdPartSortButtonPressedUtil: function (oEvent) {

                if (this.currentView.oInfo_1_SortFrag) {
                    this.currentView.oInfo_1_SortFrag = undefined;
                }
                if (!this.currentView.oInfo_1_SortFrag) {
                    that.GlbCurrView.busy.open()
                    this.currentView.oInfo_1_SortFrag = sap.ui.xmlfragment("masterdata.fragments.dialogs.TrdPart.ascAndDscSortTrdPart", that);
                    this.currentView.getView().addDependent(that.GlbCurrView.oInfo_1_SortFrag);
    
                }
                that.GlbCurrView.busy.close()
                this.currentView.oInfo_1_SortFrag.open();
    
            },
    
            // handle sort
            TrdPart_handleSortDialogConfirmUtil: function (oEvent) {
                
        var oTable = this.currentView.byId("idTrdPartTable"),
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
                var   oTable = this.currentView.byId("idTrdPartTable");
                var   oBinding = oTable.getBinding("items");
                 var  aSorters = [];
                   aSorters.push(new Sorter("created_on", true));
                   oBinding.sort(aSorters);
               },
          


        }
    }
);