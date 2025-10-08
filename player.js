const gameboard = require("./gameboard")

const playerBoard = gameboard(10,10)

const Player = (type = "human", name) => {
    const board = playerBoard.board


    return {board}
}
module.exports = Player