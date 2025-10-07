 class Ship{
    constructor(shipLength){
        this.shipLength = shipLength;
        this.hitNum = 0;
  
    }
    hit(){
    this.hitNum++
    }

    isSunk(){
        if(this.hitNum >= this.shipLength)
            {
                return true
            } else {
                return false
            };
    }
}

module.exports = Ship