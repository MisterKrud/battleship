const Ship = require("../src/battleship")



test('Check that ship has correct length', () => {
    const testSub = new Ship(3)
    expect(testSub.shipLength).toEqual(3)
})

test('Check that ship sinks when hitNum reaches 0', () => {
    const testSub = new Ship(3)
    testSub.hitNum = 0
    expect(testSub.isSunk()).toBeTruthy()
})

test('Check a ship is sunk if number is less than 0', ()=>{
    const testCarrier = new Ship(5);
    testCarrier.hitNum = -1;
    expect(testCarrier.isSunk()).toBeTruthy();
})

test('Check ship remains unsunk if hitNum is less than 0', ()=>{
    const testCruiser = new Ship(3);
    testCruiser.hitNum=2;
    expect(testCruiser.isSunk()).toBeFalsy();
})
