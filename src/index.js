
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
console.log('Player 1')
console.log(player1.board)
placeShips(player2);
console.log('Player 2')
console.log(player1.board)

const renderBoard = (player) => {
      const playerBoard = document.createElement("div");
    playerBoard.className = "board"
    const boardId = (player.name.replace(" ","-")).toLowerCase()
    playerBoard.id = boardId
    body.appendChild(playerBoard)
    for(let i=0; i< player.board.length; i++){
    const row = document.createElement("div");
  
     playerBoard.appendChild(row);
     row.classList.add("row")
    
     for(let j=0; j<player.board[0].length; j++){
        const col = document.createElement("div");
        col.classList.add("cell")
        row.appendChild(col)
        // col.textContent = player.board[i][j]
        if(player.board[i][j] !== `${i},${j}`){
          col.classList.add("ship", `ship--${player.board[i][j]}`)
        }
        col.setAttribute("data-row", `${i}`)
        col.setAttribute("data-col", `${j}`)
     }
    
    }
    
}

renderBoard(player1);
renderBoard(player2);




//gameplay elements
const startButton = document.createElement("button");
startButton.textContent = "Play";
body.prepend(startButton)

const announcements = document.createElement("div");
body.prepend(announcements)



//gameplay process
let gameOver = false
let players = [player1, player2]
const getCurrentPlayer = () => players[0]
const changeAcitvePlayer = () =>{
 const nextPlayer = players.pop(players[1]);
  players.unshift(nextPlayer);
  console.log(`Active player is ${players[0].name}`)
}

const playRound = (player = players[0], opposition = players[1]) =>{
  console.log(`playRound(): ${player.name}`)
    
    announcements.textContent = `${player.name}'s turn`;
    const board = document.getElementById((player.name.replace(" ","-")).toLowerCase())
    const oppositionBoard = document.getElementById((opposition.name.replace(" ","-")).toLowerCase())
    board.classList.add("active");
    oppositionBoard.classList.remove("active");
    
    
      const handler = (e) => {
        if (!e.target.classList === "cell"){
          console.log(`not a cell`)
          return
        } else {
          const row = e.target.getAttribute("data-row");
          const col = e.target.getAttribute("data-col");
          opposition.playerBoard.receiveAttack(row, col)
          e.target.textContent = opposition.board[row][col]
          console.log(`ReceiveAttack at ${row}-${col}`)
          board.removeEventListener("click", handler)
          if(opposition.playerBoard.ships.size===0){
            gameOver = true
            board.classList.remove("active");
            board.classList.add("win")
          }
          console.log(opposition.board)
          console.log(opposition.playerBoard.ships.size)
          console.log(`Next round`);
          console.log(gameOver)
          playGame()
        }
      }
      
    board.addEventListener("click", handler);
      
      
       
    
}
const playGame = ()=>{
   changeAcitvePlayer();
   if(!gameOver){
    playRound(players[0])
   } else {
    announcements.textContent = `${players[0].name} wins! Click Start button to play again`
    announcements.appendChild(startButton)
   }
      
}

startButton.addEventListener("click", ()=>{
  console.log(`Button clicked: playing round for ${players[0].name}`)
   playRound()
   body.removeChild(startButton)
} )



//Round

//current player clicks a square
//receiveHit() happens

  


//playGame
//check for gameOver
//gameOver? currentplayer wins : playGame
//change currentplayer?
//playRound(currentPLayer)




const playRoundAlt = (player = players[0], opposition = players[1]) =>{
  console.log(`playRound(): ${player}`)
    
    announcements.textContent = `${player.name}'s turn`;
    const board = document.getElementById((player.name.replace(" ","-")).toLowerCase())
     const boardRows = Array.from(board.querySelectorAll("div"))
    
    const oppBoard = document.getElementById((opposition.name.replace(" ","-")).toLowerCase())

      const cells = board.querySelectorAll(".cell")
     
      
        board.addEventListener("click", ()=> function handler(){
          cells.forEach(cell =>{
          const row = cell.getAttribute("row");
          const col = cell.getAttribute("col");
            console.log("click")
            console.log( opposition.board)
            opposition.playerBoard.receiveAttack(row, col)
            console.log(`ReceiveAttack at ${row}-${col}`)
           board.removeEventListener("click", handler)
            
      })
            
        })
      }