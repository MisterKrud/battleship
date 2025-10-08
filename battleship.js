 class Ship{
    constructor(shipLength, shipName){
        this.shipLength = shipLength;
        this.hitNum = shipLength;
        this.shipName = shipName;
  
    }

   
    hit(){
    this.hitNum--
    }

    isSunk(){
        if(this.hitNum <= 0)
            {
                return true
            } else {
                return false
            };
    }
}

module.exports = Ship