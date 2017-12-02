//import {CaseFile} from "./CaseFile";

var CluelessPlayer = require("./CluelessPlayer");
var CaseFile = require("./CaseFile");

class GameBoard {
    constructor() {

        this.grid = [
            [0, 0, 0, 1, 0],
            [1, 0, 0, 0, 1],
            [0, 0, 0, 0, 0],
            [1, 0, 0, 0, 0],
            [0, 1, 0, 1, 0]
        ];

        this.roomGrid = [
            ["Study","Hallway","Hall","Hallway","Lounge"],
            ["Hallway","","Hallway","","Hallway"],
            ["Library","Hallway","Billiard Room","Hallway","Dining Room"],
            ["Hallway","","Hallway","","Hallway"],
            ["Conservatory","Hallway","Ballroom","Hallway","Kitchen"]
        ];

        this.roomsMap = {"Study":true,"Hall":true,"Lounge":true,"Library":true,"Billiard Room":true,"Dining Room":true,"Conservatory":true,"Ballroom":true,"Kitchen":true};

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
            {name: "Miss Scarlet", short: "Scarlet", position: [0, 3]},
            {name: "Professor Plum", short: "Plum", position: [1, 0]},
            {name: "Mrs. Peacock", short: "Peacock", position: [3, 0]},
            {name: "Mr. Green", short: "Green", position: [4, 1]},
            {name: "Mrs. White", short: "White", position: [4, 3]},
            {name: "Col. Mustard", short: "Mustard", position: [1, 4]}
        ];

        this.weapons = ["Candlestick", "Knife", "Lead Pipe", "Revolver", "Rope", "Wrench"];

        this.allPlayers = new Array();
        this.activePlayers = new Array();

        this.caseFile = null;
        this.numberOfPlayers = 6;

        this.playerTurn = "";

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

GameBoard.prototype.validateSuggestion = function(splayer, data){
    var suggestionCards = [data.weapon, data.room, data.suspect];
    var part1 = splayer.character + " suggested that " + data.suspect + " used a " + data.weapon + " in the " + data.room;
    var part2 = " and no other player can disprove this suggestion";
    for (playerIndex in this.allPlayers) {
        var player = this.allPlayers[playerIndex];
        if (player.playerId != splayer.playerId) {
            for (cardIndex in player.hand) {
                var card = player.hand[cardIndex];
                for (scIndex in suggestionCards) {
                    var sc = suggestionCards[scIndex];
                    if (sc === card) {
                        part2 = " but " + player.character + " holds the card " + card;
                    }
                }
            }
        }
    }
    console.log(this.allPlayers)
    var movePlayer = this.allPlayers.filter(user => user.character == data.suspect)[0];
    var moveRoom = this.rooms.filter(room => room.name == data.room)[0];
    var moveChar = this.characters.filter(char => char.name == data.suspect)[0]
    console.log(movePlayer);
    var delta = [movePlayer.position[0]-moveRoom.position[0],movePlayer.position[1]-moveRoom.position[1]]
    console.log(delta)
    ige.server.playersNameMap[moveChar.short]._translate.tween().stepBy({x:delta[1]*-120,y:delta[0]*-120},1000).start();
    this.grid[movePlayer.position[0]][movePlayer.position[1]] = 0;
    movePlayer.position = [moveRoom.position[0],moveRoom.position[1]];
    movePlayer.isInRoom = true;
    
    return part1 + part2
}

GameBoard.prototype.validateAccusation = function(splayer, data){
    console.log(this.caseFile)
    if (this.caseFile.suspect === data.suspect && this.caseFile.weapon === data.weapon && this.caseFile.room === data.room) {
        return true;
    }
    return false;

}

GameBoard.prototype.canPlayerMoveFromRoom = function(playerId, destX, destY){
    //Outside of available spaces
    if(destX < 0 || destX > 4 || destY < 0 || destY > 4) return false;

    //Space already occupied
    if(this.grid[destX][destY] == 1) return false;

    var player = this.allPlayers.filter(user => user.playerId == playerId)[0];

    //Player isn"t even in a room
    if(player.isInRoom == false) return false;


    var roomArray = null;

    for (var i = 0; i < this.rooms.length; i++) {
        if (this.rooms[i].position[0] == player.position[0] && this.rooms[i].position[1] == player.position[1])
        {
            roomArray = this.rooms[i];
            break;
        }
    }
    //Didn"t find room in matching position.
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
    var newRoom = this.roomGrid[player.position[0]][player.position[1]]
    if (this.roomsMap[newRoom]) {
        player.isInRoom = true;
    } else {
        player.isInRoom = false;
    }
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

    //Player isn"t even in a hall
    if(player.isInRoom == true) return false;

    var hallArray = null;

    for (var i = 0; i < this.halls.length; i++) {
        if (this.halls[i].position[0] == player.position[0] && this.halls[i].position[1] == player.position[1])
        {
            hallArray = this.halls[i];
            break;
        }
    }
    //Didn"t find room in matching position.
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
