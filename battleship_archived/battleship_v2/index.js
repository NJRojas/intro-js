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
const line = '________________________________________________________________________'

let playerA = {
    name: 'A',
    board: [],
    shipPositions: [],
    hits: [],
    turns: 0,
    shots : []
}

let playerB = {
    name: 'B',
    board: [],
    shipPositions: [],
    hits: [],
    turns: 0,
    shots : []
}

/**
 * Generates a board (an array of strings with 100 positions) representing the board of 10 x 10
 * @returns {[String]}  A board, which is an array of 100 elements full of indexes
 */
function generateBoard() {
    let board = []
    for (let i = 0; i < letters.length; i++) {
        for (let j = 0; j < letters.length; j++) {
            board.push(letters[i] + j)
        }
    }
    return board
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

/**
 * Generate a random position for a ship, and adds into the current positioned ship list set
 * @param {Int} size represents the lenght of the ship to be positioned.
 * @param {[Int]} shipList A list of positioned ships
 * @param {[String]} board Player board to position ships on
 */
function shuffleShipPositions(size = 0, shipList = [], board) {

    let indexSet = []
    const takenPositions = shipList.flatMap(num => num)

    function generateIndexesIncreasing(from, to, letterFrom) {
        for (let i = from; i < to; i++) {
            const position = letterFrom + i
            const index = board.indexOf(position)
            if (takenPositions.includes(index)) {
                indexSet = []
                break
            } else {
                indexSet.push(index)
            }
        }
    }

    function generateIndexDecreasing(from, to, letterFrom) {
        for (let i = from; i > to; i--) {
            const position = letterFrom + i
            const index = board.indexOf(position)
            if (takenPositions.includes(index)) {
                indexSet = []
                break
            } else {
                indexSet.push(index)
            }
        }
    }

    do {
        let indexFrom = getRandomInt(dimention)
        let letterFrom = letters[indexFrom]
        let direction = flipChoice()

        // Try horizontal, which option A
         if (direction == 'A') {
            if ((indexFrom + size - 1) < dimention) {
                // From right to left
                generateIndexesIncreasing(indexFrom, indexFrom + size, letterFrom)

            } else if ((indexFrom - size + 1) > 0) {
                // From left to right
                generateIndexDecreasing(indexFrom, indexFrom - size, letterFrom)
            }

        } else {
            // Try vertical, which option B
            if ((indexFrom + size - 1) < dimention) {
                // From right to left
                generateIndexesIncreasing(indexFrom, indexFrom + size, letterFrom)

            } else if ((indexFrom - size + 1) > 0) {
                // From left to right
                generateIndexDecreasing(indexFrom, indexFrom - size, letterFrom)

            }
        } 
    } while (indexSet.length == 0)
    /*
    // Debug log
    let generatedPosition = []
    for (i = 0; i < indexSet.length; i++) {
        generatedPosition.push(board[indexSet[i]]) 
    }
    console.log(generatedPosition)
    */
    shipList.push(indexSet)
}

function placeShips(player) {
    for(let i = 0; i < shipSizes.length; i++) {
        shuffleShipPositions(shipSizes[i], player.shipPositions, player.board)
    }
}

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
            shot = rival.board[index]
        }

    } while (typeof shot == 'undefined')

    // track shots
    shooter.shots.push(index)

    if (target.includes(index)) {
        const hitPosition = rival.board[index]
        rival.board[index] = icons.hit
        shooter.hits.push(index)
        const sunkShipslog = checkForSunkShips(rival, index)

        //Show log
        if (sunkShipslog.length > 0) {
            console.log(`Shot position: ${hitPosition} -> ${sunkShipslog}, you rock ☄️, you just sunk a ship`)
        } else {
            console.log(`Shot position: ${hitPosition} -> ${icons.hit}, Well done 👏🏻, you hit a ship`)
        }

        // Current player hit, he/she can play again, but first check that not all rival ships are sunk
        if (shooter.hits.length < target.length) {
            shoot(shooter, rival, target)
        } else {
            console.log(`Updating board of player ${rival.name}`)
            printBoard(rival)
        }

    } else {
        rival.board[index] = icons.water
        console.log(`Shot position: ${shot} -> ${rival.board[index]}, you"ll do better next shot `)
        console.log(`Updating board of player ${rival.name}`)
        printBoard(rival)
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
        console.log(`\nTurn for player ${currentPlayer.name} \nMove #${currentPlayer.turns}`)
        shoot(currentPlayer, rival, targetPositions)
        
        if (currentPlayer.hits.length == targetPositions.length) {
            winner = `THE WINNER IS ${currentPlayer.name}`
            break
        }

        // Swap current player
        if (currentPlayer.name == 'A') {
            currentPlayer = playerB
            rival = playerA
            targetPositions = flatShipPositionsA
        } else {
            currentPlayer = playerA
            rival = playerB
            targetPositions = flatShipPositionsB
        }

    } while (typeof winner == 'undefined' || currentPlayer.shots.length <= 100)

    console.log(winner)
}

/**
 * @param {{}} player Player owner of the board to be print
 */
function printBoard(player) {
    
    // Copy board
    let graphicBoard = player.board.slice()
    
    // Place ships graphically
    for (i = 0; i < player.shipPositions.length; i++) {
        const ship = player.shipPositions[i]

        for (j = 0; j < ship.length; j++) {
            const icon = iconFor(ship.length)
            const index = ship[j]
            if (icon.length > 0 && graphicBoard[index] != icons.hit && graphicBoard[index] != icons.sunk) {
                graphicBoard[index] = icon
            }
        }
    }

    // translate empty positions
    for (i = 0; i < graphicBoard.length; i++) {
        if (!iconList.includes(graphicBoard[i])) {
            graphicBoard[i] = icons.empty
        }
    }

    const boardLine = '\n-----------------------------------------------------------------------'
    const header    = `\n| (INDEX) |  0  |  1  |  2  |  3  |  4  |  5  |  6  |  7  |  8  |  9  |`
    let board = `${boardLine}${header}${boardLine}`

    for (let i = 0; i < letters.length; i++) {
        let row = `|    ${letters[i]}    |`
        for (let j = 0; j < letters.length; j++) {
            const index = (i * 10) + j
            if (graphicBoard[index] == "' '") {
                row += ` ${graphicBoard[index]} |`
            } else {
                row += ` ${graphicBoard[index]}  |`
            }
        }
        board += `\n${row}${boardLine}`
    }
    console.log(board)
}

/**
 * Looks for the latest hit ship and verifies if is sunk, if it is sunk, updates the ship with '🔥' and returns a strings of '🔥' according to the lentgh of the hit ship
 * @param {{}}          player A dictionary of the target player
 * @param {Int}         hit Index position of the latest hit
 * @returns {String}    messeage to log
 */
function checkForSunkShips(player, hit) {

    let hitShip = []

    // 1. Find the hit
    for (i = 0; i < player.shipPositions.length; i++) {
        const ship = player.shipPositions[i].slice()
        for (j = 0; j < ship.length; j++) {
            if (ship[j] == hit) {
                hitShip = ship.slice()
                break
            }
        } 
        if (hitShip.length > 0 ) {
            break
        } 
    }

    if (hitShip.length == 0) {
        return ""
    } 

    //2. Check if it is sunk
    let isSunk = true
    for (j = 0; j < hitShip.length; j++) {
        const index = hitShip[j]
        if (player.board[index] != icons.hit) {
            isSunk = false
            return ""
        } 
    }

    //3. Update sunk ship
    let sunkIcons = ""
    for (x = 0; x < hitShip.length; x++) {
        const index = hitShip[x]
        player.board[index] = icons.sunk
        sunkIcons += icons.sunk
    }

    return sunkIcons
}

function setupGame() {

    // create boards
    playerA.board = generateBoard()
    playerB.board = generateBoard()

    // Place ships
    placeShips(playerA)
    placeShips(playerB)

    // Shows initial configuration, boards with ships positioned
    displaySetup()
}

function displaySetup() {
    const header = `${line}\n\n                              BATTLESHIP\n${line}`
    const description = `\nDescription \n\n${icons.ship2}  -> Ship of 2 positions \n${icons.ship3}  -> Ship of 3 positions \n${icons.ship4}  -> Ship of 4 positions \n${icons.ship5}  -> Ship of 5 positions \n${icons.hit}  -> Hit a ship \n${icons.water}  -> Water or missing shot \n${icons.sunk}  -> Ship sunken \n${icons.empty} -> Empty position`
    console.log(`${header}\n${description}`)

    showStatus(playerA)
    showStatus(playerB)
}

function showStatus(player) {
    console.log(`\nPlayer ${player.name}`)
    printBoard(player)
}

/**
 * returns a ship icon representing a ship of the given legth
 * @param {Int} length represents the lenght of a ship
 * @returns {String}
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

// 1. Setup Game
setupGame()

// 2. Play
play()

/* TODO
1. DONE: Handle sunk
2. Print statistics
3. Optimized, Divide in classes
4. control no more than 100 shots
5. DONE: Add documentation to functions
*/