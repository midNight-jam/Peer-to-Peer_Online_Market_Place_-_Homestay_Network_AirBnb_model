
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt   = require('bcrypt-nodejs');

var userProfileSchema = mongoose.Schema({
 
 firstname :String,
 lastname :String,
 userId:String,
 admin:Boolean,
 email:String,
 workEmail:String,
 host:Boolean,
 gender:String,
 phoneNumber:String,
 preferLang: String,
 preferCurr: String,
 streetAddress: String,
 city: String,
 state: String,
 country: String,
 zipcode: String,
 birthday:String,
 aboutMe:String,
 myListing:[],
 profileImages:String,
 created_at: Date,
 updated_at: Date,
    profileVideo:String,
 reviewByMe:[],
 reviewForMe:[],
 paymentMethod:[]
});



// create the model for users and expose it to our app
module.exports = mongoose.model('UserProfile', userProfileSchema);

