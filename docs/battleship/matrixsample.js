let matrix = [];

// create a 2D array of 10x10
for (let i = 0; i < 10; i++) {
    matrix[i] = new Array(10);
}

// fill the matrix with random values
for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
        matrix[i][j] = Math.floor(Math.random() * 10);
    }
}

// print the matrix
for (let i = 0; i < 10; i++) {
    console.log(matrix[i]);
}