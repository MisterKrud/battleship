const gameboard = require("./gameboard");

//Lose clearBoard from here and gameboard

const Player = (type = "human", name) => {
  const playerBoard = gameboard(10, 10);
  let board = playerBoard.board;
  const clearBoard = () => playerBoard.resetBoard;
  const gameOver = () => (playerBoard.ships.size === 0 ? true : false);

  return { board, name, type, playerBoard, gameOver, clearBoard };
};
module.exports = Player;
