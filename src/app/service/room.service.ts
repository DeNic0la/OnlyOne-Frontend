import { Injectable } from '@angular/core';
import {Observable, of} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Room} from "./service";
import {NamelixService} from "./namelix.service";
import {Router} from "@angular/router";
import {MessageService} from "primeng/api";
import {callError} from "../Util/error.util";

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  get url():string{
    return environment.url;
  }

  public Room(id:string|number):Observable<Room>{
    return this.requestinator.get<Room>(`${this.url}/room/${id}`)
  }

  public Rooms():Observable<Room[]>{
    return this.requestinator.get<Room[]>(`${this.url}/room`);
  }

  public async createRoom(){
    this.requestinator.post<Room>(`${this.url}/room`,`${this.namenator.uName}'s Raum`).subscribe({
      next: (val)=>{
        this.joinRoom(val.id).subscribe({
          next: value => {
            this.router.navigate(['lobby',val.id])
          },
          error: err => {callError(this.msg,"Etwas ist Schiefgelaufen","Versuchen sie es Später nochmal")}
        })
      },
      error: (err)=>{callError(this.msg,"Etwas ist Schiefgelaufen","Versuchen sie es Später nochmal")},
    })
  }

  public joinRoom(roomId:string|number) {
    return this.requestinator.post<boolean>(`${this.url}/room/${roomId}`,{},{headers: this.namenator.header})
  }

  public leave(roomId: string|number){
    return this.requestinator.put(`${this.url}/room/${roomId}`,null,{headers: this.namenator.header})
  }
  constructor(private requestinator:HttpClient,private namenator:NamelixService,private router:Router, private msg:MessageService) { }
}
