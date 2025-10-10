const gameboard = require("./gameboard")



const Player = (type = "human", name) => {
    
const playerBoard = gameboard(10,10)
const board = playerBoard.board
const gameOver = ()=> playerBoard.ships.size === 0 ? true : false
    return {board, name, type, playerBoard, gameOver}
}
module.exports = Player