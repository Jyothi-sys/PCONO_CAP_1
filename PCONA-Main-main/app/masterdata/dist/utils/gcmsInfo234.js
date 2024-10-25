var that;sap.ui.define(["sap/ui/model/json/JSONModel","sap/m/MessageToast","sap/m/MessageBox","sap/ui/core/util/Export","sap/ui/core/util/ExportTypeCSV","sap/ui/export/Spreadsheet","sap/m/BusyDialog","sap/ui/model/Filter","sap/ui/model/FilterOperator","sap/ui/core/Fragment","sap/m/Token","sap/ui/model/Sorter"],function(e,t,r,o,i,a,n,l,d,s,_,u){"use strict";that=this;return{storeView234:function(e,t){this.currentView=e;that.GlbCurrView=t;that.GlbCurrView.busy=new n},handle234SelectionChangeUtil:function(e){var t=e.getParameter("changedItem"),r=e.getParameter("selected"),o=t.getBindingContext("columndataInfo234");o.oModel.setProperty(o.sPath+"/visible",r);o.oModel.refresh(true)},onRead234TableData:function(){var e=this.currentView.getOwnerComponent().getModel("masterDataGlobalModel");var t=new sap.ui.model.json.JSONModel;e.callFunction("/userInfo",{success:function(e){t.setData(e.userInfo.scopes);that.getView().setModel(t,"userModel");that.userLoggedIn=e.userInfo.user}.bind(that),error:function(e){}.bind(that)});e.read("/zmm_m12_info_234",{success:function(e){var t=that.getView().getModel("userModel").getData();if(t.TISAdmin===true){var r=sap.ui.core.format.DateFormat.getDateTimeInstance({pattern:"MM-dd-yyyy"});var o=r.format(new Date);for(var i=0;i<e.results.length;i++){e.results[i].created_on=r.format(e.results[i].created_on);e.results[i].changed_on=r.format(e.results[i].changed_on);e.results[i].change_time=new Date(e.results[i].change_time.ms).toISOString().slice(11,19)}that.GlbCurrView.getView().setModel(new sap.ui.model.json.JSONModel(e.results),"globalMainData_Info234");that.GlbCurrView.getView().setModel(new sap.ui.model.json.JSONModel(e.results),"Info234_Model")}else{that.getView().setModel([],"globalMainData_Info234")}},error:function(e){that.GlbCurrView.busy.close()}})},setMaxDate_City:function(){var e=new Date;var t=e.setDate(e.getDate());t=new Date(t).getDate();t=t.toString().padStart(2,"0");var r=e.getMonth()+1;r=r.toString().padStart(2,"0");var o=e.getFullYear().toString();that.GlbCurrView.completeDate=r+"-"+t+"-"+o;const i=new Date(o,r-1,t);var a=this.currentView.getView().byId("id_datePicker_9");a.setMaxDate(i)},setMaxDate_City2:function(){var e=new Date;var t=e.setDate(e.getDate());t=new Date(t).getDate();t=t.toString().padStart(2,"0");var r=e.getMonth()+1;r=r.toString().padStart(2,"0");var o=e.getFullYear().toString();that.GlbCurrView.completeDate1=r+"-"+t+"-"+o;const i=new Date(o,r-1,t);var a=this.currentView.getView().byId("id_datePicker_10");a.setMaxDate(i)},handleChangeCreateDateInfo234Util:function(e){that.startDate=e.mParameters.value.substr(0,10);that.endDate=e.mParameters.value.substr(13,20)},handleChangeDateInfo234Util:function(e){that.startDate1=e.mParameters.value.substr(0,10);that.endDate1=e.mParameters.value.substr(13,20)},VisibleColumns234:function(){var t=jQuery.sap.getResourcePath("masterdata/model")+"/gcmsInfo234Column.json";var r=new e;r.loadData(t).then(function(){this.currentView.getView().setModel(r,"columndataInfo234");this.currentView.getView().byId("id_showHideColumns234").setSelectedKeys(["record_type","reply_id","sales_order_code","issued_date","created_on","changed_on"])}.bind(this))},onOpenrecord_typeFragment_Util_Info234:function(t){if(this.currentView.orecord_type_Info234_Frag){this.currentView.orecord_type_Info234_Frag=undefined}if(!this.currentView.orecord_type_Info234_Frag){that.GlbCurrView.busy.open();this.currentView.orecord_type_Info234_Frag=sap.ui.xmlfragment("masterdata.fragments.dialogs.Info_234.recordType_Info234",that.GlbCurrView);this.currentView.getView().addDependent(that.GlbCurrView.orecord_type_Info234_Frag);var r=that.GlbCurrView.getView().getModel("globalMainData_Info234").oData;var o={};var i=r;var a=[];for(var n,l=0;n=i[l++];){var d=n.record_type;if(!(d in o)){o[d]=1;a.push({record_type:d})}}var s=new e(a);this.currentView.getView().setModel(s,"record_typeInfo234GlobalData");this.currentView.orecord_type_Info234_Frag.setModel(s,"record_typeInfo234Data")}that.GlbCurrView.busy.close();this.currentView.orecord_type_Info234_Frag.open()},onSelectionrecord_type_Util_Info234:function(e){var t=e.getParameter("selectedContexts");var r=this.currentView.getView().byId("id_Info234_record_type");var o=[];var i=this.currentView.getView().getModel("record_typeInfo234GlobalData");for(var a=0;a<t.length;a++){o.push(t[a])}that.GlbCurrView.orecord_typeInfo234Model=[];$.each(o,function(e,t){if($.inArray(t.ProductId,that.GlbCurrView.orecord_typeInfo234Model)===-1)that.GlbCurrView.orecord_typeInfo234Model.push(t.getObject())});i.setProperty("/tokens1",that.GlbCurrView.orecord_typeInfo234Model);var n;n=r.getTokens()[0];if(!n){n=new _({text:"{record_type}",key:"{record_type}"})}else{n=r.getTokens()[0].clone()}that.GlbCurrView.orecord_typeInfo234Model.forEach(function(e){r.addToken(new _({text:e.record_type}))})},onSearchrecord_type_Util_Info234:function(e){var t=e.getParameter("value");var r=new l("record_type",sap.ui.model.FilterOperator.Contains,t);var o=e.getParameter("itemsBinding");o.filter([r])},onOpenreply_idFragment_Util_Info234:function(t){if(this.currentView.oreply_id_Info234_Frag){this.currentView.oreply_id_Info234_Frag=undefined}if(!this.currentView.oreply_id_Info234_Frag){that.GlbCurrView.busy.open();this.currentView.oreply_id_Info234_Frag=sap.ui.xmlfragment("masterdata.fragments.dialogs.Info_234.replyId_Info234",that.GlbCurrView);this.currentView.getView().addDependent(that.GlbCurrView.oreply_id_Info234_Frag);var r=that.GlbCurrView.getView().getModel("globalMainData_Info234").oData;var o={};var i=r;var a=[];for(var n,l=0;n=i[l++];){var d=n.reply_id;if(!(d in o)){o[d]=1;a.push({reply_id:d})}}var s=new e(a);this.currentView.getView().setModel(s,"reply_idInfo234GlobalData");this.currentView.oreply_id_Info234_Frag.setModel(s,"reply_idInfo234Data")}that.GlbCurrView.busy.close();this.currentView.oreply_id_Info234_Frag.open()},onSelectionreply_id_Util_Info234:function(e){var t=e.getParameter("selectedContexts");var r=this.currentView.getView().byId("id_Info234_reply_id");var o=[];var i=this.currentView.getView().getModel("reply_idInfo234GlobalData");for(var a=0;a<t.length;a++){o.push(t[a])}that.GlbCurrView.oreply_idInfo234Model=[];$.each(o,function(e,t){if($.inArray(t.ProductId,that.GlbCurrView.oreply_idInfo234Model)===-1)that.GlbCurrView.oreply_idInfo234Model.push(t.getObject())});i.setProperty("/tokens1",that.GlbCurrView.oreply_idInfo234Model);var n;n=r.getTokens()[0];if(!n){n=new _({text:"{reply_id}",key:"{reply_id}"})}else{n=r.getTokens()[0].clone()}that.GlbCurrView.oreply_idInfo234Model.forEach(function(e){r.addToken(new _({text:e.reply_id}))})},onSearchreply_id_Util_Info234:function(e){var t=e.getParameter("value");var r=new l("reply_id",sap.ui.model.FilterOperator.Contains,t);var o=e.getParameter("itemsBinding");o.filter([r])},onOpensales_order_codeFragment_Util_Info234:function(t){if(this.currentView.osales_order_code_Info234_Frag){this.currentView.osales_order_code_Info234_Frag=undefined}if(!this.currentView.osales_order_code_Info234_Frag){that.GlbCurrView.busy.open();this.currentView.osales_order_code_Info234_Frag=sap.ui.xmlfragment("masterdata.fragments.dialogs.Info_234.sales_order_code_Info234",that.GlbCurrView);this.currentView.getView().addDependent(that.GlbCurrView.osales_order_code_Info234_Frag);var r=that.GlbCurrView.getView().getModel("globalMainData_Info234").oData;var o={};var i=r;var a=[];for(var n,l=0;n=i[l++];){var d=n.sales_order_code;if(!(d in o)){o[d]=1;a.push({sales_order_code:d})}}var s=new e(a);this.currentView.getView().setModel(s,"sales_order_codeInfo234GlobalData");this.currentView.osales_order_code_Info234_Frag.setModel(s,"sales_order_codeInfo234Data")}that.GlbCurrView.busy.close();this.currentView.osales_order_code_Info234_Frag.open()},onSelectionsales_order_code_Util_Info234:function(e){var t=e.getParameter("selectedContexts");var r=this.currentView.getView().byId("id_Info234_sales_order_code");var o=[];var i=this.currentView.getView().getModel("sales_order_codeInfo234GlobalData");for(var a=0;a<t.length;a++){o.push(t[a])}that.GlbCurrView.osales_order_codeInfo234Model=[];$.each(o,function(e,t){if($.inArray(t.ProductId,that.GlbCurrView.osales_order_codeInfo234Model)===-1)that.GlbCurrView.osales_order_codeInfo234Model.push(t.getObject())});i.setProperty("/tokens1",that.GlbCurrView.osales_order_codeInfo234Model);var n;n=r.getTokens()[0];if(!n){n=new _({text:"{sales_order_code}",key:"{sales_order_code}"})}else{n=r.getTokens()[0].clone()}that.GlbCurrView.osales_order_codeInfo234Model.forEach(function(e){r.addToken(new _({text:e.sales_order_code}))})},onSearchsales_order_code_Util_Info234:function(e){var t=e.getParameter("value");var r=new l("sales_order_code",sap.ui.model.FilterOperator.Contains,t);var o=e.getParameter("itemsBinding");o.filter([r])},onOpenissued_dateFragment_Util_Info234:function(t){if(this.currentView.oissued_date_Info234_Frag){this.currentView.oissued_date_Info234_Frag=undefined}if(!this.currentView.oissued_date_Info234_Frag){that.GlbCurrView.busy.open();this.currentView.oissued_date_Info234_Frag=sap.ui.xmlfragment("masterdata.fragments.dialogs.Info_234.issued_date_Info234",that.GlbCurrView);this.currentView.getView().addDependent(that.GlbCurrView.oissued_date_Info234_Frag);var r=that.GlbCurrView.getView().getModel("globalMainData_Info234").oData;var o={};var i=r;var a=[];for(var n,l=0;n=i[l++];){var d=n.issued_date;if(!(d in o)){o[d]=1;a.push({issued_date:d})}}var s=new e(a);this.currentView.getView().setModel(s,"issued_dateInfo234GlobalData");this.currentView.oissued_date_Info234_Frag.setModel(s,"issued_dateInfo234Data")}that.GlbCurrView.busy.close();this.currentView.oissued_date_Info234_Frag.open()},onSelectionissued_date_Util_Info234:function(e){var t=e.getParameter("selectedContexts");var r=this.currentView.getView().byId("id_Info234_issued_date");var o=[];var i=this.currentView.getView().getModel("issued_dateInfo234GlobalData");for(var a=0;a<t.length;a++){o.push(t[a])}that.GlbCurrView.oissued_dateInfo234Model=[];$.each(o,function(e,t){if($.inArray(t.ProductId,that.GlbCurrView.oissued_dateInfo234Model)===-1)that.GlbCurrView.oissued_dateInfo234Model.push(t.getObject())});i.setProperty("/tokens1",that.GlbCurrView.oissued_dateInfo234Model);var n;n=r.getTokens()[0];if(!n){n=new _({text:"{issued_date}",key:"{issued_date}"})}else{n=r.getTokens()[0].clone()}that.GlbCurrView.oissued_dateInfo234Model.forEach(function(e){r.addToken(new _({text:e.issued_date}))})},onSearchissued_date_Util_Info234:function(e){var t=e.getParameter("value");var r=new l("issued_date",sap.ui.model.FilterOperator.Contains,t);var o=e.getParameter("itemsBinding");o.filter([r])},onOpenunified_model_numberFragment_Util_Info234:function(t){if(this.currentView.ounified_model_number_Info234_Frag){this.currentView.ounified_model_number_Info234_Frag=undefined}if(!this.currentView.ounified_model_number_Info234_Frag){that.GlbCurrView.busy.open();this.currentView.ounified_model_number_Info234_Frag=sap.ui.xmlfragment("masterdata.fragments.dialogs.Info_234.unified_model_number_Info234",that.GlbCurrView);this.currentView.getView().addDependent(that.GlbCurrView.ounified_model_number_Info234_Frag);var r=that.GlbCurrView.getView().getModel("globalMainData_Info234").oData;var o={};var i=r;var a=[];for(var n,l=0;n=i[l++];){var d=n.unified_model_number;if(!(d in o)){o[d]=1;a.push({unified_model_number:d})}}var s=new e(a);this.currentView.getView().setModel(s,"unified_model_numberInfo234GlobalData");this.currentView.ounified_model_number_Info234_Frag.setModel(s,"unified_model_numberInfo234Data")}that.GlbCurrView.busy.close();this.currentView.ounified_model_number_Info234_Frag.open()},onSelectionunified_model_number_Util_Info234:function(e){var t=e.getParameter("selectedContexts");var r=this.currentView.getView().byId("id_Info234_unified_model_number");var o=[];var i=this.currentView.getView().getModel("unified_model_numberInfo234GlobalData");for(var a=0;a<t.length;a++){o.push(t[a])}that.GlbCurrView.ounified_model_numberInfo234Model=[];$.each(o,function(e,t){if($.inArray(t.ProductId,that.GlbCurrView.ounified_model_numberInfo234Model)===-1)that.GlbCurrView.ounified_model_numberInfo234Model.push(t.getObject())});i.setProperty("/tokens1",that.GlbCurrView.ounified_model_numberInfo234Model);var n;n=r.getTokens()[0];if(!n){n=new _({text:"{unified_model_number}",key:"{unified_model_number}"})}else{n=r.getTokens()[0].clone()}that.GlbCurrView.ounified_model_numberInfo234Model.forEach(function(e){r.addToken(new _({text:e.unified_model_number}))})},onSearchunified_model_number_Util_Info234:function(e){var t=e.getParameter("value");var r=new l("unified_model_number",sap.ui.model.FilterOperator.Contains,t);var o=e.getParameter("itemsBinding");o.filter([r])},onOpensuplier_codeFragment_Util_Info234:function(t){if(this.currentView.osuplier_code_Info234_Frag){this.currentView.osuplier_code_Info234_Frag=undefined}if(!this.currentView.osuplier_code_Info234_Frag){that.GlbCurrView.busy.open();this.currentView.osuplier_code_Info234_Frag=sap.ui.xmlfragment("masterdata.fragments.dialogs.Info_234.suplier_code_Info234",that.GlbCurrView);this.currentView.getView().addDependent(that.GlbCurrView.osuplier_code_Info234_Frag);var r=that.GlbCurrView.getView().getModel("globalMainData_Info234").oData;var o={};var i=r;var a=[];for(var n,l=0;n=i[l++];){var d=n.suplier_code;if(!(d in o)){o[d]=1;a.push({suplier_code:d})}}var s=new e(a);this.currentView.getView().setModel(s,"suplier_codeInfo234GlobalData");this.currentView.osuplier_code_Info234_Frag.setModel(s,"suplier_codeInfo234Data")}that.GlbCurrView.busy.close();this.currentView.osuplier_code_Info234_Frag.open()},onSelectionsuplier_code_Util_Info234:function(e){var t=e.getParameter("selectedContexts");var r=this.currentView.getView().byId("id_Info234_suplier_code");var o=[];var i=this.currentView.getView().getModel("suplier_codeInfo234GlobalData");for(var a=0;a<t.length;a++){o.push(t[a])}that.GlbCurrView.osuplier_codeInfo234Model=[];$.each(o,function(e,t){if($.inArray(t.ProductId,that.GlbCurrView.osuplier_codeInfo234Model)===-1)that.GlbCurrView.osuplier_codeInfo234Model.push(t.getObject())});i.setProperty("/tokens1",that.GlbCurrView.osuplier_codeInfo234Model);var n;n=r.getTokens()[0];if(!n){n=new _({text:"{suplier_code}",key:"{suplier_code}"})}else{n=r.getTokens()[0].clone()}that.GlbCurrView.osuplier_codeInfo234Model.forEach(function(e){r.addToken(new _({text:e.suplier_code}))})},onSearchsuplier_code_Util_Info234:function(e){var t=e.getParameter("value");var r=new l("suplier_code",sap.ui.model.FilterOperator.Contains,t);var o=e.getParameter("itemsBinding");o.filter([r])},onCloseDialog_Util_Info234:function(e){if(that.GlbCurrView.oClient_Info234_Frag){that.GlbCurrView.oClient_Info234_Frag=undefined;that.GlbCurrView.oClient_Info234_Frag=null}if(that.GlbCurrView.oreply_id_Info234_Frag){that.GlbCurrView.oreply_id_Info234_Frag=undefined;that.GlbCurrView.oreply_id_Info234_Frag=null}if(that.GlbCurrView.orecord_type_Info234_Frag){that.GlbCurrView.orecord_type_Info234_Frag=undefined;that.GlbCurrView.orecord_type_Info234_Frag=null}if(that.GlbCurrView.osales_order_code_Info234_Frag){that.GlbCurrView.osales_order_code_Info234_Frag=undefined;that.GlbCurrView.osales_order_code_Info234_Frag=null}if(that.GlbCurrView.oissued_date_Info234_Frag){that.GlbCurrView.oissued_date_Info234_Frag=undefined;that.GlbCurrView.oissued_date_Info234_Frag=null}if(that.GlbCurrView.ounified_model_number_Info234_Frag){that.GlbCurrView.ounified_model_number_Info234_Frag=undefined;that.GlbCurrView.ounified_model_number_Info234_Frag=null}if(that.GlbCurrView.osuplier_code_Info234_Frag){that.GlbCurrView.osuplier_code_Info234_Frag=undefined;that.GlbCurrView.osuplier_code_Info234_Frag=null}},onExportSelectedInfo_234Table:function(e){var t=new sap.ui.model.json.JSONModel(that.GlbCurrView.getView().getModel("Info234_Model").oData);var r=[{label:"Record Type",property:"record_type"},{label:"Reply Id",property:"reply_id"},{label:"Sales Order Code",property:"sales_order_code"},{label:"Issued Date",property:"issued_date"},{label:"Unified Model Number",property:"unified_model_number"},{label:"Supplier Code",property:"supplier_code"},{label:"Description 1",property:"description_1"},{label:"Description 2",property:"description_2"},{label:"Description 3",property:"description_3"},{label:"Description 4",property:"description_4"},{label:"Description 5",property:"description_5"},{label:"Description 6",property:"description_6"},{label:"Description 7",property:"description_7"},{label:"Filler",property:"filler"},{label:"Revised Id",property:"revised_id"},{label:"Filler 2",property:"filler_2"},{label:"Printer Spec 8",property:"printer_spec_8"},{label:"Printer Spec 9",property:"printer_spec_9"},{label:"Printer Spec 10",property:"printer_spec_10"},{label:"Printer Spec 11",property:"printer_spec_11"},{label:"Printer Spec 12",property:"printer_spec_12"},{label:"Printer Spec 13",property:"printer_spec_13"},{label:"Printer Spec 14",property:"printer_spec_14"},{label:"Revised Id 3",property:"revised_id_3"},{label:"Filler 3",property:"filler_3"},{label:"Printer Spec 15",property:"printer_spec_15"},{label:"Printer Spec 16",property:"printer_spec_16"},{label:"Printer Spec 17",property:"printer_spec_17"},{label:"Printer Spec 18",property:"printer_spec_18"},{label:"Printer Spec 19",property:"printer_spec_19"},{label:"Printer Spec 20",property:"printer_spec_20"},{label:"Filler 4",property:"filler_4"},{label:"Revised Id 4",property:"revised_id_4"},{label:"Filler 5",property:"filler_5"},{label:"Delete Indicator",property:"delete_indicator"},{label:"Created On",property:"created_on"},{label:"Changed On",property:"changed_on"},{label:"Change Time",property:"change_time"}];var o={workbook:{columns:r,context:{sheetName:"GCMS_INFO_234"}},dataSource:t.getData(),fileName:"GCMS_INFO_234.xlsx"};var i=new sap.ui.export.Spreadsheet(o);i.build().then(function(){i.destroy()})},onGoToReport_Util_Info234:function(){that.GlbCurrView.busy.open();var t=this.currentView.getView().byId("id_Info234_record_type").getTokens();that.GlbCurrView.sInfo234_record_type_TokensValues=t.map(function(e){return e.getText()}).join(",");var r=this.currentView.getView().byId("id_Info234_reply_id").getTokens();that.GlbCurrView.sInfo234_reply_id_Values=r.map(function(e){return e.getText()}).join(",");var o=this.currentView.getView().byId("id_Info234_sales_order_code").getTokens();that.GlbCurrView.sInfo234_sales_order_code_TokensValues=o.map(function(e){return e.getText()}).join(",");var i=this.currentView.getView().byId("id_Info234_issued_date").getTokens();that.GlbCurrView.sInfo234_issued_date_TokensValues=i.map(function(e){return e.getText()}).join(",");var a=this.currentView.getView().byId("id_Info234_unified_model_number").getTokens();that.GlbCurrView.sInfo234_unified_model_number_TokensValues=a.map(function(e){return e.getText()}).join(",");var n=this.currentView.getView().byId("id_Info234_suplier_code").getTokens();that.GlbCurrView.sInfo234_suplier_code_TokensValues=n.map(function(e){return e.getText()}).join(",");var l=[];if(that.GlbCurrView.sInfo234_record_type_TokensValues!==""){var d=that.GlbCurrView.sInfo234_record_type_TokensValues.split(",");if(d.length>0){$.each(d,function(e,t){l.push(new sap.ui.model.Filter("record_type",sap.ui.model.FilterOperator.Contains,t))})}}if(that.GlbCurrView.sInfo234_reply_id_Values!==""){var s=that.GlbCurrView.sInfo234_reply_id_Values.split(",");if(s.length>0){$.each(s,function(e,t){l.push(new sap.ui.model.Filter("reply_id",sap.ui.model.FilterOperator.Contains,t))})}}if(that.GlbCurrView.sInfo234_sales_order_code_TokensValues!==""){var _=that.GlbCurrView.sInfo234_sales_order_code_TokensValues.split(",");if(_.length>0){$.each(_,function(e,t){l.push(new sap.ui.model.Filter("sales_order_code",sap.ui.model.FilterOperator.Contains,t))})}}if(that.GlbCurrView.sInfo234_issued_date_TokensValues!==""){var u=that.GlbCurrView.sInfo234_issued_date_TokensValues.split(",");if(u.length>0){$.each(u,function(e,t){l.push(new sap.ui.model.Filter("issued_date",sap.ui.model.FilterOperator.Contains,t))})}}if(that.GlbCurrView.sInfo234_unified_model_number_TokensValues!==""){var f=that.GlbCurrView.sInfo234_unified_model_number_TokensValues.split(",");if(f.length>0){$.each(f,function(e,t){l.push(new sap.ui.model.Filter("unified_model_number",sap.ui.model.FilterOperator.Contains,t))})}}if(that.GlbCurrView.sInfo234_suplier_code_TokensValues!==""){var c=that.GlbCurrView.sInfo234_suplier_code_TokensValues.split(",");if(c.length>0){$.each(c,function(e,t){l.push(new sap.ui.model.Filter("suplier_code",sap.ui.model.FilterOperator.Contains,t))})}}if(that.startDate!==""&&that.endDate!==""||that.startDate!==undefined&&that.endDate!==undefined){var p=that.startDate;var h=that.endDate;if(p){l.push(new sap.ui.model.Filter("created_on",sap.ui.model.FilterOperator.BT,p,h))}}if(that.startDate1!==""&&that.endDate1!==""||that.startDate1!==undefined&&that.endDate1!==undefined){var w=that.startDate1;var g=that.endDate1;if(w){l.push(new sap.ui.model.Filter("changed_on",sap.ui.model.FilterOperator.BT,w,g))}}that.GlbCurrView.tableMainModelfiltereddata=undefined;that.GlbCurrView.tableMainModelfiltereddata=new e(that.GlbCurrView.getView().getModel("globalMainData_Info234").oData);that.GlbCurrView.getView().setModel(that.GlbCurrView.tableMainModelfiltereddata,"Info234_Model");this.currentView.getView().byId("idInfo_234_Table").getBinding("items").filter(l);that.GlbCurrView.filteredData=true;that.GlbCurrView.filteredDataToExport=[];var V=this.currentView.getView().byId("idInfo_234_Table").getBinding("items").aIndices.length;that.GlbCurrView.filteredIndices=this.currentView.getView().byId("idInfo_234_Table").getBinding("items").aIndices;for(var b=0;b<V;b++){that.GlbCurrView.filteredDataToExport.push(that.GlbCurrView.tableMainModelfiltereddata.oData[that.GlbCurrView.filteredIndices[b]])}var I=new e(that.GlbCurrView.filteredDataToExport);that.GlbCurrView.getView().setModel(I,"Info234_Model");that.GlbCurrView.busy.close()},handleInfo_234_SortButtonPressedUtil:function(e){if(this.currentView.oInfo_234_SortFrag){this.currentView.oInfo_234_SortFrag=undefined}if(!this.currentView.oInfo_234_SortFrag){that.GlbCurrView.busy.open();this.currentView.oInfo_234_SortFrag=sap.ui.xmlfragment("masterdata.fragments.dialogs.Info_234.ascAndDscSort_Info234",that);this.currentView.getView().addDependent(that.GlbCurrView.oInfo_234_SortFrag)}that.GlbCurrView.busy.close();this.currentView.oInfo_234_SortFrag.open()},Info_234_handleSortDialogConfirmUtil:function(e){var t=this.currentView.byId("idInfo_234_Table"),r=e.getParameters(),o=t.getBinding("items"),i,a,n=[];i=r.sortItem.getKey();a=r.sortDescending;n.push(new u(i,a));o.sort(n)},getDefaultFilteredDateData:function(){var e=this.currentView.byId("idInfo_234_Table");var t=e.getBinding("items");var r=[];r.push(new u("created_on",true));t.sort(r)},onClear234Util:function(e){this.currentView.getView().byId("id_Info234_record_type").setTokens([]);this.currentView.getView().byId("id_Info234_reply_id").setTokens([]);this.currentView.getView().byId("id_Info234_sales_order_code").setTokens([]);this.currentView.getView().byId("id_Info234_issued_date").setTokens([]);this.currentView.getView().byId("id_Info234_unified_model_number").setTokens([]);this.currentView.getView().byId("id_Info234_suplier_code").setTokens([]);this.currentView.getView().byId("id_datePicker_9").setValue("");this.currentView.getView().byId("id_datePicker_10").setValue("");var t=new sap.ui.model.json.JSONModel;that.getView().setModel(t,"Info234_Model");that.GlbCurrView.completeDate="";that.GlbCurrView.completeDate1="";that.startDate="";that.endDate="";that.startDate1="";that.endDate1=""}}});