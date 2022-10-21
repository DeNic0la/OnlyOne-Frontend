import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {NamelixService} from "./namelix.service";
import {roomStatus} from "./service.types";

@Injectable({
  providedIn: 'root'
})
export class HostService {
  get url():string{
    return environment.url;
  }

  public changeRoomState(roomId:string|number,newState:roomStatus):void{
    this.requestinator.post(`${this.url}/state/${roomId}`,newState,{headers: this.namenator.header}).subscribe(value => console.log(value))
  }

  constructor(private requestinator:HttpClient, private namenator:NamelixService) { }
}
