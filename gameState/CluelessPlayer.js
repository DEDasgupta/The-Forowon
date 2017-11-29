export class CluelessPlayer{
    constructor(playerId, character, position){
        this.playerId = playerId;
        this.character = character;
        this.position = position;
        this.hand = [];
        this.isInRoom = false;
    }
}