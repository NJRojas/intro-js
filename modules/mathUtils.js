import { dimention } from "./globalData.js"

/**
* Generates a random number from 0 to max
* @return an integer within the range [0, max]
*/
export function getRandomInt(max = dimention) {
    return Math.floor(Math.random() * max);
}

/**
* Select in a random way between 2 options, simulate a flip coin
* @param   {String} optionA Option 1 to flip
* @param   {String} optionB Option 2 to flip
* @returns {String} option result
*/
export function flipChoice(optionA = 'A', optionB = 'B') {
    const value = Math.random();
    if (value > 0.5) {
        return optionA;
    } else {
        return optionB;
    }
}
