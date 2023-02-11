
import { icons, iconList } from "./bsModules/globalData.js"

export function printTable(board, shipPositions) {

    // Copy board
    let graphicBoard = board.slice()

    // place ship icons
    for (let i = 0; i < shipPositions.length; i++) {
        const ship = shipPositions[i]

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