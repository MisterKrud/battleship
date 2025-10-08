const Ship = require("./battleship")

const gameboard = (rows = 10, cols = 10)=>{
    
    const getBoard = () => {
        const boardArray = []
        for(let i = 0; i<rows; i++){
            boardArray[i]=[]
            for(let j=0; j< cols; j++){
                boardArray[i].push([`${i},${j}`])
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

    const placeShip = (ship, row, col, direction='row') => {
        let arr = [];
        const shipName = (`${ship.shipName}`).split('');
        const shipAbbrev = `${shipName[0]}${shipName[1]}${shipName[2]}`
        for(l=0; l<ship.shipLength; l++){
            arr.push(shipAbbrev)
            if(direction === 'col'){
                board[row+l][col] = [shipAbbrev]
            } else {
                 board[row][col+l] = [shipAbbrev]
            }
        }
        return shipAbbrev
    
    }

        






    return {board, carrier, battleship, cruiser, submarine, destroyer, placeShip}
}





module.exports = gameboard