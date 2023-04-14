/*
  Description
  🛶 -> Ship of 2 positions
  🛥️ -> Ship of 3 positions
  ⛴️ -> Ship of 4 positions
  🚢 -> Ship of 5 positions
  💥 -> Hit a ship
  💧 -> Water or missing shot
  🔥 -> Represent a position of a sunken ship
  ' ' -> Empty position
*/

// ******************************* Global Constants *******************************

const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J']
const shipSizes = [2, 2, 2, 3, 3, 4, 5]
const dimention = 10
const icons = {
    ship2: '🛶',
    ship3: '⛵️',
    ship4: '🚤',
    ship5: '🚢',
    hit: '💥',
    water: '💧',
    sunk: '🔥',
    empty: "' '"
}
const iconList = ['🛶', '⛵️', '🚤', '🚢', '💥', '💧', '🔥']
const line = '_'.repeat(72)

// ******************************* Math and util functions *******************************

/**
 * returns a ship icon representing a ship of the given length
 * @param {Int} length represents the lenght of a ship
 * @returns {String} an icon
 */
function iconFor(length) {
    switch(length) {
        case 2:
            return icons.ship2
        case 3:
            return icons.ship3
        case 4:
            return icons.ship4
        case 5:
            return icons.ship5
        default:
            return '';
    }
}

/**
 * Generates a random number from 0 to max
 * @return an integer within the range [0, max]
 */
function getRandomInt(max = dimention) {
    return Math.floor(Math.random() * max);
}

/**
 * Select in a random way between 2 options, simulate a flip coin
 * @param   {String} optionA Option 1 to flip
 * @param   {String} optionB Option 2 to flip
 * @returns {String} option result
 */
function flipChoice(optionA = 'A', optionB = 'B') {
    const value = Math.random()
    if (value > 0.5) {
        return optionA
    } else {
        return optionB
    }
}

// ******************************* Math and util functions *******************************

/**
 * Represents a player and has board and tracks 
 */
class Player {

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
            const indexFrom = getRandomInt(dimention)
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
        this.printTable()
    }

    printTable() {

        // Copy board
        let graphicBoard = this.board.slice()
    
        // place ship icons
        for (let i = 0; i < this.shipPositions.length; i++) {
            const ship = this.shipPositions[i]

            for (let j = 0; j < ship.length; j++) {
                const icon = iconFor(ship.length)
                const index = ship[j]
                if (icon.length > 0 && graphicBoard[index] != icons.hit && graphicBoard[index] != icons.sunk) {
                    graphicBoard[index] = icon
                }
            }
        }

        // translate empty positions
        for (let i = 0; i < graphicBoard.length; i++) {
            if (!iconList.includes(graphicBoard[i])) {
                graphicBoard[i] = icons.empty
            }
        }

        const boardLine = '-'.repeat(71)
        const header    = `\n| (INDEX) |  0  |  1  |  2  |  3  |  4  |  5  |  6  |  7  |  8  |  9  |`
        let table       = `\n${boardLine}${header}\n${boardLine}`

        for (let i = 0; i < letters.length; i++) {
            let row = `|    ${letters[i]}    |`
            for (let j = 0; j < letters.length; j++) {
                const index = (i * 10) + j
                if (graphicBoard[index] == icons.empty) {
                    row += ` ${graphicBoard[index]} |`
                } else {
                    row += ` ${graphicBoard[index]}  |`
                }
            }
            table += `\n${row}\n${boardLine}`
        }
        console.log(table)
    }
}

// ******************************* The Game *******************************
/**
 * Selects a valid position, that is, it has not been taken before
 * and updates the board of the rival with the corresponding icon
 * It requires
 * @param {[Strings]}   target      A flat list of shipment positions of the rival.
 * @param {{}}          shooter     A dictionary representing the shooter player.
 * @param {{}}          rival       A dictionary representing the target player.
 */
function shoot(shooter, rival, target) {
    let shot
    let index

    // Get a valid index
    do {
        index = getRandomInt(rival.board.length - 1)

        // Check if it is not a taken position
        if (!shooter.shots.includes(index)) {
            shot = rival.board[index].slice()
        }

    } while (typeof shot == 'undefined')

    // track shots
    shooter.shots.push(index)

    if (target.includes(index)) {
        rival.board[index] = icons.hit
        shooter.hits.push(index)
        const sunkShipslog = checkForSunkShips(rival, index)

        //Show log
        if (sunkShipslog.length > 0) {
            console.log(`Shot position: ${shot} -> ${sunkShipslog}, you rock ☄️, you just sunk a ship`)
        } else {
            console.log(`Shot position: ${shot} -> ${icons.hit}, Well done 💯, you hit a ship`)
        }

        // Current player hit, he/she can play again, but first check that not all rival ships are sunk
        if (shooter.hits.length < target.length) {
            shoot(shooter, rival, target)
        } else {
            console.log(`Updating board of player ${rival.name}`)
            rival.printTable()
        }

    } else {
        rival.board[index] = icons.water
        console.log(`Shot position: ${shot} -> ${rival.board[index]}, you"ll do better next shot `)
        console.log(`Updating board of player ${rival.name}`)
        rival.printTable()
    }
 }

/**
 * Runs the game automatically, until getting a winner
 */
function play() {

    console.log(`\n${line}\n\nLet us begin the game\n${line}`)

    let winner
    let flatShipPositionsA = playerA.shipPositions.flatMap(num => num)
    let flatShipPositionsB = playerB.shipPositions.flatMap(num => num)
    
    let currentPlayer = playerA
    let rival = playerB
    let targetPositions = flatShipPositionsB

    do {
        currentPlayer.turns += 1
        console.log(`\nTurn for player ${currentPlayer.name} \nMove #${currentPlayer.turns} - Shot: ${currentPlayer.shots.length + 1}`)
        shoot(currentPlayer, rival, targetPositions)
        
        if (currentPlayer.hits.length == targetPositions.length) {
            winner = `THE WINNER IS ${currentPlayer.name}`
            break
        }

        // Swap current player
        if (currentPlayer.name == playerA.name) {
            currentPlayer = playerB
            rival = playerA
            targetPositions = flatShipPositionsA
        } else {
            currentPlayer = playerA
            rival = playerB
            targetPositions = flatShipPositionsB
        }

    } while (typeof winner == 'undefined')

    console.log(winner)
}

/**
 * Looks for the latest hit ship and verifies if is sunk, if it is sunk, 
 * updates the ship with '🔥' and returns a string of '🔥' according to the lentgh of the sunk ship
 * @param {{}} player A dictionary of the target player
 * @param {Int} hit Index position of the latest hit
 * @returns {String} messeage to log
 */
function checkForSunkShips(player, hit) {

    let hitShip = []

    // 1. Find the hit
    for (let i = 0; i < player.shipPositions.length; i++) {
        const ship = player.shipPositions[i]
        const found = ship.find(elem => elem == hit)
        if (typeof found != 'undefined') {
            hitShip = ship.slice()
            break
        }
    }

    if (hitShip.length == 0) {
        return ""
    } 

    //2. Check if it is sunk
    for (let j = 0; j < hitShip.length; j++) {
        const index = hitShip[j]
        if (player.board[index] != icons.hit) {
            return ""
        } 
    }

    //3. Update sunk ship
    hitShip.forEach(index => player.board[index] = icons.sunk)

    return icons.sunk.repeat(hitShip.length)
}

function setupGame() {

    // 1. Create boards & place ships
    playerA.setup()
    playerB.setup()

    // Shows initial configuration, boards with positioned ships 
    const header = `${line}\n\n                              BATTLESHIP\n${line}`
    const description = `\nDescription \n\n${icons.ship2}  -> Ship of 2 positions \n${icons.ship3}  -> Ship of 3 positions \n${icons.ship4}  -> Ship of 4 positions \n${icons.ship5}  -> Ship of 5 positions \n${icons.hit}  -> Hit a ship \n${icons.water}  -> Water or missing shot \n${icons.sunk}  -> Ship sunken \n${icons.empty} -> Empty position`
    console.log(`${header}\n${description}`)

    playerA.display()
    playerB.display()
}

let playerA = new Player('A')
let playerB = new Player('B')

// 1. Setup Game
setupGame()

// 2. Play
play()