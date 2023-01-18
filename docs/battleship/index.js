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
const line = '________________________________________________________________________'

let playerA = {
    name: 'A',
    board: [],
    shipPositions: [],
    hits: [],
    turns: 0,
    shoots : [],
    trials: []
}

let playerB = {
    name: 'B',
    board: [],
    shipPositions: [],
    hits: [],
    turns: 0,
    shoots : [],
    trials: []
}

/**
 * Generates a board of 10 x 10
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
 * Generate a random position for a ship, a set of points
 * and updates the given list
 */
function shufflePosition(size = 0, shipList = []) {

    let postionSet = []
    const takenPositions = shipList.flatMap(num => num)

    do {
        let indexFrom = getRandomInt()
        let letterFrom = letters[indexFrom]
        let direction = flipChoice()

        // Try horizontal, which option A
         if (direction == 'A') {
            if ((indexFrom + size - 1) < dimention) {
                // From right to left
                for (let i = indexFrom; i < indexFrom + size; i++) {
                    let position = letterFrom + i
                    if (takenPositions.includes(position)) {
                        postionSet = []
                        break
                    } else {
                        postionSet.push(position)
                    }
                }
            } else if ((indexFrom - size + 1) > 0) {
                // From left to right
                for (let i = indexFrom; i > indexFrom - size; i--) {
                    let position = letterFrom + i
                    if (takenPositions.includes(position)) {
                        postionSet = []
                        break
                    } else {
                        postionSet.push(position)
                    }
                }
            }
        } else {
            // Try vertical, which option B
            if ((indexFrom + size - 1) < dimention) {
                // From right to left
                for (let i = indexFrom; i < indexFrom + size; i++) {
                    let position = letters[i] + indexFrom
                    if (takenPositions.includes(position)) {
                        postionSet = []
                        break
                    } else {
                        postionSet.push(position)
                    }
                }  
            } else if ((indexFrom - size + 1) > 0) {
                // From left to right
                for (let i = indexFrom; i > indexFrom - size; i--) {
                    let position = letters[i] + indexFrom
                    if (takenPositions.includes(position)) {
                        postionSet = []
                        break
                    } else {
                        postionSet.push(position)
                    }
                }
            }
        } 
        //console.log(`Directon: ${direction} - From ${letterFrom}${indexFrom}`)    
        //console.log(postionSet)
    } while (postionSet.length == 0)

    shipList.push(postionSet)
}

function placeShips(player) {
    for(let i = 0; i < shipSizes.length; i++) {
        shufflePosition(shipSizes[i], player.shipPositions)
    }
}

/**
 * Selects a valid position, that is, it has not been taken before
 * and updates the board of the rival with the corresponding icon
 * It requires
 * @param {[Strings]}   target      A flat list of shipment positions of the rival.
 * @param {{}}          shooter     A dictionary of player type representing the player shooting 
 * @param {{}}          rival       A dictionary of player type representing the target player.
 */
function shoot(shooter, rival, target) {
    let shot
    let index

    // Get a valid index
    do {
        //console.log(`Rival Board length ${rival.Board.length - 1}`)
        index = getRandomInt(rival.board.length - 1)
        let selectedPosition = rival.board[index]

        // Check if it is not a taken position
        if (!shooter.shoots.includes(selectedPosition)) {
            shot = selectedPosition
        }

    } while (typeof shot == 'undefined')

    // track shots
    shooter.shoots.push(shot)

    if (target.includes(shot)) {
        rival.board[index] = icons.hit
        shooter.hits.push(shot)

        console.log(`shoot position: ${shot} -> ${rival.board[index]}, you hit a ship, you rock ☄️`)

        // Current player hit, he/she can play again, but first check that not all rival ships are sunk
        if (shooter.hits.length < target.length) {
            shoot(shooter, rival, target)
        } else {
            console.log(`Updating board of player ${rival.name}`)
            printBoard(rival)
        }
        
    } else {
        rival.board[index] = icons.water
        console.log(`shoot position: ${shot} -> ${rival.board[index]}`)
        console.log(`Updating board of player ${rival.name}`)
        printBoard(rival)
    }
 }

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

    } while (typeof winner == 'undefined') //(playerA.shoots.length <= 20)//

    console.log(winner)
}

function printBoard(player) {
    
    // Copy board
    let graphicBoard = player.board.slice()
    
    // Place ships graphically
    for (i = 0; i < player.shipPositions.length; i++) {
        let ship = player.shipPositions[i]

        for (j = 0; j < ship.length; j++) {
            let index = graphicBoard.indexOf(ship[j])
            const icon = iconFor(ship.length)
            if (icon.length > 0 && (icon != icons.hit || icon != icons.sunk)) {
                graphicBoard[index] = icon
            }
        }
    }

    // translate empty positions
    for (i = 0; i < graphicBoard.length; i++) {
        if (!isIcon(graphicBoard[i])) {
            graphicBoard[i] = icons.empty
        }
    }

    const boardLine = '\n-----------------------------------------------------------------------'
    const vertical  = '\n|         |     |     |     |     |     |     |     |     |     |     |'
    const header    = `\n| (INDEX) |  0  |  1  |  2  |  3  |  4  |  5  |  6  |  7  |  8  |  9  |`
    let board = `${boardLine}${vertical}${header}${boardLine}` //`${line}${vertical}${header}${vertical}${line}`

    for (let i = 0; i < letters.length; i++) {
        let row = `|    ${letters[i]}    |`
        for (let j = 0; j < letters.length; j++) {
            const index = (i * 10) + j
            if (isIcon(graphicBoard[index])) {
                row += ` ${graphicBoard[index]}  |`
            } else {
                row += ` ${graphicBoard[index]} |`
            }
        }
        board += `${vertical}\n${row}${boardLine}` // `${vertical}\n${row}${vertical}${line}`
    }
    console.log(board)
}

function isIcon(string) {
    if (string == icons.ship2 || string == icons.ship3 || string == icons.ship4 || string == icons.ship5 || string == icons.hit || string == icons.water || string == icons.sunk) {
        return true
    } else {
        return false
    }
}

function setupGame() {

    // create boards
    playerA.board = generateBoard()
    playerB.board = generateBoard()
    playerA.trials = generateBoard()
    playerB.trials = generateBoard()

    // Place ships
    placeShips(playerA)
    placeShips(playerB)

    // display initial setup 
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
    //console.log(`Shipment positions`)
    //console.log(player.ShipPositions)
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

1. Handle sunken
2. adjust emojis 
2. Divide in classes
3. control no more than 100 shots
4. Add documentation to functions
5. Optimized
*/