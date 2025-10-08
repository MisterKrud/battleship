const Ship = require("./battleship")



test('Check that ship has correct length', () => {
    const testSub = new Ship(3)
    expect(testSub.shipLength).toEqual(3)
})

test('Check that ship sinks when hitNum reachers shipLength', () => {
    const testSub = new Ship(3)
    testSub.hitNum = 3
    expect(testSub.isSunk()).toBeTruthy()
})

test('Check a ship is sunk if number is greater than length', ()=>{
    const testCarrier = new Ship(5);
    testCarrier.hitNum = 6;
    expect(testCarrier.isSunk()).toBeTruthy();
})

test('Check ship remains unsunk if hitNum is less than shipLength', ()=>{
    const testCruiser = new Ship(3);
    testCruiser.hitNum=2;
    expect(testCruiser.isSunk()).toBeFalsy();
})
