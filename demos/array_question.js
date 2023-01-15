const FIGURES = ['🐸', '🦖', '🦄', '🦊', '🐒', '🦉']

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
    let board = FIGURES.slice()
    for (let figure of FIGURES) {
       board.push(figure)
    }
    return shuffle(board)
}

function createBoard2() {
    let board = FIGURES
    for (let figure of FIGURES) {
       board.push(figure)
    }
    return shuffle(board)
}

console.log(createBoard())
console.log(createBoard2())