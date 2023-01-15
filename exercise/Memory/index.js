const FIGURES = ['🐸', '🦖', '🦄', '🦊', '🐒', '🦉']
const ROWS = 3
const COLUMNS = 4

// shake elements in an array
function shuffle(array) {
    //console.log(array)

    let currentIndex = array.length,  randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
    //console.log(array)
    return array;
}

function createBoard() {
    let board = FIGURES.concat(FIGURES)
    return shuffle(board)
}

function createBoard2() {
    let board = FIGURES.slice()
    for (let figure of FIGURES) {
       board.push(figure)
    }
    return shuffle(board)
}

function printBoard() {
    
    let index = 0
    let fig = createBoard()
    /*
    fig.concat(figures)
    let positions = shuffle(fig)
    for (let i = 0; i < 3; i++) {
        let line = positions[index]
        for (let j = 0; j < 4; j++) {
            index += 1 
            let f = positions[index]
            line += `${f} `
        }
        console.log(line)
    }
    */
}

console.log(createBoard())
