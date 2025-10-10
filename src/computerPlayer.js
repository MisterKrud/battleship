const Player = require ("./player.js")

export const computerPlayer = Player("computer", "computer")

computerPlayer.playRound = () => {

   
    const generateRow = Math.floor(Math.random() *10);
     const generateCol = Math.floor(Math.random() *10);
    const generateCoordinates =  [generateRow, generateCol]



   return generateCoordinates

}

computerPlayer.hits = []
//if attackedCells has data
//add or subtract 1 to row or column if that number won't go over 9 or under 0

