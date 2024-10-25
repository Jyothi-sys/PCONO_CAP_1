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

            storeView_cityCode: function (oCurrentView, oGlbCurrView) {

                this.currentView = oCurrentView;
                that.GlbCurrView = oGlbCurrView;
                that.GlbCurrView.busy = new BusyDialog();
            },




            handleCityCodeSelectionChange: function (oEvent) {

                var oItem = oEvent.getParameter("changedItem"),
                    bSelected = oEvent.getParameter("selected"),
                    oContext = oItem.getBindingContext("columndataCityCodeTable");
                oContext.oModel.setProperty(oContext.sPath + "/visible", bSelected)
                oContext.oModel.refresh(true);

            },

            onRead_CityCodeTableData: function () {

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
                oModel1.read("/z_city_code",
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
                                oData.results[i].changed_on = oDateFormat.format(oData.results[i].changed_on);
                                oData.results[i].created_on = oDateFormat.format(oData.results[i].created_on);
                                oData.results[i].change_time = new Date(oData.results[i].change_time.ms).toISOString().slice(11, 19)
                                oData.results[i].created_time = new Date(oData.results[i].created_time.ms).toISOString().slice(11, 19)
                            }
                            that.GlbCurrView.getView().setModel(new sap.ui.model.json.JSONModel(oData.results), "globalMainData_CityCode")
                            that.GlbCurrView.getView().setModel(new sap.ui.model.json.JSONModel(oData.results), "cityCode_Model")
                        }
                        else{
                            that.getView().setModel([], "globalMainData_CityCode");
                              
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
                var oDatePicker1 = this.currentView.getView().byId("id_datePicker_1");
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
                var oDatePicker2 = this.currentView.getView().byId("id_datePicker2");
                // Set the value and disable future dates
                // oDatePicker.setValue(that.completeDate);
                oDatePicker2.setMaxDate(dateObject1);
            },


            handleChangeCreatedOnDateUtil: function (oEvent) {

                that.startDate = oEvent.mParameters.value.substr(0, 10);
                that.endDate = oEvent.mParameters.value.substr(13, 20);


            },

            handleChangedOnDateUtil: function (oEvent) {

                that.startDate1 = oEvent.mParameters.value.substr(0, 10);
                that.endDate1 = oEvent.mParameters.value.substr(13, 20);


            },




            handleCityTableSortButtonPressedUtil: function (oEvent) {

                if (this.currentView.oCityCode_SortFrag) {
                    this.currentView.oCityCode_SortFrag = undefined;
                }
                if (!this.currentView.oCityCode_SortFrag) {
                    that.GlbCurrView.busy.open()
                    this.currentView.oCityCode_SortFrag = sap.ui.xmlfragment("masterdata.fragments.dialogs.citycode.ascAndDscSort_CityCode", that);
                    this.currentView.getView().addDependent(that.GlbCurrView.oCityCode_SortFrag);

                }
                that.GlbCurrView.busy.close()
                this.currentView.oCityCode_SortFrag.open();

            },

            getDefaultFilteredDateData: function () {
                var oTable = this.currentView.byId("id_City_Code_Table");
                var oBinding = oTable.getBinding("items");
                var aSorters = [];
                aSorters.push(new Sorter("transmissionDate", true));
                oBinding.sort(aSorters);
            },

            // handle sort
            CityCode_handleSortDialogConfirm: function (oEvent) {

                var oTable = this.currentView.byId("id_City_Code_Table"),
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




            VisibleColumns_cityCode: function () {


                var sPath = jQuery.sap.getResourcePath("masterdata/model") + "/cityCodeTableColumns.json";
                var trdPartCols = new JSONModel();
                trdPartCols.loadData(sPath).then(function () {
                    this.currentView.getView().setModel(trdPartCols, "columndataCityCodeTable");
                    this.currentView.getView().byId("id_CityCodeTable").setSelectedKeys(["city_code", "lang",
                        "area_code", "country_code", "city_name", "short_name", "created_on", "created_time", "changed_on",
                        "change_time", "legacy_information", "sap_city"]);

                }.bind(this));
            },


            // City Code Framgent Starts here

            onOpenCityCodeTableFragment_CityCodeUtil: function (oEvent) {
                if (this.currentView.oCityCode_Frag) {
                    this.currentView.oCityCode_Frag = undefined;
                }
                if (!this.currentView.oCityCode_Frag) {
                    that.GlbCurrView.busy.open()
                    this.currentView.oCityCode_Frag = sap.ui.xmlfragment("masterdata.fragments.dialogs.citycode.cityCode", that.GlbCurrView);
                    this.currentView.getView().addDependent(that.GlbCurrView.oCityCode_Frag);
                    var ocity_code_ = that.GlbCurrView.getView().getModel("globalMainData_CityCode").oData
                    var lookup = {};
                    var items = ocity_code_;
                    var result = [];
                    for (var item, i = 0; item = items[i++];) {
                        var name = item.city_code;
                        if (!(name in lookup)) {
                            lookup[name] = 1;
                            result.push({ "city_code": name });
                        }
                    }
                    var ocity_code_Model = new JSONModel(result);
                    this.currentView.getView().setModel(ocity_code_Model, "city_code_GlobalData")
                    this.currentView.oCityCode_Frag.setModel(ocity_code_Model, "city_code_Data");

                }
                that.GlbCurrView.busy.close()
                this.currentView.oCityCode_Frag.open();

            },


            onSelectionCityCodeUtil: function (oEvent) {
                var aContexts = oEvent.getParameter("selectedContexts");
                var oMultiInput = this.currentView.getView().byId("id_CityCodes");
                var oSelectedContextReplyId__ = [];
                var oModel = this.currentView.getView().getModel("city_code_GlobalData");
                for (var i = 0; i < aContexts.length; i++) {
                    oSelectedContextReplyId__.push(aContexts[i]);
                }
                that.GlbCurrView.ocity_code_Model = [];
                //Check for Unique Data
                // $.each(oSelectedContextReplyId__, function (i, el) {
                //     if ($.inArray(oSelectedContextReplyId__[i].ProductId, that.GlbCurrView.ocity_code_Model) === -1) that.GlbCurrView.ocity_code_Model.push(oSelectedContextReplyId__[i].getObject());
                // });

                //03-04-24 SAP Recommendation for slow loops @gnaneshwar.
                $.each(oSelectedContextReplyId__, function (i, el) {
                    if ($.inArray(el.ProductId, that.GlbCurrView.ocity_code_Model) === -1) that.GlbCurrView.ocity_code_Model.push(el.getObject());
                });
                oModel.setProperty("/tokens1", that.GlbCurrView.ocity_code_Model);
                var oItemTemplateCC;
                oItemTemplateCC = oMultiInput.getTokens()[0];
                //Create the Template for token
                if (!oItemTemplateCC) {
                    oItemTemplateCC = new Token({
                        text: "{city_code}",
                        key: "{city_code}"
                    });
                } else {
                    oItemTemplateCC = oMultiInput.getTokens()[0].clone();
                }
                //Bind the tokens
                that.GlbCurrView.ocity_code_Model.forEach(function (item) {
                    oMultiInput.addToken(new Token({
                        text: item.city_code
                    }));
                })
            },

            onSearchCityCodeUtil: function (oEvent) {
                var sValue = oEvent.getParameter("value");
                var oFilter = new Filter("city_code", sap.ui.model.FilterOperator.Contains, sValue);
                var oBinding = oEvent.getParameter("itemsBinding");
                oBinding.filter([oFilter]);
            },

            onDialogClose_CityCodeUtil: function (oEvent) {
                if (that.GlbCurrView.oCityCode_Frag) {
                    // that.GlbCurrView.oCityCode_Frag.close()
                    // that.GlbCurrView.oCityCode_Frag.destroy()
                    // delete that.GlbCurrView.oCityCode_Frag;
                    that.GlbCurrView.oCityCode_Frag = undefined;
                    that.GlbCurrView.oCityCode_Frag = null

                }
            },

            // City Code Framgent Ends here



            onGoToReport_CityCodeUtil: function () {
                that.GlbCurrView.busy.open()

                var CityCodeTable_code_Tokens = this.currentView.getView().byId("id_CityCodes").getTokens();
                that.GlbCurrView.sCityCodeTable_code_TokensValues = CityCodeTable_code_Tokens.map(function (oToken) {
                    return oToken.getText();
                }).join(",");


                var filters = [];

                if (that.GlbCurrView.sCityCodeTable_code_TokensValues !== "") {

                    var CityCode_codeVal = that.GlbCurrView.sCityCodeTable_code_TokensValues.split(",");
                    if (CityCode_codeVal.length > 0) {
                        $.each(CityCode_codeVal, function (i, UIitem) {
                            filters.push(new sap.ui.model.Filter("city_code", sap.ui.model.FilterOperator.Contains, UIitem));
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


                that.GlbCurrView.tableMainModelfiltereddata = undefined
                that.GlbCurrView.tableMainModelfiltereddata = new JSONModel(that.GlbCurrView.getView().getModel("globalMainData_CityCode").oData);
                that.GlbCurrView.getView().setModel(that.GlbCurrView.tableMainModelfiltereddata, "cityCode_Model")
                //  this.getDefaultFilteredDateData();
                this.currentView.getView().byId("id_City_Code_Table").getBinding("items").filter(filters);
                that.GlbCurrView.filteredData = true;
                that.GlbCurrView.filteredDataToExport = []
                var selectedITemsLength = this.currentView.getView().byId("id_City_Code_Table").getBinding("items").aIndices.length
                that.GlbCurrView.filteredIndices = this.currentView.getView().byId("id_City_Code_Table").getBinding("items").aIndices
                for (var i = 0; i < selectedITemsLength; i++) {

                    that.GlbCurrView.filteredDataToExport.push(that.GlbCurrView.tableMainModelfiltereddata.oData[that.GlbCurrView.filteredIndices[i]]);
                }
                var tableFilteredModel = new JSONModel(that.GlbCurrView.filteredDataToExport)
                that.GlbCurrView.getView().setModel(tableFilteredModel, "cityCode_Model")

                that.GlbCurrView.busy.close()

            },
            //04-04-24 Depprecated calls issue for excel SAP Recommendation @gnaneshwar
            onCityCodeExportExcel: function (oEvent) {
                var oselectedModel = new sap.ui.model.json.JSONModel(that.GlbCurrView.getView().getModel("cityCode_Model").oData);

                var aCols = [
                    { label: "City Code", property: "city_code" },
                    { label: "Lang", property: "lang" },
                    { label: "Area Code", property: "area_code" },
                    { label: "Country Code", property: "country_code" },
                    { label: "City Name", property: "city_name" },
                    { label: "Short Name", property: "short_name" },
                    { label: "Created On", property: "created_on" },
                    { label: "Created Time", property: "created_time" },
                    { label: "Changed On", property: "changed_on" },
                    { label: "Change Time", property: "change_time" },
                    { label: "Legacy Information", property: "legacy_information" },
                    { label: "SAP City", property: "sap_city" },
                    { label: "Created By", property: "created_by" },
                    { label: "Changed By", property: "changed_by" }
                ];

                var oSettings = {
                    workbook: { columns: aCols,
                        context: {
                            sheetName: 'City_Code_Table'
                        },
                    },
                    dataSource: oselectedModel.getData(),
                    fileName: "City_Code_Table.xlsx",
                   
                };

                var oSpreadsheet = new sap.ui.export.Spreadsheet(oSettings);
                oSpreadsheet.build().then(function () {
                    oSpreadsheet.destroy();
                });
            },



            // onCityCodeExportExcel: function (oEvent) {

            //   //  var selectedITemsLength = this.currentView.currentView.getView().byId("idTrdPartTable").getSelectedItems().length


            //         var oselectedModel = new sap.ui.model.json.JSONModel(that.GlbCurrView.getView().getModel("cityCode_Model").oData)


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
            //             name: "City Code",
            //             template: {
            //                 content: "{city_code}"
            //             }
            //         }, {
            //             name: "Lang",
            //             template: {
            //                 content: "{lang}"
            //             }
            //         }, {
            //             name: "Area Code",
            //             template: {
            //                 content: "{area_code}"
            //             }
            //         }, {
            //             name: "Country Code",
            //             template: {
            //                 content: "{country_code}"
            //             }
            //         }, {
            //             name: "City Name",
            //             template: {
            //                 content: "{city_name}"
            //             }
            //         }, {
            //             name: "Short Name",
            //             template: {
            //                 content: "{short_name}"
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
            //             name: "Change Time",
            //             template: {
            //                 content: "{change_time}"
            //             }
            //         }, {
            //             name: "Legacy Information",
            //             template: {
            //                 content: "{legacy_information}"
            //             }
            //         }, {
            //             name: "SAP City",
            //             template: {
            //                 content: "{sap_city}"
            //             }
            //         }, {
            //             name: "Created By",
            //             template: {
            //                 content: "{created_by}"
            //             }
            //         }, {
            //             name: "Changed By",
            //             template: {
            //                 content: "{changed_by}"
            //             }
            //         }
            //         ]

            //     });

            //     //* download exported file

            //     oExport.saveFile("City Code table").always(function () {

            //         this.destroy();

            //     });
            // },


            onClearCityCodeUtil: function (oEvent) {
                that.GlbCurrView.filteredData = false;
                this.currentView.getView().byId("id_CityCodes").setTokens([]);
                this.currentView.getView().byId("id_datePicker_1").setValue("");
                this.currentView.getView().byId("id_datePicker2").setValue("");
                var tableModel = new sap.ui.model.json.JSONModel();
                that.getView().setModel(tableModel, "cityCode_Model")
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