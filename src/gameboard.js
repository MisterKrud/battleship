const Ship = require("./battleship")

const gameboard = (rows = 10, cols = 10)=>{
    
    const getBoard = () => {
        const boardArray = []
        for(let i = 0; i<rows; i++){
            boardArray[i]=[]
            for(let j=0; j< cols; j++){
                boardArray[i].push(`-`)
            }
        }
        return boardArray
    }

    const board = getBoard(rows, cols)
    

    
        const carrier = new Ship(5, "carrier")
        const battleship = new Ship(4, "battleship")
        const cruiser = new Ship(3, "cruiser")
        const submarine = new Ship(3, "submarine")
        const destroyer = new Ship(2, "destroyer")

        const ships = new Map([
            ['carrier', carrier],
            ['battleship', battleship],
            ['cruiser', cruiser],
            ['submarine', submarine],
            ['destroyer', destroyer],
        ])

        const shipArray = [carrier, battleship, cruiser, submarine, destroyer]

      const placedShips =[]

 

    const placeShip = (ship, row, col, direction='row') => {
        console.log(board)
       
        if(parseInt(row)+parseInt(ship.shipLength-1)>board.length && parseInt(col)+parseInt(ship.shipLength-1)>board.length){
            console.log(col+(ship.shipLength))
            console.log(`${ship.shipName} won't fit`)
            console.log(`Wants to access up to: ${parseInt(row)+parseInt(ship.shipLength-1)} & ${parseInt(col)+parseInt(ship.shipLength-1)}`)
            return
            // throw new Error(`The ${ship.shipName} is too big to be placed there`)
       
        } else {



       for(l=0; l<ship.shipLength; l++){
        if(direction === "col"){
            console.log({
  row,
  col,
  l,
  rowIndex: parseInt(row) + l,
  colIndex: parseInt(col),
  boardRow: board[parseInt(row) + l],
  boardLength: board.length
});
            if(board[parseInt(row)+l][parseInt(col)]!==`-`){
               
                 console.log(`${ship.shipName} will hit another ship`)
                return
                //  throw new Error(`The ${ship.shipName} will intersect with your ${board[row+l][col]}`)
            }
        } else {
            if(direction === "row"){
if(board[parseInt(row)][parseInt(col)+l]!=`-`){
    // console.log(`typeofs`)
    // console.log(typeof(row), typeof(parseInt(row)))
    // console.log(typeof(col), typeof(parseInt(col)))
    // console.log(typeof(l), typeof(parseInt(l)))
                 console.log(`Cell text: ${board[parseInt(row)][parseInt(col)+l]}`)
                console.log(`${ship.shipName} will hit another ship`)
                return
                //  throw new Error(`The ${ship.shipName} will intersect with your ${board[row+l][col]}`)
            }
        }
        }
       }
    } 
    
        const shipName = ship.shipName.substring(0,3)
        for(l=0; l<ship.shipLength; l++){
           
            if(direction === 'col'){
                
                board[parseInt(row)+l][parseInt(col)] = ship.shipName
                
                // console.log(ship.shipName)
     
            } else {
                 board[parseInt(row)][parseInt(col)+l] = ship.shipName
            //  console.log(ship.shipName)
            }
          
            ship.abbr = shipName
        }

        
        shipArray.shift()
        placedShips.push(ship)
        return ship.cells
    
    }


    let attackedCells = []
    let hits = []
    const receiveAttack = (row, col)=>{
       
        if (board[row][col] === `-`){
           board[row][col] = "🚫"
           attackedCells.push(`${row},${col}`)
           console.log(attackedCells)
        } else {ships.forEach(shipObj =>{
            
        if(board[row][col]===shipObj.shipName){
            board[row][col] = "💥"
            hits.push(`${row},${col}`)
            attackedCells.push(`${row},${col}`)
            shipObj.hit();
            if(shipObj.hitNum <= 0){
                ships.delete(`${shipObj.shipName}`)
            }
        } else if(board[row][col] === "🚫" || board[row][col] === "💥"){
            return "Cell has already been hit"
        }
    })
}         
        return board[row][col]
       
    }

    



//return map insteadof ships?
//

    return {board, shipArray, attackedCells, carrier, battleship, cruiser, submarine, destroyer, placeShip, receiveAttack, ships}
}





module.exports = gameboard