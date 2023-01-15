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
copyFigures.push('🦁')
copyFigures2.push('🐷')
console.log(`copyFigures ${copyFigures}`)
console.log(`copyFigures2 ${copyFigures2}`)

// Acceso a elementos de un array
console.log(FIGURES[5]) // 🦉
console.log(FIGURES['5']) // 🦉 Es posible usar comillas con los indices
console.log(FIGURES['02']) // Undefined

// returns list of key and value of every element
const figuresIterator = FIGURES.entries()
console.log(figuresIterator.next().value)

// Every
const isAFrog = (value) => value == '🐸'
console.log(FIGURES.every(isAFrog))

// Fill like a replacer
let primates = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67]
console.log(primates.fill(1, 0, 4))

// Filter -> return a list of 1 o more
const words = ['spray', 'limit', 'elite', 'exuberant', 'destruction', 'present'];
const result = words.filter(word => word == 'elite');
console.log(result)

// select evens 
const list = [5, 12, 8, 130, 44]
const evens = list.filter(element => element % 2 == 0)
console.log(evens)

// Find - Returns the  first value that fulfill the condition - A single element
// find evens
const numbers = [5, 12, 8, 130, 44]
const even = numbers.find(element => element % 2 == 0)
console.log(even)

// Find the last element fulfilling the condition
const array = [200, 5, 12, 50, 130, 44];
const found = array.findLast((element) => element > 45);
console.log(found);

/* ***************
    Flat
****************** */
// multidimensional array
const multi = [0, 1, 2, [3, 4, [5, [7]]]]
let flatty1 = multi.flat()
console.log(flatty1)

let flatty2 = multi.flat(2)
console.log(flatty2)

let flatty3 = multi.flat(3)
console.log(flatty3)

/* ***************
    Map
****************** */

const array1 = [1, 4, 9, 16]
// pass a function to map
const map1 = array1.map(x => x * 0.25)
console.log(map1)

/* ***************
    FlatMap()
****************** */
const arr1 = [0, 1, 2, [3, 4, [5, [7]]]]
const flattened = arr1.flatMap(num => num)
console.log(flattened)
console.log([1, 4, 9, 16])

// sort()
const months = ['March', 'Jan', 'Feb', 'Dec']
months.sort()
console.log(months)

const UNSORTED = [8, 4, 1, 7, 9, 16, 3, 6, 0]
const sorted = UNSORTED.sort()
console.log(sorted)

// reduce()
// reduceRight()
// reverse()
// some()
// group()
// groupToMap()

// shift()
// unshift()
// values()