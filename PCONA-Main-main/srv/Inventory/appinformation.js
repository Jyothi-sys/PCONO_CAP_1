const axios = require('axios');


module.exports = {

    // oauthforappinfo: async function (companycode) {

    //     const CPI_DEST = await cds.connect.to('CPI_Provider');
    //     try {
    //         const headers = { 'Content-Type': 'application/json', 'Accept': 'application/json' };
    //         var path = `/CAPM`;
    //         var data = { CLIENT_CODE: companycode };
    //         console.log(data);
    //         var result = await CPI_DEST.send({ method: 'POST', path: path, headers, data });
    //         console.log(`Result: ${result}`);
    //         return result;
    //     }
    //     catch (error) {
    //         var { error_code, msg_text } = validation.getErrorMessage("451");
    //         return { status: error_code, message: msg_text };

    //     }
    // }
}