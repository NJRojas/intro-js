let letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J']
let shipSizes = [2, 2, 2, 3, 3, 4, 5]
const dimention = 10

let playerA = []
let shootsA = []
let playerB = []
let shootsB = []

const players = [playerA, playerB]

/*
  Leyenda
  🚤 -> ship of 2 positions
  🛥️ -> Ship of 3 positions
  🛳️ -> Ship of 4 positions
  🚢 -> Ship of 5 positions
  💥 -> Hit
  ❌ -> position taken
  ' ' -> water
*/

/*
    createBoard
*/
function generateBoard() {

    let board = []
    for (let i = 0; i < dimention; i++) {
        for (let j = 0; j < dimention; j++) {
            board.push(letters[i] + j)
        }
    }
    //console.log(board)
    return board
}

/*
    generate a random number from 0 to max
*/
function getRandomInt(max = dimention) {
    return Math.floor(Math.random() * max);
}

// Whether horizontal or vertical
function flipChoice(optionA = 'A', optionB = 'B') {
    const value = Math.random()
    if (value > 0.5) {
        return optionA
    } else {
        return optionB
    }
}

/*
    Check if given position set is contained in the given list
*/
function isValidPosition(shipPosition = [], shipList = []) {

}

/*
    Generate a random position for a ship, a set of points
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
    return shipList
}

function placeShips() {
    for(let i = 0; i < shipSizes.length; i++) {
        shufflePosition(shipSizes[i], playerA)
        shufflePosition(shipSizes[i], playerB)
    }
    showStatus()
}

function shoot(positions, board, hits, shoots) {

    let valid = false
    do {
        let index = getRandomInt(99)
        let shoot = board[index]
        // Debugg line
        console.log(`selected index ${index} position ${shoot}`)

        // check if it is a valid shoot
        if (!shoots.includes(shoot)) {
            // check if it was a hit
            if (positions.includes(shoot)) {
                board[index] = '💥'
                hits.push(shoot)
            } else {
                board[index] = '❌'
            }

             // track the shoot
             shoots.push(shoot)
             valid = true
        }    
    } while (!valid)
 }

function play() {

    let test = 5
    let winner = ''
    let hitsOfA = []
    let hitsOfB = []
    let positionsA = playerA.flatMap(num => num)
    let positionsB = playerB.flatMap(num => num)
    
    do {
        // Turn of playerA
        console.log(`Turn for player A`)
        shoot(positionsB, boardB, hitsOfA, shootsA)
  
        // Turn of playerB
        console.log(`Turn for player B`)
        shoot(positionsA, boardA, hitsOfB, shootsB)

        test -= 1
        showStatus()

        if (hitsOfA.length == positionsB.length) {
            winner = 'THE WINNER IS A'
        } else if (hitsOfB.length == positionsA.length) {
            winner = 'THE WINNER IS B'
        }

    } while (test > 0)

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

function showStatus() {

    console.log(`Player A`)
    //console.log(`Shipment positions`)
    //console.log(playerA)
    printBoard(playerA, boardA)

    console.log(`Player B`)
    //console.log(`Shipment positions`)
    //console.log(playerB)
    printBoard(playerB, boardB)
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

// 1. Create boards
let boardA = generateBoard()
let boardB = generateBoard()

// 2. Place ships
placeShips()

// 3. Play
console.log('***************************************************************')
console.log('Let us the game begin ')
console.log('***************************************************************')

play()