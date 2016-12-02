/**
 * Created by jayam on 11/8/16.
 */
var mq_client = require('../rpc/client');

module.exports.record = function (req,res) {
  console.log("body " +JSON.stringify(req.body));
  console.log("body " +req.body.userId);
  console.log("body " +req.body.pageId);
  console.log("body " +req.body.clickLocalTime);
  // console.log("pasresrd "+req.body.b);

  var message = {click:req.body}; //                                    <---- HERE

  var msg_payload = {
    payload: message,
    target: 'recordActivity'
  };
  mq_client.make_request('activity_queue', msg_payload, function (err, results) {
    console.log('Client received results ' + JSON.stringify(results));
    if (err) {
      res.send({"err": err});
    }
    res.send({"res": results});
  });
}

module.exports.track = function (req,res) {
  console.log("body " +JSON.stringify(req.body));

  var message = {track:req.body};
  var msg_payload = {
    payload: message,
    target: 'recordActivity'
  };
  mq_client.make_request('track_queue', msg_payload, function (err, results) {
    console.log('Client received results ' + JSON.stringify(results));
    if (err) {
      res.send({"err": err});
    }
    res.send({"res": results});
  });
}

module.exports.trackTree = function (req,res) {

  console.log("body at trackTree " +JSON.stringify(req.body));
  // console.log("body " +req.body.userId);
  // console.log("body " +req.body.pageId);
  // console.log("body " +req.body.clickLocalTime);
  // console.log("pasresrd "+req.body.b);

  var message = {trackTree:req.body};                                               //  <---- HERE trackTree

  var msg_payload = {
    payload: message
  };

  mq_client.make_request('track_tree_queue', msg_payload, function (err, results) {
    console.log('Client received results ' + JSON.stringify(results));
    if (err) {
      res.send({"err": err});
    }
    res.send({"res": results});
  });
}