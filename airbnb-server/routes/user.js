var User = require('../models/user');
var UserProfile = require('../models/userProfile');
var date = require('../models/date');
var ssn = require('ssn');

console.log("I am in the user");

function signin(req ,callback)
{
	console.log("Checking the user ",req);

User.findOne({"local.email":req.email},function(err,user){
        	if(err){
        		return callback(err);
        	}else{	
        		console.log(user);
        		if(user)
        		{
        			//lastloggedin(req.email);
        		}
        		return callback(null ,user);
        	}	
        });		
	
}

function signup(req ,callback)
{

    console.log("I came till here in signup");
	User.findOne({
          "local.email":req.email 
        },function(err,user){

        	if(err)
        	{
        		return callback(err);
        	}

        	 if(user)
        	{	
        		return callback(null ,{"msg":"UserExist"});
        	}

        	else
        	{
        		var newUser  = new User();
        		var newUserProfile  = new UserProfile();
			    // set the user's local credentials
			    newUser.local.email    = req.email;
			    newUser.local.password = newUser.encrypt(req.password);

			    newUser.save(function(err) {
			                    if (err)
			                        throw err;
                    //return done(null, newUser);

                });

                newUserProfile.email =req.email;
                newUserProfile.userId =ssn.generate();
                newUserProfile.firstname=req.firstname;
                newUserProfile.lastname=req.lastname;
                newUserProfile.created_at=date.getDate();
                newUserProfile.myListing =[];
                newUserProfile.host=false;
                //newUserProfile.birthday =date.getBirthDay(req.day,req.month,req.year);

                newUserProfile.save(function(err) {
			                    if (err)
			                        throw err;
                    //return done(null, newUser);
                    return callback(null ,{"email":newUserProfile.email});

                });
        	}	

        })		
	
}

function uploadProfileImage(req, callback)
{

    console.log("uploading Profile Image");
    UserProfile.update({"email":req.user},{profileImages:req.imageLink},function(err,result){

        if(err)
        {
            throw err;
        }
        else
        {
            return callback(null,{"msg":"uploaded"});	}


    });

}

function uploadProfileVideo(req, callback)
{

    console.log("uploading Profile Image");
    UserProfile.update({"email":req.user},{profileVideo:req.videoLink},function(err,result){

        if(err)
        {
            throw err;
        }
        else
        {
            return callback(null,{"msg":"uploaded"});	}


    });

}

function userHome(req, callback)
{

    console.log("I am in the userHome");

    UserProfile.findOne({"email":req.user},function(err,result){


        if(err)
        {
            throw err;
        }
        else
        {
        	console.log("I am getting the result");
            return callback(null,{"firstname":result.firstname,"profilePic":result.profileImages});	}


    });

}

function isLoggedIn(req, callback)
{

    console.log("I am in the userHome");

    UserProfile.findOne({"email":req.user},function(err,result){


        if(err)
        {
            throw err;
        }
        else
        {
            console.log("I am getting the result");
            return callback(null,{"firstname":result.firstname,"host":result.host,"email":result.email,"profilePic":result.profileImages,"profileVideo":result.profileVideo});	}


    });

}

function getProfile(req, callback)
{
    console.log("I am in the getProfile "+req.username);
    UserProfile.findOne({"email":req.username},function(err,result){
        if(err)
        {
            throw err;
        }
        else
        {
        	console.log("I am getting the result "+result);
        	if(result){
	            callback(null,{'code':'200', 'value': result});
        	}
        }
    });
}

function editProfile(req, callback)
{
    console.log("I am in the editProfile" + req.userData.email);
    UserProfile.update({"email": req.userData.email},{$set: { firstname: req.userData.firstName, lastname: req.userData.lastName, gender: req.userData.gender, birthday: req.userData.dob, email: req.userData.email, phoneNumber: req.userData.pNumber, preferLang: req.userData.language, preferCurr: req.userData.currency, streetAddress: req.userData.stAddress, city: req.userData.city, state: req.userData.state, country: req.userData.country, zipcode: req.userData.zipCode, aboutMe: req.userData.aboutme, workEmail: req.userData.workEmail }}, function(err, result){
    	if(err){
    		throw err;
    	}else{
    		callback(null, {'code':'200'});
    	}
    });
}

function paymentDetails(req, callback)
{
	//{'paymentMethod': {$elemMatch:{'cardNumber': req.userData.cardNumber }}}
	console.log("I am in the edit payment" + req.userData.cardNumber);
    UserProfile.where({'paymentMethod': {$elemMatch:{'cardNumber': req.userData.cardNumber }}}).where({'email': req.email}).exec(function(err, results){
    	if(err){
    		throw err;
    	}else{
    		console.log("Inside Card found" + results);
    		if(results != ''){
    			callback(null, {'code':'201'});
    		}else{
    			console.log("Inside Card not found" + results);
	    		UserProfile.update({"email": req.email},{$push: {"paymentMethod": req.userData}}).exec(function(err, result){
	    	    	if(err){
	    	    		throw err;
	    	    	}else{
	    	    		if(result != ''){
	    	    			console.log(result);
	    	    			callback(null, {'code':'200'});
	    	    		}else{
	    	    			callback(null, {'code':'400'});
	    	    		}
	    	    	}
	    	    });
    		}
    	}
    });
}

function getPaymentDetails(req, callback){
	console.log("I am in the get payment details" + req.email);
	UserProfile.where({'email': req.email}).select('paymentMethod').exec(function(err, result){
		if(err){
			throw err;
		}else{
			console.log(result);
			if(result.length>0){
				callback(null, {'code':'200', 'value': result});
			}else{
				callback(null, {'code':'400'});
			}
		}
	});
}

exports.userHome=userHome;
exports.uploadProfileVideo=uploadProfileVideo;
exports.isLoggedIn=isLoggedIn;
exports.uploadProfileImage=uploadProfileImage;
exports.signin=signin;
exports.signup=signup;
exports.getProfile = getProfile;
exports.editProfile = editProfile;
exports.paymentDetails = paymentDetails;
exports.getPaymentDetails=getPaymentDetails;