var LocalStrategy   = require('passport-local').Strategy;
var mq_client = require('../rpc/client');
var bcrypt =require('bcrypt-nodejs');
module.exports = function(passport) {

passport.serializeUser(function(user, done) {
	console.log("serializeUser "+JSON.stringify(user));
    done(null, user);
  });

  passport.deserializeUser(function(user, done) {
    done(null, user);
  });


  passport.use('local-login' ,new LocalStrategy(

  		{
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
   		},

   		function(req, email, password, done) {
   			console.log("Inside passport");
   			console.log("password "+password);
   			mq_client.make_request("login_queue",{"email":email},function(err,user){

   				console.log("Inside fining user");
   				if(err)
   				{
   					return done(err);
   				}

   				if(!user)
   				{
   					return done(null,false,{message:"notRegistered"})
   				}
   				if (!comparePassword(password,user.local.password))
   				{
   					return done(null, false, {message: 'IncorrectPassword'}); 
   				}
   				return done(null, user);

   			})//==== findOne email

   		}

  	));//====== local-login

}

function encrypt(string)
{
 return bcrypt.hashSync(string,bcrypt.genSaltSync(10));
}

function comparePassword(string ,dbstring)
{
  return( bcrypt.compareSync(string,dbstring));
}
