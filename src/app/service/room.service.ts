import { Injectable } from '@angular/core';
import {Observable, of} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Room} from "./service";

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  get url():string{
    return environment.url;
  }

  public get Rooms():Observable<Room[]>{
    return this.requestinator.get<Room[]>(`${this.url}/room`);
  }

  public joinRoom(roomId:string|number) {
    //TODO:
    this.requestinator.post<string>(`${this.url}/room/${roomId}`,{},{headers: {}})
  }
  constructor(private requestinator:HttpClient) { }
}
