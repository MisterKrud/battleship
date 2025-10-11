import { computerPlayer } from "./computerPlayer";

const Player = require("./player");

export const player1 = Player("human", "Player 1")
export const player2 = computerPlayer("computer", "Player 2")

const body = document.querySelector("body");



const renderBoard = (player) => {
   
  const playerBoard = document.createElement("div");
  playerBoard.className = "board";
  const boardId = player.name.replace(" ", "-").toLowerCase();
  playerBoard.id = boardId;
  body.appendChild(playerBoard);
  for (let i = 0; i < player.board.length; i++) {
    const row = document.createElement("div");

    playerBoard.appendChild(row);
    row.classList.add("row");

    for (let j = 0; j < player.board[0].length; j++) {
      const col = document.createElement("div");
      col.classList.add("cell");
      row.appendChild(col);

      if (player.board[i][j] !== `${i},${j}`) {
        col.classList.add("ship", `ship--${player.board[i][j]}`);
      }
      col.setAttribute("row", `${i}`);
      col.setAttribute("col", `${j}`);
      col.id = `${boardId}-${i}${j}`;
    }
  }
  
};

//gameplay elements

const announcements = document.createElement("div");
announcements.id = "announcements";

const startButton = document.createElement("button");
startButton.textContent = "Play";

export const createDom = () => {
  renderBoard(player1);
  renderBoard(player2);
  body.prepend(announcements);
  announcements.appendChild(startButton);
 placeShips(player1)
//   startButton.addEventListener("click", () => {
//     console.log(`Button clicked: playing round for ${players[0].name}`);
//     playRound();
   
//   });
};

//gameplay process
let gameOver = false;
let players = [player1, player2];
const getCurrentPlayer = () => players[0];
const changeAcitvePlayer = () => {
  const nextPlayer = players.pop(players[1]);
  players.unshift(nextPlayer);
  console.log(`Active player is ${players[0].name}`);
};

const playRound = (player = players[0], opposition = players[1]) => {
//   console.log(`playRound(): ${player.name}`);

  announcements.textContent = `${player.name}'s turn`;
  const board = document.getElementById(
    player.name.replace(" ", "-").toLowerCase()
  );
  const oppositionBoard = document.getElementById(
    opposition.name.replace(" ", "-").toLowerCase()
  );
  board.classList.add("active");
  oppositionBoard.classList.remove("active");

  const handler = (e) => {
    if (!e.target.classList === "cell" || e.target.classList.contains("hit")) {
      console.log(`not a valid cell`);
      return;
    } else {
      const row = e.target.getAttribute("row");
      const col = e.target.getAttribute("col");
      opposition.playerBoard.receiveAttack(row, col);
      e.target.textContent = opposition.board[row][col];
      e.target.classList.add("hit")
    //   console.log(`ReceiveAttack at ${row}-${col}`);
      board.removeEventListener("click", handler);
      if (opposition.playerBoard.ships.size === 0) {
        gameOver = true;
        board.classList.remove("active");
        board.classList.add("win");
      }
    
      playGame();
    }
  };
  if (player.type === "computer") {
    
  
    const attackCoords = player.getComputerAttackCoords();
    console.log(`Attack Coords`)
    console.log(attackCoords);
    opposition.playerBoard.receiveAttack(attackCoords[0], attackCoords[1]);
    const attackedCell = document.getElementById(
      `${player.name.replace(" ", "-").toLowerCase()}-${attackCoords[0]}${attackCoords[1]}`
    );
  
    attackedCell.textContent = opposition.board[attackCoords[0]][attackCoords[1]];
    if (opposition.playerBoard.ships.size === 0) {
      gameOver = true;
      board.classList.remove("active");
      board.classList.add("win");
    }
     console.log(`${player.name}'s board:`)
      console.log(opposition.board);
      console.log(opposition.playerBoard.ships.size);
      console.log(`Next round`);
      console.log(`Game over: ${gameOver}`);
      playGame();
    
  } //else {
    //board.addEventListener("click", handler);
  //}
};

export const playGame = () => {
  changeAcitvePlayer();
  if (!gameOver) {
    playRound(players[0]);
  } else {
    announcements.textContent = `${players[0].name} wins! Click Start button to play again`;
    announcements.appendChild(startButton);
    startButton.addEventListener("click", () => {
        body.innerHTML = ''
       
        createDom()
    })
  }
};

const shipHandler = (e, player,ship) => {
   
      const row = e.target.getAttribute("row");
      const col = e.target.getAttribute("col");
        e.target.setAttribute("background-color", "blue")
      e.target.addEventListener("click", ()=>{
        player1.playerBoard.placeShip(value, row, col )
      })
     
    //   console.log(`ReceiveAttack at ${row}-${col}`);
    //   board.removeEventListener("click", handler);

    }



   
        
  

const placeShips = (player) =>{
    console.log(player.playerBoard.ships)
 const playerIdName = player.name.replace(" ", "-").toLowerCase()
       const board = document.getElementById(playerIdName);
    //  const board = document.querySelector("body")
     console.log(board)
     const shipIterator = player.playerBoard.ships.values()
    
        const shipHelper = (e) => {
            if(!e.target.classList.contains("cell")){
                return
             } //else {
           let directions = ["row", "col"]
         let row = e.target.getAttribute("row");
      let col = e.target.getAttribute("col");
        e.target.setAttribute("style", "background-color: blue")
        e.target.addEventListener("mouseleave", ()=>{
            e.target.setAttribute("style", "background-color: none")
            e.target.textContent = ""
        })
        e.target.addEventListener("wheel", ()=>{
            const newDirection = directions.pop()
            directions.unshift(newDirection)
            if(directions[0]==="row"){
                e.target.textContent = "➡"
            } else if(directions[0] ==="col"){
                e.target.textContent = "⬇"
            }
            console.log(directions)
        })
      e.target.addEventListener("click", ()=>{
        let nextShip = shipIterator.next().value
        if(nextShip === undefined) {
            board.removeEventListener("mouseover", shipHelper)
            return
        }
        player.playerBoard.placeShip(nextShip, row, col, directions[0] )
        for(let n=0; n<nextShip.shipLength; n++){
            if(directions[0]==="row"){
           let x = parseInt(row);
        let y= parseInt(col)+n
           const shipCell = document.getElementById(`${playerIdName}-${x}${y}`)
           console.log(`${playerIdName}-${x}${y}`);
           shipCell.classList.add(`ship--${nextShip.shipName}`)
        }else if(directions[0]==="col"){

             let x = parseInt(row)+n;
        let y= parseInt(col)
        const shipCell = document.getElementById(`${playerIdName}-${x}${y}`)
           console.log(`${playerIdName}-${x}${y}`);
           shipCell.classList.add(`ship--${nextShip.shipName}`)
        }
    } 
        
      })

        // player.playerBoard.placeShip(value, (Math.floor(Math.random() *6)), (Math.floor(Math.random() *6)) )
        
    

        }
     
      board.addEventListener("mouseover", shipHelper )


}




