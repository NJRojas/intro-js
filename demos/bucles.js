let i = 1
do {
    console.log("Hola", i)
    i++
} while(i < 10)

const fighters = ["Bud Spencer", "Chuck Norris", "Van Damme"]

// FOR loop

// For
for (let i = 0; i < fighters.length; i++) {
    const fighter = fighters[i]
    console.log(fighter)
} 

for (let i = fighters.length; i >= 0; i--) {
    const fighter = fighters[i]
    console.log(fighter)
} 

// FOR IN
for(let i in fighters) {
    const fighter = fighters[i]
    console.log(fighter)
}

// FOR OF
for(let fighter of fighters) {
    console.log(fighter)
}

// While
let j = 0
while(j < 3){
    console.log(j)
    j++
}