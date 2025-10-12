const gameboard = require("./gameboard")



const Player = (type = "human", name) => {
    
const playerBoard = gameboard(10,10)
let board = playerBoard.board
const clearBoard = () => playerBoard.resetBoard
const gameOver = ()=> playerBoard.ships.size === 0 ? true : false







return { board, name, type, playerBoard, gameOver, clearBoard }
}
module.exports = Player







//computer player functions

// let hits = []
// const playRound = () => {

   
//     const generateRow = Math.floor(Math.random() *10);
//      const generateCol = Math.floor(Math.random() *10);
//     const generateCoordinates =  [generateRow, generateCol]



//    return generateCoordinates

// }

// const getNewAttackCoords = (n=0) => {

//        let cellToHit = playRound();
//     //    const boardCell = document.getElementById(`player-2-${cellToHit[0]}${cellToHit[1]}`)
//        const boardCell = board[cellToHit[0]][cellToHit[1]]
//        console.log(board[cellToHit[0]][cellToHit[1]])
//        console.log(`Cell to hit:${cellToHit[0]}${cellToHit[1]}`)
//        console.log(boardCell)
//        if(boardCell === "💥" || boardCell === "🚫" ){
//         console.log(`Cell ${cellToHit} - already hit`)
//         console.log(`Running again: number ${n}`)
//         n++
//         cellToHit = getNewAttackCoords(n)
        
//        }
       
//        return cellToHit
//     }


//    const getComputerAttackCoords = () => {
//      let computerPlayerCell = getNewAttackCoords();
//       console.log(`computerPlayerCell`)
//       console.log(computerPlayerCell)
//     //   while (player.playerBoard.attackedCells.includes(computerPlayerCell)) {
        
      
//     //        computerPlayerCell = getNewAttackCoords()
//     //        return computerPlayerCell
      
         
//     //   }

//     //   if(computerPlayer.hits.length>0){
//     //         console.log(`Let's use the array!`)
//     //         for(let i=0; i<computerPlayer.hits.length; i++){
//     //           console.log(`hits`)
//     //             console.log(computerPlayer.hits)
              
//     //           if((computerPlayer.hits[i][0]+1<=9) && (!opposition.playerBoard.attackedCells.includes([(computerPlayer.hits[i][0]+1),(computerPlayer.hits[i][1])]))) {
//     //            console.log(computerPlayer.hits[i][0]+1)
//     //             computerPlayerCell[0] = computerPlayer.hits[i][0]+1
//     //             computerPlayerCell[1] = computerPlayer.hits[i][1]
//     //           } else if((computerPlayer.hits[i][0]-1>=0) && (!opposition.playerBoard.attackedCells.includes([(computerPlayer.hits[i][0]-1),(computerPlayer.hits[i][1])]))){
//     //             console.log(computerPlayer.hits[i][0]-1)
//     //             computerPlayerCell[0] = computerPlayer.hits[i][0]-1
//     //             computerPlayerCell[1] = computerPlayer.hits[i][1]
//     //           } else if((computerPlayer.hits[i][1]+1<=9)&& (!opposition.playerBoard.attackedCells.includes([(computerPlayer.hits[i][1]+1),(computerPlayer.hits[i][0])]))){
//     //             console.log(computerPlayer.hits[i][1]+1)
//     //             computerPlayerCell[1] = computerPlayer.hits[i][1]+1
//     //          computerPlayerCell[0] = computerPlayer.hits[i][0]
//     //           } else if((computerPlayer.hits[i][1]-1>=0)&& (!opposition.playerBoard.attackedCells.includes([(computerPlayer.hits[i][1]-1),(computerPlayer.hits[i][0])]))){
//     //             console.log(computerPlayer.hits[i][1]-1)
//     //             computerPlayerCell[1] = computerPlayer.hits[i][1]-1
//     //            computerPlayerCell[0] = computerPlayer.hits[i][0]
//     //           } 
//     //           return computerPlayerCell;
       
//     //         }
//     //         console.log(`computerPlayerCell from if statement`)
//     //             console.log(computerPlayerCell)
              
//     //     }

//        console.log(`computerPlayerCell`)
//        console.log(computerPlayerCell)
//       return computerPlayerCell;
//     };