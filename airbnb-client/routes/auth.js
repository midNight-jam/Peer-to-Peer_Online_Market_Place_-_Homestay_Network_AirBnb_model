var passport =require('passport');
var mq_client = require('../rpc/client');

function signin(req,res ,next)
{
	
	passport.authenticate('local-login', function(err, user, info) {
    console.log(" I am  in login authenticate");
    if(err) 
    {
    	console.log("prinitng err EROR ERROR ERROR ERROR",err);
    	if(err=="Timeout")
    	{
    			return res.send(err);
    	}
      return next(err);
    }

    console.log("prinitng the info message",info);
   	if(!user && info.message=="notRegistered") 
   	{
    	
      console.log("user not found  notRegistered");
      return res.send({"msg":"404"});
    }
    if(!user && info.message=="IncorrectPassword") {
    	
      console.log("user not found IncorrectPassword");
      return res.send({"msg":"IncorrectPassword"});
    }

    console.log("==============USER=============="+JSON.stringify(user));
    req.logIn(user.local.email,function(err) 
    {
    	
      if(err) 
      {
        return next(err);
      }
      console.log(user);
    
      console.log("session initilized")
      //console.log(user.local.email);

        if(user.local.admin)
        {
            console.log("Admin Found");
            res.redirect("adminPage");
        }
        else {
            return res.send({
                "msg": "success"
            });
        }
    })
  })(req, res, next);
	
}


function signup(req,res )
{
	
      mq_client.make_request("signup_queue",req.body,function(err ,result){		
			if(err)
			{
				throw err;
			}
			else 
			{
			    console.log("result of signup",result);
			    if(result.msg=="UserExist")
                {

                    return res.send({"msg":"UserExist"});
                }
                else {

                    req.logIn(result.email,function(err)
                    {

                        if(err)
                        {
                            throw err;
                        }

                        console.log("creating session");
                        return res.send({"msg":"success"});
                    }) //close reglogIn after registering session


                }
			}

		})
    
}

function isLoggedIn(req,res)
{

  if(req.isAuthenticated())
  {
      mq_client.make_request("isLoggedIn_queue",{"user":req.user},function(err ,result){
          if(err)
          {
              throw err;
          }
          else
          {
                  console.log("getting userdata",result);
                  return  res.send({"user":result});
          }
      })
  }

}


function logout(req,res)
{

  req.session.destroy();
  res.send("success");
}

exports.logout=logout;
exports.isLoggedIn=isLoggedIn;
exports.signup=signup;
exports.signin = signin;