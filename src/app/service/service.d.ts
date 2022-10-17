import {roomStatus} from "./service.types";

export interface Room {
  id: number;
  name:string;
  player_count:number;
  max_player_count:number;
  status: roomStatus;
}
