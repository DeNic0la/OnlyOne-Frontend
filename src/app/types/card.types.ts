
export type CardColor = "red" | "green" | "blue" | "yellow";
export type CardNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 ;
export interface Card {
  number:CardNumber;
  color:CardColor;
}
