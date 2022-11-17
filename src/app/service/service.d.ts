import {roomStatus} from "./service.types";
import {Card} from "../types/card.types";

export interface Room {
  id: number;
  name:string;
  player_count:number;
  max_player_count:number;
  status: roomStatus;
  host: string;
}

export interface GameInfo {
  card:Card;
  is_your_turn:boolean;
}
