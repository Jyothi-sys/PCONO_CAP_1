/* checksum : cd820559761426849909f7b2f49437c2 */
@cds.external : true
@m.IsDefaultEntityContainer : 'true'
@sap.message.scope.supported : 'true'
@sap.supported.formats : 'atom json xlsx'
service ZPTP_CDS_INVREC_CDS {};

@cds.external : true
@cds.persistence.skip : true
@sap.creatable : 'false'
@sap.updatable : 'false'
@sap.deletable : 'false'
@sap.addressable : 'false'
@sap.requires.filter : 'true'
@sap.content.version : '1'
@sap.label : 'PTP_R_2.4.7_01_Inven_Recon_Report'
entity ZPTP_CDS_INVREC_CDS.ZPTP_CDS_INVRECSet {
  @sap.display.format : 'UpperCase'
  @sap.label : 'Company Code'
  key CompanyCde : String(4) not null;
  @sap.display.format : 'UpperCase'
  @sap.required.in.filter : 'true'
  @sap.label : 'Company Code'
  key companycode : String(4) not null;
  @sap.display.format : 'Date'
  InventorySnapshotDate : Date;
  @sap.display.format : 'UpperCase'
  @sap.filter.restriction : 'single-value'
  @sap.required.in.filter : 'false'
  @sap.label : 'Plant'
  Plant : String(4);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Material'
  @sap.quickinfo : 'Material Number'
  Material : String(40);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Material Group'
  MaterialGroup : String(9);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Product Hierarchy'
  ProductHierarchy : String(18);
  @sap.label : 'Base Unit of Measure'
  @sap.semantics : 'unit-of-measure'
  uom : String(3);
  SAPUnrestrictedQty : Decimal(13, 3);
  SAPQAStock : Decimal(13, 3);
  SalesorderStock : Decimal(13, 3);
  SAPOpendelquantity : Decimal(13, 3);
  @sap.label : 'Total Stock'
  @sap.quickinfo : 'Total Valuated Stock'
  inventoryvar : Decimal(13, 3);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Currency'
  @sap.quickinfo : 'Currency Key'
  @sap.semantics : 'currency-code'
  currency : String(5);
  @sap.label : 'Moving price'
  @sap.quickinfo : 'Moving Average Price/Periodic Unit Price'
  SAPMatMovAvgprice : Decimal(12, 3);
  @sap.label : 'Material Description'
  Material_decription : String(40);
  @sap.display.format : 'Date'
  createdon : Date;
  createdby : String(12);
  @sap.filterable : 'false'
  @cds.ambiguous : 'missing on condition?'
  Parameters : Association to ZPTP_CDS_INVREC_CDS.ZPTP_CDS_INVREC {  };
};

@cds.external : true
@cds.persistence.skip : true
@sap.creatable : 'false'
@sap.updatable : 'false'
@sap.deletable : 'false'
@sap.pageable : 'false'
@sap.content.version : '1'
@sap.semantics : 'parameters'
entity ZPTP_CDS_INVREC_CDS.ZPTP_CDS_INVREC {
  @sap.display.format : 'UpperCase'
  @sap.parameter : 'mandatory'
  @sap.label : 'Company Code'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  key CompanyCde : String(4) not null;
  @cds.ambiguous : 'missing on condition?'
  Set : Association to many ZPTP_CDS_INVREC_CDS.ZPTP_CDS_INVRECSet {  };
};

