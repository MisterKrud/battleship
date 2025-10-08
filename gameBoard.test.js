const Ship = require("./battleship");
const gameboard = require("./gameboard");
const testBoard = gameboard(10, 10);
// const boardGrid = testBoard.board

test('Check gameboard renders correct number of squares', ()=>{
    const testBoardSize = testBoard.board
    expect(testBoardSize.length).toBe(10)
    expect(testBoardSize[0].length).toBe(10)
})


test('Check rows contain array of coordinates', () => {
    expect(testBoard.board[0]).toEqual(['0,0', '0,1', '0,2', '0,3', '0,4', '0,5', '0,6', '0,7', '0,8', '0,9'])
})

///internal
test('Check cells resolve to coordinates', () => {
    expect(testBoard.board[5][4]).toEqual("5,4")
})


test('Check ship is succesfully called from gameboard', ()=>{
    expect(testBoard.submarine).toBeTruthy()
})

test('check placeShip puts ship on board at chosen coordinates', () =>{
    testBoard.placeShip(testBoard.submarine, 0, 0, 'row');
    const slicedArray = testBoard.board[0].slice(0,3)
    expect(slicedArray).toEqual(expect.arrayOf("submarine", "submarine", "submarine"))
})

test('check placeShip correctly places ship in a column if selected', ()=>{
     testBoard.placeShip(testBoard.battleship, 3, 5, 'col');
    const colArray = [testBoard.board[3][5],testBoard.board[4][5],testBoard.board[5][5],testBoard.board[6][5]];
    expect(colArray).toEqual(expect.arrayOf("battleship", "battleship", "battleship", "battleship"))
    
})

test('Check placeShip prevents ship placement outside the board', ()=>{
   function placeCruiser() {
    testBoard.placeShip(testBoard.cruiser( 1, 7))
   } 
   function placeCruiserCol(){
    testBoard.placeShip(testBoard.cruiser(7, 1, 'col'))
   }
    expect(placeCruiser).toThrow(Error);
    expect(placeCruiserCol).toThrow(Error);
})


//internal - receiveAttack()
test('Check receiveAttack registers on correct empty coordinate', ()=>{
    expect(testBoard.receiveAttack(3, 7)).toEqual("🚫")
})

//internal - receiveAttack
test('Check receive attack registers ship in cell', ()=>{
     testBoard.placeShip(testBoard.cruiser, 5, 4, 'row');
     expect(testBoard.board[5][4]).toEqual("cruiser");
     expect(testBoard.receiveAttack(5,4)).toEqual("💥")
})

//internal - isSunk()
test('Check ship is sunk when all parts are hit', ()=>{
    testBoard.placeShip(testBoard.destroyer, 4,7, 'col')
    expect(testBoard.destroyer.isSunk()).toBeFalsy();

    testBoard.destroyer.hit();
    testBoard.destroyer.hit();
    expect(testBoard.destroyer.isSunk()).toBeTruthy();
})

//internal - isSunk()
test('check ship is sunk when after appropriate number of reveiveAttack()',()=>{
    testBoard.receiveAttack(5,5);
    testBoard.receiveAttack(5,6);
    expect(testBoard.cruiser.isSunk()).toBeTruthy()
})


//internal - hitNum / receiveAttack()
test('check previously hit cells return a message without changing the cell or hitNum',()=>{
   testBoard.receiveAttack(0,1);
    expect(testBoard.board[0][1]).toBe('💥')
    expect(testBoard.submarine.hitNum).toBe(2)
    testBoard.receiveAttack(0,1);
    expect(testBoard.submarine.hitNum).toBe(2)
    
})
//Internal - receiveAttack
test('Check that a sunk ship is removed from the board', () =>{
    testBoard.receiveAttack(0,0);
    testBoard.receiveAttack(0,2);
     testBoard.receiveAttack(5,5);
      testBoard.receiveAttack(4,2);
       testBoard.receiveAttack(1,3);
        testBoard.receiveAttack(9,8);
         testBoard.receiveAttack(6,7);
          testBoard.receiveAttack(3,9);
    expect(testBoard.ships.has('submarine')).toBeFalsy();
    expect(testBoard.attackedCells).toEqual('')
})

