import "./styles.css"

const Ship = require("./battleship")
const Gameboard = require("./gameboard");
const Player = require("./player");

const player1 = Player("human", "Player 1")
const player2 = Player("human", "Player 2")
const player1Board = player1.board;
const player2Board = player2.board;
const body = document.querySelector("body")
// const playerOneBoard = document.getElementById("player-one-board");
const playerTwoBoard = document.getElement

const renderBoard = (playerGameBoard) => {
      const playerBoard = document.createElement("div");
    playerBoard.className = "board"
    body.appendChild(playerBoard)
    for(let i=0; i< playerGameBoard.length; i++){
    const row = document.createElement("div");
  
     playerBoard.appendChild(row);
     row.classList.add("row")
    
     for(let j=0; j<playerGameBoard[0].length; j++){
        const col = document.createElement("div");
        col.classList.add("cell")
        row.appendChild(col)
        col.textContent =`${i}, ${j}`
     }
    }
}

renderBoard(player1Board);
renderBoard(player2Board)