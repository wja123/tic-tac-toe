"use strict";
var docReady = document.addEventListener("DOMContentLoaded",function(){

	var gameLive = true;
	var boardSize = parseInt(document.getElementsByClassName("boardsizeinp")[0].value);
	var xTurn = false;
	var playerXName = "X";
	var playerOName = "O";

	var outerBoxElem = document.getElementsByClassName("outerbox")[0];
	var numberPattern = /\d+/g;

	//create game board check
	var gameArray = [];
	newGame(boardSize);
	createBoard(boardSize); ///recently added
	newBoard(boardSize);

	var elemClick = document.getElementsByClassName("boardsizeinp")[0].addEventListener("input",function(event){
		boardSize = parseInt(document.getElementsByClassName("boardsizeinp")[0].value);	
	});

	var elemClick = outerBoxElem.addEventListener("click",function(event){
		for(var i = 0; i < outerBoxElem.children.length;i++){
			for(var j = 0 ; j < outerBoxElem.children[i].children.length;j++){

				if(gameLive && outerBoxElem.children[i].children[j]===event.target){
					var row = parseInt(document.getElementsByClassName("outerbox")[0].children[i].classList[0].match(/\d+/g)[0]);
					var column = parseInt(document.getElementsByClassName("outerbox")[0].children[i].children[j].classList[0].match(/\d+/g)[0]);
					if(gameLive && xTurn && !event.target.classList.contains("crossclass") && !event.target.classList.contains("circleclass")){
						event.target.classList.add("crossclass");
						xTurn = false;
						gameArrayUpdate(row,column,"x",boardSize);
						updateStatus(playerOName + " you're up");
							winCheck(row,column,"x",boardSize);
					}
					else if(gameLive && !xTurn && !event.target.classList.contains("circleclass") && !event.target.classList.contains("crossclass"))
					{
						event.target.classList.add("circleclass");
						xTurn = true;
						gameArrayUpdate(row,column,"o",boardSize);
						updateStatus(playerXName + " you're up");
							winCheck(row,column,"o",boardSize); 
					}
				}
			}
		}
	});


var elemClick = document.getElementsByClassName("playerx")[0].addEventListener("input",function(event){
	playerXName = document.getElementsByClassName("playerx")[0].value;
});

var elemClick = document.getElementsByClassName("playero")[0].addEventListener("input",function(event){
	playerOName = document.getElementsByClassName("playero")[0].value;
});

var elemClick = document.getElementsByClassName("newgame")[0].addEventListener("click",function(event){
	newGame(true,boardSize);
});


function gameArrayUpdate(row,column,mark,boardSize){
	gameArray[row-1][column-1]=mark;
}

function winCheck(row,column,mark,boardSize){
	var tempCol = [];
	var tempRow = gameArray[row - 1];
	var	diagOne = [];
	var diagTwo = [];
	var winCase = Array(boardSize + 1).join(mark);
	console.log(winCase);
	for(var i = 0;i < boardSize;i++){
		tempCol[i] = gameArray[i][column - 1];
		diagOne[i] = gameArray[i][i];
		diagTwo[i] = gameArray[boardSize - i - 1][boardSize - i - 1]; 
	}

	console.log("col: " + tempCol.join("") +" Row: " + tempRow.join("") +" diagOne: "+ diagOne.join("") +" diagTwo: "+ diagTwo.join("") +" winCase: "+ winCase );

	if(tempRow.join("") === winCase || tempCol.join("") === winCase || diagOne.join("") === winCase || diagTwo.join("") === winCase){
		if(mark==="x"){
			updateStatus(playerXName.toUpperCase() + " WON!!!");
		}
		else{
			updateStatus(playerOName.toUpperCase() + " WON!!!");
		}
		gameLive=false;
	}
}

function newGame(randGame,boardSize){
	gameLive = true;
	if(randGame){
		xTurn = Math.random() < 0.5? true : false;	
	}

	createBoard(boardSize);
	if(xTurn){
		updateStatus(playerXName + " you're up");
	}
	else{
		updateStatus(playerOName + " you're up");
	}

	createBoard(boardSize); ///recently added
	newBoard(boardSize);
}

function updateStatus(message){
	document.getElementsByClassName("gamestatus")[0].innerHTML=message;
}

function createBoard(boardSize){
	var appendBoard="";
	for(var i = 0;i<boardSize;i++){
		appendBoard += "<div class='row"+(i+1)+"'>";
		for(var j = 0;j<boardSize;j++){
			appendBoard += "<div class='col"+(j+1)+" innerbox'></div>";
		}
		appendBoard += "</div>";
	}
	document.getElementsByClassName("outerbox")[0].innerHTML="";
	document.getElementsByClassName("outerbox")[0].innerHTML=appendBoard;
}

function newBoard(boardSize){
	for(var i = 0;i < boardSize;i++){
		var tempArr =[];
		for(var j = 0;j < boardSize;j++){
			tempArr[j] = 0;
		}
		gameArray[i] = tempArr;
	}
}
});	