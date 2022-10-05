import { Component, OnInit } from '@angular/core';
import {RoomService} from "../../service/room.service";
import {interval, Observable, startWith, Subject, switchMap} from "rxjs";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  constructor(private roomService:RoomService) {
  }


  public rooms:string[] = [];

  public labels:string[] = ['Room','Join','Player Count'];

  ngOnInit(): void {
    interval(5000).pipe(
      startWith(0),
      switchMap(() => this.roomService.Rooms)
    ).subscribe(res=> {console.log(res);this.rooms = res;})

  }

  private update(){
    this.roomService.Rooms.subscribe(value => {
      this.rooms = value;
    })
  }

}
