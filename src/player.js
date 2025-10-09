const gameboard = require("./gameboard")



const Player = (type = "human", name) => {
    
const playerBoard = gameboard(10,10)
const board = playerBoard.board
    return {board, name, type, playerBoard}
}
module.exports = Player