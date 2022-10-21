import {Component, OnDestroy, OnInit} from '@angular/core';
import {RoomService} from "../../service/room.service";
import {interval, Observable, startWith, Subject, Subscription, switchMap} from "rxjs";
import {Room} from "../../service/service";
import {Message, MessageService} from "primeng/api";
import {Messages} from "primeng/messages";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit, OnDestroy{

  constructor(private roomService: RoomService,private msg:MessageService,private router:Router){
  }


  public rooms: Room[] = [];

  private sub: Subscription|undefined;

  public labels:string[] = ['Room','Join','Player Count'];

  ngOnInit(): void {
    this.sub = interval(5000).pipe(
      startWith(0),
      switchMap(() => this.roomService.Rooms())
    ).subscribe(res=> {this.rooms = res;})
  }

  ngOnDestroy(): void {
    if (this.sub) this.sub.unsubscribe()
  }

  public joinRoom(roomId:number){
    this.roomService.joinRoom(roomId)
      .subscribe({
        next: (val) =>{
          this.router.navigate(['lobby',roomId])
        },
        error:  err => {
          const erro:Message = {closable:true, severity: "error", summary: "Error",detail:"Dem Raum konnte nicht beigetreten werden."}
          this.msg.add(erro)
        }
    })
  }


}
