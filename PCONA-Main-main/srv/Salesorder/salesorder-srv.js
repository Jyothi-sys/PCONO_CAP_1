const cds = require('@sap/cds');


module.exports = cds.service.impl(function () {

    this.on('pivs_batch', async (req) => {
        const batch = req.data.batch;
        const results = [];

        for (const record of batch) {
            try {
                // Insert each record into the database
                const result = await INSERT.into('btp_panasonic.pivs_processed_salesorder_prodsched').entries(record);
                // Extract relevant information and store it in the results array
                //console.log(result)
                results.push({
                    success: true,
                    message: 'Record Inserted Successfully',
                    //record
                    //record: result[0], // Assuming the result is an array
                });
            } catch (error) {
                // Handle any errors
                console.error(`Error: ${error.message}`);
                results.push({
                    success: false,
                    message: error.message,
                });
            }
        }
        return results;
    });

    this.on('bypromise_batch', async (req) => {
        const batch = req.data.batch;
        const results = [];

        for (const record of batch) {
            try {
                // Insert each record into the database
                const result = await INSERT.into('btp_panasonic.by_processed_order_promise').entries(record);
                // Extract relevant information and store it in the results array
                //console.log(result)
                results.push({
                    success: true,
                    message: 'Record Inserted Successfully',
                    //record
                    //record: result[0], // Assuming the result is an array
                });
            } catch (error) {
                // Handle any errors
                console.error(`Error: ${error.message}`);
                results.push({
                    success: false,
                    message: error.message,
                });
            }
        }
        return results;
    });

    this.on('bypromise_update', async (req) => {
        const { transmissionDate,salesOrder,itemNumber,scheduledLineNo,material,plant,confirmQuantity,uom,confirmDate,status,message,timestamp } = req.data;
        const update = await UPDATE`btp_panasonic.by_processed_order_promise`
                .set`status=${status}`
                .set`message=${message}`
                .where`transmissionDate=${transmissionDate} and salesOrder=${salesOrder} and itemNumber=${itemNumber} and scheduledLineNo=${scheduledLineNo} and timestamp=${timestamp}`;
           // console.log(update);      
 
 
    });

    this.on('byplant_create', async (req) => {
        const { Identifier, Customer, Group, ShipPlant, Days } = req.data;
        const currentDate = new Date();
        // const currentTime = new Date();
        // const changedTime = new Date();
        const changedDate = new Date();
        const currentUser = req.user.id || 'anonymousUser';
    
        const existingRecord = await SELECT.from`BTP_PANASONIC_PCONA_BY_PLANT_PROPOSAL_RULES`
            .where`Identifier=${Identifier} and Customer=${Customer} and Group=${Group}`;
    
        if (existingRecord.length > 0) {
            const update = await UPDATE`BTP_PANASONIC_PCONA_BY_PLANT_PROPOSAL_RULES`
                .set`ShipPlant=${ShipPlant}`.set`Days=${Days}`
                .set`changed_on=${changedDate.toISOString()}`                
                .set`changed_by=${currentUser}`
                .where`Identifier=${Identifier} and Customer=${Customer} and Group=${Group}`;
           // console.log(update);
        } else {
            const newRecord = await INSERT.into('BTP_PANASONIC_PCONA_BY_PLANT_PROPOSAL_RULES').entries([
                {
                    Identifier, Customer, Group, ShipPlant, Days,
                    created_on: currentDate.toISOString(),
                    created_by: currentUser
                    
                }
            ]);
           // console.log(newRecord);
        }
    });
    



    // this.on('byplant_create', async (req) => {
    //     const { Identifier, Customer, Group, ShipPlant, Days, created_at, created_by, changed_at, changed_by } = req.data;       

    //     const existingRecord = await SELECT.from`BTP_PANASONIC_PCONA_BY_PLANT_PROPOSAL_RULES`
    //         .where`Identifier=${Identifier} and ShipPlant=${ShipPlant} and Days=${Days}`;
    //     if (existingRecord.length > 0) {
    //         const update = await UPDATE`BTP_PANASONIC_PCONA_BY_PLANT_PROPOSAL_RULES`
    //             .set`Customer=${Customer}`.set`Group=${Group}`.set`changed_at =${changed_at}`.set`changed_by =${changed_by}`                
    //             .where`Identifier=${Identifier} and ShipPlant=${ShipPlant} and Days=${Days}`;
    //         console.log(update);
    //     } else {
    //         delete req.data.changed_at;
    //         delete req.data.changed_by;
    //         const newRecord = await INSERT.into('BTP_PANASONIC_PCONA_BY_PLANT_PROPOSAL_RULES').entries(req.data);
    //         console.log(newRecord);
    //     }
    // });

    this.on('byplant_delete', async (req) => {
        const { Identifier, Customer, Group } = req.data;
        var del1 = await DELETE.from`BTP_PANASONIC_PCONA_BY_PLANT_PROPOSAL_RULES`.where`Identifier=${Identifier} and Customer=${Customer} and Group=${Group}`;
       // console.log(del1);
 
    });

    this.on('bypromise_records', async () => {
        let allRecords = [];   
        
        var read = await SELECT.from`btp_panasonic.by_processed_order_promise`.orderBy`timestamp DESC`;
        allRecords = allRecords.concat(read);   
        
        while (read && read.__next) {
            const response = await fetch(read.__next);
            read = await response.json();
            allRecords = allRecords.concat(read);
        }    
       // console.log(allRecords);
        return allRecords;
    });

    this.on('pivs_records', async () => {
        let allRecords = [];   
        
        var read = await SELECT.from`btp_panasonic.pivs_processed_salesorder_prodsched`.orderBy`timestamp DESC`;
        allRecords = allRecords.concat(read);   
        
        while (read && read.__next) {
            const response = await fetch(read.__next);
            read = await response.json();
            allRecords = allRecords.concat(read);
        }    
       // console.log(allRecords);
        return allRecords;
    });

    this.on('userInfo', req => {
        let results = {};
        results.user = cds.context.user.id;
        results.locale = cds.context.locale;
        results.scopes = {};
        //console.log("req.user"+req.user);
        //console.log("req"+req);
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

   


