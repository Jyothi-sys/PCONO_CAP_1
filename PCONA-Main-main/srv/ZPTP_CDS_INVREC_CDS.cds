using ZPTP_CDS_INVREC_CDS from './external/ZPTP_CDS_INVREC_CDS.cds';

service ZPTP_CDS_INVREC_CDSSampleService {
    @readonly
    entity ZPTP_CDS_INVRECSet as projection on ZPTP_CDS_INVREC_CDS.ZPTP_CDS_INVRECSet
    {        key CompanyCde, key companycode, InventorySnapshotDate, Plant, Material, MaterialGroup, ProductHierarchy, uom, SAPUnrestrictedQty, SAPQAStock, SalesorderStock, SAPOpendelquantity, inventoryvar, currency, SAPMatMovAvgprice, Material_decription, createdon, createdby     }    
;
}