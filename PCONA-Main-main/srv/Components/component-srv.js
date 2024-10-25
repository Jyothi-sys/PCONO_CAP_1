const cds = require('@sap/cds');
const dbClass = require("sap-hdbext-promisfied");
const hdbext = require("@sap/hdbext");

module.exports = cds.service.impl(function () {

    this.before('CREATE','jda_ship_plan', async(req)=>{

        var count_seq = await SELECT.from`btp_panasonic.jda_ship_plan`;
        console.log(count_seq);
        req.data.counter = count_seq.length + 1;
    });
});
