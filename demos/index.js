// ✅filas 
// cartas (repetidas, iguales...)
// ✅columnas
// Jugador
// puntuación (si las cartas son iguales)
// contadores
// turnos
// ✅figuras
// mensajes
// celdas vacías
// simular cartas seleccionadas


// TODO Mostrar el tablero inicial.
// filas del tablero
const ROWS = 3
// columnas del tablero
const COLS = 2
// figuras disponibles para las cartas
const FIGURES = ['🤓', '🎃', '💚']

console.log('Available figures: ', FIGURES)
// tablero
let board = []
// por cada fila
for(let i = 0; i < ROWS; i++) {
    // una fila cualquiera
    let row = []
    // por cada columna
    for(let j = 0; j < COLS; j++) {
        //console.log(j, i)
        row[j] = FIGURES[i]
    }
    board[i] = row
}
// console.log(board)
console.log('Initial table')
for(let i = 0; i < ROWS; i++) {
    console.log(board[i])
}
// TODO Generar selección de cartas de forma aleatoria.
// TODO Mostrarla por pantalla hasta que quede solucionado el juego.
// TODO Una vez terminado el juego, se mostrarán algunas estadísticas.
// TODO Intentaremos añadir un poco de inteligencia para que el juego sea más listo