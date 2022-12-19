// Ejemplos de Strings
const role = 'Teacher'

console.log(role)

// Best practices:
// preferiblemente camelCase
// Adicional puede usarse MAYUS_CASE
const teacherName = "Jordi"
console.log(teacherName)

// Concatenación
const phrase1 = "The name of the teacher is " + teacherName
// Backticks para interpolación
const phrase2 = `The name of the teacher is ${teacherName}` 

console.log(phrase1)
console.log(phrase2)


// Operadores aritméticos
let a = 5
let b = 2

console.log('Suma', a + b)
console.log('Resta', a - b)
console.log('Multiplicación', a * b)
console.log('División', a / b)
console.log('Exponente', a ** b)
console.log('Módulo', a % b)
console.log('Negación', -a)
console.log('Incremento', a++)
console.log('Decremento', --a)
console.log('Pre-incremento', ++a)
console.log('Pre-decremento', --a)

// Operadores booleanos
console.log('And', a && b)
console.log('Or', a || b)
console.log('Not', !a)

// Comparadores de valor 
console.log('Igual que', a == b) // '4' == 4 es true)
console.log('Distinto que', a != b) // '4' != 4 es false)
console.log('Mayor que', a > b)

// let mouseItem > { ------> }
let mouseItem = {
    name: 'QWERTY',
    units: 23,
    price: 29.0,
    ISOCode: 'ES',
    OS: ["Windows", "Linux", "Mac"]
}

let keyboardItem = {
    name: 'QWERTY',
    units: 23,
    price: 29.0,
    ISOCode: 'ES',
    OS: ["Windows", "Linux", "Mac"],
    compatibleWith: {
        mouse: mouseItem
    },
     // propiedad coches3 y valor: ["audi", "bmw", "vw"], es lo mismo que coches3: coches3
    coches3
}

console.log(keyboardItem.coches3);
/*
JSON
{
    "name": "QWERTY",
    "units": 23,
    "price": 29.9,
    "ISOCode": "ES",
    "OS": ["Windows", "Linux", "Mac"],
    "compatibleWith": {
        "mouse": {
            "name": "MagicMouse",
            "units": 22,
            "price": 99,
            "OS": ["Windows", "Linux", "Mac"]
        }
    }
}
*/
// usamos . para poder acceder a nodos del objeto
console.log("Available units", keyboardItem.units > 0);
console.log("Units of mouse compatible with keyboardItem", keyboardItem.compatibleWith.mouse.units);
// devuelve undefined porque efectivamente no existe esta propiedad en el objeto
console.log("Mouse item has ISOCode ??? ", mouseItem.ISOCode);

if (keyboardItem.units > 0) {
    console.log("Tenemos unidades!");
} else {
    console.log("OUT OF STOCK!");
}

// es falso porque coches3 es un valor no primitivo
console.log('coches3 == ["audi", "bmw", "vw"]', coches3 == ["audi", "bmw", "vw"]);
// coches3[0] == 'coches3[0]' // aquí 'coches3[0]' es un string!!!
console.log("coches3[0] is audi", coches3[0] === "audi");
console.log("coches3[1] is bmw", coches3[1] === "bmw");
console.log("coches3[2] is vw", coches3[2] === "vw");
console.log("what is coches3[3]", coches3[3]); // como no existe el cuarto elemento, devuelve undefined

// Podemos alterar el contenido de un objeto
console.log("keyboardItem.ISOCode", keyboardItem.ISOCode);
keyboardItem.ISOCode = "IT";
console.log("keyboardItem.ISOCode", keyboardItem.ISOCode);

// también podemos alterar el contenido de un array
console.log("coches3[2] is vw", coches3[2] === "vw");
coches3[2] = "seat";
console.log("coches3[2] is seat", coches3[2] === "seat");
coches3[2] = 23;
console.log("coches3[2] is 23", coches3[2] === 23);

// arrays cualquier tipo de objeto: [undefined, null, 1, true, NaN, Infinity, 'hola', {}]
const cualquierArr = [undefined, null, 1, true, NaN, Infinity, "hola", {}];
// el array es una colección de elementos, accesibles por un número []
console.log("cualquierArr[5]", cualquierArr[5] === 1 / 0);
// el objeto es una lista de propiedades, accesibles por nombre
// {Mixed}

// keyboardItem.OS = ["Windows", "Linux", "Mac"]
for (let os of keyboardItem.OS) { 
    // nos permite recorrer el array, de manera que os adquirirá los valores de dentro del array por cada iteración
    if (os === "Windows") {
        console.log("Es windows!");
    } else if (os === "Linux") {
        console.log("Es Linux!");
    } else {
        console.log("No es ni windows ni linux!");
    }
}

// reescritura de los if-else if-else con switch
for (let os of keyboardItem.OS) {
    switch(os) {
        case 'Windows':
            console.log("Es WINDOWS!");
            break;
        case 'Linux': 
            console.log("Es LINUX!");
            break;
        default:
            console.log("No es ni WINDOWS ni LINUX!");
            break;
    }
}