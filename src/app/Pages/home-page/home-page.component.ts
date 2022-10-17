import {Component, OnDestroy, OnInit} from '@angular/core';
import {RoomService} from "../../service/room.service";
import {interval, Observable, startWith, Subject, Subscription, switchMap} from "rxjs";
import {Room} from "../../service/service";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit, OnDestroy{

  constructor(private roomService: RoomService) {
  }


  public rooms: Room[] = [];

  private sub: Subscription|undefined;

  public labels:string[] = ['Room','Join','Player Count'];

  ngOnInit(): void {
    this.sub = interval(5000).pipe(
      startWith(0),
      switchMap(() => this.roomService.Rooms)
    ).subscribe(res=> {this.rooms = res;})
  }

  ngOnDestroy(): void {
    if (this.sub) this.sub.unsubscribe()
  }


}
