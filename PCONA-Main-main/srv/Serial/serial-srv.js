const cds = require('@sap/cds');
const dbClass = require("sap-hdbext-promisfied");
const hdbext = require("@sap/hdbext");
// const appinformation = require('./appinformation');

module.exports = cds.service.impl(function () {

    this.on('serial_delete', async (req) => {

        function convertDateFormat(inputDate) {
            // Parse the input date string and extract year, month, and day
            const year = inputDate.substring(0, 4);
            const month = inputDate.substring(5, 7);
            const day = inputDate.substring(8, 10);

            // Create a new Date object
            const dateObject = new Date(year, month - 1, day);
            return dateObject;
        }

        var serial_data = await SELECT.from(`btp_panasonic.serial_tracking`);
        for (each of serial_data) {
            const formattedDate = convertDateFormat(each.timestamp);
            const date = (new Date(formattedDate) - new Date(new Date().toISOString().split("T")[0]));
            const date1 = date / (1000 * 60 * 60 * 24);
            const day = Math.abs(date1);
            if (day >= 8) {
                await DELETE.from`btp_panasonic.serial_tracking`.where`timestamp=${each.timestamp}`;
            }
        } 
    });

    this.on('serial_delete_param', async (req) => {

        function convertDateFormat(inputDate) {
            // Parse the input date string and extract year, month, and day
            const year = inputDate.substring(0, 4);
            const month = inputDate.substring(5, 7);
            const day = inputDate.substring(8, 10);
    
            // Create a new Date object
            const dateObject = new Date(year, month - 1, day);
            return dateObject;
        }
    
        // Get the user-input day value from req
        const { daysToRetain } = req.data;
    
        var serial_data = await SELECT.from(`btp_panasonic.serial_tracking`);
        for (each of serial_data) {
            const formattedDate = convertDateFormat(each.timestamp);
            const date = (new Date(formattedDate) - new Date(new Date().toISOString().split("T")[0]));
            const date1 = date / (1000 * 60 * 60 * 24);
            const day = Math.abs(date1);
            if (day >= daysToRetain) {
                await DELETE.from`btp_panasonic.serial_tracking`.where`timestamp=${each.timestamp}`;
            }
        } 
    });
    

    this.on('drop_shipment',async(req) => {

        const { sales_order,material } = req.data;
        const drop_ship = await SELECT.from`btp_panasonic.serial_tracking`.where`sales_order=${sales_order} and material=${material}`;
        return drop_ship;
    });

    this.on('stock_shipment',async(req) => {

        const { delivery_number,delivery_line_item } = req.data;
        const stock_ship = await SELECT.from`btp_panasonic.serial_tracking`.where`delivery_number=${delivery_number} and delivery_line_item=${delivery_line_item}`;
        return stock_ship;
    });

});