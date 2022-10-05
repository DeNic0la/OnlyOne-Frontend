import { Injectable } from '@angular/core';
import {Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  private rooms:string[] = ['Test','rolf','lala']

  public getRooms():Observable<string[]>{
    return of(this.rooms);
  }
  constructor() { }
}
