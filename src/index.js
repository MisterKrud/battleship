
import "./styles.css"

const Ship = require("./battleship")
const Gameboard = require("./gameboard");
const Player = require("./player");

const player1 = Player("human", "Player 1")
const player2 = Player("human", "Player 2")

const body = document.querySelector("body")
// const playerOneBoard = document.getElementById("player-one-board");

const placeShips = (player) => {
     player.playerBoard.placeShip(player.playerBoard.carrier, 2,5);
     player.playerBoard.placeShip(player.playerBoard.battleship, 4,4, 'col');
     player.playerBoard.placeShip(player.playerBoard.cruiser, 7,1);
     player.playerBoard.placeShip(player.playerBoard.submarine, 3,3, 'col');
     player.playerBoard.placeShip(player.playerBoard.destroyer, 5,6);
}
placeShips(player1);
console.log(player1.board)
placeShips(player2);

const renderBoard = (player) => {
      const playerBoard = document.createElement("div");
    playerBoard.className = "board"
    body.appendChild(playerBoard)
    for(let i=0; i< player.board.length; i++){
    const row = document.createElement("div");
  
     playerBoard.appendChild(row);
     row.classList.add("row")
    
     for(let j=0; j<player.board[0].length; j++){
        const col = document.createElement("div");
        col.classList.add("cell")
        row.appendChild(col)
        col.textContent = player.board[i][j]
     }
    
    }
    
}

renderBoard(player1);
renderBoard(player2);




