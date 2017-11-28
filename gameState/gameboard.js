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
    {name: "Study", position: [0, 0], exits: ["right", "down", "secret"]},
    {name: "Hall", position: [0, 2], exits: ["right", "down", "left"]},
    {name: "Lounge", position: [0, 4], exits: ["down", "left", "secret"]},
    {name: "Library", position: [2, 0], exits: ["up", "right", "down"]},
    {name: "Billard Room", position: [2, 2], exits: ["up", "right", "down", "left"]},
    {name: "Dining Room", position: [2, 4], exits: ["up", "down", "left"]},
    {name: "Conservatory", position: [4, 0], exits: ["up", "right", "secret"]},
    {name: "Ballroom", position: [4, 2], exits: ["up", "right", "left"]},
    {name: "Kitchen", position: [4, 4], exits: ["up", "left", "secret"]}
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
        var player = new CluelessPlayer(index, character.name, character.position[0], character.position[1])

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

