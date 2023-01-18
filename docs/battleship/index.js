/*
  Leyenda
  🛶 -> Ship of 2 positions
  🛥️ -> Ship of 3 positions
  ⛴️ -> Ship of 4 positions
  🚢 -> Ship of 5 positions
  💥 -> Hit a ship
  ❌ -> Water or missing shot
  🔥 -> Ship sunken
  ' ' -> Empty position
*/

const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J']
const shipSizes = [2, 2, 2, 3, 3, 4, 5]
const dimention = 10

let playerA = {
    name: 'A',
    board: [],
    shipPositions: [],
    hits: [],
    shoots : [],
    trials: []
}

let playerB = {
    name: 'B',
    board: [],
    shipPositions: [],
    hits: [],
    shoots : [],
    trials: []
}

/**
 * Generates a board of 10 x 10
 * @returns {[String]} board    an array of 100 elements with indexes
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
 * @param {String} optionA Option 1 to flip
 * @param {String} optionB Option 2 to flip
 * @returns {String} the option flipped
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

    if (target.includes(shot)) {
        rival.board[index] = '💥'
        shooter.hits.push(shot)

        // track shots
        shooter.shoots.push(shot)

        console.log(`shoot position: ${shot} -> ${rival.board[index]}, you hit a ship, you rock ☄️`)
        //console.log(`Updating board of...`)
        //showStatus(rival)

        // Current player hit, it can play again
        shoot(shooter, rival, target)

    } else {
        rival.board[index] = '❌'
        
        // track shots
        shooter.shoots.push(shot)
        console.log(`shoot position: ${shot} -> ${rival.board[index]}`)
        console.log(`\nUpdating board of...`)
        showStatus(rival)
    }
 }

function play() {

    console.log('***************************************************************')
    console.log('Let us begin the game')
    console.log('***************************************************************\n')

    let winner
    let flatShipPositionsA = playerA.shipPositions.flatMap(num => num)
    let flatShipPositionsB = playerB.shipPositions.flatMap(num => num)
    
    do {
        console.log(`\nMove #${playerA.shoots.length + 1}`)

        // Turn of playerA
        console.log(`\nTurn for player ${playerA.name}`)
        shoot(playerA, playerB, flatShipPositionsB)
        
        // Turn of playerB
        console.log(`\nTurn for player ${playerB.name}`)
        shoot(playerB, playerA, flatShipPositionsA)

        if (playerA.hits.length == flatShipPositionsB.length) {
            winner = 'THE WINNER IS A'
        } else if (playerB.hits.length == flatShipPositionsB.length) {
            winner = 'THE WINNER IS B'
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
            switch(ship.length) {
                case 2:
                    update(graphicBoard, index, '🛶')
                    break;
                case 3:
                    update(graphicBoard, index, '⛵️')
                    break;
                case 4:
                    update(graphicBoard, index, '🚤')
                    break;
                case 5:
                    update(graphicBoard, index, '🚢')
                    break;
                default:
                    break;
            }
        }
    }

    // translate empty positions
    for (i = 0; i < graphicBoard.length; i++) {
        if (!isIcon(graphicBoard[i])) {
            graphicBoard[i] = "' '"
        }
    }

    const line = '\n-----------------------------------------------------------------------'
    const vertical = '\n|         |     |     |     |     |     |     |     |     |     |     |'
    const header = `\n| (INDEX) |  0  |  1  |  2  |  3  |  4  |  5  |  6  |  7  |  8  |  9  |`
    let board = `${line}${vertical}${header}${vertical}${line}`

    for (let i = 0; i < letters.length; i++) {
        let row = `|    ${letters[i]}    |`
        for (let j = 0; j < letters.length; j++) {
            const index = (i * 10) + j
            if (isIcon(graphicBoard[index])) {
                row += `  ${graphicBoard[index]} |`
            } else {
                row += ` ${graphicBoard[index]} |`
            }
        }
        board += `${vertical}\n${row}${vertical}${line}`
    }
    console.log(board)
    //console.log(graphicBoard)
}

function isIcon(string) {
    if (string == '🛶' || string == '⛵️' || string == '🚤' || string == '🚢' || string == '💥' || string == '❌' || string == '🔥') {
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
    
    console.log('\n****************************************************************************')
    console.log('\n                              BATTLESHIP')
    console.log('\n****************************************************************************')
    const description = '\nDescription \n\n🛶  -> Ship of 2 positions \n⛵️   -> Ship of 3 positions \n🚤   -> Ship of 4 positions \n🚢  -> Ship of 5 positions \n💥  -> Hit a ship \n❌  -> Water or missing shot \n🔥  -> Ship sunken \n\' \' -> Empty position'
    console.log(description)

    showStatus(playerA)
    showStatus(playerB)
}

function showStatus(player) {
    console.log(`\nPlayer ${player.name}`)
    //console.log(`Shipment positions`)
    //console.log(player.ShipPositions)
    printBoard(player)
}

function update(board, position, update) {
    if (update != '💥') {
        board[position] = update
    }
}

function printBoardAlternative(player, board) {
    let takenPositions = player.flatMap(num => num)
    for (let i = 0; i < takenPositions.length; i++) {
        let index = board.indexOf(takenPositions[i])
        board[index] = '*'
    }
    console.log(board)
}

// 1. Setup Game
setupGame()

// 2. Play
play()

/* TODO

1. Handle sunken
2. Divide in classes
3. control no more than 100 shots
4. Add documentation to functions
5. Optimized
*/