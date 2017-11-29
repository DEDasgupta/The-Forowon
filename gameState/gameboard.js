//import { CaseFile } from "./gameState/CaseFile";

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

        this.characters = [
            {name: "Colonel Mustard", position: [1, 4]},
            {name: "Miss Scarlett", position: [0, 3]},
            {name: "Mr. Green", position: [4, 1]},
            {name: "Mrs. Peacock", position: [3, 0]},
            {name: "Mrs. White", position: [4, 3]},
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
            var player = new CluelessPlayer(index, character.name, character.position[0], character.position[1])

            this.allPlayers.push(player);

            if(index < this.numberOfPlayers){
                this.activePlayers.push(player);
            }
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
            this.activePlayers[index % numberOfPlayers].hand.push(card);
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

