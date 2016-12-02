/**
 * Created by jayam on 11/8/16.
 */
var winston = require('winston');
winston.log('info','winston up!');

var logger = new(winston.Logger)({
  transports:[
    new (winston.transports.File)({filename:'./logs/usersActivity.log'})
  ]
});

module.exports=logger;