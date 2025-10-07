const Ship = class{
    consructor (shipLength, hitNum){
        this.shipLength = shipLength;
        this.hitNum = hitNum;
        this.sunk = false;
    }
    hit(){
      return hitNum++
    }

    isSunk(){
        this.hitNum >= this.shipLength ? true : false;
    }
}