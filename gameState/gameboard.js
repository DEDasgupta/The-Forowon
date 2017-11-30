//import {CaseFile} from "./CaseFile";

var CluelessPlayer = require('./CluelessPlayer');
var CaseFile = require('./CaseFile');

class GameBoard {
    constructor() {

        this.grid = [
            [0, 0, 0, 1, 0],
            [1, 0, 0, 0, 1],
            [0, 0, 0, 0, 0],
            [1, 0, 0, 0, 0],
            [0, 1, 0, 1, 0]
        ];

        this.rooms = [
            {name: "Study", position: [0, 0], exits: [[0,1], [1,0], [4,4]]},
            {name: "Hall", position: [0, 2], exits: [[0,3], [1,2], [0,1]]},
            {name: "Lounge", position: [0, 4], exits: [[1,4], [0,3], [4,0]]},
            {name: "Library", position: [2, 0], exits: [[1,0], [2,1], [3,0]]},
            {name: "Billiard Room", position: [2, 2], exits: [[1,2], [2,3], [3,2], [2,1]]},
            {name: "Dining Room", position: [2, 4], exits: [[1,4], [3,4], [2,3]]},
            {name: "Conservatory", position: [4, 0], exits: [[3,0], [4,1], [0,4]]},
            {name: "Ballroom", position: [4, 2], exits: [[3,2], [4,3], [4,1]]},
            {name: "Kitchen", position: [4, 4], exits: [[3,4], [4,3], [0,0]]}
        ];

        this.halls = [
            {position: [0, 1], adjacentRooms: ["Study","Hall"]},
            {position: [0, 3], adjacentRooms: ["Lounge","Hall"]},
            {position: [1, 0], adjacentRooms: ["Study","Library"]},
            {position: [1, 2], adjacentRooms: ["Billiard Room","Hall"]},
            {position: [1, 4], adjacentRooms: ["Lounge","Dining Room"]},
            {position: [2, 1], adjacentRooms: ["Library","Billiard Room"]},
            {position: [2, 3], adjacentRooms: ["Billiard Room","Dining Room"]},
            {position: [3, 0], adjacentRooms: ["Library","Conservatory"]},
            {position: [3, 2], adjacentRooms: ["Billiard Room","Ballroom"]},
            {position: [3, 4], adjacentRooms: ["Dining Room","Kitchen"]},
            {position: [4, 1], adjacentRooms: ["Conservatory","Ballroom"]},
            {position: [4, 3], adjacentRooms: ["Ballroom","Kitchen"]}
        ];

        // the character name must match with the server name list
        this.characters = [
            {name: "Miss Scarlet", position: [0, 3]},
            {name: "Col. Mustard", position: [1, 4]},
            {name: "Mrs. White", position: [4, 3]},
            {name: "Mr. Green", position: [4, 1]},
            {name: "Mrs. Peacock", position: [3, 0]},
            {name: "Professor Plum", position: [1, 0]},
        ];

        this.weapons = ["Candlestick", "Knife", "Lead Pipe", "Revolver", "Rope", "Wrench"];

        this.allPlayers = new Array();
        this.activePlayers = new Array();

        this.caseFile = null;
        this.numberOfPlayers = 6;

        this.loadPlayers(this.numberOfPlayers);
        this.placeWeapons();
        var remainingCards = this.createCaseFile();
        this.dealRemainingCards(remainingCards, this.numberOfPlayers);
    }

    loadPlayers (numberOfPlayers){
        this.shuffleArray(this.characters).forEach(function(character, index){
            var player = new CluelessPlayer(index, character.name, [character.position[0], character.position[1]]);

            this.allPlayers.push(player);

            // This will be done in Server event when new player connect
            //if(index < numberOfPlayers){
            //    this.activePlayers.push(player);
            //}
        }, this);
    }

    //Add a weapon property to each room
    placeWeapons () {
        this.rooms = this.shuffleArray(this.rooms);
        this.shuffleArray(this.weapons).forEach(function(weapon, index){
            this.rooms[index].weapon = weapon;
        }, this);
    }

    createCaseFile () {
        var suspects = this.characters.map(function(obj){return obj.name});
        var rooms = this.rooms.map(function(obj){return obj.name});
        var weapons = this.weapons;

        suspects = this.shuffleArray(suspects);
        rooms = this.shuffleArray(rooms);
        weapons = this.shuffleArray(weapons);

        this.caseFile = new CaseFile(suspects.pop(), rooms.pop(), weapons.pop());

        return this.shuffleArray(suspects.concat(rooms, weapons));
    }

    dealRemainingCards(remainingCards, numberOfPlayers){
        remainingCards.forEach(function(card, index){
            this.allPlayers[index % numberOfPlayers].hand.push(card);
        }, this);
    }

    shuffleArray(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    }  

}
module.exports = GameBoard;

GameBoard.prototype.canPlayerMoveFromRoom = function(playerId, destX, destY){
    //Outside of available spaces
    if(destX < 0 || destX > 4 || destY < 0 || destY > 4) return false;

    //Space already occupied
    if(this.grid[destX][destY] == 1) return false;

    var player = this.allPlayers.filter(user => user.playerId == playerId)[0];

    //Player isn't even in a room
    if(player.isInRoom == false) return false;


    var roomArray = null;

    for (var i = 0; i < this.rooms.length; i++) {
        if (this.rooms[i].position[0] == player.position[0] && this.rooms[i].position[1] == player.position[1])
        {
            roomArray = this.rooms[i];
            break;
        }
    }
    //Didn't find room in matching position.
    if(roomArray == null) return false;

    //Room player is standing in has an open hall or secret passage to a room
    for (var i = 0; i < roomArray.exits.length; i++) {
        if (roomArray.exits[i][0] == destX && roomArray.exits[i][1] == destY)
        {
            return true;
        }
    }
    return false;

}

GameBoard.prototype.movePlayerFromRoom = function(playerId, destX, destY){
    var player = this.allPlayers.filter(user => user.playerId == playerId)[0];

    //update grid to show occupancy
    this.grid[player.position[0]][player.position[1]] = 0;
    this.grid[destX][destY] = 1;

    //update player position
    player.position = [destX, destY];

    //update player isInRoom
    player.isInRoom = false;
    for (var i = 0; i < this.rooms.length; i++){
        if (this.rooms[i].position[0] == destX && this.rooms[i].position[1] == destY)
        {
            player.isInRoom = true;
            break;
        }
    }
}

GameBoard.prototype.canPlayerMoveFromHall= function(playerId, destX, destY){
    debugger;
    //Outside of available spaces or space already occupied in grid
    if(destX < 0 || destX > 4 || destY < 0 || destY > 4) return false;

    if(this.grid[destX][destY] == 1) return false;

    var player = this.allPlayers.filter(user => user.playerId == playerId)[0];

    //Player isn't even in a hall
    if(player.isInRoom == true) return false;

    var hallArray = null;

    for (var i = 0; i < this.halls.length; i++) {
        if (this.halls[i].position[0] == player.position[0] && this.halls[i].position[1] == player.position[1])
        {
            hallArray = this.halls[i];
            break;
        }
    }
    //Didn't find room in matching position.
    if(hallArray == null) return false;

    //Hall player is standing in has an open room adjacent
    var adjacentRoomName = "none";

    for (var i = 0; i < this.rooms.length; i++){
        if (this.rooms[i].position[0] == destX && this.rooms[i].position[1] == destY)
        {
            adjacentRoomName = this.rooms[i].name;
            break;
        }
    }

    if(hallArray.adjacentRooms.indexOf(adjacentRoomName) != -1) return true;
    else return false;

}

GameBoard.prototype.movePlayerFromHall = function(playerId, destX, destY){
    var player = this.allPlayers.filter(user => user.playerId == playerId)[0];

    //update grid to show occupancy
    this.grid[player.position[0]][player.position[1]] = 0;
    this.grid[destX][destY] = 1;

    //update player position
    player.position = [destX, destY];

    //update player isInRoom (Can only go to room from hall)
    player.isInRoom = true;
}
