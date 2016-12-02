var mysql = require('../db/mysql.js');
var UserProfile = require('../models/userProfile');


function getCardDetails(msg, callback) {

    var res = {};

    console.log("in get card details function");
    console.log("hostemail  in Handle Req:" + msg.userEmail);


    UserProfile.findOne({"email":msg.userEmail},{"paymentMethod":1,"_id":0},function(err,result){


        if(err)
        {
            throw err;
        }
       else if(result)
        {
            console.log("Fetched card details");
            res.statusCode = "200";
            res.cardDetails = result;
            console.log(res);
            callback(null, res);
        }



    });


}


function makePayment(msg, callback) {

    var res = {};

    console.log("making payment");
    console.log("hostemail  in Handle Req:" + msg.userEmail);
    console.log("cardNumber:"+msg.cardNumber);
    console.log("tripId:"+msg.tripId);

    var inputCard = "UPDATE trips SET ? where tripId = ?  ";

    var cardDetails = {

        "cardNumber": msg.cardNumber,
        "paymentStatus":"paid"

    };

    mysql.putData(function(err,results){


        if(err){
            console.log("Error in Trips MySQL:"+err);

            //throw err;
        }

        else
        {
            if(results!== undefined){

                console.log("Payment Done");
                res.statusCode = "200";
                callback(null, res);

            }
            else

            {

                console.log("Payment cannot be made");
                res.statusCode="401";
                callback(null, res);

            }
        }
    },inputCard,[cardDetails,msg.tripId])



}



exports.getCardDetails=getCardDetails;
exports.makePayment=makePayment;
