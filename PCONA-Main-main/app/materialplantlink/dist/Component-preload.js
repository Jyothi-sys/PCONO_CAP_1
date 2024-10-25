//@ui5-bundle materialplantlink/Component-preload.js
jQuery.sap.registerPreloadedModules({
"version":"2.0",
"modules":{
	"materialplantlink/Component.js":function(){sap.ui.define(["sap/ui/core/UIComponent","sap/ui/Device","materialplantlink/model/models"],function(e,t,i){"use strict";return e.extend("materialplantlink.Component",{metadata:{manifest:"json"},init:function(){e.prototype.init.apply(this,arguments);this.getRouter().initialize();this.setModel(i.createDeviceModel(),"device")}})});
},
	"materialplantlink/Fragments/ascAndDscSort.fragment.xml":'<core:FragmentDefinition\n\txmlns="sap.m"\n\txmlns:core="sap.ui.core"><ViewSettingsDialog\n\t\tconfirm="handleSortDialogConfirm"><sortItems><ViewSettingsItem text="{i18n>salesOrg}" key="sales_org" selected="true" /><ViewSettingsItem text="{i18n>dist_channel}" key="dist_channel" /><ViewSettingsItem text="{i18n>plant}" key="plant" /><ViewSettingsItem text="{i18n>Material_group}" key="material_group" /></sortItems></ViewSettingsDialog></core:FragmentDefinition>',
	"materialplantlink/Fragments/createMatPlantLink.fragment.xml":'<core:FragmentDefinition\n\txmlns="sap.m"\n    xmlns:f="sap.ui.layout.form"\n    xmlns:l="sap.ui.layout"\n\txmlns:core="sap.ui.core"><Dialog\n\t\ttitle="Create "><f:SimpleForm editable="true" layout="ResponsiveGridLayout"><f:content><Label text="Sales Org"></Label><Input value="{createTableRow>/sales_org}"></Input><Label text="Distribution Channel"></Label><Input value="{createTableRow>/dist_channel}"></Input><Label text="Plant"></Label><Input value="{createTableRow>/plant}"></Input><Label text="Material Group"></Label><Input value="{createTableRow>/material_group}"></Input></f:content></f:SimpleForm><beginButton><Button\n\t\t\t\ttext="Save"\n\t\t\t\tpress="onCreateSave"/></beginButton><endButton><Button\n\t\t\t\ttext="Cancel"\n\t\t\t\tpress="onDialogClose"/></endButton></Dialog></core:FragmentDefinition>',
	"materialplantlink/Fragments/distributionChannel.fragment.xml":'<c:FragmentDefinition\n\txmlns="sap.m"\n\txmlns:c="sap.ui.core"><SelectDialog  \n  noDataText="{i18n>NoDataFound}"\n  title="{i18n>dist_channel}"\n  liveChange="onSearchDistributionChannel"\n  confirm="onSelectionDC"\n  cancel="onDialogClose"\n  multiSelect="true"\n  items="{dist_channelData>/}"><StandardListItem \n\ntitle="{path: \'dist_channelData>dist_channel\'}"\niconDensityAware="false"\niconInset="false"\ntype="Active" /></SelectDialog ></c:FragmentDefinition>\n\n',
	"materialplantlink/Fragments/editTableRow.fragment.xml":'<core:FragmentDefinition\n\txmlns="sap.m"\n    xmlns:f="sap.ui.layout.form"\n    xmlns:l="sap.ui.layout"\n\txmlns:core="sap.ui.core"><Dialog\ttitle="Edit"><f:SimpleForm editable="true" layout="ResponsiveGridLayout"><f:content><Label text="Sales Org"></Label><Input value="{curSelTableRow>/sales_org}"></Input><Label text="Distribution Channel"></Label><Input value="{curSelTableRow>/dist_channel}"></Input><Label text="Plant"></Label><Input value="{curSelTableRow>/plant}"></Input><Label text="Material Group"></Label><Input value="{curSelTableRow>/material_group}"></Input></f:content></f:SimpleForm><beginButton><Button\n\t\t\t\ttext="Save"\n\t\t\t\tpress="onSaveEdit"/></beginButton><endButton><Button\n\t\t\t\ttext="Cancel"\n\t\t\t\tpress="onDialogClose"/></endButton></Dialog></core:FragmentDefinition>',
	"materialplantlink/Fragments/materialGroup.fragment.xml":'<c:FragmentDefinition\n\txmlns="sap.m"\n\txmlns:c="sap.ui.core"><SelectDialog  \n  noDataText="{i18n>NoDataFound}"\n  title="{i18n>Material_group}"\n  liveChange="onSearchMaterialGroup"\n  confirm="onSelectionMaterialGroup"\n  cancel="onDialogClose"\n  multiSelect="true"\n  items="{MGData>/}"><StandardListItem \n\ntitle="{path: \'MGData>material_group\'}"\niconDensityAware="false"\niconInset="false"\ntype="Active" /></SelectDialog ></c:FragmentDefinition>\n\n',
	"materialplantlink/Fragments/plant.fragment.xml":'<c:FragmentDefinition\n\txmlns="sap.m"\n\txmlns:c="sap.ui.core"><SelectDialog  \n  noDataText="{i18n>NoDataFound}"\n  title="{i18n>plant}"\n  liveChange="onSearchPlant"\n  confirm="onSelectionPlant"\n  cancel="onDialogClose"\n  multiSelect="true"\n  items="{PlantData>/}"><StandardListItem \n\ntitle="{path: \'PlantData>plant\'}"\niconDensityAware="false"\niconInset="false"\ntype="Active" /></SelectDialog ></c:FragmentDefinition>\n\n',
	"materialplantlink/Fragments/salesOrg.fragment.xml":'<c:FragmentDefinition\n\txmlns="sap.m"\n\txmlns:c="sap.ui.core"><SelectDialog  \n  noDataText="{i18n>NoDataFound}"\n  title="{i18n>salesOrg}"\n  liveChange="onSearchSalesOrg"\n  confirm="onSelectionSalesOrg"\n  cancel="onDialogClose"\n  multiSelect="true"\n  items="{sales_OrgData>/}"><StandardListItem \n\ntitle="{path: \'sales_OrgData>sales_org\'}"\niconDensityAware="false"\niconInset="false"\ntype="Active" /></SelectDialog ></c:FragmentDefinition>\n\n',
	"materialplantlink/controller/App.controller.js":function(){sap.ui.define(["sap/ui/core/mvc/Controller"],function(n){"use strict";return n.extend("materialplantlink.controller.App",{onInit(){}})});
},
	"materialplantlink/controller/View1.controller.js":'var that;sap.ui.define(["sap/ui/core/mvc/Controller","sap/ui/core/Fragment","sap/ui/model/json/JSONModel","sap/ui/core/util/Export","sap/ui/core/util/ExportTypeCSV","sap/ui/export/Spreadsheet","sap/ui/model/Filter","sap/ui/model/FilterOperator","sap/m/MessageToast","sap/m/Token","sap/m/MessageBox","sap/m/BusyDialog","sap/ui/model/Sorter"],function(e,t,a,o,r,n,i,l,s,g,d,h,u){"use strict";return e.extend("materialplantlink.controller.View1",{onInit:function(){that=this;that.filteredData;that.busy=new h;this.onReadCall();this.oFilterBar=this.getView().byId("filterbar");this.oTable=this.getView().byId("exportTable")},onReadCall:function(){var e=this.getOwnerComponent().getModel("mdgSrv_GlobalModel");that.busy.open();var t=new sap.ui.model.json.JSONModel;e.callFunction("/userInfo",{success:function(e){t.setData(e.userInfo.scopes);that.getView().setModel(t,"userModel");that.userLoggedIn=e.userInfo.user}.bind(that),error:function(e){}.bind(that)});e.read("/zplink_records",{success:function(e){var t=that.getView().getModel("userModel").getData();if(t.TISAdmin===true){that.getView().setModel(e.results,"globalMainData");that.tableModelToView=new a(that.getView().getModel("globalMainData"));that.getView().setModel(that.tableModelToView,"tableModel")}else{that.getView().setModel([],"globalMainData")}that.busy.close()},error:function(e){that.busy.close()}})},onOpenSalesOrgFragment:function(e){if(this.oSalesOrgFrag){this.oSalesOrgFrag=undefined}if(!this.oSalesOrgFrag){that.busy.open();this.oSalesOrgFrag=sap.ui.xmlfragment("materialplantlink.Fragments.salesOrg",that);this.getView().addDependent(that.oSalesOrgFrag);var t=that.getView().getModel("globalMainData");var o={};var r=t;var n=[];for(var i,l=0;i=r[l++];){var s=i.sales_org;if(!(s in o)){o[s]=1;n.push({sales_org:s})}}var g=new a(n);this.getView().setModel(g,"sales_OrgGlobalData");this.oSalesOrgFrag.setModel(g,"sales_OrgData")}that.busy.close();this.oSalesOrgFrag.open()},onSelectionSalesOrg:function(e){var t=e.getParameter("selectedContexts");var a=this.getView().byId("id_salesorg");var o=[];var r=this.getView().getModel("sales_OrgGlobalData");for(var n=0;n<t.length;n++){o.push(t[n])}that.oSalesOrgModel=[];$.each(o,function(e,t){if($.inArray(t.ProductId,that.oSalesOrgModel)===-1)that.oSalesOrgModel.push(t.getObject())});r.setProperty("/tokens1",that.oSalesOrgModel);var i;i=a.getTokens()[0];if(!i){i=new g({text:"{sales_org}",key:"{sales_org}"})}else{i=a.getTokens()[0].clone()}that.oSalesOrgModel.forEach(function(e){a.addToken(new g({text:e.sales_org}))})},onOpenDCFragment:function(e){if(this.oDCFrag){this.oDCFrag=undefined}if(!this.oDCFrag){that.busy.open();this.oDCFrag=sap.ui.xmlfragment("materialplantlink.Fragments.distributionChannel",that);this.getView().addDependent(that.oDCFrag);var t=that.getView().getModel("globalMainData");var o={};var r=t;var n=[];for(var i,l=0;i=r[l++];){var s=i.dist_channel;if(!(s in o)){o[s]=1;n.push({dist_channel:s})}}var g=new a(n);this.getView().setModel(g,"dist_channelGlobalData");this.oDCFrag.setModel(g,"dist_channelData")}that.busy.close();this.oDCFrag.open()},onSelectionDC:function(e){var t=e.getParameter("selectedContexts");var a=this.getView().byId("id_distributionChnl");var o=[];var r=that.getView().getModel("dist_channelGlobalData");for(var n=0;n<t.length;n++){o.push(t[n])}var i=[];$.each(o,function(e,t){if($.inArray(t.ProductId,i)===-1)i.push(t.getObject())});r.setProperty("/tokens2",i);var l;l=a.getTokens()[0];if(!l){l=new g({text:"{dist_channel}",key:"{dist_channel}"})}else{l=a.getTokens()[0].clone()}i.forEach(function(e){a.addToken(new g({text:e.dist_channel}))})},onOpenPlantFragment:function(e){if(this.oPlantFrag){this.oPlantFrag=undefined}if(!this.oPlantFrag){that.busy.open();this.oPlantFrag=sap.ui.xmlfragment("materialplantlink.Fragments.plant",that);this.getView().addDependent(that.oPlantFrag);var t=that.getView().getModel("globalMainData");var o={};var r=t;var n=[];for(var i,l=0;i=r[l++];){var s=i.plant;if(!(s in o)){o[s]=1;n.push({plant:s})}}var g=new a(n);this.getView().setModel(g,"PlantGlobalData");this.oPlantFrag.setModel(g,"PlantData")}that.busy.close();this.oPlantFrag.open()},onSelectionPlant:function(e){this.getView().byId("id_Plant").setTokens([]);that.oPlantSelectedModel=[];var t=e.getParameter("selectedContexts");var a=this.getView().byId("id_Plant");var o=[];var r=this.getView().getModel("PlantGlobalData");for(var n=0;n<t.length;n++){o.push(t[n])}that.oPlantSelectedModel=[];$.each(o,function(e,t){if($.inArray(t.ProductId,that.oPlantSelectedModel)===-1)that.oPlantSelectedModel.push(t.getObject())});r.setProperty("/tokens3",that.oPlantSelectedModel);var i;i=a.getTokens()[0];if(!i){i=new g({text:"{plant}",key:"{plant}"})}else{i=a.getTokens()[0].clone()}that.oPlantSelectedModel.forEach(function(e){a.addToken(new g({text:e.plant}))})},onOpenMaterialGroupFragment:function(e){if(this.oMatGrpFrag){this.oMatGrpFrag=undefined}if(!this.oMatGrpFrag){that.busy.open();this.oMatGrpFrag=sap.ui.xmlfragment("materialplantlink.Fragments.materialGroup",that);this.getView().addDependent(that.oMatGrpFrag);var t=that.getView().getModel("globalMainData");var o={};var r=t;var n=[];for(var i,l=0;i=r[l++];){var s=i.material_group;if(!(s in o)){o[s]=1;n.push({material_group:s})}}var g=new a(n);this.getView().setModel(g,"MG_GlobalData");this.oMatGrpFrag.setModel(g,"MGData")}that.busy.close();this.oMatGrpFrag.open()},onSelectionMaterialGroup:function(e){var t=e.getParameter("selectedContexts");var a=this.getView().byId("id_MaterialGroup");var o=[];var r=this.getView().getModel("MG_GlobalData");for(var n=0;n<t.length;n++){o.push(t[n])}var i=[];$.each(o,function(e,t){if($.inArray(t.ProductId,i)===-1)i.push(t.getObject())});r.setProperty("/tokens4",i);var l;l=a.getTokens()[0];if(!l){l=new g({text:"{material_group}",key:"{material_group}"})}else{l=a.getTokens()[0].clone()}i.forEach(function(e){a.addToken(new g({text:e.material_group}))})},onSearchSalesOrg:function(e){var t=e.getParameter("value");var a=new i("sales_org",sap.ui.model.FilterOperator.Contains,t);var o=e.getParameter("itemsBinding");o.filter([a])},onSearchDistributionChannel:function(e){var t=e.getParameter("value");var a=new i("dist_channel",sap.ui.model.FilterOperator.Contains,t);var o=e.getParameter("itemsBinding");o.filter([a])},onSearchPlant:function(e){var t=e.getParameter("value");var a=new i("plant",sap.ui.model.FilterOperator.Contains,t);var o=e.getParameter("itemsBinding");o.filter([a])},onSearchMaterialGroup:function(e){var t=e.getParameter("value");var a=new i("material_group",sap.ui.model.FilterOperator.Contains,t);var o=e.getParameter("itemsBinding");o.filter([a])},onDialogClose:function(e){if(this.oMatGroupFrag){this.oMatGroupFrag=undefined;this.oMatGroupFrag=null}else if(this.oMaterialFrag){this.oMaterialFrag=undefined;this.oMaterialFrag=null}else if(this.oPlantFrag){this.oPlantFrag=undefined}else if(this.oComapnyCodeFrag){this.oComapnyCodeFrag=undefined;this.oComapnyCodeFrag=null}},onGoToReport:function(){that.busy.open();var e=this.getView().byId("id_salesorg").getTokens();that.sSalesOrgValues=e.map(function(e){return e.getText()}).join(",");var t=this.getView().byId("id_distributionChnl").getTokens();that.sDCValues=t.map(function(e){return e.getText()}).join(",");var o=this.getView().byId("id_Plant").getTokens();that.sPlantValues=o.map(function(e){return e.getText()}).join(",");var r=this.getView().byId("id_MaterialGroup").getTokens();that.sMaterialGroupValues=r.map(function(e){return e.getText()}).join(",");var n=[];if(that.sSalesOrgValues!==""){var i=that.sSalesOrgValues.split(",");if(i.length>0){$.each(i,function(e,t){n.push(new sap.ui.model.Filter("sales_org",sap.ui.model.FilterOperator.Contains,t))})}}if(that.sDCValues!==""){var l=that.sDCValues.split(",");if(l.length>0){$.each(l,function(e,t){n.push(new sap.ui.model.Filter("dist_channel",sap.ui.model.FilterOperator.Contains,t))})}}if(that.sPlantValues!==""){var s=that.sPlantValues.split(",");if(s.length>0){$.each(s,function(e,t){n.push(new sap.ui.model.Filter("plant",sap.ui.model.FilterOperator.Contains,t))})}}if(that.sMaterialGroupValues!==""){var g=that.sMaterialGroupValues.split(",");if(g.length>0){$.each(g,function(e,t){n.push(new sap.ui.model.Filter("material_group",sap.ui.model.FilterOperator.Contains,t))})}}that.tableMainModelfiltereddata=undefined;that.tableMainModelfiltereddata=new a(that.getView().getModel("globalMainData"));that.getView().setModel(that.tableMainModelfiltereddata,"tableModel");this.getView().byId("exportTable").getBinding("items").filter(n);that.filteredData=true;that.filteredDataToExport=[];var d=this.getView().byId("exportTable").getBinding("items").aIndices.length;that.filteredIndices=this.getView().byId("exportTable").getBinding("items").aIndices;for(var h=0;h<d;h++){that.filteredDataToExport.push(that.tableMainModelfiltereddata.oData[that.filteredIndices[h]])}var u=new a(that.filteredDataToExport);that.getView().setModel(u,"tableModel");that.busy.close()},onPressClear:function(e){that.filteredData=false;this.getView().byId("id_salesorg").setTokens([]);this.getView().byId("id_distributionChnl").setTokens([]);this.getView().byId("id_Plant").setTokens([]);this.getView().byId("id_MaterialGroup").setTokens([]);var t=new a;that.getView().setModel(t,"tableModel")},attachDateToExcel:function(){var e=sap.ui.core.format.DateFormat.getDateTimeInstance({pattern:"MM-dd-yyyy"});var t=e.format(new Date);return t},onExportSelected:function(e){this.onGoToReport();var t=this.getView().byId("exportTable").getSelectedItems().length;var a=this.getView().byId("exportTable").getSelectedItem();var o=this.getView().getModel("globalMainData");var r;if(that.filteredData===true){r=new sap.ui.model.json.JSONModel(this.getView().getModel("tableModel").oData)}else{r=new sap.ui.model.json.JSONModel(o.getData())}var n=[{label:"Sales Org",property:"sales_org"},{label:"Distribution Channel",property:"dist_channel"},{label:"Plant",property:"plant"},{label:"Material Group",property:"material_group"}];var i={workbook:{columns:n,context:{sheetName:"MaterialPlantLinkExport_"+this.attachDateToExcel()}},dataSource:r.getData(),fileName:"MaterialPlantLinkExport_"+this.attachDateToExcel()+".xlsx"};var l=new sap.ui.export.Spreadsheet(i);l.build().then(function(){l.destroy()})},handleSortButtonPressed:function(e){if(this.oSortFrag){this.oSortFrag=undefined}if(!this.oSortFrag){that.busy.open();this.oSortFrag=sap.ui.xmlfragment("materialplantlink.Fragments.ascAndDscSort",that);this.getView().addDependent(that.oSortFrag)}that.busy.close();this.oSortFrag.open()},handleSortDialogConfirm:function(e){var t=this.byId("exportTable"),a=e.getParameters(),o=t.getBinding("items"),r,n,i=[];r=a.sortItem.getKey();n=a.sortDescending;i.push(new u(r,n));o.sort(i)},onOpenCreateMatPlantFragment:function(e){if(this.oCreateMatPlantFrag){this.oCreateMatPlantFrag=undefined}if(!this.oCreateMatPlantFrag){that.busy.open();this.oCreateMatPlantFrag=sap.ui.xmlfragment("materialplantlink.Fragments.createMatPlantLink",that);this.getView().addDependent(that.oCreateMatPlantFrag);var t={sales_org:"",dist_channel:"",plant:"",material_group:""};var o=new a(t);this.getView().setModel(o,"createTableRow")}that.busy.close();this.oCreateMatPlantFrag.open()},onCreateSave:function(){var e=sap.ui.core.format.DateFormat.getDateTimeInstance({pattern:"yyyy-MM-dd"});var t=e.format(new Date);var a=this.getOwnerComponent().getModel("mdgSrv_GlobalModel");a.callFunction("/zplink_create",{method:"GET",urlParameters:{sales_org:that.getView().getModel("createTableRow").oData.sales_org,dist_channel:that.getView().getModel("createTableRow").oData.dist_channel,plant:that.getView().getModel("createTableRow").oData.plant,material_group:that.getView().getModel("createTableRow").oData.material_group,created_on:t,changed_on:t},success:function(e){that.onReadCall();that.onDialogClose()}.bind(this),error:function(e){d.error(JSON.parse(e.responseText).error.message.value)}})},onselectionChange:function(e){var t=this.getView().byId("exportTable").getSelectedItems().length;if(t>1){this.getView().byId("editModeButton").setEnabled(false)}else if(t==1){this.getView().byId("editModeButton").setEnabled(true)}var o=this.getView().byId("exportTable").getSelectedItem();var r=new a(o.getBindingContext("tableModel").getObject());this.getView().setModel(r,"curSelTableRow")},onEditTableRow:function(e){if(this.oEditTableRowFrag){this.oEditTableRowFrag=undefined}if(!this.oEditTableRowFrag){var t=e.getSource().getParent().getParent().getSelectedContextPaths();if(t.length!==0){that.busy.open();var o=this.getView().getModel("tableModel").getProperty(t[0]);var r={sales_org:o.sales_org,dist_channel:o.dist_channel,plant:o.plant,material_group:o.material_group};var n=new a(r);this.getView().setModel(n,"curSelTableRow");this.oEditTableRowFrag=sap.ui.xmlfragment("materialplantlink.Fragments.editTableRow",this);this.getView().addDependent(this.oEditTableRowFrag);that.busy.close();this.oEditTableRowFrag.open()}else{d.warning("Please select a line item to edit.")}}},onSaveEdit:function(){var e=sap.ui.core.format.DateFormat.getDateTimeInstance({pattern:"yyyy-MM-dd"});var t=e.format(new Date);var a=this.getOwnerComponent().getModel("mdgSrv_GlobalModel");a.callFunction("/zplink_create",{method:"GET",urlParameters:{sales_org:that.getView().getModel("curSelTableRow").oData.sales_org,dist_channel:that.getView().getModel("curSelTableRow").oData.dist_channel,plant:that.getView().getModel("curSelTableRow").oData.plant,material_group:that.getView().getModel("curSelTableRow").oData.material_group,created_on:t,changed_on:t},success:function(e){that.onReadCall();that.onDialogClose()}.bind(this),error:function(e){d.error(JSON.parse(e.responseText).error.message.value)}})},onDelete:function(){var e=this.getOwnerComponent().getModel("mdgSrv_GlobalModel");this._oTable=this.getView().byId("exportTable");var t=this._oTable.getSelectedContexts();if(t.length===0){d.warning("Please select at least one record to delete.");return}var a=this._oTable.getModel("tableModel").getData();var o=this._oTable.getModel("tableModel");var r=e.getDeferredGroups();if(r.indexOf("delete")===-1){r.push("delete")}e.setDeferredGroups(r);for(var n=0;n<t.length;n++){var i=t[n].getObject();var l=$.map(a,function(t,a){if(t===i){e.callFunction("/zplink_delete",{method:"GET",urlParameters:{sales_org:i.sales_org,dist_channel:i.dist_channel,plant:i.plant,material_group:i.material_group},groupId:"delete"});return a}})}e.submitChanges({groupId:"delete",success:function(e){that.onReadCall()}.bind(this),error:function(e){}})},onDialogClose:function(e){if(that.oEditTableRowFrag){that.oEditTableRowFrag.close();that.oEditTableRowFrag=undefined;that.oEditTableRowFrag=null;var t=new a;this.getView().setModel(t,"curSelTableRow")}else if(that.oCreateMatPlantFrag){that.oCreateMatPlantFrag.close();that.oCreateMatPlantFrag=undefined;that.oCreateMatPlantFrag=null;var t=new a;this.getView().setModel(t,"createTableRow")}}})});',
	"materialplantlink/i18n/i18n.properties":'# This is the resource bundle for materialplantlink\n\n#Texts for manifest.json\n\n#XTIT: Application name\nappTitle=Material Plant\n\n#YDES: Application description\nappDescription=A Fiori application.\n#XTIT: Main view title\ntitle=Material Plant\nsalesOrg = Sales Org\ndist_channel=Distribution Channel\nplant = Plant\nMaterial_group = Material Group\n#08-04-24 Assertion issues SAP Recomendation @Gnaneshwar.\nNoDataFound = NoDataFound\nflpTitle = Material Plant\nflpSubtitle = Material Plant',
	"materialplantlink/manifest.json":'{"_version":"1.58.0","sap.app":{"id":"materialplantlink","type":"application","i18n":"i18n/i18n.properties","applicationVersion":{"version":"0.0.1"},"title":"{{appTitle}}","description":"{{appDescription}}","resources":"resources.json","sourceTemplate":{"id":"@sap/generator-fiori:basic","version":"1.11.2","toolsId":"4c5154c2-1404-4e4c-b205-4024fd6d8f26"},"dataSources":{"masterdataglobalService":{"uri":"v2/mdgSrv/","type":"OData","settings":{"annotations":[],"localUri":"localService/metadata.xml","odataVersion":"2.0"}}},"crossNavigation":{"inbounds":{"materialPlant-inbound":{"signature":{"parameters":{},"additionalParameters":"allowed"},"semanticObject":"material_Plant","action":"manage","title":"{{flpTitle}}","subTitle":"{{flpSubtitle}}","icon":""}}}},"sap.ui":{"technology":"UI5","icons":{"icon":"","favIcon":"","phone":"","phone@2":"","tablet":"","tablet@2":""},"deviceTypes":{"desktop":true,"tablet":true,"phone":true}},"sap.ui5":{"flexEnabled":false,"dependencies":{"minUI5Version":"1.108.0","libs":{"sap.m":{},"sap.ui.core":{},"sap.f":{},"sap.suite.ui.generic.template":{},"sap.ui.comp":{},"sap.ui.generic.app":{},"sap.ui.table":{},"sap.ushell":{}}},"contentDensities":{"compact":true,"cozy":true},"models":{"i18n":{"type":"sap.ui.model.resource.ResourceModel","settings":{"bundleName":"materialplantlink.i18n.i18n"}},"mdgSrv_GlobalModel":{"dataSource":"masterdataglobalService","preload":true,"settings":{"synchronizationMode":"None","operationMode":"Server","autoExpandSelect":true,"earlyRequests":true}}},"resources":{"css":[{"uri":"css/style.css"}]},"routing":{"config":{"routerClass":"sap.m.routing.Router","viewType":"XML","async":true,"viewPath":"materialplantlink.view","controlAggregation":"pages","controlId":"app","clearControlAggregation":false},"routes":[{"name":"RouteView1","pattern":":?query:","target":["TargetView1"]}],"targets":{"TargetView1":{"viewType":"XML","transition":"slide","clearControlAggregation":false,"viewId":"View1","viewName":"View1"}}},"rootView":{"viewName":"materialplantlink.view.App","type":"XML","async":true,"id":"App"}},"sap.cloud":{"public":true,"service":"PCONA-Main"}}',
	"materialplantlink/model/models.js":function(){sap.ui.define(["sap/ui/model/json/JSONModel","sap/ui/Device"],function(e,n){"use strict";return{createDeviceModel:function(){var i=new e(n);i.setDefaultBindingMode("OneWay");return i}}});
},
	"materialplantlink/view/App.view.xml":'<mvc:View controllerName="materialplantlink.controller.App"\n    xmlns:html="http://www.w3.org/1999/xhtml"\n    xmlns:mvc="sap.ui.core.mvc" displayBlock="true"\n    xmlns="sap.m"><App id="app"></App></mvc:View>\n',
	"materialplantlink/view/View1.view.xml":'<mvc:View\n    controllerName="materialplantlink.controller.View1"\n    xmlns:mvc="sap.ui.core.mvc"\n    xmlns:core="sap.ui.core"\n    displayBlock="true"\n    xmlns:f="sap.ui.layout.form"\n    xmlns:l="sap.ui.layout"\n    xmlns="sap.m"\n    xmlns:ff="sap.f"\n    xmlns:fb="sap.ui.comp.filterbar"\n><Shell id="shell"><App id="app"><pages><Page title="{i18n>title}"><fb:FilterBar\n                        id="filterbar"\n                        persistencyKey="myPersKey"\n                        useToolbar="false"\n                        search="onGoToReport"\n                        showClearOnFB="true"\n                        clear="onPressClear"\n                        filterChange=".onFilterChange"\n                        afterVariantLoad=".onAfterVariantLoad"\n                    ><fb:filterGroupItems><fb:FilterGroupItem\n                                name="sales_org"\n                                label="{i18n>salesOrg}"\n                                groupName="Group1"\n                                visibleInFilterBar="true"\n                            ><fb:control><MultiInput\n                                        id="id_salesorg"                                        \n                                        showValueHelp="true"\n                                        valueHelpOnly="true"\n                                        valueHelpRequest="onOpenSalesOrgFragment"\n                                        placeholder="{i18n>salesOrg}"\n                                        tokenUpdate="onTokenCompanyCodeChange"\n                                    /></fb:control></fb:FilterGroupItem><fb:FilterGroupItem\n                                name="dist_channel"\n                                label="{i18n>dist_channel}"\n                                groupName="Group1"\n                                visibleInFilterBar="true"\n                            ><fb:control><MultiInput\n                                        id="id_distributionChnl"                                        \n                                        showValueHelp="true"\n                                        valueHelpOnly="true"\n                                        valueHelpRequest="onOpenDCFragment"\n                                        placeholder="{i18n>dist_channel}"\n                                        tokenUpdate="onTokenCompanyCodeChange"\n                                    /></fb:control></fb:FilterGroupItem><fb:FilterGroupItem\n                                name="plant"\n                                label="{i18n>plant}"\n                                groupName="Group1"\n                                visibleInFilterBar="true"\n                            ><fb:control><MultiInput\n                                        id="id_Plant"                                        \n                                        showValueHelp="true"\n                                        valueHelpOnly="true"\n                                        valueHelpRequest="onOpenPlantFragment"\n                                        placeholder="{i18n>plant}"\n                                        tokenUpdate="onTokenPlantChange"\n                                    /></fb:control></fb:FilterGroupItem><fb:FilterGroupItem\n                                name="material_group"\n                                label="{i18n>Material_group}"\n                                groupName="Group1"\n                                visibleInFilterBar="true"\n                            ><fb:control><MultiInput\n                                        id="id_MaterialGroup"\n                                        showValueHelp="true"\n                                        valueHelpOnly="true"\n                                        valueHelpRequest="onOpenMaterialGroupFragment"\n                                        placeholder="{i18n>Material_group}"\n                                        tokenUpdate="onTokenMatGroupChange"\n                                    /></fb:control></fb:FilterGroupItem></fb:filterGroupItems></fb:FilterBar><content><Table\n                          mode="MultiSelect"\n                            selectionChange="onselectionChange"\n                            alternateRowColors="true"\n                            backgroundDesign="Solid"\n                            sticky="ColumnHeaders"\n                            headerText="Material Plant Link Report"\n                            items="{tableModel>/}"\n                            autoPopinMode="false"\n                            contextualWidth="Auto"\n                            id="exportTable"\n                            inset="false"\n                            growing="true"\n                            growingThreshold="500"\n                            growingScrollToLoad="false"\n                        ><headerToolbar><OverflowToolbar><ToolbarSpacer /><Button\n                                        icon="sap-icon://excel-attachment"\n                                        press="onExportSelected"\n                                    /><Button\n\t\t\t\t\t\t                tooltip="Sort"\n\t\t\t\t\t\t                icon="sap-icon://sort"\n\t\t\t\t\t\t            press="handleSortButtonPressed"\n                                    /><Button                                        \n                                        text ="Create"\n                                        press="onOpenCreateMatPlantFragment"\n                                    /><Button                                        \n                                        text ="Edit"\n                                        press="onEditTableRow"\n                                        id="editModeButton"\n                                    /><Button                                        \n                                        text ="Delete"\n                                        press="onDelete"\n                                        id="deleteModeButton"\n                                    /></OverflowToolbar></headerToolbar><columns><Column\n                                    \n                                    minScreenWidth="Tablet"\n                                    popinDisplay="Block"\n                                    demandPopin="true"\n                                ><Label\n                                        design="Bold"\n                                        text="{i18n>salesOrg}"\n                                    /></Column><Column\n                                    \n                                    \n                                    popinDisplay="Block"\n                                    demandPopin="true"\n                                    minScreenWidth="Tablet"\n                                ><Label\n                                        design="Bold"\n                                        wrapping="true"\n                                        text="{i18n>dist_channel}"\n                                    /></Column><Column\n                                    \n                                    popinDisplay="Block"\n                                    demandPopin="true"\n                                    minScreenWidth="Tablet"\n                                ><Label\n                                        design="Bold"\n                                        text="{i18n>plant}"\n                                    /></Column><Column\n                                    \n                                    popinDisplay="Block"\n                                    demandPopin="true"\n                                    minScreenWidth="Tablet"\n                                ><Label\n                                        design="Bold"\n                                        text="{i18n>Material_group}"\n                                        wrapping="true"\n                                    /></Column></columns><items><ColumnListItem><cells><Text text="{tableModel>sales_org}"/><Text text="{tableModel>dist_channel}"/><Text text="{tableModel>plant}"/><Text text="{tableModel>material_group}"/></cells></ColumnListItem></items></Table></content></Page></pages></App></Shell></mvc:View>\n'
}});