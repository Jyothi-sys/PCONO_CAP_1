var that;
// defining required dependancies
sap.ui.define([
    "./BaseController",
    "masterdata/utils/tradingPartner",
    "masterdata/utils/gcmsInfo234",
    "masterdata/utils/gcmsInfo5",
    "masterdata/utils/gcmsInfo1",
    "masterdata/utils/cityCode"
    
    
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    // declaring dependancies which are defiend above
    function (BaseController, tradingPartner, gcmsInfo234, gcmsInfo5, gcmsInfo1, cityCode) {
        "use strict";
        return BaseController.extend("masterdata.controller.View1", {

            onInit: function () {
                that = this
           // Trading Partner init starts here
                tradingPartner.storeView(this,that)
                tradingPartner.trdPartVisibleColumns();
                tradingPartner.onReadTradingPartnerTableData();
                tradingPartner.setMaxDate_TrdPart();
                tradingPartner.setMaxDate_TrdPart2();
                
               
           // Trading Partner init ends here

           // GCMS_INFO_234 Code Init Starts here
           gcmsInfo234.storeView234(this,that)
           gcmsInfo234.VisibleColumns234();
           gcmsInfo234.onRead234TableData();
           gcmsInfo234.setMaxDate_City();
           gcmsInfo234.setMaxDate_City2();
           // GCMS_INFO_234 Code Init Ends here

        // GCMS_INFO_5 Code Init Starts here
        gcmsInfo5.storeView_5(this,that)
        gcmsInfo5.VisibleColumns_5();
        gcmsInfo5.onRead_5TableData();
        gcmsInfo5.setMaxDate_City();
        gcmsInfo5.setMaxDate_City2();
        // GCMS_INFO_5 Code Init Ends here

           // GCMS_INFO_1 Code Init Starts here
           gcmsInfo1.storeView_1(this,that)
           gcmsInfo1.VisibleColumns_1();
           gcmsInfo1.onRead_1TableData();
           gcmsInfo1.setMaxDate_City();
           gcmsInfo1.setMaxDate_City2();
           
           
           // GCMS_INFO_1 Code Init Ends here

           
        //    // City Code Table  Code Init Starts here
            cityCode.storeView_cityCode(this,that)
            cityCode.VisibleColumns_cityCode();
            cityCode.onRead_CityCodeTableData();
            cityCode.setMaxDate_City();
            cityCode.setMaxDate_City2();
            //cityCode.setMaxDate_TrdPart2();
        //    // City Code Table  Code Init Ends here


            },

// Date to send in excel
attachDateToExcel: function () {
    var oDateFormat = sap.ui.core.format.DateFormat.getDateTimeInstance({
        pattern: "MM-dd-yyyy"
    });
  var passCurrentdate = oDateFormat.format(new Date());
    return passCurrentdate;
    
},

//

            
          onPopinLayoutChanged:function(oEvent){
                var oKey=oEvent.getSource().getSelectedKey();
                if(oKey==="K1"){
                    this.getView().byId("f1").setVisible(true)
                    this.getView().byId("f2").setVisible(false)
                    this.getView().byId("f3").setVisible(false)
                    this.getView().byId("f4").setVisible(false)
                    this.getView().byId("f5").setVisible(false)
                }else if(oKey==="K2"){
                    this.getView().byId("f2").setVisible(true)
                    this.getView().byId("f1").setVisible(false)
                    this.getView().byId("f3").setVisible(false)
                    this.getView().byId("f4").setVisible(false)
                    this.getView().byId("f5").setVisible(false)
                }else if(oKey==="K3"){
                    this.getView().byId("f3").setVisible(true)
                    this.getView().byId("f1").setVisible(false)
                    this.getView().byId("f2").setVisible(false)
                    this.getView().byId("f4").setVisible(false)
                    this.getView().byId("f5").setVisible(false)
                }else if(oKey==="K4"){
                    this.getView().byId("f4").setVisible(true)
                    this.getView().byId("f1").setVisible(false)
                    this.getView().byId("f2").setVisible(false)
                    this.getView().byId("f3").setVisible(false)
                    this.getView().byId("f5").setVisible(false)
                }else if(oKey==="K5"){
                    this.getView().byId("f5").setVisible(true)
                    this.getView().byId("f1").setVisible(false)
                    this.getView().byId("f2").setVisible(false)
                    this.getView().byId("f3").setVisible(false)
                    this.getView().byId("f4").setVisible(false)
                }

            },

// Begin of Trading partner


onClearTrdPart : function(oEvent){
    tradingPartner.onClearTrdPartUtil(oEvent);
},

// ascAndDscSortTrdPart

handleTrdPartSortButtonPressed : function(oEvent){
    tradingPartner.handleTrdPartSortButtonPressedUtil(oEvent);
},

TrdPart_handleSortDialogConfirm : function(oEvent){
    tradingPartner.TrdPart_handleSortDialogConfirmUtil(oEvent);
},

            handleTrdPartSelectionChange(oEvent){
                tradingPartner.handleTrdPartSelectionChangeUtil(oEvent);
            },

// Changed On Trading Partner

handleDateChangedOnTrpPart : function(oEvent){
    tradingPartner.handleDateChangedOnTrpPartUtil(oEvent);
},

handleChangeCreatedOnTrpPart : function(oEvent){
    tradingPartner.handleChangeCreatedOnTrpPartUtil(oEvent);
},





// customer_number Frag Trading Partner
onOpencustomer_numberFragment_TrpPart :function(oEvent){
    tradingPartner.onOpencustomer_numberFragment_Util_TrpPart(oEvent)
}, 

onSelectioncustomer_number_TrpPart : function(oEvent){
    tradingPartner.onSelectioncustomer_number_Util_TrpPart(oEvent);
},

onSearchcustomer_number_TrpPart : function(oEvent){
    tradingPartner.onSearchcustomer_number_Util_TrpPart(oEvent);
},


// company_class Frag Trading Partner
onOpencompany_classFragment_TrpPart :function(oEvent){
    tradingPartner.onOpencompany_classFragment_Util_TrpPart(oEvent)
}, 

onSelectioncompany_class_TrpPart : function(oEvent){
    tradingPartner.onSelectioncompany_class_Util_TrpPart(oEvent);
},

onSearchcompany_class_TrpPart : function(oEvent){
    tradingPartner.onSearchcompany_class_Util_TrpPart(oEvent);
},

// area Frag Trading Partner
onOpenareaFragment_TrpPart :function(oEvent){
    tradingPartner.onOpenareaFragment_Util_TrpPart(oEvent)
}, 

onSelectionarea_TrpPart : function(oEvent){
    tradingPartner.onSelectionarea_Util_TrpPart(oEvent);
},

onSearcharea_TrpPart : function(oEvent){
    tradingPartner.onSearcharea_Util_TrpPart(oEvent);
},

// country_code Frag Trading Partner
onOpencountry_codeFragment_TrpPart :function(oEvent){
    tradingPartner.onOpencountry_codeFragment_Util_TrpPart(oEvent)
}, 

onSelectioncountry_code_TrpPart : function(oEvent){
    tradingPartner.onSelectioncountry_code_Util_TrpPart(oEvent);
},

onSearchcountry_code_TrpPart : function(oEvent){
    tradingPartner.onSearchcountry_code_Util_TrpPart(oEvent);
},

// global_group_code Frag Trading Partner
onOpenglobal_group_codeFragment_TrpPart :function(oEvent){
    tradingPartner.onOpenglobal_group_codeFragment_Util_TrpPart(oEvent)
}, 

onSelectionglobal_group_code_TrpPart : function(oEvent){
    tradingPartner.onSelectionglobal_group_code_Util_TrpPart(oEvent);
},

onSearchglobal_group_code_TrpPart : function(oEvent){
    tradingPartner.onSearchglobal_group_code_Util_TrpPart(oEvent);
},


onDialogClose_trdPart : function(oEvent){
    tradingPartner.onCloseDialog_Util_TradPart(oEvent)
},


            onTrdPartExport :function(oEvent){
                tradingPartner.onExportSelectedTrdPartTable(oEvent);
            },

            onGoToReportTrdPart : function(oEvent){
                tradingPartner.onGoToReport_Util_TrdPart(oEvent);
            },
            //onGoToReport_Util_TrdPart

// End of Trading partner

// Begin of GCMS_INFO_234 code


onClear234 : function(oEvent){
    gcmsInfo234.onClear234Util(oEvent);
},


handleInfo_234_SortButtonPressed : function(oEvent){
    gcmsInfo234.handleInfo_234_SortButtonPressedUtil(oEvent);
},

Info_234_handleSortDialogConfirm : function(oEvent){
    gcmsInfo234.Info_234_handleSortDialogConfirmUtil(oEvent);
},

handle234SelectionChange(oEvent){
    gcmsInfo234.handle234SelectionChangeUtil(oEvent);
},


// ClientFrag Info234
// onOpenClientFragment_Info234 :function(oEvent){
//     gcmsInfo234.onOpenClientFragment_Util_Info234(oEvent)
// }, 

// onSelectionClient_Info234 : function(oEvent){
//     gcmsInfo234.onSelectionClient_Util_Info234(oEvent);
// },

// onSearchClient_Info234 : function(oEvent){
//     gcmsInfo234.onSearchClient_Util_Info234(oEvent);
// },

// Record Type Frag Start Info234
onOpenrecord_typeFragment_Info234 :function(oEvent){
    gcmsInfo234.onOpenrecord_typeFragment_Util_Info234(oEvent)
}, 

onSelectionrecord_type_Info234 : function(oEvent){
    gcmsInfo234.onSelectionrecord_type_Util_Info234(oEvent);
},

onSearchrecord_type_Info234 : function(oEvent){
    gcmsInfo234.onSearchrecord_type_Util_Info234(oEvent);
},

// Record Type Frag End Info234

// Reply Id Frag Start Info234
onOpenreply_idFragment_Info234 :function(oEvent){
    gcmsInfo234.onOpenreply_idFragment_Util_Info234(oEvent)
}, 

onSelectionreply_id_Info234 : function(oEvent){
    gcmsInfo234.onSelectionreply_id_Util_Info234(oEvent);
},

onSearchreply_id_Info234 : function(oEvent){
    gcmsInfo234.onSearchreply_id_Util_Info234(oEvent);
},

// Reply Id Frag End Info234

// sales_order_code Frag Start Info234
onOpensales_order_codeFragment_Info234 :function(oEvent){
    gcmsInfo234.onOpensales_order_codeFragment_Util_Info234(oEvent)
}, 

onSelectionsales_order_code_Info234 : function(oEvent){
    gcmsInfo234.onSelectionsales_order_code_Util_Info234(oEvent);
},

onSearchsales_order_code_Info234 : function(oEvent){
    gcmsInfo234.onSearchsales_order_code_Util_Info234(oEvent);
},

// sales_order_code Frag End Info234

// issued_date Frag Start Info234
onOpenissued_dateFragment_Info234 :function(oEvent){
    gcmsInfo234.onOpenissued_dateFragment_Util_Info234(oEvent)
}, 

onSelectionissued_date_Info234 : function(oEvent){
    gcmsInfo234.onSelectionissued_date_Util_Info234(oEvent);
},

onSearchissued_date_Info234 : function(oEvent){
    gcmsInfo234.onSearchissued_date_Util_Info234(oEvent);
},

// issued_date Frag End Info234

// unified_model_number Frag Start Info234
onOpenunified_model_numberFragment_Info234 :function(oEvent){
    gcmsInfo234.onOpenunified_model_numberFragment_Util_Info234(oEvent)
}, 

onSelectionunified_model_number_Info234 : function(oEvent){
    gcmsInfo234.onSelectionunified_model_number_Util_Info234(oEvent);
},

onSearchunified_model_number_Info234 : function(oEvent){
    gcmsInfo234.onSearchunified_model_number_Util_Info234(oEvent);
},

handleChangeCreateDateInfo234 : function(oEvent){
    gcmsInfo234.handleChangeCreateDateInfo234Util(oEvent);
},


// Changed On citycode

handleChangeDateInfo234 : function(oEvent){
    gcmsInfo234.handleChangeDateInfo234Util(oEvent);
},


// unified_model_number Frag End Info234


// suplier_code Frag Start Info234
onOpensuplier_codeFragment_Info234 :function(oEvent){
    gcmsInfo234.onOpensuplier_codeFragment_Util_Info234(oEvent)
}, 

onSelectionsuplier_code_Info234 : function(oEvent){
    gcmsInfo234.onSelectionsuplier_code_Util_Info234(oEvent);
},

onSearchsuplier_code_Info234 : function(oEvent){
    gcmsInfo234.onSearchsuplier_code_Util_Info234(oEvent);
},

// unified_model_number Frag End Info234

// Info 234 common methods start

onDialogClose_Info234 : function(oEvent){
    gcmsInfo234.onCloseDialog_Util_Info234(oEvent)
},

on234Export :function(oEvent){
    gcmsInfo234.onExportSelectedInfo_234Table(oEvent);
},


onGoToReport_Info234: function () {
    gcmsInfo234.onGoToReport_Util_Info234();
},


onPressClear_Info234:function(){
    
},

// Info 234 common methods End

// End of GCMS_INFO_234 code

// Begin of GCMS_INFO_5 code


onClear5 : function(oEvent){
    gcmsInfo5.onClear5Util(oEvent);
},

onGoToReport_Info5: function () {
    gcmsInfo5.onGoToReport_Util_Info5();
},

handleInfo_5_SortButtonPressed : function(oEvent){
    gcmsInfo5.handleInfo_5_SortButtonPressedUtil(oEvent);
},

Info_5_handleSortDialogConfirm : function(oEvent){
    gcmsInfo5.Info_5_handleSortDialogConfirmUtil(oEvent);
},



handle5SelectionChange(oEvent){
    gcmsInfo5.handle5SelectionChange_util(oEvent);
},

// Info 5 Frag starts here
// ClientFrag Info5
// onOpenClientFragment_Info5 :function(oEvent){
//     gcmsInfo5.onOpenClientFragment_Util_Info5(oEvent)
// }, 

// onSelectionClient_Info5 : function(oEvent){
//     gcmsInfo5.onSelectionClient_Util_Info5(oEvent);
// },

// onSearchClient_Info5 : function(oEvent){
//     gcmsInfo5.onSearchClient_Util_Info5(oEvent);
// },


// Sales Company Code Frag

onOpenSalesCCFragment_Info5 :function(oEvent){
    gcmsInfo5.onOpensales_company_codeFragment_Util_Info5(oEvent)
}, 

onSelectionSalesCC_Info5 : function(oEvent){
    gcmsInfo5.onSelectionsales_company_code_Util_Info5(oEvent);
},

onSearchSalesCC_Info5 : function(oEvent){
    gcmsInfo5.onSearchsales_company_code_Util_Info5(oEvent);
},


// Unified Model No Frag Info 5

onOpenunified_model_numberFragment_Info5 :function(oEvent){
    gcmsInfo5.onOpenunified_model_numberFragment_Util_Info5(oEvent)
}, 

onSelectionUnifiedModNo_Info5 : function(oEvent){
    gcmsInfo5.onSelectionunified_model_number_Util_Info5(oEvent);
},

onSearchUnifiedModNo_Info5 : function(oEvent){
    gcmsInfo5.onSearchunified_model_number_Util_Info5(oEvent);
},

handleChangeCreateDateInfo5 : function(oEvent){
    gcmsInfo5.handleChangeCreateDateInfo5Util(oEvent);
},


// Changed On citycode

handleChangeDateInfo5 : function(oEvent){
    gcmsInfo5.handleChangeDateInfo5Util(oEvent);
},



// Supplier Code Frag Info 5

onOpensuplier_codeFragment_Info5 :function(oEvent){
    gcmsInfo5.onOpensuplier_codeFragment_Util_Info5(oEvent)
}, 

onSelectionSupplierCode_Info5 : function(oEvent){
    gcmsInfo5.onSelectionsuplier_code_Util_Info5(oEvent);
},

onSearchSupplierCode_Info5 : function(oEvent){
    gcmsInfo5.onSearchsuplier_code_Util_Info5(oEvent);
},


onDialogClose_Info5 : function(oEvent){
    gcmsInfo5.onCloseDialog_Util_Info5(oEvent);
},

// Info 5 Frag Ends here


onInfo5Export :function(oEvent){
    gcmsInfo5.on5Export(oEvent);
},
   
//// End of GCMS_INFO_5 code





// Begin of GCMS_INFO_1 code

onClear1 : function(oEvent){
    gcmsInfo1.onClear1Util(oEvent);
},

handleInfo_1_SortButtonPressed : function(oEvent){
    gcmsInfo1.handleInfo_1_SortButtonPressedUtil(oEvent);
},

Info_1_handleSortDialogConfirm : function(oEvent){
    gcmsInfo1.Info_1_handleSortDialogConfirmUtil(oEvent);
},



Info1SelectionChange(oEvent){
    gcmsInfo1.handle1SelectionChange(oEvent);
},
onInfo1Export :function(oEvent){
    gcmsInfo1.on1Export(oEvent);
}, 

onGoToReport_Info1: function () {
    gcmsInfo1.onGoToReport_Util_Info1();
},


onPressClear_Info1:function(){
    
},

// ClientFrag
// onOpenClientFragment_Info1 :function(oEvent){
//     gcmsInfo1.onOpenClientFragment_Util_Info1(oEvent)
// }, 

handleChangeCreateDateInfo1 : function(oEvent){
    gcmsInfo1.handleChangeCreateDateInfo1Util(oEvent);
},


// Changed On citycode

handleChangeDateInfo1 : function(oEvent){
    gcmsInfo1.handleChangeDateInfo1Util(oEvent);
},


// onSelectionClient_Info1 : function(oEvent){
//     gcmsInfo1.onSelectionClient_Util_Info1(oEvent);
// },

// onSearchClient_Info1 : function(oEvent){
//     gcmsInfo1.onSearchClient_Util_Info1(oEvent);
// },

// Factory Code Frag
onOpenFactCodeFragment_Info1 :function(oEvent){
    gcmsInfo1.onOpenfactory_codeFragment_Util_Info1(oEvent)
}, 

onSelectionFactoryCode_Info1 : function(oEvent){
    gcmsInfo1.onSelectionfactory_code_Util_Info1(oEvent);
},

onSearchFactoryCode_Info1 : function(oEvent){
    gcmsInfo1.onSearchfactory_code_Util_Info1(oEvent);
},
// Issue date Frag

onOpenIssueDateFragment_Info1 :function(oEvent){
    gcmsInfo1.onOpenissued_dateFragment_Util_Info1(oEvent)
}, 

onSelectionIssueDate_Info1 : function(oEvent){
    gcmsInfo1.onSelectionissued_date_Util_Info1(oEvent);
},

onSearchIssuedDate_Info1 : function(oEvent){
    gcmsInfo1.onSearchissued_date_Util_Info1(oEvent);
},

// Reply Id Frag

onOpenReplyIdFragment_Info1 :function(oEvent){
    gcmsInfo1.onOpenreply_idFragment_Util_Info1(oEvent)
}, 

onSelectionReplyId_Info1 : function(oEvent){
    gcmsInfo1.onSelectionreply_id_Util_Info1(oEvent);
},

onSearchReplyId_Info1 : function(oEvent){
    gcmsInfo1.onSearchreply_id_Util_Info1(oEvent);
},

// Sales Company Code Frag

onOpenSalesCCFragment_Info1 :function(oEvent){
    gcmsInfo1.onOpensales_company_codeFragment_Util_Info1(oEvent)
}, 

onSelectionSalesCC_Info1 : function(oEvent){
    gcmsInfo1.onSelectionsales_company_code_Util_Info1(oEvent);
},

onSearchSalesCC_Info1 : function(oEvent){
    gcmsInfo1.onSearchsales_company_code_Util_Info1(oEvent);
},

// Supplier Code Frag

onOpenSuppCodeFragment_Info1 :function(oEvent){
    gcmsInfo1.onOpensuplier_codeFragment_Util_Info1(oEvent)
}, 

onSelectionSupplierCode_Info1 : function(oEvent){
    gcmsInfo1.onSelectionsuplier_code_Util_Info1(oEvent);
},

onSearchSupplierCode_Info1 : function(oEvent){
    gcmsInfo1.onSearchsuplier_code_Util_Info1(oEvent);
},
// Unified Model No Frag

onOpenUniModNoFragment_Info1 :function(oEvent){
    gcmsInfo1.onOpenunified_model_numberFragment_Util_Info1(oEvent)
}, 

onSelectionUnifiedModNo_Info1 : function(oEvent){
    gcmsInfo1.onSelectionunified_model_number_Util_Info1(oEvent);
},

onSearchUnifiedModNo_Info1 : function(oEvent){
    gcmsInfo1.onSearchunified_model_number_Util_Info1(oEvent);
},

onDialogClose_Info1 : function(oEvent){
    gcmsInfo1.onCloseDialog_Util_Info1(oEvent);
},

//// End of GCMS_INFO_1 code





// Begin of City Code Table code

onClearCityCode : function(oEvent){
    cityCode.onClearCityCodeUtil(oEvent);
},


handleCityTableSortButtonPressed : function(oEvent){
    cityCode.handleCityTableSortButtonPressedUtil(oEvent);
},

CityCode_handleSortDialogConfirm : function(oEvent){
    cityCode.CityCode_handleSortDialogConfirm(oEvent);
},

cityCodeSelectionChange(oEvent){
    cityCode.handleCityCodeSelectionChange(oEvent);
},
onCityCodeExport :function(oEvent){
    cityCode.onCityCodeExportExcel(oEvent);
}, 

onGoToReport_CityCode : function(){
    cityCode.onGoToReport_CityCodeUtil()
},

onOpenCityCodeTableFragment_CityCode : function(oEvent){
    cityCode.onOpenCityCodeTableFragment_CityCodeUtil(oEvent);
},

onSearchCityCode : function(oEvent){
    cityCode.onSearchCityCodeUtil(oEvent);
},

onSelectionCityCode : function(oEvent){
    cityCode.onSelectionCityCodeUtil(oEvent);
},
onDialogClose_CityCode : function(oEvent){
    cityCode.onDialogClose_CityCodeUtil(oEvent);
},

// Created On citycode

handleChangeCreatedOnDate : function(oEvent){
    cityCode.handleChangeCreatedOnDateUtil(oEvent);
},


// Changed On citycode

handleChangedOnDate : function(oEvent){
    cityCode.handleChangedOnDateUtil(oEvent);
},





//// End of City Code Table code
        });
    });
