/**
 * Devuelve un saludo compuesto con el nombre y apellido
 * @param {String} name 
 * @param {String} surname 
 * @returns {String} saludo
 */
function hello1(name, surname = 'Skywalker', age) {
    return `Hello ${name} ${surname}, you are ${age} years old`
} 

// This hello1('Neylita', '') and this hello1('Neylita', undefined) will print the same
let result1 = hello1('')
console.log(result1)
result1 = hello1('Neylita', 'Skywalker', 27)
console.log(result1)

let result2
/**
 * 
 * @param {String} name 
 * @param {String} surname 
 * @param {String} age 
 * @returns 
 */
const hello2 = function(name, surname = 'Skywalker', age = 37) {
    return 'Hello ${name} ${surname}. You are ${age} years old'
}
result2 = hello2('') // Imprime Hello  Skywalker. You are 37 years old
console.log(result2)
result2 = hello2('Jordi', undefined, 40) // Imprime Hello Jordi Skywalker. You are 40 years old
console.log(result2)


////////////////////////////////////////
////////// ARROW FUNCTIONS /////////////
////////////////////////////////////////

let result3
/**
 * 
 * @param {String} name 
 * @param {String} surname 
 * @param {String} age 
 * @returns 
 */
const hello3 = (name, surname = 'Skywalker', age = 37) => {
    return `Hello ${name} ${surname}. You are ${age} years old`
}
result3 = hello3('') // // Imprime Hello  Skywalker. You are 37 years old
console.log(result3)
result3 = hello3('Jordi', undefined, 40) // Imprime Hello Jordi Skywalker. You are 40 years old
console.log(result3)

let result4
/**
 * 
 * @param {String} name 
 * @param {String} surname 
 * @param {String} age 
 * @returns 
 */
const hello4 = (name, surname = 'Skywalker', age = 37) => `Hello ${name} ${surname}. You are ${age} years old`
result4 = hello4('') // // Imprime Hello  Skywalker. You are 37 years old
console.log(result4)
result4 = hello4('Jordi', undefined, 40) // Imprime Hello Jordi Skywalker. You are 40 years old
console.log(result4)

let result5
/**
 * 
 * @param {String} name 
 * @returns 
 */
const hello5 = name => `Hello ${name}`

result5 = hello5('') // // Imprime Hello  Skywalker. You are 37 years old
console.log('result5', result5)
result5 = hello5('Jordi', undefined, 40) // Imprime "Hello Jordi" e ignora los otros parámetros
console.log('result5', result5)