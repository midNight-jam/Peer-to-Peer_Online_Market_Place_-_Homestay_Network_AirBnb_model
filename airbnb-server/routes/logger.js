/**
 * Created by jayam on 11/17/16.
 */

var logger =require('../logUtils/logger');

function recordActivity(message ,callback)
{
  console.log("body recordActivity" +JSON.stringify(message));
  try{
    logger.info(message.payload);
    return callback(null,{"status":"OK"});
  }
  catch (e){
    console.log(e);
    return callback(e,null);
  }
}

function userTrackTree(message ,callback)
{
  console.log("body recordActivity" +JSON.stringify(message));
  try{
    logger.info(message.payload);
    return callback(null,{"status":"OK"});
  }
  catch (e){
    console.log(e);
    return callback(e,null);
  }
}

exports.recordActivity=recordActivity;
exports.userTrackTree=userTrackTree;