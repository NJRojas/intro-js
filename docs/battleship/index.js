/*
  Leyenda
  🚤 -> ship of 2 positions
  🛥️ -> Ship of 3 positions
  🛳️ -> Ship of 4 positions
  🚢 -> Ship of 5 positions
  💥 -> Hit
  ❌ -> position taken
  For the rest is position
  //' ' -> water
*/

const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J']
const shipSizes = [2, 2, 2, 3, 3, 4, 5]
const dimention = 10

let playerA = {
    Name: 'A',
    Board: [],
    ShipPositions: [],
    Hits: [],
    Shoots : [],
    Trials: []
}

let playerB = {
    Name: 'B',
    Board: [],
    ShipPositions: [],
    Hits: [],
    Shoots : [],
    Trials: []
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
    //console.log(board)
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
 * 
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
    let takenPositions = shipList.flatMap(num => num)

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
        shufflePosition(shipSizes[i], player.ShipPositions)
    }
    showStatus(player)
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
    let shoot
    let index

    // Get a valid index
    do {
        //console.log(`Rival Board length ${rival.Board.length - 1}`)
        index = getRandomInt(rival.Board.length - 1)
        let selectedPosition = rival.Board[index]

        // Check if it is not a taken position
        if (!shooter.Shoots.includes(selectedPosition)) {
            shoot = selectedPosition
        }

    } while (typeof shoot == 'undefined')

    if (target.includes(shoot)) {
        rival.Board[index] = '💥'
        shooter.Hits.push(shoot)
    } else {
        rival.Board[index] = '❌'
    }
     
    // Debugg line
    console.log(`selected index ${index} position ${shoot}`)
    
    // track the shoot
    shooter.Shoots.push(shoot)
    console.log(`\nTurn for player ${shooter.Name} -> ${shoot}`)
    console.log(`Updating board of...`)
    showStatus(rival)
 }

function play() {

    let winner
    let flatShipPositionsA = playerA.ShipPositions.flatMap(num => num)
    let flatShipPositionsB = playerB.ShipPositions.flatMap(num => num)
    
    do {
        console.log(`\nMove #${playerA.Shoots.length + 1}`)

        // Turn of playerA
        shoot(playerA, playerB, flatShipPositionsB)
        
        // Turn of playerB
        shoot(playerB, playerA, flatShipPositionsA)

        if (playerA.Hits.length == flatShipPositionsB.length) {
            winner = 'THE WINNER IS A'
        } else if (playerB.Hits.length == flatShipPositionsB.length) {
            winner = 'THE WINNER IS B'
        }

    } while (playerA.Shoots.length <= 10)//while (typeof winner == 'undefined')

    console.log(winner)
    printResults()
}

function printBoard(player, board) {

    // Copy board
    let graphicBoard = board.slice()
    
    // Place ships graphically
    for (i = 0; i < player.length; i++) {
        let ship = player[i]

        for (j = 0; j < ship.length; j++) {
            let index = graphicBoard.indexOf(ship[j])
            switch(ship.length) {
                case 2:
                    update(graphicBoard, index,'🚤')
                    break;
                case 3:
                    update(graphicBoard, index,'🛥️')
                    break;
                case 4:
                    update(graphicBoard, index,'🛳️')
                    break;
                case 5:
                    update(graphicBoard, index, '🚢')
                    break;
                default:
                    break;
            }
        }
    }

    // set water
    /*
    for (i = 0; i < graphicBoard.length; i++) {
        if (graphicBoard[i] != '🚤' && graphicBoard[i] != '🛥️' && graphicBoard[i] != '🛳️' && graphicBoard[i] != '🚢') {
            graphicBoard[i] = ' '
        }
    }
    */
    console.log(graphicBoard)
}

function showStatus(player) {
    console.log(`Player ${player.Name}`)
    //console.log(`Shipment positions`)
    //console.log(player.ShipPositions)
    printBoard(player.ShipPositions, player.Board)
}

function update(board, position, update) {
    if (update != '💥') {
        board[position] = update
    }
}

function printResults() {}

function printBoardAlternative(player, board) {
    let takenPositions = player.flatMap(num => num)
    for (let i = 0; i < takenPositions.length; i++) {
        let index = board.indexOf(takenPositions[i])
        board[index] = '*'
    }
    console.log(board)
}

// 1. Setup
playerA.Board = generateBoard()
playerB.Board = generateBoard()
playerA.Trials = generateBoard()
playerB.Trials = generateBoard()

// 2. Place ships
placeShips(playerA)
placeShips(playerB)

// 3. Play
console.log('\n***************************************************************')
console.log('Let us begin the game')
console.log('***************************************************************')
play()