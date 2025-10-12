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

//  placeShips(player2)
  startButton.addEventListener("click", () => {
    console.log(`Button clicked: playing round for ${players[0].name}`);
    const board = document.getElementById("player-1")
    const board2 = document.getElementById("player-2")

    
    board.removeEventListener("mouseover", placeShips.shipHelper)
    board2.removeEventListener("mouseover",  placeShips.shipHelper)
   
    playRound();
   
  });
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
    
  } else {
    board.addEventListener("click", handler);
  }
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








   
  

const placeShips = (player) =>{
    let directions = ["row", "col"]
     let arrows = ["➡", "⬇"]
    console.log(player.playerBoard.ships)
    console.log(player.playerBoard.shipArray)
 const playerIdName = player.name.replace(" ", "-").toLowerCase()
       const board = document.getElementById(playerIdName);
    //  const board = document.querySelector("body")
 
    
         const shipIterator = player.playerBoard.ships.values()
    

        
  







//mouseover - blue /arrow
//mousewheel - change direction []
//mouseout - reset styling
//mouseclick - place ships
//after which - all are removed


//CELL HIGHLIGHT ON MOUSEOVER
  const highlightCells = (e) => {
            // e.target.setAttribute("style","color: white")
            if(!e.target.classList.contains("cell")){
                return
             } //else {
          
           e.target.textContent = arrows[0]

   
        e.target.setAttribute("style", "background-color: blue")
        e.target.addEventListener("mouseleave", resetCellStylingOnMouseleave)
        // e.target.addEventListener("wheel", changeShipDirection)
        
      
}

//CHANGE SHIP DIRECTION WITH WHEEL
 const changeShipDirection = (e)=>{
   
            const newDirection = directions.pop()
            const newArrow = arrows.pop()
            directions.unshift(newDirection)
            arrows.unshift(newArrow)
            e.target.textContent = arrows[0]
            console.log(e.target.textContent)
            // if(directions[0]==="row"){
            //     e.target.textContent = "➡"
            //      console.log(`row: ${directions}`)
            // } if(directions[0] ==="col"){
            //     e.target.textContent = "⬇"
            //      console.log(`col :${directions}`)
            // }
            console.log(directions)
        }

     
//RESET CELL STYLING ON MOUSELEAVE
const resetCellStylingOnMouseleave = (e)=>{
            // console.log(`Mouseleave Row & col - ${row}, ${col} -(${typeof(row)}s)`)
            e.target.setAttribute("style", "background-color: none")
            e.target.textContent = ""
           
        }

//PLACE SHIPS ON THE BOARD
const checkAndPlaceShipsOnBoard = (e) =>{
    console.log(player.playerBoard.shipArray[0])
             let nextShip = player.playerBoard.shipArray[0]
           
        if(player.playerBoard.shipArray.length <=0) {
            board.removeEventListener("mouseover", checkAndPlaceShipsOnBoard)
        

            
  
            return
        } else {
         console.log(`At top of click: ${nextShip.shipName}`)
        // console.log(`Click Row & col - ${row}, ${col} -(${typeof(row)}s)`)
         let shipCell = e.target
        for(let n=0; n<nextShip.shipLength; n++){
         const row = e.target.getAttribute("row");
      const col = e.target.getAttribute("col"); 
        let x = parseInt(row);
        let y= parseInt(col)
       
        if(directions[0]==="row"){
            console.log(`"row": ${directions}`)
            y = y+n
           
           shipCell = document.getElementById(`${playerIdName}-${x}${y}`)
          
          
        }else if(directions[0]==="col"){
            console.log(`"col": ${directions}`)
            x = x+n
      shipCell = document.getElementById(`${playerIdName}-${x}${y}`)
            console.log(`x+n: ${x}, n: ${n}`)
          
        }
       
        console.log(shipCell)
      
        if(x<player.board.length && y<player.board.length){
            console.log(`At placeShip function :${directions}`)
         player.playerBoard.placeShip(nextShip, row, col, directions[0] )
         if(player.board[x][y] === nextShip.shipName) shipCell.classList.add(`ship--${nextShip.shipName}`)
         console.log(`After placeShip function: ${nextShip.shipName}`)
         if(player.playerBoard.shipArray.length <=0){
             board.removeEventListener("wheel", changeShipDirection)
            const domBoardCells = board.querySelectorAll(".cell");
            domBoardCells.forEach(cell => cell.removeEventListener("mouseleave",resetCellStylingOnMouseleave))
            board.removeEventListener("mouseover", highlightCells)
            shipCell.textContent = ''
         }
        } else {
            console.log(`x and y conditions not met: x - ${x} | y - ${y}`)
            console.log(player.board.length)
        }
        }
    }
        
    } 
      

        
      
    
       


//begin listners
board.addEventListener("mouseover",highlightCells )
// board.addEventListener("mouseleave",resetCellStylingOnMouseleave)
 board.addEventListener("wheel", changeShipDirection)
  
    board.addEventListener("click", checkAndPlaceShipsOnBoard)
}