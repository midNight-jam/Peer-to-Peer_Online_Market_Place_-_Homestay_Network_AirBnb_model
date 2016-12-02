
var mongoose = require('mongoose');

var listingSchema = mongoose.Schema({
 
 listId:{type:String,unique:true},
 hostId:{type:String},
 latitude: {type:String},
 longitude: {type:String},
 address : {type:Array},
 city: {type:String},
 basicAmneties : {type: Array},
 safetyAmneties : {type: Array},
 fromDate: {type:Date},
 toDate: {type:Date},
    status:{type:String},
 description: {type:String},
 title: {type:String},
 auctionPrice: {type:Number},
 fixedPrice: {type:Number},
    dynamicPrice:{type:Boolean},
 roomType: {type:String},
 facilities: {type:Array},
 bathCount: {type:Number},
 listingImages: {type:Array},
 guestAllowed: {type:Number},
   hostProfilePic:{type:String},
    hostName:{type:String},
 created_at: {type: Date, default: Date.now},
 updated_at: {type: Date},
 review: [],
    overAllRating:{type:Number}
});

// create the model for users and expose it to our app
module.exports = mongoose.model('Listing', listingSchema);

