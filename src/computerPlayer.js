const Player = require ("./player.js")

export const computerPlayer = (type, name) =>  {
     const {board, playerBoard, gameOver } = Player(type = "computer", name)

const playRound = () => {

   
    const generateRow = Math.floor(Math.random() *10);
     const generateCol = Math.floor(Math.random() *10);
    const generateCoordinates =  [generateRow, generateCol]



   return generateCoordinates

}

const hits = []
//if attackedCells has data
//add or subtract 1 to row or column if that number won't go over 9 or under 0

const getNewAttackCoords = (n=0) => {

       let cellToHit = playRound();
    //    const boardCell = document.getElementById(`player-2-${cellToHit[0]}${cellToHit[1]}`)
       const boardCell = board[cellToHit[0]][cellToHit[1]]
       console.log(board[cellToHit[0]][cellToHit[1]])
       console.log(`Cell to hit:${cellToHit[0]}${cellToHit[1]}`)
       console.log(boardCell)
       console.log(board)
       if(hits.includes(`${cellToHit[0]}${cellToHit[1]}`)){
        console.log(`Cell ${cellToHit} - already hit`)
        console.log(`Running again: number ${n}`)
        n++
        cellToHit = getNewAttackCoords(n)
        
       } else {
            hits.push(`${cellToHit[0]}${cellToHit[1]}`)
            console.log('hits')
            console.log(hits)
       }
       
     
       return cellToHit
    }


const getComputerAttackCoords = () => {
     let computerPlayerCell = getNewAttackCoords();
      console.log(`computerPlayerCell`)
      console.log(computerPlayerCell)
    

       console.log(`computerPlayerCell`)
       console.log(computerPlayerCell)
      return computerPlayerCell;




    };
    return { board, playerBoard, gameOver, getComputerAttackCoords,type, name}
}















//   while (player.playerBoard.attackedCells.includes(computerPlayerCell)) {
        
      
    //        computerPlayerCell = getNewAttackCoords()
    //        return computerPlayerCell
      
         
    //   }

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