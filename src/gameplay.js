import { computerPlayer } from "./computerPlayer";
const Player = require("./player");

/*
Items for clean up:
1. Double handling between shipsArray and ships Map
2. playRound/playTurn need to be clarified for use - 
    especially first execution (playRound)
3. Game over flags seem to be repeated - possible redundancy
    There are two very similar executions after human and computer player rounds
4. Play again elements should be refactored to start of function to eliminate double handling
*/

//Get players

let player1 = Player("human", "Player 1");
let player2 = computerPlayer("computer", "Player 2");

//--------Render initial DOM elements--------------
const body = document.querySelector("body");

//Mke boards for both players
const renderBoard = (player) => {
  const playerBoard = document.createElement("div");

  playerBoard.className = "";
  playerBoard.className = "board";
  const boardId = player.name.replace(" ", "-").toLowerCase();
  playerBoard.id = boardId;
  body.appendChild(playerBoard);

  //Create rows and cells to match player gameboards
  for (let i = 0; i < player.board.length; i++) {
    const row = document.createElement("div");

    playerBoard.appendChild(row);
    row.classList.add("row");

    for (let j = 0; j < player.board[0].length; j++) {
      const col = document.createElement("div");
      col.classList.add("cell");
      row.appendChild(col);

      //Create custom attributes: 'row' and 'col' to assist with player.gameboard array communication
      col.setAttribute("row", `${i}`);
      col.setAttribute("col", `${j}`);
      //Create cell ID
      col.id = `${boardId}-${i}${j}`;
    }
  }
};

//Create basic banner elements at top of screen
const announcements = document.createElement("div");
announcements.id = "announcements";

const startButton = document.createElement("button");
startButton.textContent = "Play";

//----------Create Elements in DOM----------
//This is the main function
export const createDom = () => {
  renderBoard(player1);
  renderBoard(player2);

  body.prepend(announcements);
  announcements.appendChild(startButton);

  //Function for human player (player 1) to place ships on the board
  placeShips(player1);

  //Clicking button begins game
  startButton.addEventListener("click", () => {
    if (player1.playerBoard.shipArray.length > 0) {
      announcements.textContent = " You need to place all your ships first";
      announcements.prepend(startButton);
    } else {
      //Computer player (player 2) function to autoplace ships on board
      player2.placeShips();

      //Play first round
      playRound();
    }
  });
};

//Gameplay elements - gameover flag, player array
let gameOver = false;
let players = [player1, player2];

//----Function to swap players------
const changeAcitvePlayer = () => {
  const nextPlayer = players.pop(players[1]);
  players.unshift(nextPlayer);
  console.log(`Active player is ${players[0].name}`);
};

//---------Play a round of the game (place guess on board)-----------
const playRound = (player = players[0], opposition = players[1]) => {
  //Announce current player
  announcements.textContent = `${player.name}'s turn`;

  // Get player board & Opposition board in DOM
  const board = document.getElementById(
    player.name.replace(" ", "-").toLowerCase()
  );
  const oppositionBoard = document.getElementById(
    opposition.name.replace(" ", "-").toLowerCase()
  );

  //Set opposition board as active - this is where players are clicking to find ships
  board.classList.remove("active");
  oppositionBoard.classList.add("active");

  //----------Click handler for human player------------
  const handler = (e) => {
    //Ignore clicks outside cell elements, or that have already been hit (marked with 'hit' class)
    if (!e.target.classList === "cell" || e.target.classList.contains("hit")) {
      console.log(e.target.classList);
      return;
    } else {
      //Cell is valid----
      //Get row and col of cell (custom attributes)
      const row = e.target.getAttribute("row");
      const col = e.target.getAttribute("col");

      //Add animation on cell
      e.target.classList.add("animate");
      //-----------Receive Attack Function----- (from player.gameboard factory)
      opposition.playerBoard.receiveAttack(row, col);

      //Get text from player's board array and populate cell
      e.target.textContent = opposition.board[row][col];
      //Add 'hit' class for tracking & animate
      e.target.classList.add("hit");
      e.target.classList.remove("animate");

      //Remove event handler at conclusion of turn
      board.removeEventListener("click", handler);

      //---------GameOver flag watches for player.gameBoard.ships map size
      //------gameboard factory deletes ships from map when they are destroyed
      if (opposition.playerBoard.ships.size === 0) {
        gameOver = true;
        oppositionBoard.classList.remove("active");

        //'win' class is added for styling
        board.classList.add("win");
      }

      //------Game not over - play another round
      playGame();
    }
  };

  //---------Computer player auto attacks
  //Check player type
  if (player.type === "computer") {
    //Timeout for 0.5 seconds
    setTimeout(() => {
      //Get coordinates for attack (computerPlayer factory generates 2 random numbers)
      const attackCoords = player.getComputerAttackCoords();

      //------------Receive attack function-------------
      opposition.playerBoard.receiveAttack(attackCoords[0], attackCoords[1]);

      //Get corresponding cell in DOM
      const attackedCell = document.getElementById(
        `${opposition.name.replace(" ", "-").toLowerCase()}-${attackCoords[0]}${
          attackCoords[1]
        }`
      );
      //Animate (CSS)
      attackedCell.classList.add("animate");

      //Populate DOM cell with text from factory gameboard array
      attackedCell.textContent =
        opposition.board[attackCoords[0]][attackCoords[1]];

      //----------Gameover--- Check otherplayers ship map size---
      if (opposition.playerBoard.ships.size === 0) {
        gameOver = true;

        //Adjust classes for styling
        board.classList.remove("active");
        board.classList.add("win");
      }

      //Remove animation
      setTimeout(() => {
        attackedCell.classList.remove("animate");
      }, 1000);
      playGame();
    }, 500);
  } else {
    //-----------Human player (if not a computer)------------
    //Add click handler to allow DOM manipulation
    oppositionBoard.addEventListener("click", handler);
  }
};

//----------Game controller----------------
const playGame = () => {
  //Swap players
  changeAcitvePlayer();

  //Check for gameOver flag
  if (!gameOver) {
    //Game not over - play round with current active player
    playRound(players[0]);
  } else {
    //Game is over - Announce winner
    announcements.textContent = ` ${players[1].name} wins! Click Start button to play again`;

    //Add a 'Play again' button with an event listener and append it to the DOM
    const playAgain = document.createElement("button");
    playAgain.textContent = "Play again!";
    announcements.prepend(playAgain);
    playAgain.addEventListener("click", () => {
      //Clear the page
      body.innerHTML = "";

      //Create new layers to clear gameboards
      player1 = Player("human", "Player1");
      player2 = computerPlayer("computer", "Player 2");

      //Ensure player order is preserved
      players = [player1, player2];

      //Reset game over flag
      gameOver = false;

      //remove banner from dom
      announcements.removeChild(playAgain);
      announcements.textContent = "";

      //Recreate original DOM elements
      createDom();
    });
  }
};

//-------------Place ships in DOM----------------
const placeShips = (player) => {
  //Establish datapoints for maniuplation
  let directions = ["row", "col"];
  let arrows = ["➡", "⬇"];

  //Get player ID to target correct board by #ID
  const playerIdName = player.name.replace(" ", "-").toLowerCase();
  const board = document.getElementById(playerIdName);

  //---------------EVET HANDLERS----------------
  //Highlight cell function (for mouseover)
  const highlightCells = (e) => {
    //Do not highlight if element is not class "cell"
    if (!e.target.classList.contains("cell")) {
      return;
    }

    //Add arrow to current cell (for ship direction)
    e.target.textContent = arrows[0];
    //Style background of active cell
    e.target.setAttribute("style", "background-color: wheat");

    //Reset styling on mouseleave
    e.target.addEventListener("mouseleave", resetCellStylingOnMouseleave);
  };

  //Change ship direction (sideways/down) with mousewheel
  const changeShipDirection = (e) => {
    //Use 'directions' and 'arrows' arras respectively to determine direction and indicator
    //Pop last elements
    const newDirection = directions.pop();
    const newArrow = arrows.pop();

    //Move last elements to front of array
    directions.unshift(newDirection);
    arrows.unshift(newArrow);

    //Put arrow in cell
    e.target.textContent = arrows[0];
  };

  //Reset Cell styling function
  const resetCellStylingOnMouseleave = (e) => {
    //remove backgound colour styling and clear text
    e.target.setAttribute("style", "background-color: none");
    e.target.textContent = "";
  };

  //------Place ships on board----
  const checkAndPlaceShipsOnBoard = (e) => {
    //Get next ship to place from player.gameboard array
    let nextShip = player.playerBoard.shipArray[0];

    //If no ships are left, remove the eventlistener
    if (player.playerBoard.shipArray.length <= 0) {
      board.removeEventListener("mouseover", checkAndPlaceShipsOnBoard);
      return;
    } else {
      //If there are ships in the queue (aray)
      // Get current target
      let shipCell = e.target;

      //Run loop to dtermine length of ship against size of board to ensure ship will fit
      for (let n = 0; n < nextShip.shipLength; n++) {
        const row = e.target.getAttribute("row");
        const col = e.target.getAttribute("col");
        let x = parseInt(row);
        let y = parseInt(col);

        //If direction is row - expand length of ship by increasing columns by one
        if (directions[0] === "row") {
          y = y + n;
          shipCell = document.getElementById(`${playerIdName}-${x}${y}`);

          //If direction is col - expand down rows
        } else if (directions[0] === "col") {
          console.log(`"col": ${directions}`);
          x = x + n;
          shipCell = document.getElementById(`${playerIdName}-${x}${y}`);
        }

        //----Check starting coordinates against remaining cells - proceed if there is room
        if (x < player.board.length && y < player.board.length) {
          //add ship name to player.board ship array
          //Add shipname to dom cell class list
          player.playerBoard.placeShip(nextShip, row, col, directions[0]);
          if (player.board[x][y] === nextShip.shipName)
            shipCell.classList.add(`ship`, `ship--${nextShip.shipName}`);

          //If ship array is now empty - remove event listeners"
          //wheel(direction), mouseenter(hover styling), mouseleave(reset styling & text)
          if (player.playerBoard.shipArray.length <= 0) {
            board.removeEventListener("wheel", changeShipDirection);
            const domBoardCells = board.querySelectorAll(".cell");
            domBoardCells.forEach((cell) =>
              cell.removeEventListener(
                "mouseleave",
                resetCellStylingOnMouseleave
              )
            );
            board.removeEventListener("mouseover", highlightCells);
            //Remove arrow from cell text
            shipCell.textContent = "";
          }
        } else {
          //----If there is no room for the ship, start again
          console.log(`x and y conditions not met: x - ${x} | y - ${y}`);
          console.log(player.board.length);
        }
      }
    }
  };

  //------Add event listeners for ship placement--------------
  board.addEventListener("mouseover", highlightCells);
  board.addEventListener("wheel", changeShipDirection);

  board.addEventListener("click", checkAndPlaceShipsOnBoard);
};
