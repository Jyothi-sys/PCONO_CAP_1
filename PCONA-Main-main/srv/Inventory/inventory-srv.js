const cds = require('@sap/cds');
const dbClass = require("sap-hdbext-promisfied");
const hdbext = require("@sap/hdbext");
const appinformation = require('./appinformation');

let currentInventoryData;

module.exports = cds.service.impl(function () {

    this.on('zinv_count', async (req) => {

        const { date, sender_partner_name } = req.data;
        var count = await SELECT.from`btp_panasonic.zinv_balance_hwy905`.where`date=${date} and sender_partner_name=${sender_partner_name}`;
        return count.length;

    });

    this.on('zinv_difference', async (req) => {
        try {
            // const value = req.data;
            const db = await cds.connect.to('db');
            let dbConn = new dbClass(await dbClass.createConnection(db.options.credentials));
            // const subaccount = appinformation.getSubaccount();
            // console.log(subaccount);
            const sp = await dbConn.loadProcedurePromisified(hdbext, null, 'INVENTORY_DIFF');
            const result = await dbConn.callProcedurePromisified(sp, []);
           // console.log(result);
            return { status: "200", response: result.results };

        }
        catch (error) {
            return { status: "500", response: error };
        }
    });

    this.on('zinv_delete', async (req) => {
        const { date } = req.data;
        var del = await DELETE.from`btp_panasonic.zinv_balance_hwy905`.where`date=${date}`;
        return del;

    });

    // this.on('purge', async req => {

    //     function convertDateFormat(inputDate) {
    //         // Parse the input date string and extract year, month, and day
    //         const year = inputDate.substring(6, 10);
    //         const month = inputDate.substring(0, 2);
    //         const day = inputDate.substring(3, 5);

    //         // Create a new Date object
    //         const dateObject = new Date(year, month - 1, day);
    //         return dateObject;
    //     }

    //     var hwy905_data = await SELECT.from(`btp_panasonic.zinv_balance_hwy905`);
    //     for (each of hwy905_data) {
    //         const formattedDate = convertDateFormat(each.date);
    //         const date = (new Date(formattedDate) - new Date(new Date().toISOString().split("T")[0]));
    //         const date1 = date / (1000 * 60 * 60 * 24);
    //         const day = Math.abs(date1);
    //         if (day > 30) {
    //             await DELETE.from`btp_panasonic.zinv_balance_hwy905`.where`date=${each.date}`;
    //             // console.log(purge_hwy905);    
    //             // return purge_hwy905;
    //         }
    //     }

    //     var s4_data = await SELECT.from(`btp_panasonic.zinv_balance_s4_hana`);
    //     for (each of s4_data) {
    //         const formattedDate = convertDateFormat(each.inventory_date);
    //         const date = (new Date(formattedDate) - new Date(new Date().toISOString().split("T")[0]));
    //         const date1 = date / (1000 * 60 * 60 * 24);
    //         const day = Math.abs(date1);
    //         if (day > 30) {
    //             await DELETE.from`btp_panasonic.zinv_balance_s4_hana`.where`inventory_date=${each.inventory_date}`;
    //             // console.log(purge_s4);
    //             // return purge_s4;
    //         }
    //     }

    // });

     /* To remove the timeout error in job scheduler while deleting the records due to large amount of data, a new logic is being implemented using Batch
     By using this batch, we sorted the timeout issue while deleting the records.
     Date: 03-05-2024
     Author: Kanchan
      */

    this.on('purge', async req => {
 
        function convertDateFormat(inputDate) {
            // Parse the input date string and extract year, month, and day
            const year = inputDate.substring(6, 10);
            const month = inputDate.substring(0, 2);
            const day = inputDate.substring(3, 5);
 
            // Create a new Date object
            const dateObject = new Date(year, month - 1, day);
            return dateObject;
        }
        function convertDatetoString(inputDate) {
            // Parse the input date string and extract year, month, and day
            const inputDate1= inputDate.split("-");
            const day = inputDate1[2];
            const month = inputDate1[1];
            const year = inputDate1[0];
 
            return month + '-' + day + '-' + year;
        }
 
        const date = new Date();
        const currentDateFormat = convertDatetoString(new Date().toISOString().split("T")[0]);
        const diffDate = new Date(date.setDate(date.getDate() - 30));
        const diffDateFormat = convertDatetoString(diffDate.toISOString().split('T')[0]);
        //const dateDiff = (new Date(formattedDate) - new Date(new Date().toISOString().split("T")[0]));
        const batchSize = 1000;
        let hwy905_data = await SELECT.from(`btp_panasonic.zinv_balance_hwy905`).where`date < ${diffDateFormat}`;
        if (hwy905_data.length > 0) {
            let filterCondition = hwy905_data.map(x => x.date);
           for (var i = 0; i < filterCondition.length; i += batchSize) {
                const batch = filterCondition.slice(i, i + batchSize);
                let result = await DELETE.from(`btp_panasonic.zinv_balance_hwy905`).where`date in ${batch}`;
               // console.log("result hwy905==>" + result)
            }
        }
        let s4_data = await SELECT.from(`btp_panasonic.zinv_balance_s4_hana`).where`inventory_date < ${diffDateFormat}`;
        if (s4_data.length > 0) {
            let filterConditionHana = s4_data.map(x => x.inventory_date);
            for (var i = 0; i < filterConditionHana.length; i += batchSize) {
                const batchHana = filterConditionHana.slice(i, i + batchSize);
                let result = await DELETE.from(`btp_panasonic.zinv_balance_s4_hana`).where`inventory_date in ${batchHana}`;
               // console.log("result S4data==>" + result)
            }
        }
        // for (each of hwy905_data) {
        //     const formattedDate = convertDateFormat(each.date);
        //     const ff=new Date(new Date().toISOString().split("T")[0]);
        //     const date = (new Date(formattedDate) - new Date(new Date().toISOString().split("T")[0]));
        //     const date1 = date / (1000 * 60 * 60 * 24);
        //     const day = Math.abs(date1);
        //     if (day > 30) {
        //         await DELETE.from`btp_panasonic.zinv_balance_hwy905`.where`date=${each.date}`
        //         // console.log(purge_hwy905);    
        //         // return purge_hwy905;
        //     }
        // }
       
 
        // var s4_data = await SELECT.from(`btp_panasonic.zinv_balance_s4_hana`);
        // for (each of s4_data) {
        //     const formattedDate = convertDateFormat(each.inventory_date);
        //     const date = (new Date(formattedDate) - new Date(new Date().toISOString().split("T")[0]));
        //     const date1 = date / (1000 * 60 * 60 * 24);
        //     const day = Math.abs(date1);
        //     if (day > 30) {
        //         await DELETE.from`btp_panasonic.zinv_balance_s4_hana`.where`inventory_date=${each.inventory_date}`;
        //         // console.log(purge_s4);
        //         // return purge_s4;
        //     }
        // }
 
    });


    this.on('s4hana_batch', async (req) => {
        const batch = req.data.batch;
        const results = [];

        for (const record of batch) {
            try {
                // Insert each record into the database
                const result = await INSERT.into('BTP_PANASONIC_ZINV_BALANCE_S4_HANA').entries(record);
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

    this.on('hwy905_batch', async (req) => {
        const batch = req.data.batch;
        const results = [];
        const insertedRecordIds = new Set();
    
        for (let i = batch.length - 1; i >= 0; i--) {
            const record = batch[i];
            const recordIdentifier = `${record.date}_${record.companycode}_${record.plant}_${record.material}`; 
    
            if (!insertedRecordIds.has(recordIdentifier)) {
                try {
                    
                    const result = await INSERT.into('BTP_PANASONIC_ZINV_BALANCE_HWY905').entries(record);
                      
                    insertedRecordIds.add(recordIdentifier);   
                    
                    results.push({
                        success: true,
                        message: 'Record Inserted Successfully',
                    });
                } catch (error) {
                    
                    console.error(`Error: ${error.message}`);
                    results.push({
                        success: false,
                        message: error.message,
                    });
                }
            } else {
                
                results.push({
                    success: false,
                    message: 'Duplicate Record Skipped',
                });
            }
        }
    
        
        results.reverse();
    
        return results;
    });
    
    

    this.on('zinv_file', async (req) => {
        try {
            // const value = req.data;
            const db = await cds.connect.to('db');
            let dbConn = new dbClass(await dbClass.createConnection(db.options.credentials));
            // const subaccount = appinformation.getSubaccount();
            // console.log(subaccount);
            const sp = await dbConn.loadProcedurePromisified(hdbext, null, 'INVENTORY_FILE');
            const result = await dbConn.callProcedurePromisified(sp, []);
           // console.log(result);
            return { status: "200", response: result.results };

        }
        catch (error) {
            return { status: "500", response: error };
        }
    });

    this.on('zxref_create', async (req) => {
        const { plant, companycode, dc, warehouse_hwy905, partner_id, zone } = req.data;
        const existingRecord = await SELECT.from`BTP_PANASONIC.ZXREF_ZONE_PLANT`
            .where`plant=${plant} and companycode=${companycode}`;
        if (existingRecord.length > 0) {
            const update = await UPDATE`BTP_PANASONIC.ZXREF_ZONE_PLANT`
                .set`plant=${plant}`.set`companycode=${companycode}`.set`dc=${dc}`.set`warehouse_hwy905 =${warehouse_hwy905}`.set`partner_id=${partner_id}`.set`zone=${zone}`
                .where`plant=${plant} and companycode=${companycode}`;
           // console.log(update);
        } else {
            const newRecord = await INSERT.into('BTP_PANASONIC.ZXREF_ZONE_PLANT').entries(req.data);
           // console.log(newRecord);
        }
    });

    this.on('zxref_read', async () => {
        var read = await SELECT.from(`BTP_PANASONIC.ZXREF_ZONE_PLANT`);
       // console.log(read);
        return read;

    });


    this.on('zxref_delete', async (req) => {
        const { plant, partner_id } = req.data;
        var del1 = await DELETE.from`BTP_PANASONIC.ZXREF_ZONE_PLANT`.where`plant=${plant} and partner_id=${partner_id}`;
       // console.log(del1);


    });

    this.on('READ', 'current_inventory', async (req) => {
        const s4_inventory = await cds.connect.to('ZPTP_CDS_INVREC_CDS');
        const s4_inv = await s4_inventory.send({
            method: 'GET',
            path: "/ZPTP_CDS_INVREC('US14')/Set"
        })
        await s4_inv.forEach(instance => {
            if (instance.InventorySnapshotDate) {
                instance.InventorySnapshotDate = ODataV2toODataV4Date(instance.InventorySnapshotDate);
            }
            if (instance.createdon) {
                instance.createdon = ODataV2toODataV4Date(instance.createdon);
            }
        });
        return s4_inv;
    });

    function ODataV2toODataV4Date(value) {
        var sNumber = value.substring(6, 19);
        return new Date(Number(sNumber));
    }

    this.on('zone_id', async (req) => {

        const { plant } = req.data;
        var data = await SELECT.from`BTP_PANASONIC.ZXREF_ZONE_PLANT`.where`plant=${plant}`;
        return data;

    });

    this.on('zplant', async (req) => {

        const { dc, warehouse } = req.data;
        var count = await SELECT.from`BTP_PANASONIC.ZXREF_ZONE_PLANT`.where`dc=${dc} and warehouse_hwy905=${warehouse}`.columns('plant');
        return count;

    });

    // changes for  Inventory App for huge load 05/12/2023
    function ODataV2toODataV4Date1(value) {
        var sNumber = value.substring(6, 19);
        return new Date(Number(sNumber));
    }


    // this.on('current_inv1', async (req) => {

    // const s4_inventory = await cds.connect.to('ZPTP_CDS_INVREC_CDS');
    // const sPath = "/ZPTP_CDS_INVREC('US14')/Set?$filter=inventoryvar ne 0";
    // const sfilter = "&$select=companycode,Plant,Material,inventoryvar";
    // const s4_inv = await s4_inventory.send({
    //     method: 'GET',
    //     path: sPath + sfilter
    // });
    // console.log(s4_inv);

    // await s4_inv.forEach(instance => {
    //     if (instance.InventorySnapshotDate) {
    //         instance.InventorySnapshotDate = ODataV2toODataV4Date1(instance.InventorySnapshotDate);
    //     }
    //     if (instance.createdon) {
    //         instance.createdon = ODataV2toODataV4Date1(instance.createdon);
    //     }
    // });

    // const db = await cds.connect.to('db');
    // let dbConn = new dbClass(await dbClass.createConnection(db.options.credentials));
    // const sp = await dbConn.loadProcedurePromisified(hdbext, null, 'INVENTORY_DIFF');
    // const zinvDifferenceData = await dbConn.callProcedurePromisified(sp, []);

    // const zinvResponse = [];

    // zinvDifferenceData.results.forEach(zinvInstance => {
    //     const matchingS4Instance = s4_inv.find(s4Instance => {
    //         return s4Instance.companycode === zinvInstance.COMPANYCODE &&
    //             s4Instance.Plant === zinvInstance.PLANT &&
    //             s4Instance.Material === zinvInstance.MATERIAL;
    //     });

    //     if (matchingS4Instance) {
    //         zinvInstance.CURRENT_INVENTORY = matchingS4Instance.inventoryvar;
    //         zinvResponse.push(zinvDifferenceData);
    //     }
    // });
    // console.log(zinvResponse); 
    // return zinvDifferenceData;
    // });


    

    this.on('current_inv1', async (req) => {
        const { DATE } = req.data;
       // console.log(" req.user.is('tisAdmin')"+ req.user.is('tisAdmin'));
        const s4_inventory = await cds.connect.to('ZPTP_CDS_INVREC_CDS');
        const sPath = "/ZPTP_CDS_INVREC('US14')/Set?$filter=inventoryvar ne 0";
        const sfilter = "&$select=companycode,Plant,Material,inventoryvar";
        const s4_inv = await s4_inventory.send({
            method: 'GET',
            path: sPath + sfilter
        });
    
       // console.log(s4_inv);
    
        await s4_inv.forEach(instance => {
            if (instance.InventorySnapshotDate) {
                instance.InventorySnapshotDate = ODataV2toODataV4Date1(instance.InventorySnapshotDate);
            }
            if (instance.createdon) {
                instance.createdon = ODataV2toODataV4Date1(instance.createdon);
            }
        });
    
        const db = await cds.connect.to('db');
        let dbConn = new dbClass(await dbClass.createConnection(db.options.credentials));
        const sp = await dbConn.loadProcedurePromisified(hdbext, null, 'INVENTORY_DIFF');
        const zinvDifferenceData = await dbConn.callProcedurePromisified(sp, []);
    
        const zinvResponse = zinvDifferenceData.results
            .filter(zinvInstance => {
                const inventoryDate = zinvInstance.DATE;
                return DATE === inventoryDate; 
            })
            .map(zinvInstance => {
                const matchingS4Instance = s4_inv.find(s4Instance => {
                    return (
                        s4Instance.companycode === zinvInstance.COMPANYCODE &&
                        s4Instance.Plant === zinvInstance.PLANT &&
                        s4Instance.Material === zinvInstance.MATERIAL
                    );
                });
    
                if (matchingS4Instance) {
                    zinvInstance.CURRENT_INVENTORY = matchingS4Instance.inventoryvar;
                }
    
                return zinvInstance;
            });
    
       // console.log(zinvResponse);
        return { results: zinvResponse };
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