"use strict"
$(document).ready(function() {
  var board = {1:"", 2:"", 3:"", 4:"", 5:"", 6:"", 7:"", 8:"", 9:""},
  computerMark,
  playerMark,
  stop = true,
  turn = 0;
  
  function checkPossibleWin(mark) { //dunno how to make the conditional simpler
	if ((board[1] === mark && board[2] === mark && board[3] === mark)
	|| (board[4] === mark && board[5] === mark && board[6] === mark)
	|| (board[7] === mark && board[8] === mark && board[9] === mark)
	|| (board[1] === mark && board[4] === mark && board[7] === mark)
	|| (board[2] === mark && board[5] === mark && board[8] === mark)
	|| (board[3] === mark && board[6] === mark && board[9] === mark)
	|| (board[1] === mark && board[5] === mark && board[9] === mark)
	|| (board[3] === mark && board[5] === mark && board[7] === mark)) {
		return "win"; //a redundant check
	}
	else if (board[1] === mark && board[2] === mark && board[3] === "") { //123
		return 3;
	}
	else if (board[2] === mark && board[3] === mark && board[1] === "") {
		return 1;
	}
	else if (board[1] === mark && board[3] === mark && board[2] === "") {
		return 2;
	}
	else if (board[4] === mark && board[5] === mark && board[6] === "") { //456
		return 6;
	}
	else if (board[5] === mark && board[6] === mark && board[4] === "") {
		return 4;
	}
	else if (board[4] === mark && board[6] === mark && board[5] === "") {
		return 5;
	}
	else if (board[7] === mark && board[8] === mark && board[9] === "") { //789
		return 9;
	}
	else if (board[8] === mark && board[9] === mark && board[7] === "") {
		return 7;
	}
	else if (board[7] === mark && board[9] === mark && board[8] === "") {
		return 8;
	}
	else if (board[1] === mark && board[4] === mark && board[7] === "") { //147
		return 7;
	}
	else if (board[4] === mark && board[7] === mark && board[1] === "") {
		return 1;
	}
	else if (board[1] === mark && board[7] === mark && board[4] === "") {
		return 4;
	}
	else if (board[2] === mark && board[5] === mark && board[8] === "") { //258
		return 8;
	}
	else if (board[5] === mark && board[8] === mark && board[2] === "") {
		return 2;
	}
	else if (board[2] === mark && board[8] === mark && board[5] === "") {
		return 5;
	}
	else if (board[3] === mark && board[6] === mark && board[9] === "") { //369
		return 9;
	}
	else if (board[6] === mark && board[9] === mark && board[3] === "") {
		return 3;
	}
	else if (board[3] === mark && board[9] === mark && board[6] === "") {
		return 6;
	}
	else if (board[1] === mark && board[5] === mark && board[9] === "") { //159
		return 9;
	}
	else if (board[5] === mark && board[9] === mark && board[1] === "") {
		return 1;
	}
	else if (board[1] === mark && board[9] === mark && board[5] === "") {
		return 5;
	}
	else if (board[3] === mark && board[5] === mark && board[7] === "") { //357
		return 7;
	}
	else if (board[5] === mark && board[7] === mark && board[3] === "") {
		return 3;
	}
	else if (board[3] === mark && board[7] === mark && board[5] === "") {
		return 5;
	}																							
	return "no matches";
}
  
  function startAgain() {
    board = {1:"", 2:"", 3:"", 4:"", 5:"", 6:"", 7:"", 8:"", 9:""};
    turn = 0;
    $(".game-box").html("<div id=\"n1\"></div><div id=\"n2\"></div><div id=\"n3\"></div><div id=\"n4\"></div><div id=\"n5\"></div><div id=\"n6\"></div><div id=\"n7\"></div><div id=\"n8\"></div><div id=\"n9\"></div>");
    $(".choose-side").html("<p>Choose your side:</p><p style=\"margin-top: -25px; white-space: pre-wrap;\"><span id=\"choose-x\"><span class=\"marks\">X</span> (go first)</span>  or  <span id=\"choose-o\"><span class=\"marks\">O</span> (go second)</span></p>");
    playGame();
  }
  
  function checkDraw() {
    if (board[1] !== "" && board[2] !== "" && board[3] !== ""
    && board[4] !== "" && board[5] !== "" && board[6] !== ""
    && board[7] !== "" && board[8] !== "" && board[9] !== "") {
		  stop = true;
      $(".choose-side").html("<p id=\"end-message\">Draw! Click me to play again!</p>");
      $("#end-message").click(startAgain);
	  }
  }
  
  function computerTurn () {
    
    if (stop === true) {
      return;
    }
    
    turn++; 
    if (turn === 1 && computerMark === "X") { //attack
      board[5] = computerMark;
      $("#n5").html("<p class=\"mark\">" + computerMark + "</p>");
      return;
    }
    else if (turn === 2 && computerMark === "X") { //method #1
      if (board[1] === "O") {
        board[9] = computerMark;
        $("#n9").html("<p class=\"mark\">" + computerMark + "</p>");
        return;        
      }
      else if (board[3] === "O") {
        board[7] = computerMark;
        $("#n7").html("<p class=\"mark\">" + computerMark + "</p>");
        return;          
      }
      else if (board[7] === "O") {
        board[3] = computerMark;
        $("#n3").html("<p class=\"mark\">" + computerMark + "</p>");
        return;          
      }
      else if (board[9] === "O") {
        board[1] = computerMark;
        $("#n1").html("<p class=\"mark\">" + computerMark + "</p>");
        return;          
      }
      else if (board[2] === "O" || board[8] === "O") { //method #2 (the best)
        board[4] = computerMark;
        $("#n4").html("<p class=\"mark\">" + computerMark + "</p>");
        return;           
      }
      else if (board[4] === "O" || board[6] === "O") {
        board[2] = computerMark;
        $("#n2").html("<p class=\"mark\">" + computerMark + "</p>");
        return;           
      }      
    }
    else if (turn === 3 && computerMark === "X") {
      if ((board[4] === "X" && board[6] === "O")||(board[2] === "X" && board[8] === "O")) { //method #2
        board[1] = computerMark;
        $("#n1").html("<p class=\"mark\">" + computerMark + "</p>");
        return;   
      }
      else if (board[1] === "X" && board[9] === "O" && board[4] === "O") { //method #1
        board[3] = computerMark;
        $("#n3").html("<p class=\"mark\">" + computerMark + "</p>");
        return;              
      }
      else if (board[1] === "X" && board[9] === "O" && board[2] === "O") {
        board[7] = computerMark;
        $("#n7").html("<p class=\"mark\">" + computerMark + "</p>");
        return;              
      }
      else if (board[3] === "X" && board[7] === "O" && board[2] === "O") {
        board[9] = computerMark;
        $("#n9").html("<p class=\"mark\">" + computerMark + "</p>");
        return;              
      }
      else if (board[3] === "X" && board[7] === "O" && board[6] === "O") {
        board[1] = computerMark;
        $("#n1").html("<p class=\"mark\">" + computerMark + "</p>");
        return;              
      }
      else if (board[7] === "X" && board[3] === "O" && board[4] === "O") {
        board[9] = computerMark;
        $("#n9").html("<p class=\"mark\">" + computerMark + "</p>");
        return;              
      }
      else if (board[7] === "X" && board[3] === "O" && board[8] === "O") {
        board[1] = computerMark;
        $("#n1").html("<p class=\"mark\">" + computerMark + "</p>");
        return;              
      }
      else if (board[9] === "X" && board[1] === "O" && board[6] === "O") {
        board[7] = computerMark;
        $("#n7").html("<p class=\"mark\">" + computerMark + "</p>");
        return;              
      }
      else if (board[9] === "X" && board[1] === "O" && board[8] === "O") {
        board[3] = computerMark;
        $("#n3").html("<p class=\"mark\">" + computerMark + "</p>");
        return;              
      }      
    }
    else if (turn === 1 && board[5] === "X" && computerMark === "O") { //protect
      board[7] = computerMark;
      $("#n7").html("<p class=\"mark\">" + computerMark + "</p>");
      return;
    }
    else if (turn === 1 && board[5] !== "X" && computerMark === "O") {
      board[5] = computerMark;
      $("#n5").html("<p class=\"mark\">" + computerMark + "</p>");
      return;             
    }
    else if (turn === 2 && board[5] === "X" && board[3] === "X" && board[7] === "O" && computerMark === "O") {
      board[9] = computerMark;
      $("#n9").html("<p class=\"mark\">" + computerMark + "</p>");
      return;      
    }
    else if (turn === 2 && board[5] === "O" && computerMark === "O") {
      if ((board[3] === "X" && board[7] === "X") || (board[1] === "X" && board[9] === "X")) {
        board[2] = computerMark;
        $("#n2").html("<p class=\"mark\">" + computerMark + "</p>");
        return        
      }
    }
    
    var check = checkPossibleWin(computerMark),
    checkTwo = checkPossibleWin(playerMark);
    //console.log(check + " check one");
    //console.log(checkTwo + " check two");
    
	  if (checkTwo === "win") { //i hope it's a redundant check
      stop = true;
      $(".choose-side").html("<p id=\"end-message\">You won! Click me to play again!</p>");
      $("#end-message").click(startAgain);
      return;
	  }
    else if (check !== "no matches" && board[check] === "") {
      $("#n" + check).html("<p class=\"mark\">" + computerMark + "</p>");
      stop = true;
      $(".choose-side").html("<p id=\"end-message\">I won! Click me to play again!</p>");
      $("#end-message").click(startAgain);
      return;
	  }
    else if (checkTwo !== "no matches" && board[checkTwo] === "") {
      board[checkTwo] = computerMark;
      $("#n" + checkTwo).html("<p class=\"mark\">" + computerMark + "</p>");
      checkDraw();
    }
    else {
      while (1) {
        var roll = Math.floor(Math.random()*9+1);
        if (board[roll] === "") {
          //console.log(roll + " roll");
          board[roll] = computerMark;
          $("#n" + roll).html("<p class=\"mark\">" + computerMark + "</p>");
          checkDraw();
          break;
        }
      }
    }
  }
  
  function playGame() {
    $("#choose-x").click( () => {
      $(".choose-side").html("<span id=\"end-message\"><p>You chose <span class=\"marks\">X</span>, you go first!</p><p style=\"margin-top: -20px;\">Click me to reset!</p></span>");
      $("#end-message").click(startAgain);
      stop = false;
      playerMark = "X";
      computerMark = "O";
    });
    $("#choose-o").click( () => {
      $(".choose-side").html("<span id=\"end-message\"><p>You chose <span class=\"marks\">O</span>, you go second!</p><p style=\"margin-top: -20px;\">Click me to reset!</p></span>");
      $("#end-message").click(startAgain);
      stop = false;
      playerMark = "O";
      computerMark = "X";
      computerTurn();
    });

    $("#n1").click( () => {
      if (board[1] === "" && stop === false) {
        board[1] = playerMark;
        $("#n1").html("<p class=\"mark\">" + playerMark + "</p>");
        checkDraw();
        computerTurn();
      }
    });
    $("#n2").click( () => {
      if (board[2] === "" && stop === false) {
        board[2] = playerMark;
        $("#n2").html("<p class=\"mark\">" + playerMark + "</p>");
        checkDraw();
        computerTurn();
      }
    });
    $("#n3").click( () => {
      if (board[3] === "" && stop === false) {
        board[3] = playerMark;
        $("#n3").html("<p class=\"mark\">" + playerMark + "</p>");
        checkDraw();
        computerTurn();
      }
    });
    $("#n4").click( () => {
      if (board[4] === "" && stop === false) {
        board[4] = playerMark;
        $("#n4").html("<p class=\"mark\">" + playerMark + "</p>");
        checkDraw();
        computerTurn();
      }
    });
    $("#n5").click( () => {
      if (board[5] === "" && stop === false) {
        board[5] = playerMark;
        $("#n5").html("<p class=\"mark\">" + playerMark + "</p>");
        checkDraw();
        computerTurn();
      }
    });
    $("#n6").click( () => {
      if (board[6] === "" && stop === false) {
        board[6] = playerMark;
        $("#n6").html("<p class=\"mark\">" + playerMark + "</p>");
        checkDraw();
        computerTurn();
      }
    });  
    $("#n7").click( () => {
      if (board[7] === "" && stop === false) {
        board[7] = playerMark;
        $("#n7").html("<p class=\"mark\">" + playerMark + "</p>");
        checkDraw();
        computerTurn();
      }
    });
    $("#n8").click( () => {
      if (board[8] === "" && stop === false) {
        board[8] = playerMark;
        $("#n8").html("<p class=\"mark\">" + playerMark + "</p>");
        checkDraw();
        computerTurn();
      }
    });
    $("#n9").click( () => {
      if (board[9] === "" && stop === false) {
        board[9] = playerMark;
        $("#n9").html("<p class=\"mark\">" + playerMark + "</p>");
        checkDraw();
        computerTurn();
      }
    });
  }
  playGame();
});