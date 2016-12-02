function getDate()
  {

  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth()+1; //January is 0!
  var yyyy = today.getFullYear();

  if(dd<10) {
  dd='0'+dd
  } 

  if(mm<10) {
  mm='0'+mm
  } 

  today = mm+'/'+dd+'/'+yyyy;
  return today;
  }


function getBirthDay(day,month,year)
  {

  
  var dd = day;
  var mm = month.getMonth()+1; //January is 0!
  var yyyy = year.getFullYear();

  if(dd<10) {
  dd='0'+dd
  } 

  if(mm<10) {
  mm='0'+mm
  } 

  today = mm+'/'+dd+'/'+yyyy;
  return today;
  }


function getCurrentTime()
  {
   var d = new Date(); // for now
   var h=d.getHours(); // => 9
   var m =d.getMinutes(); // =>  30
   var s =d.getSeconds();

  if(h<10)
  {
    h='0'+h;
  }
  if(m<10)
  {
    m='0'+m;
  }
  if(s<10)
  {
    s='0'+s;
  }

  var time = h+":"+m+":"+s;
  return time;
  }

  exports.getBirthDay=getBirthDay;
  exports.getCurrentTime=getCurrentTime;
  exports.getDate=getDate;