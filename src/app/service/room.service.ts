import { Injectable } from '@angular/core';
import {Observable, of} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Room} from "./service";
import {NamelixService} from "./namelix.service";

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  get url():string{
    return environment.url;
  }

  public Rooms():Observable<Room[]>{
    return this.requestinator.get<Room[]>(`${this.url}/room`);
  }

  public joinRoom(roomId:string|number) {
    return this.requestinator.post<boolean>(`${this.url}/room/${roomId}`,{},{headers: this.namenator.header})

  }
  constructor(private requestinator:HttpClient,private namenator:NamelixService) { }
}
