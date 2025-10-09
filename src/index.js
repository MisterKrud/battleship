import "./styles.css"

const Ship = require("./battleship")
const Gameboard = require("./gameboard");
const Player = require("./player");

const player = Player()
const player1Board = player.board;
const Player2Board = player.board;
const body = document.querySelector("body")
const playerOneBoard = document.getElementById("player-one-board");

const renderBoard = () => {
    for(let i=0; i< 10; i++){
    const row = document.createElement("div");
    
     playerOneBoard.appendChild(row);
     row.classList.add("row")
    
     for(let j=0; j< 10; j++){
        const col = document.createElement("div");
        col.classList.add("cell")
        row.appendChild(col)
        col.textContent =`${i}, ${j}`
     }
    }
}

renderBoard()