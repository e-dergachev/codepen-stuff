$(document).ready(function() {
  var input = "0";
  var currentInput = "0";
  var sw = 0;
  
  function parseInput(inp) {
    inp = inp.split(" ");
    var acc = parseFloat(inp[0]);
    for (var i = 1; i < inp.length; i++) {
      if (inp[i] === "+") {
          acc += parseFloat(inp[i+1]);
      }
      if (inp[i] === "-") {
          acc -= parseFloat(inp[i+1]);
      }
      if (inp[i] === "*") {
          acc *= parseFloat(inp[i+1]);
      }
      if (inp[i] === "/") {
          acc /= parseFloat(inp[i+1]);
      }      
    }
    var result;
    if (acc == "Infinity") {
      result = acc;
    }
    else if (acc >= 10e+100) {
      result = "Overflow";
    }
    else if (acc > 999999999999) {
      result = acc.toPrecision(7);
    }
    else if (acc > 99999999999) {
      result = parseFloat(acc.toFixed(0));
    }
    else if (acc > 1) {
      result = parseFloat(acc.toPrecision(11));
    }
    else if (acc > 0.1) {
      result = parseFloat(acc.toPrecision(10));             
    }
    else if (acc > 0.01) {
      result = parseFloat(acc.toPrecision(9));             
    }
    else if (acc > 0.001) {
      result = parseFloat(acc.toPrecision(8));             
    }
    else if (acc > 0.0001) {
      result = parseFloat(acc.toPrecision(7));             
    }
    else if (acc > 0.00001) {
      result = parseFloat(acc.toPrecision(6));             
    }
    else if (acc > 0.000001) {
      result = parseFloat(acc.toPrecision(5));             
    }    
    else if (acc >= 0.0000001) {
      result = parseFloat(acc.toPrecision(4));
    }
    else if (acc > 10e-100) {
      result = acc.toPrecision(7);             
    }
    else if (acc > 0) {
      result = 0;
    }
    else if (acc <= -10e+100) {
      result = "Overflow";
    }
    else if (acc < -99999999999) {
      result = acc.toPrecision(6);             
    }   
    else if (acc < -9999999999) {
      result = parseFloat(acc.toFixed(0));
    }
    else if (acc < -1) {
      result = parseFloat(acc.toPrecision(10));
    }
    else if (acc < -0.1) {
      result = parseFloat(acc.toPrecision(9));
    }
    else if (acc < -0.01) {
      result = parseFloat(acc.toPrecision(8));
    }    
    else if (acc < -0.001) {
      result = parseFloat(acc.toPrecision(7));
    }
    else if (acc < -0.0001) {
      result = parseFloat(acc.toPrecision(6));
    }
    else if (acc < -0.00001) {
      result = parseFloat(acc.toPrecision(5));
    }    
    else if (acc < -0.000001) {
      result = parseFloat(acc.toPrecision(4));
    }
    else if (acc < -10e-10) {
      result = acc.toPrecision(7);             
    }    
    else if (acc < -10e-100) {
      result = acc.toPrecision(6);             
    }
    else if (acc !== acc) {
      result = acc;
    }
    else {
      result = 0;
    }
    return result;
  }
  
  function trunkInput(inp) {
    var n = 26;
    if (arguments[1] !== undefined) {
      n = 27;
    }
    if (inp.length > n) {
        return "«" + inp.substr(inp.length-n+1, inp.length);
    }
    return inp;
  }
  
  $("#n1").click(function() {
    if (currentInput.length < 12) {
      if (input !== "0" && input.match(/ 0$/) === null && sw !== 1) {
        input += 1;
        currentInput += 1;
      }
      else if (sw !== 1) {
        input = input.substring(0, input.length-1) + 1;
        currentInput = currentInput.substring(0, currentInput.length-1) + 1;
      }
      else {
        input = "1";
        currentInput = "1";
        sw = 0;
      }       
      $("#box").html(trunkInput(input));
      $("#box-big").html(currentInput);
    }
  });
  $("#n2").click(function() {
    if (currentInput.length < 12) {
      if (input !== "0" && input.match(/ 0$/) === null && sw !== 1) {
        input += 2;
        currentInput += 2;
      }
      else if (sw !== 1) {
        input = input.substring(0, input.length-1) + 2;
        currentInput = currentInput.substring(0, currentInput.length-1) + 2;
      }
      else {
        input = "2";
        currentInput = "2";
        sw = 0;
      }       
      $("#box").html(trunkInput(input));
      $("#box-big").html(currentInput);
    }
  });
  $("#n3").click(function() {
    if (currentInput.length < 12) {
      if (input !== "0" && input.match(/ 0$/) === null && sw !== 1) {
        input += 3;
        currentInput += 3;
      }
      else if (sw !== 1) {
        input = input.substring(0, input.length-1) + 3;
        currentInput = currentInput.substring(0, currentInput.length-1) + 3;      
      }
      else {
        input = "3";
        currentInput = "3";
        sw = 0;
      }       
      $("#box").html(trunkInput(input));
      $("#box-big").html(currentInput);
    }
  });
  $("#n4").click(function() {
    if (currentInput.length < 12) {
      if (input !== "0" && input.match(/ 0$/) === null && sw !== 1) {
        input += 4;
        currentInput += 4;
      }
      else if (sw !== 1) {
        input = input.substring(0, input.length-1) + 4;
        currentInput = currentInput.substring(0, currentInput.length-1) + 4;      
      }
      else {
        input = "4";
        currentInput = "4";
        sw = 0;
      }       
      $("#box").html(trunkInput(input));
      $("#box-big").html(currentInput); 
    }   
  });
  $("#n5").click(function() {
    if (currentInput.length < 12) {    
      if (input !== "0" && input.match(/ 0$/) === null && sw !== 1) {
        input += 5;
        currentInput += 5;
      }
      else if (sw !== 1) {
        input = input.substring(0, input.length-1) + 5;
        currentInput = currentInput.substring(0, currentInput.length-1) + 5;         
      }
      else {
        input = "5";
        currentInput = "5";
        sw = 0;
      }       
      $("#box").html(trunkInput(input));
      $("#box-big").html(currentInput);
    }
  });
  $("#n6").click(function() {
    if (currentInput.length < 12) {    
      if (input !== "0" && input.match(/ 0$/) === null && sw !== 1) {
        input += 6;
        currentInput += 6;
      }
      else if (sw !== 1) {
        input = input.substring(0, input.length-1) + 6;
        currentInput = currentInput.substring(0, currentInput.length-1) + 6;         
      }
      else {
        input = "6";
        currentInput = "6";
        sw = 0;
      }       
      $("#box").html(trunkInput(input));
      $("#box-big").html(currentInput);
    }
  });
  $("#n7").click(function() {
    if (currentInput.length < 12) {    
      if (input !== "0" && input.match(/ 0$/) === null && sw !== 1) {
        input += 7;
        currentInput += 7;      
      }
      else if (sw !== 1) {
        input = input.substring(0, input.length-1) + 7;
        currentInput = currentInput.substring(0, currentInput.length-1) + 7;      
      }
      else {
        input = "7";
        currentInput = "7";
        sw = 0;
      }       
      $("#box").html(trunkInput(input));
      $("#box-big").html(currentInput);
    }
  });
  $("#n8").click(function() {
    if (currentInput.length < 12) {    
      if (input !== "0" && input.match(/ 0$/) === null && sw !== 1) {
        input += 8;
        currentInput += 8;
      }
      else if (sw !== 1) {
        input = input.substring(0, input.length-1) + 8;
        currentInput = currentInput.substring(0, currentInput.length-1) + 8;      
      }
      else {
        input = "8";
        currentInput = "8";
        sw = 0;
      }       
      $("#box").html(trunkInput(input));
      $("#box-big").html(currentInput);
    }
  });
  $("#n9").click(function() {
    if (currentInput.length < 12) {    
      if (input !== "0" && input.match(/ 0$/) === null && sw !== 1) {
        input += 9;
        currentInput += 9;
      }
      else if (sw !== 1) {
        input = input.substring(0, input.length-1) + 9;
        currentInput = currentInput.substring(0, currentInput.length-1) + 9      
      }
      else {
        input = "9";
        currentInput = "9";
        sw = 0;
      }    
      $("#box").html(trunkInput(input));
      $("#box-big").html(currentInput);
    }
  });
  $("#zero").click(function() {
    if (currentInput.length < 12) {    
      if (input !== "0" && input.match(/ 0$/) === null && sw !== 1) {
        input += 0;
        currentInput += 0;
      }
      else if (sw === 1) {
        input = "0";
        currentInput = "0";
        sw = 0;
      }
      $("#box").html(trunkInput(input));
      $("#box-big").html(currentInput); 
    }
  });  
  $("#clear").click(function() {
    sw = 0;
    $("#box").html("0");
    $("#box-big").html("0");
    input = "0";
    currentInput = "0";
  });
  $("#clear-entry").click(function() {
    sw = 0;
    if (input.match(/ /) !== null) {
      input = input.substr(0, input.match(/ [\+\*\-\/] \d*\.*\d*$/).index);
      if (input.match(/ /) !== null) {
        currentInput = input.substr(input.match(/ \d*\.*\d*$/).index + 1, input.length)    
      }
      else {
        currentInput = input;   
      }      
      $("#box").html(trunkInput(input));
      $("#box-big").html(currentInput);     
    }
    else {
      $("#box").html("0");
      $("#box-big").html("0");
      input = "0";
      currentInput = "0";        
    }
  });  
  $("#add").click(function() {
    sw = 0;
    if (input == "Infinity" || input === "Overflow" || input === "Undefined") {
      $("#box").html("0");
      $("#box-big").html("0");
      input = "0";
      currentInput = "0";      
    }
    else {
      if (input.match(/\d+\.\d*0$/) !== null) { //rounding stuff
        input = input.substr(0, input.match(/\d+\.\d*0$/).index) + parseFloat(input.match(/\d+\.\d*0$/)[0]);
      }
      else if (input[input.length - 1] === ".") {
        input = input.substr(0, input.length - 1);
        currentInput = currentInput.substr(0, currentInput.length - 1);
        $("#box-big").html(currentInput);
      }
      currentInput = "";
      if (input[input.length - 1].match(/[0-9]/) !== null) {
        input += " + ";
        $("#box").html(trunkInput(input, 27));
      }
    }
  });
  $("#subtract").click(function() {
    sw = 0;
    if (input == "Infinity" || input === "Overflow" || input === "Undefined") {
      $("#box").html("0");
      $("#box-big").html("0");
      input = "0";
      currentInput = "0";      
    }
    else {
      if (input.match(/\d+\.\d*0$/) !== null) { //rounding stuff
        input = input.substr(0, input.match(/\d+\.\d*0$/).index) + parseFloat(input.match(/\d+\.\d*0$/)[0]);
      }
      else if (input[input.length - 1] === ".") {
        input = input.substr(0, input.length - 1);
        currentInput = currentInput.substr(0, currentInput.length - 1);
        $("#box-big").html(currentInput);
      }
      currentInput = "";    
      if (input[input.length - 1].match(/[0-9]/) !== null) {
        input += " - ";
        $("#box").html(trunkInput(input, 27));
      }
    }
  });
  $("#divide").click(function() {
    sw = 0;
    if (input == "Infinity" || input === "Overflow" || input === "Undefined") {
      $("#box").html("0");
      $("#box-big").html("0");
      input = "0";
      currentInput = "0";      
    }
    else {    
      if (input.match(/\d+\.\d*0$/) !== null) { //rounding stuff
        input = input.substr(0, input.match(/\d+\.\d*0$/).index) + parseFloat(input.match(/\d+\.\d*0$/)[0]);
      }
      else if (input[input.length - 1] === ".") {
        input = input.substr(0, input.length - 1);
        currentInput = currentInput.substr(0, currentInput.length - 1);
        $("#box-big").html(currentInput);
      }
      currentInput = "";    
      if (input[input.length - 1].match(/[0-9]/) !== null) {
        input += " / ";
        $("#box").html(trunkInput(input, 27));
      }
    }
  });
  $("#multiply").click(function() {
    sw = 0;
    if (input == "Infinity" || input === "Overflow" || input === "Undefined") {
      $("#box").html("0");
      $("#box-big").html("0");
      input = "0";
      currentInput = "0";      
    }
    else {    
      if (input.match(/\d+\.\d*0$/) !== null) { //rounding stuff
        input = input.substr(0, input.match(/\d+\.\d*0$/).index) + parseFloat(input.match(/\d+\.\d*0$/)[0]);
      }
      else if (input[input.length - 1] === ".") {
        input = input.substr(0, input.length - 1);
        currentInput = currentInput.substr(0, currentInput.length - 1);
        $("#box-big").html(currentInput);
      }
      currentInput = "";    
      if (input[input.length - 1].match(/[0-9]/) !== null) {
        input += " * ";
        $("#box").html(trunkInput(input, 27));
      }
    }
  });
  $("#dot").click(function() {
    if (currentInput.length < 11) { //it's own separate value
      if (input[input.length - 1].match(/[0-9]/) !== null && input.match(/\.\d*$/) === null && sw !== 1) { //no double dot, also apparently some regex doesn't work on codepen
        input += ".";
        currentInput += ".";
      }
      else if (sw === 1) {
        input = "0.";
        currentInput = "0.";
        sw = 0;                 
      }
      else if (currentInput === "") {
        input += "0.";
        currentInput += "0.";        
      }
      $("#box").html(trunkInput(input));
      $("#box-big").html(currentInput);  
    }
  });  
  $("#equal").click(function() {
    if (input.match(/( [\+\/\-\*] $)|(\.$)/) !== null) { //striping stuff
      input = input.substr(0, input.match(/( [\+\/\-\*] $)|(\.$)/).index);
    }
    if (input.match(/\d+\.\d*0$/) !== null) { //rounding stuff
        input = input.substr(0, input.match(/\d+\.\d*0$/).index) + parseFloat(input.match(/\d+.\d*0$/)[0]);
    }
    if (input.match(/ /) === null) {
      $("#box").html(input);      
    }
    else {
      sw = 1;
      var res = parseInput(input);
      if (res !== res) {
        res = "Undefined";
      }
      $("#box").html(res);
      input = res.toString();
      $("#box-big").html(res);
      currentInput = res.toString();
      if (res !== res) {
        $("#box-big").html("Undefined");
      }
    }
  });
  
});