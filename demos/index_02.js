// una funcion que nos permite randomizar los elementos de un array
function shuffle(array) {
    console.log(array)

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
  
    console.log(array)
    return array;
}

shuffle([2, 7, 6, 9, 26, 46, 1, 0])