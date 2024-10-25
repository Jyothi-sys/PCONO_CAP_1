sap.ui.define(
    [
        "sap/ui/core/format/DateFormat"
    ],
    function(DateFormat) {
      "use strict";
  
      return{
        formatTime: function(time){
           if(time){
           var oTime =  new Date(time.ms).toISOString().slice(11, 19);
           return oTime;
           }
       
        },
        formatDate: function(date){
          if(date){
            return date.toLocaleDateString() + ' ' + date.toString().substr(16,8)
              // var oDate = new Date(date);
              // var oDateFormat = DateFormat.getDateTimeInstance({
              //    // pattern : "YYYY-MM-dd"
              //    pattern: "YYYY-MM-dd hh:mm:ss a" ,UTC:false

              // });
              // var sdateFormat = oDateFormat.format(oDate);
              // return sdateFormat;
          }
        }
       
      };
    }
  );
  