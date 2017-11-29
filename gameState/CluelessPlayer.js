class CluelessPlayer{
    constructor(playerId, character, position){
        this.playerId = playerId;
        this.character = character;
        this.position = position;
        this.hand = new Array();
        this.isInRoom = false;
    }
}

module.exports = CluelessPlayer;