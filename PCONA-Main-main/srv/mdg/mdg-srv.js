const cds = require('@sap/cds');

module.exports = cds.service.impl(function () {

    this.on('material_group', async(req) => {

        const { material_group } = req.data;
        var data = await SELECT.from`btp_panasonic.zplink`.where`material_group=${material_group}`;
        return data;
    });

    this.on('zplink_create', async (req) => {
        const { sales_org, dist_channel, plant, material_group, created_on, changed_on } = req.data;
        const existingRecord = await SELECT.from`BTP_PANASONIC.ZPLINK`
            .where`sales_org=${sales_org} and dist_channel=${dist_channel} and plant=${plant} and material_group=${material_group}`;
        if (existingRecord.length > 0) {
            const update = await UPDATE`BTP_PANASONIC.ZPLINK`
                .set`sales_org=${sales_org}`.set`dist_channel=${dist_channel}`.set`plant=${plant}`.set`material_group =${material_group}`.set`created_on =${created_on}`.set`changed_on =${changed_on}`
                .where`sales_org=${sales_org} and dist_channel=${dist_channel} and plant=${plant} and material_group=${material_group}`;
            //console.log(update);
        } else {
            const newRecord = await INSERT.into('BTP_PANASONIC.ZPLINK').entries(req.data);
           // console.log(newRecord);
        }
    });

    this.on('zplink_delete', async (req) => {
        const { sales_org, dist_channel, plant, material_group } = req.data;
        var del1 = await DELETE.from`BTP_PANASONIC.ZPLINK`.where`sales_org=${sales_org} and dist_channel=${dist_channel} and plant=${plant} and material_group=${material_group}`;
        //console.log(del1);
 
 
    });


    this.on('zplink_records', async () => {
        let allRecords = [];   
        
        var read = await SELECT.from`btp_panasonic.zplink`.orderBy`created_on DESC,changed_on DESC`;
        allRecords = allRecords.concat(read);   
        
        while (read && read.__next) {
            const response = await fetch(read.__next);
            read = await response.json();
            allRecords = allRecords.concat(read);
        }    
        //console.log(allRecords);
        return allRecords;
    });

    this.on('zcitycode_create', async (req) => {
        const { city_code, lang, area_code, country_code, city_name, short_name, legacy_information, sap_city } = req.data;
        const currentDate = new Date();
        const changedDate = new Date();
        const currentTime = new Date();  
        const changedTime = new Date();         
       const currentUser = req.user.id || 'anonymousUser';

        const existingRecord = await SELECT.from`BTP_PANASONIC.Z_CITY_CODE`
            .where`city_code=${city_code} and lang=${lang}`;
        if (existingRecord.length > 0) {
            const update = await UPDATE`BTP_PANASONIC.Z_CITY_CODE`
                .set`area_code=${area_code}`.set`country_code=${country_code}`.set`city_name=${city_name}`.set`short_name=${short_name}`
                .set`changed_on =${changedDate.toISOString()}`.set`change_time =${changedTime.toISOString()}`
                .set`changed_by =${currentUser}`.set`legacy_information=${legacy_information}`.set`sap_city=${sap_city}`
                .where`city_code=${city_code} and lang=${lang}`;
           // console.log(update);
        } else {
            const newRecord = await INSERT.into('BTP_PANASONIC.Z_CITY_CODE').entries([
                {
                    city_code, lang, area_code, country_code, city_name, short_name,
                    created_on: currentDate.toISOString(), created_time: currentTime.toISOString(), created_by: currentUser,
                     changed_on: currentDate.toISOString(), change_time: currentTime.toISOString(), changed_by: currentUser, legacy_information, sap_city
                }
            ]);
           // console.log(newRecord);
        }
    });


    this.on('ztrdpartner_create', async (req) => {
        const { client, customer_number, status, date, parent_code, company_class, area, country_code, city_code, name1, name2, 
             short_name,  address_line1 , address_line2, consolidated, telephone_number, fax_number, telex_number, global_group_code, 
             procurement_flag , deletion_indicator } = req.data;
        const currentDate = new Date();
        const changedDate = new Date();
        const currentTime = new Date();  
        const changedTime = new Date();         
       	const currentUser = req.user.id || 'anonymousUser';

        const existingRecord = await SELECT.from`BTP_PANASONIC.ZUMM_TRD_PARTNER`
            .where`client=${client} and customer_number=${customer_number}`;
        if (existingRecord.length > 0) {
            const update = await UPDATE`BTP_PANASONIC.ZUMM_TRD_PARTNER`
                .set`status=${status}`.set`date=${date}`.set`parent_code=${parent_code}`.set`company_class=${company_class}`
		        .set`area=${area}`.set`country_code=${country_code}`.set`city_code=${city_code}`.set`name1=${name1}`
		        .set`name2=${name2}`.set`short_name=${short_name}`.set`address_line1=${address_line1}`.set`address_line2=${address_line2}`
		        .set`consolidated=${consolidated}`.set`telephone_number=${telephone_number}`.set`fax_number=${fax_number}`.set`telex_number=${telex_number}`
		        .set`global_group_code=${global_group_code}`.set`procurement_flag=${procurement_flag}`.set`deletion_indicator=${deletion_indicator}`
                .set`changed_on =${changedDate.toISOString()}`.set`change_time =${changedTime.toISOString()}`
                .set`changed_by =${currentUser}`
                .where`client=${client} and customer_number=${customer_number}`;
           // console.log(update);
        } else {
            const newRecord = await INSERT.into('BTP_PANASONIC.ZUMM_TRD_PARTNER').entries([
                {
                    client, customer_number, status, date, parent_code, company_class, area, country_code, city_code, name1, name2,short_name,  
                    address_line1, address_line2, consolidated, telephone_number, fax_number, telex_number, global_group_code,  procurement_flag, deletion_indicator,
                    created_on: currentDate.toISOString(), created_time: currentTime.toISOString(), created_by: currentUser,
                    changed_on: currentDate.toISOString(), change_time: currentTime.toISOString(), changed_by: currentUser
                }
            ]);
           // console.log(newRecord);
        }
    });
 


    this.on('zgcms_1_create', async (req) => {
        
        const { client, reply_id, sales_company_code, issued_date, unified_model_number, suplier_code, factory_code, 
            department_code, legacy_color_code, brand_code, old_model_number, h_s_code, account_category, overseas_category, 
            advertisement_id, temp_model_id, min_accept_quantity, min_accept_quantity_unit_code, printed_model_number, kit_id, e_l_id,
            product_name, department_name, personal_name, parent_code, upc, fiscal_year, new_model_type, sales_date_new_model, filler_1, 
            revised_id, filler_2, delete_indicator, actual_message_issued_date } = req.data;
                
                const currentDate = new Date();
                const changedDate = new Date();         
                const changedTime = new Date();         
                   
        
                const existingRecord = await SELECT.from`BTP_PANASONIC.ZMM_M12_INFO_1`
                    .where`client=${client} and reply_id=${reply_id} and sales_company_code=${sales_company_code} and issued_date=${issued_date} and 	
                    unified_model_number=${unified_model_number} and suplier_code=${suplier_code} and factory_code=${factory_code}`;
                
        if (existingRecord.length > 0) {
                    const update = await UPDATE`BTP_PANASONIC.ZMM_M12_INFO_1`                
            .set`department_code=${department_code}`.set`legacy_color_code=${legacy_color_code}`.set`brand_code=${brand_code}`
            .set`old_model_number=${old_model_number}`.set`h_s_code=${h_s_code}`.set`account_category=${account_category}`.set`overseas_category=${overseas_category}`
            .set`advertisement_id=${advertisement_id}`.set`temp_model_id=${temp_model_id}`
            .set`min_accept_quantity=${min_accept_quantity}`.set`min_accept_quantity_unit_code=${min_accept_quantity_unit_code}`
            .set`printed_model_number=${printed_model_number}`.set`kit_id=${kit_id}`.set`e_l_id=${e_l_id}`.set`product_name=${product_name}`
            .set`department_name=${department_name}`.set`personal_name=${personal_name}`.set`parent_code=${parent_code}`.set`upc=${upc}` 
            .set`fiscal_year=${fiscal_year}`.set`new_model_type=${new_model_type}`.set`sales_date_new_model=${sales_date_new_model}`
            .set`filler_1=${filler_1}`.set`revised_id=${revised_id}`.set`filler_2=${filler_2}`.set`delete_indicator=${delete_indicator}`
            .set`actual_message_issued_date=${actual_message_issued_date}`.set`changed_on =${changedDate.toISOString()}`
            .set`change_time =${changedTime.toISOString()}`
            .where`client=${client} and reply_id=${reply_id} and sales_company_code=${sales_company_code} and issued_date=${issued_date} and 
        unified_model_number=${unified_model_number} and suplier_code=${suplier_code} and factory_code=${factory_code}`;
                   // console.log(update);
        } else {
                    const newRecord = await INSERT.into('BTP_PANASONIC.ZMM_M12_INFO_1').entries([
                 {
                    client, reply_id, sales_company_code, issued_date, unified_model_number, suplier_code, factory_code, department_code, legacy_color_code, 
                    brand_code, old_model_number, h_s_code, account_category, overseas_category, advertisement_id, temp_model_id, min_accept_quantity,
                    min_accept_quantity_unit_code, printed_model_number, kit_id, e_l_id, product_name, department_name, personal_name, parent_code, upc, 			
                    fiscal_year, new_model_type, sales_date_new_model, filler_1, revised_id, filler_2, delete_indicator, actual_message_issued_date, 
                    created_on: currentDate.toISOString(), changed_on: currentDate.toISOString(), change_time: changedTime.toISOString()
                 }
                    ]);
                   // console.log(newRecord);
                }

                });
        
    
    this.on('zgcms_5_create', async (req) => {
        
            const { client, sales_company_code, unified_model_number, suplier_code, package_type_code, price_available_date, price_validity_date, 
                end_user_code, sales_trade_term_code, sales_term_rate_id, sales_currency_code, quantity_per_package, quantity_per_package_per_decimal, 		
                net_weight, gross_weight, measurement, width, depth, height, payer_code, sales_unit_price_basis, sales_unit_price_basis_dec, 				
                sales_unit_price_unit_code, sales_unit_price, sales_unit_price_exchange_rate, price_available_date_2, price_validity_date_2, 				
                sales_unit_price_2, sales_unit_price_exchange_rate_2, tent_price_mark_1, tent_price_mark_2, route, plu_supplier_perm_id, filler, 			
                revised_flag, filler_2, delete_indicator, actual_message_issued_date  } = req.data;
                        
                const currentDate = new Date();
                const changedDate = new Date();         
                const changedTime = new Date();       
                           
                
            const existingRecord = await SELECT.from`BTP_PANASONIC.ZMM_M12_INFO_5`
                            .where`client=${client} and sales_company_code=${sales_company_code} and unified_model_number=${unified_model_number} and suplier_code=${suplier_code}`;
                        
                    if (existingRecord.length > 0) {
                            const update = await UPDATE`BTP_PANASONIC.ZMM_M12_INFO_5`                
                        .set`package_type_code=${package_type_code}`
                        .set`price_available_date=${price_available_date}`
                        .set`price_validity_date=${price_validity_date}`
                        .set`end_user_code=${end_user_code}`
                        .set`sales_trade_term_code=${sales_trade_term_code}`
                        .set`sales_term_rate_id=${sales_term_rate_id}`
                        .set`sales_currency_code=${sales_currency_code}`
                        .set`quantity_per_package=${quantity_per_package}`
                        .set`quantity_per_package_per_decimal=${quantity_per_package_per_decimal}`
                        .set`net_weight=${net_weight}`
                        .set`gross_weight=${gross_weight}`
                        .set`measurement=${measurement}`
                        .set`width=${width}`
                        .set`depth=${depth}`
                        .set`height=${height}`
                        .set`payer_code=${payer_code}`
                        .set`sales_unit_price_basis=${sales_unit_price_basis}`
                        .set`sales_unit_price_basis_dec=${sales_unit_price_basis_dec}`
                        .set`sales_unit_price_unit_code=${sales_unit_price_unit_code}`
                        .set`sales_unit_price=${sales_unit_price}`
                        .set`sales_unit_price_exchange_rate=${sales_unit_price_exchange_rate}`
                        .set`price_available_date_2=${price_available_date_2}`
                        .set`price_validity_date_2=${price_validity_date_2}`
                        .set`sales_unit_price_2=${sales_unit_price_2}`
                        .set`sales_unit_price_exchange_rate_2=${sales_unit_price_exchange_rate_2}`
                        .set`tent_price_mark_1=${tent_price_mark_1}`
                        .set`tent_price_mark_2=${tent_price_mark_2}`
                        .set`route=${route}`
                        .set`plu_supplier_perm_id=${plu_supplier_perm_id}`
                        .set`filler=${filler}`
                        .set`revised_flag=${revised_flag}`
                        .set`filler_2=${filler_2}`
                        .set`delete_indicator=${delete_indicator}`
                        .set`changed_on =${changedDate.toISOString()}`
                        .set`change_time =${changedTime.toISOString()}`
                        .set`actual_message_issued_date =${actual_message_issued_date}`.where`client=${client} and sales_company_code=${sales_company_code} and 		
                        unified_model_number=${unified_model_number} and suplier_code=${suplier_code}`;
                           // console.log(update);
                        } else {
                            const newRecord = await INSERT.into('BTP_PANASONIC.ZMM_M12_INFO_5').entries([
                                {
                                client, sales_company_code, unified_model_number, suplier_code, package_type_code, price_available_date, 
                                price_validity_date, end_user_code, sales_trade_term_code, sales_term_rate_id, sales_currency_code, quantity_per_package, 
                                quantity_per_package_per_decimal, net_weight, gross_weight, measurement, width, depth, height, payer_code, 
                                sales_unit_price_basis, sales_unit_price_basis_dec, sales_unit_price_unit_code, sales_unit_price, sales_unit_price_exchange_rate, 
                                price_available_date_2, price_validity_date_2, sales_unit_price_2, sales_unit_price_exchange_rate_2, tent_price_mark_1, tent_price_mark_2, route, 
                                plu_supplier_perm_id, filler, revised_flag, filler_2, delete_indicator,created_on: currentDate.toISOString(),changed_on: currentDate.toISOString(), 
                                change_time:changedTime.toISOString(), actual_message_issued_date
                                }
                            ]);
                           // console.log(newRecord);
                        }
                    });              
                
    
        this.on('zgcms_234_create', async (req) => {
        
                        const { client, record_type, reply_id, sales_order_code, issued_date, unified_model_number, suplier_code, 
                            description_1, description_2, description_3, description_4, description_5, description_6, description_7, 
                            filler, revised_id, filler_2, printer_spec_8, printer_spec_9, printer_spec_10, printer_spec_11, printer_spec_12, 
                            printer_spec_13, printer_spec_14, revised_id_3, filler_3, printer_spec_15, printer_spec_16, printer_spec_17, printer_spec_18, 
                            printer_spec_19, printer_spec_20, filler_4, revised_id_4, filler_5, delete_indicator } = req.data;
                            
                            const currentDate = new Date();
                            const changedDate = new Date();         
                            const changedTime = new Date();         
                               
                    
                        const existingRecord = await SELECT.from`BTP_PANASONIC.ZMM_M12_INFO_234`
                                .where`client=${client} and record_type=${record_type} and reply_id=${reply_id} and sales_order_code=${sales_order_code}
                     and issued_date=${issued_date} and unified_model_number=${unified_model_number} and suplier_code=${suplier_code}`;
                            
                    if (existingRecord.length > 0) {
                                const update = await UPDATE`BTP_PANASONIC.ZMM_M12_INFO_234`                
                            .set`description_1=${description_1}`
                            .set`description_2=${description_2}`
                            .set`description_3=${description_3}`
                            .set`description_4=${description_4}`
                            .set`description_5=${description_5}`
                            .set`description_6=${description_6}`
                            .set`description_7=${description_7}`
                            .set`filler=${filler}`
                            .set`revised_id=${revised_id}`
                            .set`filler_2=${filler_2}`
                            .set`printer_spec_8=${printer_spec_8}`
                            .set`printer_spec_9=${printer_spec_9}`
                            .set`printer_spec_10=${printer_spec_10}`
                            .set`printer_spec_11=${printer_spec_11}`
                            .set`printer_spec_12=${printer_spec_12}`
                            .set`printer_spec_13=${printer_spec_13}`
                            .set`printer_spec_14=${printer_spec_14}`
                            .set`revised_id_3=${revised_id_3}`
                            .set`filler_3=${filler_3}`
                            .set`printer_spec_15=${printer_spec_15}`
                            .set`printer_spec_16=${printer_spec_16}`
                            .set`printer_spec_17=${printer_spec_17}`
                            .set`printer_spec_18=${printer_spec_18}`
                            .set`printer_spec_19=${printer_spec_19}`
                            .set`printer_spec_20=${printer_spec_20}`
                            .set`filler_4=${filler_4}`
                            .set`revised_id_4=${revised_id_4}`
                            .set`filler_5=${filler_5}`
                            .set`delete_indicator=${delete_indicator}`
                            .set`changed_on =${changedDate.toISOString()}`
                            .set`change_time =${changedTime.toISOString()}`
                             .where`client=${client} and record_type=${record_type} and reply_id=${reply_id} and sales_order_code=${sales_order_code}
                             and issued_date=${issued_date} and unified_model_number=${unified_model_number} and suplier_code=${suplier_code}`;
                               // console.log(update);
                    } else {
                        const newRecord = await INSERT.into('BTP_PANASONIC.ZMM_M12_INFO_234').entries([
                        {
                                    client, record_type, reply_id, sales_order_code, issued_date, unified_model_number, suplier_code, description_1, description_2, 
                            description_3, description_4, description_5, description_6, description_7, filler, revised_id, filler_2, printer_spec_8, printer_spec_9, 		
                            printer_spec_10, printer_spec_11, printer_spec_12, printer_spec_13, printer_spec_14, revised_id_3, filler_3, 
                            printer_spec_15, printer_spec_16, printer_spec_17, printer_spec_18, printer_spec_19, printer_spec_20, filler_4, revised_id_4, filler_5, 		
                            delete_indicator, created_on:currentDate.toISOString(), changed_on: currentDate.toISOString(), change_time:changedTime.toISOString() 			
                        }
                                ]);
                               // console.log(newRecord);
                            }
                        });

                        this.on('userInfo', req => {
                            let results = {};
                            results.user = cds.context.user.id;
                            results.locale = cds.context.locale;
                            results.scopes = {};
                           // console.log("req.user"+req.user);
                           // console.log("req"+req);
                            results.scopes.identified = req.user.is('identified-user');
                            results.scopes.authenticated = req.user.is('authenticated-user');
                            //results.scopes.BusAdmin = req.user.is('businessAdmin');
                            results.scopes.TISAdmin = req.user.is('tisAdmin');
                            // results.firstName = req?.req.req?.req.req.authInfo?.req.req.authInfo.getGivenName()
                            // results.lastName = req?.req.req?.req.req.authInfo?.req.req.authInfo.getFamilyName()
                            // results.email = req?.req.req?.req.req.authInfo?.req.req.authInfo.getEmail()
                    
                    
                           // console.log(results)
                            return results;
                        });
                    
                    
    
    
});