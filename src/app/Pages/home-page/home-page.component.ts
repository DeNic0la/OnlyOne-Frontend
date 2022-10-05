import { Component, OnInit } from '@angular/core';
import {RoomService} from "../../service/room.service";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  constructor(private roomService:RoomService) { }


  public labels:string[] = ['Room','Join','Player Count'];

  ngOnInit(): void {
  }

}
