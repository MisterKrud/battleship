import { computerPlayer } from "./computerPlayer";
const Player = require("./player");

const player1 = Player("human", "Player 1");
const player2 = Player("computer", "Player 2");

const body = document.querySelector("body");
// const playerOneBoard = document.getElementById("player-one-board");

const placeShips = (player) => {
  player.playerBoard.placeShip(player.playerBoard.carrier, 2, 5);
  player.playerBoard.placeShip(player.playerBoard.battleship, 4, 4, "col");
  player.playerBoard.placeShip(player.playerBoard.cruiser, 7, 1);
  player.playerBoard.placeShip(player.playerBoard.submarine, 3, 3, "col");
  player.playerBoard.placeShip(player.playerBoard.destroyer, 5, 6);
};
placeShips(player1);
console.log("Player 1");
console.log(player1.board);
placeShips(player2);
console.log("Player 2");
console.log(player1.board);

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
  startButton.addEventListener("click", () => {
    console.log(`Button clicked: playing round for ${players[0].name}`);
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
  console.log(`playRound(): ${player.name}`);

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
    if (!e.target.classList === "cell") {
      console.log(`not a cell`);
      return;
    } else {
      const row = e.target.getAttribute("row");
      const col = e.target.getAttribute("col");
      opposition.playerBoard.receiveAttack(row, col);
      e.target.textContent = opposition.board[row][col];
      console.log(`ReceiveAttack at ${row}-${col}`);
      board.removeEventListener("click", handler);
      if (opposition.playerBoard.ships.size === 0) {
        gameOver = true;
        board.classList.remove("active");
        board.classList.add("win");
      }
      console.log(opposition.board);
      console.log(opposition.playerBoard.ships.size);
      console.log(`Next round`);
      console.log(gameOver);
      playGame();
    }
  };
  if (player.type === "computer") {
    // const computerPlayRound = computerPlayer.playRound()
    const getNewAttackCoords = () => computerPlayer.playRound();
 

    const getComputerAttackCoords = () => {
     let computerPlayerCell = getNewAttackCoords();
      console.log(`computerPlayerCell`)
      console.log(computerPlayerCell)
      while (opposition.playerBoard.attackedCells.includes(computerPlayerCell)) {
        
      
           computerPlayerCell = getNewAttackCoords()
           return computerPlayerCell
      
         
      }

    //   if(computerPlayer.hits.length>0){
    //         console.log(`Let's use the array!`)
    //         for(let i=0; i<computerPlayer.hits.length; i++){
    //           console.log(`hits`)
    //             console.log(computerPlayer.hits)
              
    //           if((computerPlayer.hits[i][0]+1<=9) && (!opposition.playerBoard.attackedCells.includes([(computerPlayer.hits[i][0]+1),(computerPlayer.hits[i][1])]))) {
    //            console.log(computerPlayer.hits[i][0]+1)
    //             computerPlayerCell[0] = computerPlayer.hits[i][0]+1
    //             computerPlayerCell[1] = computerPlayer.hits[i][1]
    //           } else if((computerPlayer.hits[i][0]-1>=0) && (!opposition.playerBoard.attackedCells.includes([(computerPlayer.hits[i][0]-1),(computerPlayer.hits[i][1])]))){
    //             console.log(computerPlayer.hits[i][0]-1)
    //             computerPlayerCell[0] = computerPlayer.hits[i][0]-1
    //             computerPlayerCell[1] = computerPlayer.hits[i][1]
    //           } else if((computerPlayer.hits[i][1]+1<=9)&& (!opposition.playerBoard.attackedCells.includes([(computerPlayer.hits[i][1]+1),(computerPlayer.hits[i][0])]))){
    //             console.log(computerPlayer.hits[i][1]+1)
    //             computerPlayerCell[1] = computerPlayer.hits[i][1]+1
    //          computerPlayerCell[0] = computerPlayer.hits[i][0]
    //           } else if((computerPlayer.hits[i][1]-1>=0)&& (!opposition.playerBoard.attackedCells.includes([(computerPlayer.hits[i][1]-1),(computerPlayer.hits[i][0])]))){
    //             console.log(computerPlayer.hits[i][1]-1)
    //             computerPlayerCell[1] = computerPlayer.hits[i][1]-1
    //            computerPlayerCell[0] = computerPlayer.hits[i][0]
    //           } 
    //           return computerPlayerCell;
       
    //         }
    //         console.log(`computerPlayerCell from if statement`)
    //             console.log(computerPlayerCell)
              
    //     }

       console.log(`computerPlayerCell`)
       console.log(computerPlayerCell)
      return computerPlayerCell;
    };
    const attackCoords = getComputerAttackCoords();
    console.log(`Attack Coords`)
    console.log(attackCoords);
    opposition.playerBoard.receiveAttack(attackCoords[0], attackCoords[1]);
    const attackedCell = document.getElementById(
      `player-2-${attackCoords[0]}${attackCoords[1]}`
    );
    if(attackedCell.classList.contains("ship")){
        computerPlayer.hits.push(attackCoords)
        console.log(`computer player hits after attacked cell`)
        console.log(computerPlayer.hits)
    }
    attackedCell.textContent =
      opposition.board[attackCoords[0]][attackCoords[1]];
    if (opposition.playerBoard.ships.size === 0) {
      gameOver = true;
      board.classList.remove("active");
      board.classList.add("win");
    }
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
  }
};
