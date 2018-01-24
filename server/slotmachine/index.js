/** Class to represent a slot machine */
class SlotMachine{
  /**
   * Creates Slot Machine.
   * @param {number} reelSize - How many reels in the slotmachine.
   * @param {number} smallWin - Number of identical reels for a small win.
   * @param {number} bigWin -  Number of identical reels for a big win.
   */
  constructor(reelSize,smallWin,bigWin){
    this._reels = null;
    this._win = null;
    this._bonus = null;
    this._reelSize = reelSize;
    this._smallWin = smallWin;
    this._bigWin = bigWin;

    this.newRound = this.newRound.bind(this);
      
  }

  /**
  * creates new round 
  * randomizes reels
  * check for wins
  * check for bonus
  */
  newRound(){
    this.randomizeReels();
    this.calculateWinType();
    this.calculateBonus();    
  }

  /**
  * creates reels based on reelSize
  * fills reels with random number between 0 and 5 
  */
  randomizeReels(){
    this._reels = new Array(this._reelSize).fill(0).map(reel => {
      return Math.floor(Math.random() * 6)
    })
  }

  /**
  * finds equal reels
  * declare small win upon matching small win number of occurancies
  * declare big win upon matching small win number of occurancies
  * else declare no win
  */
  calculateWinType(){
    let sortedReels = this._reels.slice(0).sort();
    
    let duplicates = {};
    for ( let i = 0 ; i < sortedReels.length; i++){
      if( i+1 < sortedReels.length && sortedReels[i] === sortedReels[i+1]){
        let val = sortedReels[i];
        duplicates[val] = duplicates[val] ? (duplicates[val] + 1)  : 2;
      }
    }

    for( let key in duplicates){
      if(duplicates[key] === this._bigWin){
        return this._win = "Big Win";
      }
      if(duplicates[key] === this._smallWin){
        return this._win = "Small Win"
      }
    }

    return this._win = "No Win";
  }

  /*
  * Randomly [0-1] decide if bonus is triggered
  */
  calculateBonus(){
    this._bonus = ( Math.floor(Math.random()*2) ) ?  true : false ;
  }

  /*
  returns slot machine round information
  */
  get round() {
    return {
      reels: this._reels,
      bonus: this._bonus,
      win: this._win,
    }
  }

}

export default SlotMachine;