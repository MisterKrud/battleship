const Ship = require("./battleship")

const gameboard = (rows = 10, cols = 10)=>{
    
    const getBoard = () => {
        const boardArray = []
        for(let i = 0; i<rows; i++){
            boardArray[i]=[]
            for(let j=0; j< cols; j++){
                boardArray[i].push(`${i},${j}`)
            }
        }
        return boardArray
    }

    const board = getBoard(rows, cols)

    
        const carrier = new Ship(5, "Carrier")
        const battleship = new Ship(4, "Battleship")
        const cruiser = new Ship(3, "Cruiser")
        const submarine = new Ship(3, "Submarine")
        const destroyer = new Ship(2, "Destroyer")

const ships = [carrier,battleship,cruiser,submarine,destroyer]
      

 

    const placeShip = (ship, row, col, direction='row') => {
        if(row+ship.shipLength>board.length || col+ship.shipLength>board[row].length){
            throw new Error("The ship is too big to be placed there")
        
        }
        let arr = [];
        const shipName = ship.shipName.substring(0,3)
        for(l=0; l<ship.shipLength; l++){
           
            if(direction === 'col'){
                board[row+l][col] = ship.shipName
            //    arr.push(row+l, col)
            } else {
                 board[row][col+l] = ship.shipName
                //  arr.push(row, col+1)
            }
            ship.cells = arr 
            ship.abbr = shipName
        }
        
        return ship.cells
    
    }

    const receiveAttack = (row, col)=>{
       
        if (board[row][col] === `${row},${col}`){
           board[row][col] = '🚫'
        } else {ships.forEach(shipObj =>{
            
        if(board[row][col]===shipObj.shipName){
            board[row][col] = "💥"
            shipObj.hit()
        }
    })
}         
        return board[row][col]
       
    }

    const getProperties = () =>{
       const prop =  ships.forEach(boat =>{
        return boat.abbr
       })
    }






    return {getProperties,board, carrier, battleship, cruiser, submarine, destroyer, placeShip, receiveAttack, ships}
}





module.exports = gameboard