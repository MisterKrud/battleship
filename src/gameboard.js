const Ship = require("./battleship");

const gameboard = (rows = 10, cols = 10) => {
  //Create 2 dimensional array
  const getBoard = () => {
    const boardArray = [];
    for (let i = 0; i < rows; i++) {
      boardArray[i] = [];
      for (let j = 0; j < cols; j++) {
        boardArray[i].push(`-`);
      }
    }
    return boardArray;
  };

  //Store board as a variable
  let board = getBoard(rows, cols);

  //Get new board (probably delete this)
  const resetBoard = () => getBoard(rows, cols);

  //Create ships
  const carrier = new Ship(5, "carrier");
  const battleship = new Ship(4, "battleship");
  const cruiser = new Ship(3, "cruiser");
  const submarine = new Ship(3, "submarine");
  const destroyer = new Ship(2, "destroyer");

  //Store ships in Map (This should probably be deleted as an array is being used and is a better fit)
  const ships = new Map([
    ["carrier", carrier],
    ["battleship", battleship],
    ["cruiser", cruiser],
    ["submarine", submarine],
    ["destroyer", destroyer],
  ]);

  //Array for helping track ships placed on board
  const shipArray = [carrier, battleship, cruiser, submarine, destroyer];

  //Same thing - but ships are pushed into this - probably delete
  const placedShips = [];

  //---------Place ship function---------
  const placeShip = (ship, row, col, direction = "row") => {
    //Make sure ship won't go off board - do not place if it does
    //Don't change the shipArray
    if (
      parseInt(row) + parseInt(ship.shipLength - 1) > board.length &&
      parseInt(col) + parseInt(ship.shipLength - 1) > board.length
    ) {
      console.log(col + ship.shipLength);
      console.log(`${ship.shipName} won't fit`);
      console.log(
        `Wants to access up to: ${
          parseInt(row) + parseInt(ship.shipLength - 1)
        } & ${parseInt(col) + parseInt(ship.shipLength - 1)}`
      );
      return;
    } else {
      //Ensure ship won't collide with another ship on the board
      for (l = 0; l < ship.shipLength; l++) {
        //Check columns and rows depending on placement direction
        if (direction === "col") {
          if (board[parseInt(row) + l][parseInt(col)] !== `-`) {
            console.log(`Content of cell in array: ${board[parseInt(row) + l][parseInt(col)]}`)
            console.log(`${ship.shipName} will hit another ship`);
            return;
          }
        } else {
          if (direction === "row") {
            if (board[parseInt(row)][parseInt(col) + l] != `-`) {
              console.log(
                `Cell text: ${board[parseInt(row)][parseInt(col) + l]}`
              );
              console.log(`${ship.shipName} will hit another ship`);
              return;
            }
          }
        }
      }
    }

    //Create shorter shipName (3 letters) - this can be deleted
    const shipName = ship.shipName.substring(0, 3);
    for (l = 0; l < ship.shipLength; l++) {
      //Place ship in gameboard array according to it's length and direction
      if (direction === "col") {
        board[parseInt(row) + l][parseInt(col)] = ship.shipName;
      } else {
        board[parseInt(row)][parseInt(col) + l] = ship.shipName;
      }

      //add abbr to ship Factory function
      ship.abbr = shipName;
    }

    //Remove ship from one array, add it to another - this is some serious duplication
    shipArray.shift();
    placedShips.push(ship);
    return ship.cells;
  };

  //Arrarys for tracking incoming attacks and direct hits -- may not be needed any longer -- delete?
  let attackedCells = [];
  let hits = [];
  const receiveAttack = (row, col) => {
    //Check there is no ship where attack has landed and put a symbol on the cell
    if (board[row][col] === `-`) {
      board[row][col] = "🚫";
      attackedCells.push(`${row},${col}`);
    } else {
      //If a ship is in that cell, cycle through the ship Map (possibly change to shipArray iteration)
      ships.forEach((shipObj) => {
        //Look for the shipname - replace with an exposion symbol to show a hit
        if (board[row][col] === shipObj.shipName) {
          board[row][col] = "💥";

          //Push into uneccesary arrays
          hits.push(`${row},${col}`);
          attackedCells.push(`${row},${col}`);

          //Execute hit function on the ship
          shipObj.hit();

          //If the ship's length is zeros, all cells are hit. Rmove from map
          //This is why I need a map as well!!! Map tracks ships in game - array tracks placement of ships
          if (shipObj.hitNum <= 0) {
            ships.delete(`${shipObj.shipName}`);
          }

          //If the array cell already has a miss or hit symbol, ignore the move
        } else if (board[row][col] === "🚫" || board[row][col] === "💥") {
          return "Cell has already been hit";
        }
      });
    }
    return board[row][col];
  };

  return {
    board,
    resetBoard,
    shipArray,
    attackedCells,
    carrier,
    battleship,
    cruiser,
    submarine,
    destroyer,
    placeShip,
    receiveAttack,
    ships,
  };
};

module.exports = gameboard;
