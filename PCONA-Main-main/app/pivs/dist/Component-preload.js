//@ui5-bundle pivs/Component-preload.js
jQuery.sap.registerPreloadedModules({
"version":"2.0",
"modules":{
	"pivs/Component.js":function(){sap.ui.define(["sap/ui/core/UIComponent","sap/ui/Device","pivs/model/models"],function(e,i,t){"use strict";return e.extend("pivs.Component",{metadata:{manifest:"json"},init:function(){e.prototype.init.apply(this,arguments);this.getRouter().initialize();this.setModel(t.createDeviceModel(),"device")}})});
},
	"pivs/Fragments/ascAndDscSort.fragment.xml":'<core:FragmentDefinition\n\txmlns="sap.m"\n\txmlns:core="sap.ui.core"><ViewSettingsDialog \n\t\tconfirm="handleSortDialogConfirm"><sortItems  ><ViewSettingsItem text="{i18n>IndicatorI_P}" key="indicator"  /><ViewSettingsItem text="{i18n>TransmissionDate}" key="transmissionDate" selected="true" /><ViewSettingsItem text="{i18n>Timestamp}" key="timestamp" /><ViewSettingsItem text="{i18n>SalesOrder}" key="salesOrder" /><ViewSettingsItem text="{i18n>ItemNumber}" key="itemNumber" /><ViewSettingsItem text="{i18n>ScheduleLineNo}" key="scheduledLineNo" /><ViewSettingsItem text="{i18n>Material}" key="material" /><ViewSettingsItem text="{i18n>Plant}" key="plant" /><ViewSettingsItem text="{i18n>ConfirmQua}" key="confirmQuantity" /><ViewSettingsItem text="{i18n>FactoryConfirmedQty}" key="factoryConfirmQuantity" /><ViewSettingsItem text="{i18n>UOM}" key="uom" /><ViewSettingsItem text="{i18n>ConfirmDate}" key="confirmDate" /><ViewSettingsItem text="{i18n>Status}" key="status" /><ViewSettingsItem text="{i18n>Message}" key="message" /></sortItems></ViewSettingsDialog></core:FragmentDefinition>',
	"pivs/Fragments/material.fragment.xml":'<c:FragmentDefinition\n\txmlns="sap.m"\n\txmlns:c="sap.ui.core"><SelectDialog  \n  noDataText="{i18n>NoDataFound}"\n  title="{i18n>Material}"\n  liveChange="onSearchMaterial"\n  confirm="onSelectionMaterial"\n  cancel="onDialogClose"\n  multiSelect="true"\n  items="{materialData>/}"><StandardListItem \n\ntitle="{path: \'materialData>material\'}"\niconDensityAware="false"\niconInset="false"\ntype="Active" /></SelectDialog ></c:FragmentDefinition>\n\n',
	"pivs/Fragments/plant.fragment.xml":'<c:FragmentDefinition\n\txmlns="sap.m"\n\txmlns:c="sap.ui.core"><SelectDialog  \n  noDataText="{i18n>NoDataFound}"\n  title="{i18n>Plant}"\n  liveChange="onSearchPlant"\n  confirm="onSelectionPlant"\n  cancel="onDialogClose"\n  multiSelect="true"\n  items="{plantData>/}"><StandardListItem \n\ntitle="{path: \'plantData>plant\'}"\niconDensityAware="false"\niconInset="false"\ntype="Active" /></SelectDialog ></c:FragmentDefinition>\n\n',
	"pivs/Fragments/salesOrder.fragment.xml":'<c:FragmentDefinition\n\txmlns="sap.m"\n\txmlns:c="sap.ui.core"><SelectDialog  \n  noDataText="{i18n>NoDataFound}"\n  title="{i18n>SalesOrder}"\n  liveChange="onSearchSalesOrder"\n  confirm="onSelectionSalesOrder"\n  cancel="onDialogClose"\n  multiSelect="true"\n  items="{salesOrderData>/}"><StandardListItem \n\ntitle="{path: \'salesOrderData>salesOrder\'}"\niconDensityAware="false"\niconInset="false"\ntype="Active" /></SelectDialog ></c:FragmentDefinition>\n\n',
	"pivs/controller/App.controller.js":function(){sap.ui.define(["sap/ui/core/mvc/Controller"],function(e){"use strict";return e.extend("pivs.controller.App",{onInit(){}})});
},
	"pivs/controller/View1.controller.js":'var that;sap.ui.define(["sap/ui/core/mvc/Controller","sap/ui/core/Fragment","sap/ui/model/json/JSONModel","sap/ui/model/Filter","sap/ui/model/FilterOperator","sap/m/MessageToast","sap/m/Token","sap/ui/core/date/UI5Date","sap/m/MessageBox","sap/m/BusyDialog","sap/ui/model/Sorter","sap/ui/core/util/Export","sap/ui/core/util/ExportTypeCSV","sap/ui/export/Spreadsheet"],function(e,t,a,r,i,s,n,o,l,d,h,u,g,p){"use strict";return e.extend("pivs.controller.View1",{onInit:function(){that=this;that.filteredData;that.busy=new d;this.setMaxDateforDateRange();this.pivsReadCall();this.oFilterBar=this.getView().byId("filterbar");this.oTable=this.getView().byId("PIVSTable")},pivsReadCall:function(){var e=this.getOwnerComponent().getModel("SalesSrv_global_model");that.busy.open();var t=new sap.ui.model.json.JSONModel;e.callFunction("/userInfo",{success:function(e){t.setData(e.userInfo.scopes);that.getView().setModel(t,"userModel");that.userLoggedIn=e.userInfo.user}.bind(that),error:function(e){}.bind(that)});e.read("/pivs_records",{success:function(e){var t=that.getView().getModel("userModel").getData();if(t.TISAdmin===true){that.getView().setModel(e.results,"globalMainData")}else{that.getView().setModel([],"globalMainData")}that.busy.close()},error:function(e){that.busy.close()}})},setMaxDateforDateRange:function(e){var t=new Date;var a=t.setDate(t.getDate());a=new Date(a).getDate();a=a.toString().padStart(2,"0");var r=t.getMonth()+1;r=r.toString().padStart(2,"0");var i=t.getFullYear().toString();that.completeDate=r+"-"+a+"-"+i;const s=new Date(i,r-1,a);var n=this.getView().byId("id_datePicker1");n.setMaxDate(s)},handleChangeDate:function(e){that.startDate=e.mParameters.value.substr(0,10);that.endDate=e.mParameters.value.substr(13,20)},onOpenPlantFragment:function(e){if(this.oPlantFrag){this.oPlantFrag=undefined}if(!this.oPlantFrag){that.busy.open();this.oPlantFrag=sap.ui.xmlfragment("pivs.Fragments.plant",this);this.getView().addDependent(that.oPlantFrag);var t=that.getView().getModel("globalMainData");var r={};var i=t;var s=[];for(var n,o=0;n=i[o++];){var l=n.plant;if(!(l in r)){r[l]=1;s.push({plant:l})}}var d=new a(s);this.getView().setModel(d,"plantGlobalData");this.oPlantFrag.setModel(d,"plantData")}that.busy.close();this.oPlantFrag.open()},onSelectionPlant:function(e){var t=e.getParameter("selectedContexts");var a=this.getView().byId("id_Plant");var r=[];var i=that.getView().getModel("plantGlobalData");for(var s=0;s<t.length;s++){r.push(t[s])}var o=[];$.each(r,function(e,t){if($.inArray(t.ProductId,o)===-1)o.push(t.getObject())});i.setProperty("/tokens2",o);var l;l=a.getTokens()[0];if(!l){l=new n({text:"{plant}",key:"{plant}"})}else{l=a.getTokens()[0].clone()}o.forEach(function(e){a.addToken(new n({text:e.plant}))})},onOpenMaterialFragment:function(e){if(this.oMaterialFrag){this.oMaterialFrag=undefined}if(!this.oMaterialFrag){that.busy.open();this.oMaterialFrag=sap.ui.xmlfragment("pivs.Fragments.material",that);this.getView().addDependent(that.oMaterialFrag);var t=that.getView().getModel("globalMainData");var r={};var i=t;var s=[];for(var n,o=0;n=i[o++];){var l=n.material;if(!(l in r)){r[l]=1;s.push({material:l})}}var d=new a(s);this.getView().setModel(d,"materialGlobalData");this.oMaterialFrag.setModel(d,"materialData")}that.busy.close();this.oMaterialFrag.open()},handleChangeStatus:function(e){var t=e.getSource();that.statusKey=t.getSelectedKey();var a=t._getSelectedItemText()},handleChangeIndicator:function(e){var t=e.getSource();that.indicatorKey=t.getSelectedKey();var a=t._getSelectedItemText()},onSelectionMaterial:function(e){this.getView().byId("id_Material").setTokens([]);that.oMaterialModel=[];var t=e.getParameter("selectedContexts");var a=this.getView().byId("id_Material");var r=[];var i=this.getView().getModel("materialGlobalData");for(var s=0;s<t.length;s++){r.push(t[s])}that.oMaterialModel=[];$.each(r,function(e,t){if($.inArray(t.ProductId,that.oMaterialModel)===-1)that.oMaterialModel.push(t.getObject())});i.setProperty("/tokens3",that.oMaterialModel);var o;o=a.getTokens()[0];if(!o){o=new n({text:"{material}",key:"{material}"})}else{o=a.getTokens()[0].clone()}that.oMaterialModel.forEach(function(e){a.addToken(new n({text:e.material}))})},onOpenSalesOrderFragment:function(e){if(this.oSalesOrderFrag){this.oSalesOrderFrag=undefined}if(!this.oSalesOrderFrag){that.busy.open();this.oSalesOrderFrag=sap.ui.xmlfragment("pivs.Fragments.salesOrder",that);this.getView().addDependent(that.oSalesOrderFrag);var t=that.getView().getModel("globalMainData");var r={};var i=t;var s=[];for(var n,o=0;n=i[o++];){var l=n.salesOrder;if(!(l in r)){r[l]=1;s.push({salesOrder:l})}}var d=new a(s);this.getView().setModel(d,"salesOrderGlobalData");this.oSalesOrderFrag.setModel(d,"salesOrderData")}that.busy.close();this.oSalesOrderFrag.open()},onSelectionSalesOrder:function(e){var t=e.getParameter("selectedContexts");var a=this.getView().byId("id_SalesOrder");var r=[];var i=this.getView().getModel("salesOrderGlobalData");for(var s=0;s<t.length;s++){r.push(t[s])}var o=[];$.each(r,function(e,t){if($.inArray(t.ProductId,o)===-1)o.push(t.getObject())});i.setProperty("/tokens4",o);var l;l=a.getTokens()[0];if(!l){l=new n({text:"{salesOrder}",key:"{salesOrder}"})}else{l=a.getTokens()[0].clone()}o.forEach(function(e){a.addToken(new n({text:e.salesOrder}))})},onSearchPlant:function(e){var t=e.getParameter("value");var a=new r("plant",sap.ui.model.FilterOperator.Contains,t);var i=e.getParameter("itemsBinding");i.filter([a])},onSearchMaterial:function(e){var t=e.getParameter("value");var a=new r("material",sap.ui.model.FilterOperator.Contains,t);var i=e.getParameter("itemsBinding");i.filter([a])},onSearchSalesOrder:function(e){var t=e.getParameter("value");var a=new r("salesOrder",sap.ui.model.FilterOperator.Contains,t);var i=e.getParameter("itemsBinding");i.filter([a])},onDialogClose:function(e){if(this.oSalesOrderFrag){this.oSalesOrderFrag=undefined;this.oSalesOrderFrag=null}else if(this.oMaterialFrag){this.oMaterialFrag=undefined;this.oMaterialFrag=null}else if(this.oPlantFrag){this.oPlantFrag=undefined}},onGoToReport:function(){that.busy.open();var e=this.getView().byId("id_Plant").getTokens();that.sPlantValues=e.map(function(e){return e.getText()}).join(",");var t=this.getView().byId("id_Material").getTokens();that.sMaterialValues=t.map(function(e){return e.getText()}).join(",");var r=this.getView().byId("id_SalesOrder").getTokens();that.sSalesOrderValues=r.map(function(e){return e.getText()}).join(",");var i=[];if(that.startDate===""&&that.endDate===""||that.startDate===undefined&&that.endDate===undefined){l.warning("Please Select Mandatory Fields");that.busy.close()}else{if(that.sMaterialValues!==""){var s=that.sMaterialValues.split(",");if(s.length>0){$.each(s,function(e,t){i.push(new sap.ui.model.Filter("material",sap.ui.model.FilterOperator.Contains,t))})}}if(that.sSalesOrderValues!==""){var n=that.sSalesOrderValues.split(",");if(n.length>0){$.each(n,function(e,t){i.push(new sap.ui.model.Filter("salesOrder",sap.ui.model.FilterOperator.Contains,t))})}}if(that.sPlantValues!==""){var o=that.sPlantValues.split(",");if(o.length>0){$.each(o,function(e,t){i.push(new sap.ui.model.Filter("plant",sap.ui.model.FilterOperator.Contains,t))})}}if(that.startDate!==""&&that.endDate!==""||that.startDate!==undefined&&that.endDate!==undefined){var d=that.startDate;var h=that.endDate;if(d){i.push(new sap.ui.model.Filter("transmissionDate",sap.ui.model.FilterOperator.BT,d,h))}}if(that.statusKey!==""&&that.statusKey!==undefined){var u=that.statusKey;if(u){i.push(new sap.ui.model.Filter("status",sap.ui.model.FilterOperator.Contains,u))}}if(that.indicatorKey!==""&&that.indicatorKey!==undefined){var g=that.indicatorKey;if(g){i.push(new sap.ui.model.Filter("indicator",sap.ui.model.FilterOperator.Contains,g))}}that.tableMainModelfiltereddata=undefined;that.tableMainModelfiltereddata=new a(that.getView().getModel("globalMainData"));that.getView().setModel(that.tableMainModelfiltereddata,"tableModel");this.getDefaultFilteredDateData();this.getView().byId("PIVSTable").getBinding("items").filter(i);that.filteredData=true;that.filteredDataToExport=[];var p=this.getView().byId("PIVSTable").getBinding("items").aIndices.length;that.filteredIndices=this.getView().byId("PIVSTable").getBinding("items").aIndices;for(var f=0;f<p;f++){that.filteredDataToExport.push(that.tableMainModelfiltereddata.oData[that.filteredIndices[f]])}var c=new a(that.filteredDataToExport);that.getView().setModel(c,"tableModel");that.busy.close()}},attachDateToExcel:function(){var e=sap.ui.core.format.DateFormat.getDateTimeInstance({pattern:"MM-dd-yyyy"});var t=e.format(new Date);return t},onExportSelected:function(e){this.onGoToReport();var t=this.getView().byId("PIVSTable").getSelectedItems();var a=this.getView().getModel("globalMainData");var r=this.filteredData;var i;if(r===true){i=new sap.ui.model.json.JSONModel(this.getView().getModel("tableModel").getData())}else{i=new sap.ui.model.json.JSONModel(a.getData())}var s=[{label:"Indicator",property:"indicator"},{label:"Transmission Date",property:"transmissionDate"},{label:"Timestamp",property:"timestamp"},{label:"Sales Order",property:"salesOrder"},{label:"Scheduled Line No",property:"scheduledLineNo"},{label:"Material",property:"material"},{label:"Plant",property:"plant"},{label:"Confirm Quantity",property:"confirmQuantity"},{label:"Factory Confirm Quantity",property:"factoryConfirmQuantity"},{label:"UOM",property:"uom"},{label:"Confirm Date",property:"confirmDate"},{label:"Status",property:"status"},{label:"Message",property:"message"}];var n={workbook:{columns:s,context:{sheetName:"PIVSExport_"+this.attachDateToExcel()}},dataSource:i.getData(),fileName:"PIVSExport_"+this.attachDateToExcel()+".xlsx"};var o=new sap.ui.export.Spreadsheet(n);o.build().finally(function(){o.destroy()})},handleSortButtonPressed:function(e){if(this.oSortFrag){this.oSortFrag=undefined}if(!this.oSortFrag){that.busy.open();this.oSortFrag=sap.ui.xmlfragment("pivs.Fragments.ascAndDscSort",that);this.getView().addDependent(that.oSortFrag)}that.busy.close();this.oSortFrag.open()},getDefaultFilteredDateData:function(){var e=this.byId("PIVSTable");var t=e.getBinding("items");var a=[];a.push(new h("transmissionDate",true));t.sort(a)},handleSortDialogConfirm:function(e){var t=this.byId("PIVSTable"),a=e.getParameters(),r=t.getBinding("items"),i,s,n=[];i=a.sortItem.getKey();s=a.sortDescending;n.push(new h(i,s));r.sort(n)},onPressClear:function(e){that.filteredData=false;this.getView().byId("id_datePicker1").setValue("");this.getView().byId("id_Plant").setTokens([]);this.getView().byId("id_Material").setTokens([]);this.getView().byId("id_SalesOrder").setTokens([]);this.getView().byId("id_PIVSStatus").setSelectedKey();this.getView().byId("id_Indicator").setSelectedKey();var t=new a;that.getView().setModel(t,"tableModel");that.completeDate="";that.statusKey="";that.indicatorKey="";that.startDate="";that.endDate=""}})});',
	"pivs/i18n/i18n.properties":'# This is the resource bundle for pivs\n\n#Texts for manifest.json\n\n#XTIT: Application name\nappTitle=PIVS Sales Order Updates Process\n\n#YDES: Application description\nappDescription=A Fiori application.\n#XTIT: Main view title\ntitle=PIVS SALES ORDER Update : Production Schedule Process\n\nTransmissionDate  = Transmission Date \nSalesOrder = Sales Order\nItemNumber = Item No.\nMaterial = Material\nPlant = Plant\nConfirmQua =SO Confirmed Qty\nConfirmDate = Confirmed Date\nStatus = Status\nMessage = Message\nPIVSStatus = PIVS Status\nUOM = UoM\nIndicatorI_P = Indicator I/P\nScheduleLineNo = Schedule Line No.\nFactoryConfirmedQty = Factory Confirmed Qty\nTimestamp = Timestamp\n\n#13-04-24 assertion issue SAP Recommendation @Gnaneshwar.\nNoDataFound = NoDataFound',
	"pivs/manifest.json":'{"_version":"1.58.0","sap.app":{"id":"pivs","type":"application","i18n":"i18n/i18n.properties","applicationVersion":{"version":"0.0.1"},"title":"{{appTitle}}","description":"{{appDescription}}","resources":"resources.json","sourceTemplate":{"id":"@sap/generator-fiori:basic","version":"1.11.2","toolsId":"f02a148e-7cc6-444b-9a52-a708ee5124a1"},"dataSources":{"salesorderService":{"uri":"v2/SalesorderSrv/","type":"OData","settings":{"annotations":[],"localUri":"localService/metadata.xml","odataVersion":"2.0"}}},"crossNavigation":{"inbounds":{"pivs-inbound":{"signature":{"parameters":{},"additionalParameters":"allowed"},"semanticObject":"pivs_sales_order","action":"manage","title":"{{title}}","icon":""}}}},"sap.ui":{"technology":"UI5","icons":{"icon":"","favIcon":"","phone":"","phone@2":"","tablet":"","tablet@2":""},"deviceTypes":{"desktop":true,"tablet":true,"phone":true}},"sap.ui5":{"flexEnabled":false,"dependencies":{"minUI5Version":"1.116.0","libs":{"sap.m":{},"sap.ui.core":{},"sap.f":{},"sap.suite.ui.generic.template":{},"sap.ui.comp":{},"sap.ui.generic.app":{},"sap.ui.table":{},"sap.ushell":{}}},"contentDensities":{"compact":true,"cozy":true},"models":{"i18n":{"type":"sap.ui.model.resource.ResourceModel","settings":{"bundleName":"pivs.i18n.i18n"}},"SalesSrv_global_model":{"dataSource":"salesorderService","preload":true,"settings":{"synchronizationMode":"None","operationMode":"Server","autoExpandSelect":true,"earlyRequests":true}}},"resources":{"css":[{"uri":"css/style.css"}]},"routing":{"config":{"routerClass":"sap.m.routing.Router","viewType":"XML","async":true,"viewPath":"pivs.view","controlAggregation":"pages","controlId":"app","clearControlAggregation":false},"routes":[{"name":"RouteView1","pattern":":?query:","target":["TargetView1"]}],"targets":{"TargetView1":{"viewType":"XML","transition":"slide","clearControlAggregation":false,"viewId":"View1","viewName":"View1"}}},"rootView":{"viewName":"pivs.view.App","type":"XML","async":true,"id":"App"}},"sap.cloud":{"public":true,"service":"PCONA-Main"}}',
	"pivs/model/models.js":function(){sap.ui.define(["sap/ui/model/json/JSONModel","sap/ui/Device"],function(e,n){"use strict";return{createDeviceModel:function(){var i=new e(n);i.setDefaultBindingMode("OneWay");return i}}});
},
	"pivs/view/App.view.xml":'<mvc:View controllerName="pivs.controller.App"\n    xmlns:html="http://www.w3.org/1999/xhtml"\n    xmlns:mvc="sap.ui.core.mvc" displayBlock="true"\n    xmlns="sap.m"><App id="app"></App></mvc:View>\n',
	"pivs/view/View1.view.xml":'<mvc:View\n    controllerName="pivs.controller.View1"\n    xmlns:mvc="sap.ui.core.mvc"\n    xmlns:core="sap.ui.core"\n    displayBlock="true"\n    xmlns:f="sap.ui.layout.form"\n    xmlns:l="sap.ui.layout"\n    xmlns="sap.m"\n    xmlns:ff="sap.f"\n    xmlns:fb="sap.ui.comp.filterbar"\n><Shell id="shell"><App id="app"><pages><Page title="{i18n>title}"><fb:FilterBar\n                        id="filterbar"\n                        persistencyKey="myPersKey"\n                        useToolbar="false"\n                        search="onGoToReport"\n                        showClearOnFB="true"\n                        clear="onPressClear"\n                        filterChange=".onFilterChange"\n                        afterVariantLoad=".onAfterVariantLoad"\n                    ><fb:filterGroupItems><fb:FilterGroupItem\n                                name="indicator"\n                                label="{i18n>IndicatorI_P}"\n                                groupName="Group1"\n                                visibleInFilterBar="true"\n                            ><fb:control><Select  id="id_Indicator"\tforceSelection="false" change="handleChangeIndicator"><core:Item key="I" text="I-Confirmed Inventory" /><core:Item key="P" text="P-Planned Schedule" /></Select></fb:control></fb:FilterGroupItem><fb:FilterGroupItem\n                                name="transmissionDate"\n                                label="{i18n>TransmissionDate}"\n                                groupName="Group1"\n                                visibleInFilterBar="true"\n                            ><fb:control><DateRangeSelection\n                                        required="true"\n                                        id="id_datePicker1"\n                                        placeholder="Select Date"\n                                        displayFormat="MM-dd-YYYY"\n                                        valueFormat="MM-dd-YYYY"\n                                        width="70%"\n                                        change="handleChangeDate"\n                                    /></fb:control></fb:FilterGroupItem><fb:FilterGroupItem\n                                name="material"\n                                label="{i18n>Material}"\n                                groupName="Group1"\n                                visibleInFilterBar="true"\n                            ><fb:control><MultiInput\n                                        id="id_Material"\n                                        showValueHelp="true"\n                                        valueHelpOnly="true"\n                                        valueHelpRequest="onOpenMaterialFragment"\n                                        placeholder="{i18n>Material}"\n                                        tokenUpdate="onTokenMaterialChange"\n                                    /></fb:control></fb:FilterGroupItem><fb:FilterGroupItem\n                                name="plant"\n                                label="{i18n>Plant}"\n                                groupName="Group1"\n                                visibleInFilterBar="true"\n                            ><fb:control><MultiInput\n                                        id="id_Plant"\n                                        showValueHelp="true"\n                                        valueHelpOnly="true"\n                                        valueHelpRequest="onOpenPlantFragment"\n                                        placeholder="{i18n>Plant}"\n                                        tokenUpdate="onTokenPlantChange"\n                                    /></fb:control></fb:FilterGroupItem><fb:FilterGroupItem\n                                name="salesOrder"\n                                label="{i18n>SalesOrder}"\n                                groupName="Group1"\n                                visibleInFilterBar="true"\n                            ><fb:control><MultiInput\n                                        id="id_SalesOrder"\n                                        showValueHelp="true"\n                                        valueHelpOnly="true"\n                                        valueHelpRequest="onOpenSalesOrderFragment"\n                                        placeholder="{i18n>SalesOrder}"\n                                        tokenUpdate="onTokenSalesOrderChange"\n                                    /></fb:control></fb:FilterGroupItem><fb:FilterGroupItem\n                                name="status"\n                                label="{i18n>Status}"\n                                groupName="Group1"\n                                visibleInFilterBar="true"\n                            ><fb:control><Select  id="id_PIVSStatus"\tforceSelection="false" change="handleChangeStatus"><core:Item key="Success" text="Success" /><core:Item key="Failed" text="Failed" /></Select></fb:control></fb:FilterGroupItem></fb:filterGroupItems></fb:FilterBar><content><Table\n                            alternateRowColors="true"\n                            backgroundDesign="Solid"\n                            mode="None"\n                            sticky="ColumnHeaders"\n                            headerText="{i18n>PIVSStatus}"\n                            items="{tableModel>/}"\n                            autoPopinMode="false"\n                            contextualWidth="Auto"\n                            id="PIVSTable"\n                            inset="false"\n                            growing="true"\n                            growingThreshold="20"\n                            growingScrollToLoad="false"\n                        ><headerToolbar><OverflowToolbar><ToolbarSpacer /><Button\n                                        icon="sap-icon://excel-attachment"\n                                        press="onExportSelected"\n                                    /><Button\n\t\t\t\t\t\t                tooltip="Sort"\n\t\t\t\t\t\t                icon="sap-icon://sort"\n\t\t\t\t\t\t            press="handleSortButtonPressed"\n                                    /></OverflowToolbar></headerToolbar><columns><Column\n                                    \n                                    minScreenWidth="Tablet"\n                                    popinDisplay="Block"\n                                    demandPopin="true"\n                                ><Label\n                                     wrapping="true"\n                                        design="Bold"\n                                        text="{i18n>IndicatorI_P}"\n                                    /></Column><Column\n                                     width="6rem"\n                                    popinDisplay="Block"\n                                    demandPopin="true"\n                                    minScreenWidth="Tablet"\n                                ><Label\n                                        design="Bold"\n                                        text="{i18n>TransmissionDate}"\n                                        wrapping="true"\n                                    /></Column><Column                                     \n                                    popinDisplay="Block"\n                                    demandPopin="true"\n                                    minScreenWidth="Tablet"\n                                ><Label\n                                        design="Bold"\n                                        text="{i18n>Timestamp}"\n                                        wrapping="true"\n                                    /></Column><Column\n                                    \n                                    minScreenWidth="Tablet"\n                                    popinDisplay="Block"\n                                    demandPopin="true"\n                                ><Label\n                                        design="Bold"\n                                        text="{i18n>SalesOrder}"\n                                    /></Column><Column\n                                                                     \n                                    popinDisplay="Block"\n                                    demandPopin="true"\n                                    minScreenWidth="Tablet"\n                                ><Label\n                                        design="Bold"\n                                        wrapping="true"\n                                        text="{i18n>ItemNumber}"\n                                    /></Column><Column\n                                                                     \n                                    popinDisplay="Block"\n                                    demandPopin="true"\n                                    minScreenWidth="Tablet"\n                                ><Label\n                                        design="Bold"\n                                        wrapping="true"\n                                        text="{i18n>ScheduleLineNo}"\n                                    /></Column><Column\n                                    \n                                    popinDisplay="Block"\n                                    demandPopin="true"\n                                    minScreenWidth="Tablet"\n                                ><Label\n                                        design="Bold"\n                                        text="{i18n>Material}"\n                                    /></Column><Column\n                                    \n                                    popinDisplay="Block"\n                                    demandPopin="true"\n                                    minScreenWidth="Tablet"\n                                ><Label\n                                        design="Bold"\n                                        text="{i18n>Plant}"\n                                        wrapping="true"\n                                    /></Column><Column\n                                    \n                                    popinDisplay="Block"\n                                    demandPopin="true"\n                                    minScreenWidth="Tablet"\n                                ><Label\n                                        design="Bold"\n                                        text="{i18n>ConfirmQua}"\n                                        wrapping="true"\n                                    /></Column><Column\n                                    \n                                    popinDisplay="Block"\n                                    demandPopin="true"\n                                    minScreenWidth="Tablet"\n                                ><Label\n                                        design="Bold"\n                                        text="{i18n>FactoryConfirmedQty}"\n                                        wrapping="true"\n                                    /></Column><Column\n                                    \n                                    popinDisplay="Block"\n                                    demandPopin="true"\n                                    minScreenWidth="Tablet"\n                                ><Label\n                                        design="Bold"\n                                        text="{i18n>UOM}"\n                                        wrapping="true"\n                                    /></Column><Column\n                                    \n                                    popinDisplay="Block"\n                                    demandPopin="true"\n                                    minScreenWidth="Tablet"\n                                ><Label\n                                    wrapping="true"\n                                        design="Bold"\n                                        text="{i18n>ConfirmDate}"\n                                    /></Column><Column\n                                    \n                                    popinDisplay="Block"\n                                    demandPopin="true"\n                                    minScreenWidth="Tablet"\n                                ><Label\n                                        design="Bold"\n                                        text="{i18n>Status}"\n                                        wrapping="true"\n                                    /></Column><Column\n                                    \n                                    popinDisplay="Block"\n                                    demandPopin="true"\n                                    minScreenWidth="Tablet"\n                                ><Label\n                                        design="Bold"\n                                        text="{i18n>Message}"\n                                        wrapping="true"\n                                    /></Column></columns><items><ColumnListItem><cells><Text text="{tableModel>indicator}"/><Text text="{tableModel>transmissionDate}"/><Text text="{tableModel>timestamp}"/><Text text="{tableModel>salesOrder}"/><Text text="{tableModel>itemNumber}"/><Text text="{tableModel>scheduledLineNo}"/><Text text="{tableModel>material}"/><Text text="{tableModel>plant}"/><Text text="{tableModel>confirmQuantity}"/><Text text="{tableModel>factoryConfirmQuantity}"/><Text text="{tableModel>uom}"/><Text text="{tableModel>confirmDate}"/><Text text="{tableModel>status}"/><Text text="{tableModel>message}"/></cells></ColumnListItem></items></Table></content></Page></pages></App></Shell></mvc:View>\n'
}});
