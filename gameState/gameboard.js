import {CaseFile} from "./CaseFile";

const CluelessPlayer = require('./CluelessPlayer');
const CluelessPlayer = require('./CaseFile');

var GameBoard = {};

GameBoard.grid = [
    [0, 0, 0, 1, 0],
    [1, 0, 0, 0, 1],
    [0, 0, 0, 0, 0],
    [1, 0, 0, 0, 0],
    [0, 1, 0, 1, 0]
];

GameBoard.rooms = [
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

GameBoard.halls = [
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

GameBoard.characters = [
    {name: "Colonel Mustard", position: [1, 4]},
    {name: "Miss Scarlett", position: [0, 3]},
    {name: "Mr. Green", position: [4, 1]},
    {name: "Mrs. Peacock", position: [3, 0]},
    {name: "Mrs. White", position: [4, 3]},
    {name: "Professor Plum", position: [1, 0]},
];

GameBoard.weapons = ["Candlestick", "Knife", "Lead Pipe", "Revolver", "Rope", "Wrench"];

GameBoard.allPlayers = [];
GameBoard.activePlayers = [];

GameBoard.caseFile = null;

GameBoard.init = function(numberOfPlayers) {
    GameBoard.loadPlayers(numberOfPlayers);
    GameBoard.placeWeapons();
    var remainingCards = GameBoard.createCaseFile();
    GameBoard.dealRemainingCards(remainingCards, numberOfPlayers);
}

GameBoard.loadPlayers = function(numberOfPlayers){
    shuffleArray(GameBoard.characters).forEach(function(character, index){
        var player = new CluelessPlayer(index, character.name, [character.position[0], character.position[1]])

        GameBoard.allPlayers.push(player);

        if(index < numberOfPlayers){
            GameBoard.activePlayers.push(player);
        }
    });
}

//Add a weapon property to each room
GameBoard.placeWeapons = function() {
    GameBoard.rooms = shuffleArray(GameBoard.rooms);
    shuffleArray(GameBoard.weapons).forEach(function(weapon, index){
        GameBoard.rooms[index].weapon = weapon;
    });
}

GameBoard.createCaseFile = function() {
    var suspects = GameBoard.characters.map(function(obj){return obj.name});
    var rooms = GameBoard.rooms.map(function(obj){return obj.name});
    var weapons = GameBoard.weapons;

    suspects = shuffleArray(suspects);
    rooms = shuffleArray(rooms);
    weapons = shuffleArray(weapons);

    GameBoard.caseFile = new CaseFile(suspects.pop(), rooms.pop(), weapons.pop());

    return shuffleArray(suspects.concat(rooms, weapons));
}

GameBoard.dealRemainingCards = function(remainingCards, numberOfPlayers){
    remainingCards.forEach(function(card, index){
        GameBoard.activePlayers[index % numberOfPlayers].hand.push(card);
    });
}

function shuffleArray(array) {
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

GameBoard.canPlayerMoveFromRoom = function(playerId, destX, destY){
    //Outside of available spaces
    if(destX < 0 || destX > 4 || destY < 0 || destY > 4) return false;

    //Space already occupied
    if(GameBoard.grid[destX][destY] == 1) return false;

    var player = GameBoard.allPlayers.filter(user => user.playerId = playerId)[0];

    //Player isn't even in a room
    if(player.isInRoom == false) return false;

    var roomArray = GameBoard.rooms.filter(room => room.position = player.position);

    //Didn't find room in matching position.
    if(roomArray.length != 1) return false;

    //Room player is standing in has an open hall or secret passage to a room
    if(roomArray[0].exits.contains([destX, destY])) return true;
    else return false;

}

GameBoard.movePlayerFromRoom = function(playerId, destX, destY){
    var player = GameBoard.allPlayers.filter(user => user.playerId = playerId)[0];

    //update grid to show occupancy
    GameBoard.grid[player.position[0]][player.position[1]] = 0;
    GameBoard.grid[destX][destY] = 1;

    //update player position
    player.position = [destX, destY];

    //update player isInRoom
    if(GameBoard.rooms.filter(room => room.position == [destX, destY]).length > 0){
        player.isInRoom = true;
    } else{
        player.isInRoom = false;
    }
}

GameBoard.canPlayerMoveFromHall= function(playerId, destX, destY){
    //Outside of available spaces or space already occupied in grid
    if(destX < 0 || destX > 4 || destY < 0 || destY > 4 || GameBoard.grid[destX][destY] == 1) return false;

    var player = GameBoard.allPlayers.filter(user => user.playerId = playerId)[0];

    //Player isn't even in a hall
    if(player.isInRoom == true) return false;

    var hallArray = GameBoard.halls.filter(hall => hall.position = player.position);

    //Didn't find room in matching position.
    if(hallArray.length != 1) return false;

    //Hall player is standing in has an open room adjacent
    var adjacentRoomName = GameBoard.rooms.filter(room => room.position == [destX, destY])[0].name;

    if(hallArray[0].adjacentRooms.contains(adjacentRoomName)) return true;
    else return false;

}

GameBoard.movePlayerFromHall = function(playerId, destX, destY){
    var player = GameBoard.allPlayers.filter(user => user.playerId = playerId)[0];

    //update grid to show occupancy
    GameBoard.grid[player.position[0]][player.position[1]] = 0;
    GameBoard.grid[destX][destY] = 1;

    //update player position
    player.position = [destX, destY];

    //update player isInRoom (Can only go to room from hall)
    player.isInRoom = true;
}