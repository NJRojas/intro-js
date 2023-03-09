export const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
export const shipSizes = [2, 2, 2, 3, 3, 4, 5];
export const dimention = 10;
export const icons = {
    ship2: '🛶',
    ship3: '⛵️',
    ship4: '🚤',
    ship5: '🚢',
    hit: '💥',
    water: '💧',
    sunk: '🔥',
    empty: "' '"
}
export const iconList = ['🛶', '⛵️', '🚤', '🚢', '💥', '💧', '🔥'];
export const line = '_'.repeat(72);

/**
 * returns a ship icon representing a ship of the given length
 * @param {Int} length represents the lenght of a ship
 * @returns {String} an icon
 */
export function iconFor(length) {
    switch(length) {
        case 2:
            return icons.ship2;
        case 3:
            return icons.ship3;
        case 4:
            return icons.ship4;
        case 5:
            return icons.ship5;
        default:
            return '';
    }
}