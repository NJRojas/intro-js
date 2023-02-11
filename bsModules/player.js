import { letters } from "./globalData"
import { getRandomInt, flipChoice } from "./mathUtils.js"
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
    }

    setup() {
        this.setBoard()
        this.positionShips()
    }

    /**
    * Set initial board. An array of position strings e.g A0, A1, 100 positions) representing of 10 x 10 board
    */
    setBoard() {
        letters.forEach((letter) => {
            letters.forEach((elem, elemIndex) => {
                this.board.push(letter + elemIndex)
            })
        })
    }

    positionShips() {
        shipSizes.forEach(ship => this.shufflePositionFor(ship))
    }

    /**
    * Generate a random position for a ship, and adds into the current positioned ship list set
    * @param {Int} size represents the lenght of the ship to be positioned.
    */
    shufflePositionFor(size) {

        let indexSet = []
        const takenPositions = this.shipPositions.flatMap(num => num)

        function generateIndexesIncreasing(from, to, letterFrom, inBoard) {
            for (let i = from; i < to; i++) {
                const position = letterFrom + i
                const index = inBoard.indexOf(position)
                if (takenPositions.includes(index)) {
                    indexSet = []
                    break
                } else {
                    indexSet.push(index)
                }
            }
        }

        function generateIndexDecreasing(from, to, letterFrom, inBoard) {
            for (let i = from; i > to; i--) {
                const position = letterFrom + i
                const index = inBoard.indexOf(position)
                if (takenPositions.includes(index)) {
                    indexSet = []
                    break
                } else {
                    indexSet.push(index)
                }
            }
        }

        do {
            const indexFrom = getRandomInt()
            const letterFrom = letters[indexFrom]
            const direction = flipChoice()

            // Try horizontal, which option A
            if (direction == 'A') {
                if ((indexFrom + size - 1) < dimention) {
                    // From right to left
                     generateIndexesIncreasing(indexFrom, indexFrom + size, letterFrom, this.board)

                } else if ((indexFrom - size + 1) > 0) {
                    // From left to right
                    generateIndexDecreasing(indexFrom, indexFrom - size, letterFrom, this.board)
                }

            } else {
                // Try vertical, which option B
                if ((indexFrom + size - 1) < dimention) {
                    // From right to left
                    generateIndexesIncreasing(indexFrom, indexFrom + size, letterFrom, this.board)

                } else if ((indexFrom - size + 1) > 0) {
                    // From left to right
                    generateIndexDecreasing(indexFrom, indexFrom - size, letterFrom, this.board)
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
        this.shipPositions.push(indexSet)
    }

    display() {
        console.log(`\nPlayer ${this.name}`)
        printTable()
    }

    printTable() {
        printTable(this.board, this.shipPositions)
    }

}