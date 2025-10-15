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


const getRandomCoordinates = () => {
 const generateRow = Math.floor(Math.random() *10);
     const generateCol = Math.floor(Math.random() *10);
    const generateCoordinates =  [generateRow, generateCol]

   return generateCoordinates
}

 //------------Computer player game play------------
 //Generate two random numbers for placement on board
const playRound = () => {
    
    if(hits.length>0) {
        let hitCoords = hits[hits.length-1]
        const splitCoords = (hitCoords.split(''))
        console.log(splitCoords)
        console.log(hitCoords)
        console.log(board[splitCoords[0]][splitCoords[1]])
        if(board[splitCoords[0]][splitCoords[1]]!=="-"){
           let nextHit = []
           nextHit.push([splitCoords[0], splitCoords[1]],[parseInt(splitCoords[0])+1, splitCoords[1]],[parseInt(splitCoords[0]-1), splitCoords[1]], [splitCoords[0],parseInt(splitCoords[1]+1)], [splitCoords[0], parseInt(splitCoords[1]-1)])
           console.log(nextHit)
           nextHit.forEach(hit => {
            if(hit[0]>=0 && hit[0]<=9 && hit[1]>=0 && hit[1]<=9 && board[hit[0]][hit[1]]!=="💥"&&board[hit[0]][hit[1]]!=="🚫"){
                hitCoords.push(hit);
                console.log(`hitCoords chosen: ${hitCoords}`)
               
            } else {
                hitCoords = []
             const finalCoords =   getRandomCoordinates()
             return finalCoords
            }
           })
        } if(hitCoords.length>0){
            return hitCoords
        } else {
   
        playRound()
        } 
    } else { 
    const finalCoords = getRandomCoordinates()
    return finalCoords


   
    }
}


const checkSuccessfulHits = () => {
    //find a hit cell
    //generate an array of neighbouring coordinates
    //for each coordinate
    //attempt attack
    //pop
    //until array length is zero
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
        if(boardCell !== "-"){
            hits.push(`${cellToHit[0]}${cellToHit[1]}`)
       
            console.log('hits')
            console.log(hits)
       }
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





// const findAdjacentHitCells = () => {
//     const positiveHit = "💥";
//     let row;
//     let col;
//     console.log(board)
//    board.forEach(row =>{
//     row.forEach(cell=>{
//         if(cell === positiveHit){
//             col = row.indexOf(positiveHit)
//             console.log(col)
//         }
//     })
//    })
//    console.log(col)
//    return [0,0]
// }


    return { board, playerBoard, gameOver, placeShips, getComputerAttackCoords,type, name, clearBoard}
}

