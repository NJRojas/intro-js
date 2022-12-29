// create an array
let fruits = ['papaya', 'fresas', 'arandanos']

/* ******************************
    Arrays Iterations
********************************* */

for(let fruit in fruits) {
    console.log(fruit)
}

// The 'forEach()' method executes a provided function once for each array element.
fruits.forEach(function(element) {
    console.log(element)
})

fruits.forEach(element => console.log(element))

/* ******************************
    Arrays Edition
********************************* */

// add elements
fruits.push('mandarina')
console.log(fruits)

// Delete last
fruits.pop()
console.log(fruits)

// Delete first
fruits.shift()
console.log(fruits)

/* ******************************
    Index operations
********************************* */

fruits.push('papaya')
let index = fruits.indexOf('papaya')
console.log(index)

// ********** .splice() **************

// super set of primes between 20 and 30
let primes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67]
let subset = primes.splice(8, 2)
console.log(primes)
console.log(subset)


// copy array
const FIGURES = ['🐸', '🦖', '🦄', '🦊', '🐒', '🦉']
let copyFigures = FIGURES.slice()
let copyFigures2 = FIGURES
console.log(copyFigures)
console.log(copyFigures2)
