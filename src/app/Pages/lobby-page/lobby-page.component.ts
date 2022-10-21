import {Component, OnDestroy, OnInit} from '@angular/core';
import {RoomService} from "../../service/room.service";
import {Room} from "../../service/service";
import {interval, startWith, Subscription, switchMap} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {MessageService} from "primeng/api";
import {NamelixService} from "../../service/namelix.service";
import {HostService} from "../../service/host.service";

@Component({
  selector: 'app-lobby-page',
  templateUrl: './lobby-page.component.html',
  styleUrls: ['./lobby-page.component.css']
})
export class LobbyPageComponent implements OnInit, OnDestroy {

  public room:Room|undefined;
  public sub = new Subscription();
  public id:string = "";
  private lobbyNotFoundCallback: ()=>void = ()=>{
    this.msg.add({summary: "Lobby nicht gefunden", detail: "Die angegebene Lobby wurde nicht gefunden",severity:"error",life:3000})
  }


  constructor(
    private roomService:RoomService,
    private route:ActivatedRoute,
    private router:Router,
    private msg:MessageService,
    private naminator:NamelixService,
    private hostinator:HostService
  ) { }

  public get isHost():boolean{
    return <boolean> (this.room && (this.room.host) && (this.room.host === this.naminator.uName));
  }

  private async goHome(): Promise<void> {
    await this.router.navigate(['/'])
  }

  ngOnInit(): void {
    this.id = (this.route.snapshot.paramMap.get('id') || "");
    if (this.id.trim() === ""){
      this.goHome().then(this.lobbyNotFoundCallback)
    }
    this.sub.add(
      interval(5000).pipe(
        startWith(0),
        switchMap(()=> this.roomService.Room(this.id))
      ).subscribe({next: res => {
        this.room = res;
        if (this.room === undefined || this.room === null || this.room.id === undefined || this.room.id === null || this.room.id <= 0){
          this.lobbyNotFoundCallback();
          this.goHome().then(this.lobbyNotFoundCallback);
        }
        else if (this.room.status === "run"){
          this.router.navigate(['game',this.id]).then(value => {
            console.log("Game Started")})
        }
      },
      error: err => {
        if (err.status === 400 || err.status === 404){
          this.goHome().then(this.lobbyNotFoundCallback);
        }
        else {
          this.lobbyNotFoundCallback();
        }
      }
      })
    );


  }

  public startGame(){
    this.hostinator.changeRoomState(this.id,"run");
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
