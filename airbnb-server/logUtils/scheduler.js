/**
 * Created by jayam on 11/29/16.
 */
var  cron  = require('node-cron');
var analyzer = require('./logAnalyzer');

cron.schedule('*/30 * * * * *',function () {
  console.log('=================Running '+ new Date().toLocaleString() +'=================');
  analyzer.Run();
});