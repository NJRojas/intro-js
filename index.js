import { getRandomInt } from "./bsModules/mathUtils"
import { Player } from "./bsModules/player"

/*
    TODO
    1. Para cada disparo, se deberá mostrar
         la casilla seleccionada, 
         los disparos que faltan del jugador 
         y los tableros del jugador que está disparando (el propio y el ajeno) con la casilla ya marcada, sea agua o tocado. 
    2. Los resultados Deberá mostrarse también por pantalla el tablero propio del jugador 1 y el tablero propio del jugador 2, 
       para poder visualizar los barcos que han quedado sin hundir
    3. Adicionar sincronia para que no se suspenda
    4. Si adiciona readme.md solo debe tener notas respecto al codigo
    5. Revisar que no haya mezcla de idiomas
*/

// ******************************* The Game  *******************************
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