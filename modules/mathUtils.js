/**
* Generates a random number from 0 to max
* @return an integer within the range [0, max]
*/
export function getRandomInt(max) {
    const randomInt = Math.floor(Math.random() * max);
    return Math.abs(randomInt);
}