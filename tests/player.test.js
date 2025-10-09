const Player = require("../src/player");
const player = require("../src/player");
const player1 = Player()
const player1Board = player1.board
test(`Check player board is correctly returning from factory`,()=>{
    expect(player1.board.length).toBe(10)
})