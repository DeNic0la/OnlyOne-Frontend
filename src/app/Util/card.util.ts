import {Card, CardColor, CardNumber} from "../types/card.types";

const numbers:CardNumber[] = [1,2,3,4,5,6,7,8,9];
const colors:CardColor[] = ["yellow","red","blue","green"];

/**
 * Get a Random Element from the passed Array
 * @param array
 */
function getRandomFromArray<Type>(array: Type[]):Type {
  return array[Math.floor(Math.random()*array.length)];
}

/**
 * Returns a Random Playing Card
 */
export function getRandomCard():Card {
  return {number: getRandomFromArray(numbers), color: getRandomFromArray(colors)};
}
