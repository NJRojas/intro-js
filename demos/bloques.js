const team = 'Argentina'
let phrase 

if (true) { // no hace nada, simplemente de ejemplo
    const team = 'Spain'
    console.log('Equipo, ', team)
    if (team === 'Argentina') {
        phrase = 'Mi equipo es Argentina'
    }
    if (true) { // no hace nada, simplemente de ejemplo
        const team = 'France'
        console.log('Dentro del bloque, team es', team)
        phrase = 'Mi equipo es France'
    }
}
console.log(phrase)


const y = 'pepe'
var x = 1
if (true) {
    var x = 2
    const y = 'maria'
    console.log(y)
}

console.log(x)
console.log('The team is', team)