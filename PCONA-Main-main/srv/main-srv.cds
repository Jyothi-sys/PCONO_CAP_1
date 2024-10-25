using btp_panasonic from '../db/main.cds';
using ZPTP_CDS_INVREC_CDS as inventory_external from './external/ZPTP_CDS_INVREC_CDS';

service zinvbalance_Srv @(impl: './Inventory/inventory-srv.js') @(path: '/InventorySrv') @(requires : 'authenticated-user') {

     type userScopes {
        identified    : Boolean;
        authenticated : Boolean;      
        TISAdmin      : Boolean;

    };

    type userType {
        user      : String;
        firstName : String;
        lastName  : String;
        email     : String;
        locale    : String;
        scopes    : userScopes;
    };

    
    function userInfo() returns userType;
    entity   zinvbalance_hwy905 as projection on btp_panasonic.zinv_balance_hwy905;
    function zinv_count(date: String,sender_partner_name: String)  returns String;
    entity   zinvbalance_s4hana as projection on btp_panasonic.zinv_balance_s4_hana;
    action s4hana_batch (batch: array of zinvbalance_s4hana) returns array of String;
    action hwy905_batch (batch: array of zinvbalance_hwy905) returns array of String;
    entity   zxref_zone as projection on btp_panasonic.zxref_zone_plant;
    function zinv_difference() returns String;
    function zinv_delete(date: String) returns String;
    function purge() returns String;
    function current_inv() returns String;
    function zinv_file() returns String;
    function zxref_create(plant: String,companycode: String,dc: String,warehouse_hwy905: String,partner_id: String,zone: String) returns String;
    function zxref_delete(plant: String,partner_id: String) returns String;
    function zxref_read() returns array of String;
    entity   current_inventory as projection on inventory_external.ZPTP_CDS_INVRECSet;
    function zone_id(plant: String) returns String;
    function zplant(dc: String,warehouse: String) returns String;
    function current_inv1(DATE: String) returns  String;
}

service serialtracking_Srv @(impl: './Serial/serial-srv.js') @(path: '/SerialtrackingSrv') {

    entity   serial_tracking  as projection on btp_panasonic.serial_tracking;
    function serial_delete() returns String;
    function serial_delete_param(daysToRetain: String) returns String;
    function drop_shipment(sales_order: String,material: String) returns array of String;
    function stock_shipment(delivery_number: String,delivery_line_item: String) returns array of String;
}

service salesorder_Srv @(impl: './Salesorder/salesorder-srv.js') @(path: '/SalesorderSrv') @(requires : 'authenticated-user') {

     type userScopes {
        identified    : Boolean;
        authenticated : Boolean;      
        TISAdmin      : Boolean;

    };

    type userType {
        user      : String;
        firstName : String;
        lastName  : String;
        email     : String;
        locale    : String;
        scopes    : userScopes;
    };

    function userInfo() returns userType;

    entity pivs_unprocessed_so_prodsched  as projection on btp_panasonic.pivs_unprocessed_so_prodsched;
    entity pivs_processed_salesorder_prodsched      as projection on btp_panasonic.pivs_processed_salesorder_prodsched;
    action pivs_batch (batch: array of pivs_processed_salesorder_prodsched) returns array of String;
    entity by_processed_order_promise             as projection on btp_panasonic.by_processed_order_promise;
    action bypromise_batch (batch: array of by_processed_order_promise) returns array of String;
    entity by_unprocessed_order_promise        as projection on btp_panasonic.by_unprocessed_order_promise;
    action bypromise_update(transmissionDate: String,salesOrder: String,itemNumber: String,scheduledLineNo: String,material: String,plant: String,confirmQuantity: String,uom: String,confirmDate: String,status: String,message: String,timestamp: String) returns String;
    entity pcona_by_plant_proposal_rules as projection on btp_panasonic.pcona_by_plant_proposal_rules;
    function byplant_create(Identifier: String,Customer: String,Group: String,ShipPlant: String,Days: String) returns String;
    function byplant_delete(Identifier: String,Customer: String,Group: String) returns String;
    function bypromise_records() returns array of by_processed_order_promise;  
    function pivs_records() returns array of pivs_processed_salesorder_prodsched;
}   


service componentspo_Srv @(impl: './Components/component-srv.js')@(path: '/ComponentsSrv') {

    entity jda_ship_plan as projection on btp_panasonic.jda_ship_plan;
    
}


service mdg_Srv @(impl: './mdg/mdg-srv.js')@(path: '/mdgSrv')  @(requires : 'authenticated-user') {

    type userScopes {
        identified    : Boolean;
        authenticated : Boolean;      
        TISAdmin      : Boolean;

    };

    type userType {
        user      : String;
        firstName : String;
        lastName  : String;
        email     : String;
        locale    : String;
        scopes    : userScopes;
    };

    function userInfo() returns userType;

    entity zplink as projection on btp_panasonic.zplink;
    function material_group(material_group: String) returns array of String;
    function zplink_create(sales_org: String,dist_channel: String,plant: String,material_group: String,created_on: String,changed_on: String) returns String;
    function zplink_delete(sales_org: String,dist_channel: String,plant: String,material_group: String) returns String;
    function zplink_records() returns array of zplink;    
    entity zumm_trd_partner as projection on btp_panasonic.zumm_trd_partner;
    entity zmm_m12_info_234 as projection on btp_panasonic.zmm_m12_info_234;
    entity zmm_m12_info_1 as projection on btp_panasonic.zmm_m12_info_1;
    entity zmm_m12_info_5 as projection on btp_panasonic.zmm_m12_info_5;
    entity z_city_code as projection on btp_panasonic.z_city_code; 
    function zcitycode_create(city_code: String,lang: String,area_code: String,country_code: String,city_name: String,short_name: String,legacy_information: String,sap_city: String) returns String;
    function ztrdpartner_create(client: String, customer_number: String, status: String, date: String, parent_code: String, company_class: String, area: String, country_code: String, city_code: String, name1: String, name2: String, short_name: String,  address_line1: String, address_line2: String, consolidated: String, telephone_number: String, fax_number: String, telex_number: String, global_group_code: String,  procurement_flag: String, deletion_indicator: String ) returns String;
    function zgcms_1_create(client: String,reply_id: String,sales_company_code: String,issued_date: String,unified_model_number: String,suplier_code: String,factory_code: String,department_code: String,legacy_color_code: String,brand_code: String,old_model_number: String,h_s_code: String,account_category: String,overseas_category: String,advertisement_id: String,temp_model_id: String,min_accept_quantity: String,min_accept_quantity_unit_code: String,printed_model_number: String,kit_id: String,e_l_id: String,product_name: String,department_name: String,personal_name: String,parent_code: String,upc: String,fiscal_year: String,new_model_type: String,sales_date_new_model: String,filler_1: String,revised_id: String,filler_2: String,delete_indicator: String,actual_message_issued_date: String) returns String;
    function zgcms_5_create(client: String,sales_company_code: String,unified_model_number: String,suplier_code: String,package_type_code: String,price_available_date: String,price_validity_date: String,end_user_code: String,sales_trade_term_code: String,sales_term_rate_id: String,sales_currency_code: String,quantity_per_package: String,quantity_per_package_per_decimal: String,net_weight: String,gross_weight: String,measurement: String,width: String,depth: String,height: String,payer_code: String,sales_unit_price_basis: String,sales_unit_price_basis_dec: String,sales_unit_price_unit_code: String,sales_unit_price: String,sales_unit_price_exchange_rate: String,price_available_date_2: String,price_validity_date_2: String,sales_unit_price_2: String,sales_unit_price_exchange_rate_2: String,tent_price_mark_1: String,tent_price_mark_2: String,route: String, plu_supplier_perm_id: String,filler: String,revised_flag: String,filler_2: String,delete_indicator: String,actual_message_issued_date: String) returns String;
    function zgcms_234_create(client: String,record_type: String,reply_id: String,sales_order_code: String,issued_date: String,unified_model_number: String,suplier_code: String,description_1: String,description_2: String,description_3: String,description_4: String,description_5: String,description_6: String,description_7: String,filler: String,revised_id: String,filler_2: String,printer_spec_8: String,printer_spec_9: String,printer_spec_10: String,printer_spec_11: String,printer_spec_12: String,printer_spec_13: String,printer_spec_14: String,revised_id_3: String,filler_3: String,printer_spec_15: String,printer_spec_16: String,printer_spec_17: String,printer_spec_18: String,printer_spec_19: String,printer_spec_20: String,filler_4: String,revised_id_4: String,filler_5: String,delete_indicator: String) returns String;


}