class CluelessPlayer{
    constructor(playerId, character, position){
        this.playerId = playerId;
        this.character = character;
        this.position = position;
        this.hand = new Array();
        this.isInRoom = false;
        this.room = "";
        this.isActive = false;

        // Player can only move once, suggestion once per turn
        // Accustion once per game
        this.isMove = false;
        this.isSuggestion = false;
        this.isAccusation = false;
    }
}

module.exports = CluelessPlayer;