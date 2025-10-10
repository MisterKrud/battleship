const Player = require ("./player.js")

export const computerPlayer = Player("computer", "computer")

computerPlayer.playRound = () => {
    const generateRow = Math.floor(Math.random() *10);
     const generateCol = Math.floor(Math.random() *10);
    const generateCoordinates =  [generateRow, generateCol]
    return generateCoordinates

}