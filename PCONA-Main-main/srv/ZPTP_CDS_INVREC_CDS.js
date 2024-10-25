const cds = require('@sap/cds');

module.exports = async (srv) => 
{        
    // Using CDS API      
    const ZPTP_CDS_INVREC_CDS = await cds.connect.to("ZPTP_CDS_INVREC_CDS"); 
      srv.on('READ', 'ZPTP_CDS_INVRECSet', req => ZPTP_CDS_INVREC_CDS.run(req.query)); 
}