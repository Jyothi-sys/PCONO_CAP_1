using {
  managed,
  sap.common
} from '@sap/cds/common';

namespace btp_panasonic;


entity zinv_balance_hwy905 {
    key date                    : String(10);
        dcnumber_hwy905         : String(4);
        warehouse_hwy905        : String(4);
    key companycode             : String(4);
    key plant                   : String(7);
    key material                : String(20);
        quantity_hwy905         : String(10);
        sender_partner_name     : String(15);
        timestamp               : Timestamp @cds.on.insert: $now;
    
}
entity zxref_zone_plant {
    key plant             : String(4);
        companycode       : String(4);
        dc                : String(4);
        warehouse_hwy905  : String(4);
        partner_id        : String(10);
        zone              : String(10);
}
entity zinv_balance_s4_hana {
    key inventory_date                : String(10);
    key companycode                   : String(4);
    key plant                         : String(4);
    key material                      : String(20);
        material_group                : String(10);
        product_hierarchy             : String(18);
        current_inventory             : String(10);
        unit_of_measure               : String(2);
        material_description          : String(200);
        sap_unrestricted_quantity     : String(10);
        sap_qa_stock                  : String(10);
        sales_order_stock             : String(10);
        open_deliveries               : String(10);
        sap_material_moving_avg_price : String(10);
        created_on                    : String(8);
        created_by                    : String(20);
}

entity serial_tracking {

        file_source        : String(10);
        sales_order        : String(10);
        delivery_number    : String(10);
        delivery_line_item : String(6);
    key material           : String(18);
    key serial_number      : String(18);
    key tracking_number    : String(20);
        timestamp          : Timestamp @cds.on.insert: $now;
}

entity pivs_unprocessed_so_prodsched{

        companycode        : String(5);
        transmission_date  : String(10);
        plant              : String(4);
        hdr_flag           : String(1);
        id                 : String(2);
        posting_date       : String(10);
        unified_mode       : String(40);
        quantity           : String(4);
        timestamp          : Timestamp @cds.on.insert: $now;
}

entity pivs_processed_salesorder_prodsched{

    key indicator          : String(2);
    key transmissionDate  : String(10);
    key salesOrder        : String(10);
    key itemNumber        : String(10);
    key scheduledLineNo  : String(25);
        material           : String(20);
        plant              : String(4);
        factoryConfirmQuantity : String(13);
        confirmQuantity   : String(13);
        uom                : String(2);
        confirmDate       : String(10);
        status             : String(10);
        message            : String(240);
    key timestamp          : String(50);
}

entity by_unprocessed_order_promise{

        headerextref      : String(25);
        lineitemexteef    : String(10);
        schedid           : String(15);
        s4salesorder      : String(25);
        dateofsalesorder  : String(10);
        solineitem        : String(10);
        scheduledline     : String(5);
        item              : String(40);
        loc               : String(10);
        promisedate       : String(15);
        promiseqty        : String(13);
        timestamp          : Timestamp @cds.on.insert: $now;
}
entity by_processed_order_promise{

    key transmissionDate  : String(10);
    key salesOrder        : String(10);
    key itemNumber        : String(10);
    key scheduledLineNo  : String(25);
        material           : String(40);
        plant              : String(4);
        confirmQuantity   : String(13);
        uom                : String(2);
        confirmDate       : String(10);
        status             : String(25);
        message            : String(240);
    key timestamp          : String(50);
}

entity pcona_by_plant_proposal_rules{
    key Identifier    : String(15);
    key Customer      : String(10);
    key Group         : String(3);
        ShipPlant     : String(4);
        Days          : Integer64;
        created_on          : Timestamp @cds.on.insert: $now;        
        created_by          : UUID @cds.on.insert : $user @cds.on.update : $user; 
        changed_on          : Timestamp @cds.on.insert: $now;        
        changed_by          : UUID @cds.on.insert : $user @cds.on.update : $user;
}

entity jda_ship_plan{

    proc_date              : Date @cds.on.insert: $now;
    proc_time              : Time @cds.on.insert: $now;
    counter                : Integer64;
    key matnr              : String(18);
    key salesord           : String(22);
    key salesordline       : String(10);
    dest                   : String(15);
    source                 : String(15);
    sourcing               : String(40);
    shipdate               : Date;
    sardate                : Date;
    quantity               : String(13);
    tmode                  : String(15);
    segment                : String(15);
    demand                 : String(30);
    pattern                : String(10);
    itemtype               : String(15);
    jdasource              : String(10);
    jdasupply              : String(1);
    udest                  : String(15);
}

entity zplink{

    key sales_org       : String(4);
    key dist_channel    : String(2);
    key plant           : String(4);
    key material_group  : String(9);
        created_on      : Date @cds.on.insert: $now;
        changed_on      : Date @cds.on.insert: $now @cds.on.update : $now;

}

entity zumm_trd_partner{

    key client         : String(3);
    key customer_number: String(10);
    status             : String(1);
    date               : String(4);
    parent_code        : String(10);
    company_class      : String(2);
    area               : String(1);
    country_code       : String(3);
    city_code          : String(3);
    name1              : String(50);
    name2              : String(50);
    short_name         : String(15);
    address_line1      : String(50);
    address_line2      : String(50);
    consolidated       : String(1);
    telephone_number   : String(30);
    fax_number         : String(30);
    telex_number       : String(30);
    global_group_code  : String(8);
    procurement_flag   : String(1);
    deletion_indicator : String(1);
    created_on          : Date @cds.on.insert: $now;
    created_time        : Time @cds.on.insert: $now;
    created_by          : UUID @cds.on.insert : $user @cds.on.update : $user; 
    changed_on          : Date @cds.on.insert: $now @cds.on.update : $now;
    change_time         : Time @cds.on.insert : $now  @cds.on.update : $now;
    changed_by          : UUID @cds.on.insert : $user @cds.on.update : $user;

}

entity zmm_m12_info_234{

    key client          : String(3);
    key record_type     : String(1);
    key reply_id        : String(1);
    key sales_order_code: String(8);
    key issued_date     : String(8);
    key unified_model_number : String(20);
    key suplier_code    : String(8);
    description_1       : String(30);
    description_2       : String(30);
    description_3       : String(30);
    description_4       : String(30);
    description_5       : String(30);
    description_6       : String(30);
    description_7       : String(30);
    filler              : String(40);
    revised_id          : String(7);
    filler_2            : String(33);
    printer_spec_8      : String(30);
    printer_spec_9      : String(30);
    printer_spec_10     : String(30);
    printer_spec_11     : String(30);
    printer_spec_12     : String(30);
    printer_spec_13     : String(30);
    printer_spec_14     : String(30);
    revised_id_3        : String(7);
    filler_3            : String(33);
    printer_spec_15     : String(30);
    printer_spec_16     : String(30);
    printer_spec_17     : String(30);
    printer_spec_18     : String(30);
    printer_spec_19     : String(30);
    printer_spec_20     : String(30);
    filler_4            : String(33);
    revised_id_4        : String(7);
    filler_5            : String(33);
    delete_indicator    : String(1);
    created_on          : Date @cds.on.insert: $now;
    changed_on          : Date @cds.on.insert: $now @cds.on.update : $now;
    change_time         : Time @cds.on.insert : $now  @cds.on.update : $now;
}

entity zmm_m12_info_1 {

    key client          : String(3);
    key reply_id        : String(1);
    key sales_company_code: String(8);
    key issued_date     : String(8);
    key unified_model_number : String(20);
    key suplier_code    : String(8);
    key factory_code        : String(8);
    department_code     : String(8);
    legacy_color_code   : String(2);
    brand_code          : String(3);
    old_model_number    : String(20);
    h_s_code            : String(9);
    account_category    : String(11);
    overseas_category   : String(11);
    advertisement_id    : String(1);
    temp_model_id       : String(1);
    min_accept_quantity : String(9);
    min_accept_quantity_unit_code   : String(2);
    printed_model_number: String(30);
    kit_id              : String(1);
    e_l_id              : String(1);
    product_name        : String(50);
    department_name     : String(35);
    personal_name       : String(15);
    parent_code         : String(8);
    upc                 : String(12);
    fiscal_year         : String(4);
    new_model_type      : String(1);
    sales_date_new_model: String(8);
    filler_1            : String(1);
    revised_id          : String(20);
    filler_2            : String(20);
    delete_indicator    : String(1);
    actual_message_issued_date : String;
    created_on          : Date @cds.on.insert: $now;
    changed_on          : Date @cds.on.insert: $now @cds.on.update : $now;
    change_time         : Time @cds.on.insert : $now  @cds.on.update : $now;
}

entity zmm_m12_info_5 {

    key client          : String(3);
    key sales_company_code: String(8);
    key unified_model_number : String(20);
    key suplier_code    : String(8);
    package_type_code   : String(2);
    price_available_date: String(8);
    price_validity_date : String(8);
    end_user_code       : String(8);
    sales_trade_term_code: String(20);
    sales_term_rate_id  : String(1);
    sales_currency_code : String(3);
    quantity_per_package: String(9);
    quantity_per_package_per_decimal: String(1);
    net_weight          : String(9);
    gross_weight        : String(9);
    measurement         : String(9);
    width               : String(5);
    depth               : String(5);
    height              : String(5);
    payer_code          : String(8);
    sales_unit_price_basis: String(9);
    sales_unit_price_basis_dec: String(1);
    sales_unit_price_unit_code: String(2);
    sales_unit_price    : String(15);
    sales_unit_price_exchange_rate    : String(11);
    price_available_date_2: String(8);
    price_validity_date_2 : String(8);
    sales_unit_price_2  : String(15);
    sales_unit_price_exchange_rate_2  : String(15);
    tent_price_mark_1   : String(1);
    tent_price_mark_2   : String(1);
    route               : String(6);
    plu_supplier_perm_id: String(1);
    filler              : String(66);
    revised_flag        : String(27);
    filler_2            : String(21);
    delete_indicator    : String(1);
    created_on          : Date @cds.on.insert: $now;
    changed_on          : Date @cds.on.insert: $now @cds.on.update : $now;
    change_time         : Time @cds.on.insert : $now  @cds.on.update : $now;
    actual_message_issued_date : String;
}

entity z_city_code {
    
    key city_code       : String(3);
    key lang            : String(2);
    area_code           : String(2);
    country_code        : String(3);
    city_name           : String(50);
    short_name          : String(25);
    created_on          : Date @cds.on.insert: $now;
    created_time        : Time @cds.on.insert: $now;
    created_by          : UUID @cds.on.insert : $user @cds.on.update : $user; 
    changed_on          : Date @cds.on.insert: $now @cds.on.update : $now; 
    change_time         : Time @cds.on.insert : $now  @cds.on.update : $now;
    changed_by          : UUID @cds.on.insert : $user @cds.on.update : $user;
    legacy_information  : String(20);
    sap_city            : String(10);

}