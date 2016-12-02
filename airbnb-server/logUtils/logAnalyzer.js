/**
 * Created by jayam on 11/8/16.
 */

const readline = require('readline');
const fs = require('fs');
const fileCursor = {
  x: 0,
  y: 0
};
const pauseInterval = 500;
const logSource = '../logs/usersActivity.log';

var results = {};
results.pagesClick = {};
results.propertiesClick = {};
results.areaClick = {};
results.userTrack = {};
results.userTrackTree = {};

var mongo = require('../db/mongodb.js');
var mongoURL = "mongodb://localhost:27017/airbnb";
var isPaused = false;

function Run() {

/////////// stream ///////////
  const rl = readline.createInterface({
    input: fs.createReadStream(logSource)
  });

  console.time("fileRead");

///////// Read lines /////////

  rl.on('line',(line) => {
    rl.pause();
  console.log('# '+fileCursor.y+' '+line);
  processLine(line);
  fileCursor.y++;
});

///////// closing stream  /////////

  rl.on('close',(line) => {
    console.timeEnd("fileRead");
  console.log('file cursar at',fileCursor);
  clearInterval(intervalHandler);
  console.log('---------------------------------------------- '+
    '\n-------------------Summary--------------------'+
    '\n---------------------------------------------- ');
  updateAnalysis(results);
});

  var intervalHandler = setInterval(toggleReader,pauseInterval,rl);

  function toggleReader(rl) {
    if (isPaused) {
      rl.resume();
      isPaused = false;
      console.log('---------------------------------------------- '+
        '\n-----------------------resuming----------------------- '+isPaused+
        '\n---------------------------------------------- ');
    }
    else {
      rl.pause();
      isPaused = true;
      console.log('---------------------------------------------- '+
        '\n-----------------------pausing----------------------- '+isPaused+
        '\n---------------------------------------------- ');
    }
  }

  function processLine(line) {
    if(line){
      console.log(line);
      var lineObj = JSON.parse(line);
      if (lineObj.click) {
        recordIfPageClick(lineObj);
        recordIfPropertyClick(lineObj);
        recordIfAreaClick(lineObj);
      }
      if(lineObj.track){
        recordIfTrack(lineObj);
      }
      if(lineObj.trackTree){
        recordIfTrackTree(lineObj);
      }

    }
  }


  function recordIfPageClick(lineObj) {
    // if click for that page is not present in results add to the object
    if(results.pagesClick[lineObj.click.pageName]){
      results.pagesClick[lineObj.click.pageName] +=1;
    }
    else{
      results.pagesClick[lineObj.click.pageName] = 1;
    }
  }

  function recordIfPropertyClick(lineObj) {
    // if click for that property is not present in results add to the object
    if((lineObj.click.propertyName!== undefined)){
      if(results.propertiesClick[lineObj.click.propertyName]){
        results.propertiesClick[lineObj.click.propertyName] +=1;
      }
      else{
        results.propertiesClick[lineObj.click.propertyName] = 1;
      }
    }
  }

  function recordIfAreaClick(lineObj) {
    if(lineObj.click.area){
      if(results.areaClick[lineObj.click.area]){
        results.areaClick[lineObj.click.area] +=1;
      }
      else{
        results.areaClick[lineObj.click.area] = 1;
      }
    }
  }

  function recordIfTrack(lineObj) {
    if (results.userTrack[lineObj.track.userId]) {
      // have to add time to each page , willl write logic...
      var pageReadings = lineObj.track.track;
      var pages = Object.keys(pageReadings);
      pages.forEach(function (page) {
        //if page already present
        // console.log('making apge alreday present -- '+page);
        // console.log('current track -- '+JSON.stringify(results.userTrack[lineObj.track.userId][page]));
        if (results.userTrack[lineObj.track.userId][page]) {
          // console.log('Again -- '+JSON.stringify(results.userTrack[lineObj.track.userId][page]));
          // console.log('Line now -- '+JSON.stringify(lineObj.track.track[page]));

          results.userTrack[lineObj.track.userId][page] += lineObj.track.track[page];

        }
        else {
          // console.log('as NEW --- '+JSON.stringify(results.userTrack[lineObj.track.userId][page]));
          results.userTrack[lineObj.track.userId][page] = lineObj.track.track[page];
          // console.log('Confirming --- '+JSON.stringify(results.userTrack[lineObj.track.userId][page]));
        }
      });
    }
    else {
      // console.log('asssigning one!!!!!');
      results.userTrack[lineObj.track.userId] = lineObj.track.track;
      results.userTrack[lineObj.track.userId].area = lineObj.track.area;
    }
  }

  function recordIfTrackTree(lineObj) {
    if (results.userTrack[lineObj.trackTree.user]) {
      // have to add time to each page , willl write logic...
      // var pageReadings = lineObj.track.track;
      // var pages = Object.keys(pageReadings);
      // pages.forEach(function(page) {
      //   //if page already present
      //   // console.log('making apge alreday present -- '+page);
      //   // console.log('current track -- '+JSON.stringify(results.userTrack[lineObj.track.userId][page]));
      //   if(results.userTrack[lineObj.track.userId][page]){
      //     // console.log('Again -- '+JSON.stringify(results.userTrack[lineObj.track.userId][page]));
      //     // console.log('Line now -- '+JSON.stringify(lineObj.track.track[page]));
      //
      //     results.userTrack[lineObj.track.userId][page] += lineObj.track.track[page];
      //
      //   }
      //   else{
      //     // console.log('as NEW --- '+JSON.stringify(results.userTrack[lineObj.track.userId][page]));
      //     results.userTrack[lineObj.track.userId][page] = lineObj.track.track[page];
      //     // console.log('Confirming --- '+JSON.stringify(results.userTrack[lineObj.track.userId][page]));
      //   }
      // });
    }
    else {
      // console.log('asssigning one!!!!!');
      results.userTrackTree[lineObj.trackTree.user] = lineObj.trackTree.tree;
    }


    console.log('finished');
  }

  function updateAnalysis(results) {
    console.log('Updated Analysis.. ');
    console.log(JSON.stringify(results));

    mongo.connect(mongoURL, function () {
      var coll = mongo.collection('analysis');
      coll.remove({}, function (err, res) {
        console.log('clear to insert');
        coll.insertOne(results, function (err, res) {
          if (err) {
            console.log('An error - ', err);
          }
          else {
            console.log('Success, Analytics updated at ', new Date().toLocaleString());
          }
        });
      });
    });
  }
}


module.exports.Run = Run;