function generateList(size) {
    return Array.from(Array(size).keys())
}

function shufflePosition(max) {
    const index = max === 1 ? 0 : Math.floor(Math.random() * max);
    console.log(index);
    return index;
}

function shoot(availablePositions, shots) {
    let index = shufflePosition(availablePositions.length);
    shots.push(availablePositions[index]);
    availablePositions.splice(index, 1);
}

function print(availablePositions, shots) {
    console.log(`availablePositions: `);
    console.log(availablePositions);
    console.log(`shots:`);
    console.log(shots);
}

function play(size) {

    let availablePositions = generateList(size);
    let shots = [];
    let trials = size;

    console.log(`Starting ....\navailablePositions: `);
    console.log(availablePositions);
    
    do {
        shoot(availablePositions, shots);
        print(availablePositions, shots);
        trials--;
    } while (trials > 0)
}

function test(size, trials = 5) {
    let availablePositions = generateList(size);
    let shots = [];
    console.log(availablePositions);

    do {
        shoot(availablePositions, shots)
        print(availablePositions, shots);
        trials--;
    } while (trials > 0)
}

//test(10, 10)
play(100)