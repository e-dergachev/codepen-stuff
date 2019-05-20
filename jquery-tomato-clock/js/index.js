$(document).ready(function() {

  var sessionLen = 25, breakLen = 5;
  var session = [sessionLen, 0, "Session"];
  var checked = 1;
  var timerID;
  var bell = new Audio('https://www.myinstants.com/media/sounds/school-bell-ringing-sound-effect.mp3');
  
  //The progress bar plug-in stuff.
  function setPie(t) {
    $('.pie_progress--slow').asPieProgress({
      namespace: 'pie_progress',
      goal: 1000,
      min: 0,
      max: 1000,
      speed: t * 600,
      easing: 'linear'
    });
  }
  
  function destroyPie() {
    $('.pie_progress').asPieProgress('reset')
    .asPieProgress('destroy')
    .empty()
    .html("<div class=\"v-centered\"><p id=\"clock\"></p><p id=\"session\"></p></div>");
    $("#clock").html(session[0] + ":00");
    $("#session").html(session[2]);
  }
  
  function timer() {
    timerID = setInterval(function() {
      if (session[1] === 0) {
        session[0] -= 1;
        session[1] = 59;
      }
      else {
        session[1] -= 1;      
      }
      var tm = session[0] + ":" + session[1];
      if (session[1] < 10) {
        tm = session[0] + ":0" + session[1];
      }
      if (session[0] === 0 && session[1] === 0) {
        if (session[2] === "Session") {
          bell.play();
          session = [breakLen, 0, "Break"];
          $("#clock").html(breakLen + ":00");
          $("#session").html(session[2]);
          destroyPie();
          setPie(session[0]);
          $('.pie_progress').asPieProgress('start');
        }
        else {
          bell.play();
          session = [sessionLen, 0, "Session"];
          $("#clock").html(sessionLen + ":00");
          $("#session").html(session[2]);
          destroyPie();
          setPie(session[0]);
          $('.pie_progress').asPieProgress('start');
        }
      }
      else {
        $("#clock").html(tm);
      }
    }, 1000); 
  }
  
  function resetSession() {
    session = [sessionLen, 0, "Session"];
    checked = 1;
    clearInterval(timerID);
    $("#clock").html(session[0] + ":00");
    $("#session").html(session[2]);
    destroyPie();
    setPie(session[0]);
  }
  
  function resetBreak() {
    session = [breakLen, 0, "Break"];
    checked = 1;
    clearInterval(timerID);
    $("#clock").html(session[0] + ":00");
    $("#session").html(session[2]);
    destroyPie();
    setPie(session[0]);
  }
  
  $("#break-len").html(" " + breakLen);
  $("#session-len").html(sessionLen);
  $("#clock").html(sessionLen + ":00");
  $("#session").html(session[2]);
  setPie(session[0]);
  
  $(".time-box").click(function(){
    if (checked === 0) {
      clearInterval(timerID);
      checked = 1;
      $('.pie_progress').asPieProgress('stop');
    }
    else {
      $('.pie_progress').asPieProgress('start');
      timer();
      checked = 0;
    }
  });
  
  $("#reset").click(resetSession);
  
  $("#break-minus").click(function(){
    if (breakLen > 1) {
      breakLen -= 1;
      if (breakLen > 9) {
        $("#break-len").html(breakLen);
      }
      else {
        $("#break-len").html(" " + breakLen);
      }
      if (session[2] === "Break") {
        resetBreak();
      }
    }    
  });
  
  $("#break-plus").click(function(){ //to add reset stuff
    if (breakLen < 90) {
      breakLen += 1;      
      if (breakLen > 9) {
        $("#break-len").html(breakLen);
      }
      else {
        $("#break-len").html(" " + breakLen);
      }
      if (session[2] === "Break") {
        resetBreak();
      }
    }
  });
  
  $("#session-minus").click(function(){
    if (sessionLen > 1) {
      sessionLen -= 1;  
      if (sessionLen > 9) {
        $("#session-len").html(sessionLen);
      }
      else {
        $("#session-len").html(" " + sessionLen);
      }
      if (session[2] === "Session") {
        resetSession();        
      }
    }    
  });
  
  $("#session-plus").click(function(){
    if (sessionLen < 90) {
      sessionLen += 1;
      if (sessionLen > 9) {
        $("#session-len").html(sessionLen);
      }
      else {
        $("#session-len").html(" " + sessionLen);
      }
      if (session[2] === "Session") {
        resetSession();        
      }
    }    
   });
  
});