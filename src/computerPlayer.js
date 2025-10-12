const Player = require ("./player.js")

export const computerPlayer = (type, name) =>  {
     const {board, playerBoard, gameOver, clearBoard } = Player(type = "computer", name)

     //Array to track hits -- may no longer be needed
const hits = []


//---------Computer Player function to place ships in array---------
const placeShips = () =>{

//Continue while ships are in the array
while(playerBoard.shipArray.length>0){

    //Roll for 'row' or 'col' direction
    let rowOrCol = Math.random()
    let direction = "row"
    if(rowOrCol < 0.5) direction = "col"

    //Generate row or column number depending on starting point (using shiplength) to ensure ship stays on the board
    if(direction === "col"){
    playerBoard.placeShip(playerBoard.shipArray[0], Math.floor(Math.random() *(board.length-playerBoard.shipArray.length)), Math.floor(Math.random() *10), direction)
    } else if(direction === "row"){
        playerBoard.placeShip(playerBoard.shipArray[0], Math.floor(Math.random() *10), Math.floor(Math.random() *(board.length-playerBoard.shipArray.length)), direction)
    }
}
 }    

 //------------Computer player game play------------
 //Generate two random numbers for placement on board
const playRound = () => {

    const generateRow = Math.floor(Math.random() *10);
     const generateCol = Math.floor(Math.random() *10);
    const generateCoordinates =  [generateRow, generateCol]

   return generateCoordinates

}



//
const getNewAttackCoords = (n=0) => {

       let cellToHit = playRound();

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
    return { board, playerBoard, gameOver, placeShips, getComputerAttackCoords,type, name, clearBoard}
}

