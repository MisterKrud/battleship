const Ship = require("./battleship")
const Gameboard = require("./gameboard");
const Player = require("./player");

const player = Player()
const player1Board = player.board;
const Player2Board = player.board;
const body = document.querySelector("body")
const playerOneBoard = document.getElementById("player-one-board");
playerOneBoard.textContent = 'text'
const renderBoard = () => {
    for(let i=0; i< 10; i++){
    const row = document.createElement("div");
    
     playerOneBoard.appendChild(row);
     row.textContent = "row"
     for(let j=0; j< 10; j++){
        const col = document.createElement("div");
        row.appendChild(col)
        col.textContent ='test'//`${i},${j}`
     }
    }
}

renderBoard()