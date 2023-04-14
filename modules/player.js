import { letters, shipSizes, dimention } from "./globalData.js"
import { getRandomInt } from "./mathUtils.js"
import { printTable } from "./printer.js"

/**
 * Represents a player and owns a board and tracks his shots 
 */
export class Player {

    constructor(name) {
        this.name = name
        this.board = []
        this.shipPositions = []
        this.hits = []
        this.turns = 0
        this.shots = []
        this.availableShots = Array.from(Array(100).keys());
    };

    setup() {
        this.setBoard();
        this.positionShips();;
    }

    /**
    * Set initial board. An array of position strings e.g A0, A1, 100 positions) representing of 10 x 10 board
    */
    setBoard() {
        letters.forEach((letter) => {
            letters.forEach((elem, elemIndex) => {
                this.board.push(letter + elemIndex)
            })
        });
    }

    positionShips() {
        shipSizes.forEach(ship => this.shufflePositionForShipOfSize(ship));
    }

    /**
    * Generate a random position for a ship, and adds into the current positioned ship list set
    * @param {Int} size represents the lenght of the ship to be positioned.
    */
    shufflePositionForShipOfSize(size) {

        let indexSet = [];
        const takenPositions = this.shipPositions.flatMap(num => num);

        do {
            const indexFrom = getRandomInt(dimention);
            const letterFrom = letters[indexFrom];

            if ((indexFrom + size - 1) < dimention) {
                // From right to left
                for (let i = indexFrom; i < indexFrom + size; i++) {
                    const position = letterFrom + i;
                    const index = this.board.indexOf(position);
                    if (takenPositions.includes(index)) {
                        indexSet = [];
                        break;
                    } else {
                        indexSet.push(index);
                    }
                }

            } else if ((indexFrom - size + 1) > 0) {
                // From left to right
                for (let i = indexFrom; i > indexFrom - size; i--) {
                    const position = letterFrom + i;
                    const index = this.board.indexOf(position);
                    if (takenPositions.includes(index)) {
                        indexSet = [];
                        break;
                    } else {
                        indexSet.push(index);
                    }
                }
            }
          
        } while (indexSet.length == 0)
        
        /*
        // Debug log
        let generatedPosition = []
        for (let i = 0; i < indexSet.length; i++) {
         generatedPosition.push(board[indexSet[i]]) 
        }
        console.log(generatedPosition)
        */
        this.shipPositions.push(indexSet);
    }

    display() {
        console.log(`\nPlayer ${this.name}`);
        this.showStatus();
    }

    showStatus() {
        printTable(this.board, this.shipPositions);
    }

}