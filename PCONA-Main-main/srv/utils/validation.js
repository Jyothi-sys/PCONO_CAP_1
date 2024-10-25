const errmsg = require("./response-message.json");
module.exports = { 
    getErrorMessage : function(code)
    {
        return errmsg.Errors[code];
    }
}