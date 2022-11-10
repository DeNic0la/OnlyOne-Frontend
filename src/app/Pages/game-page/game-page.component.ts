import { Component, OnInit } from '@angular/core';
import {Card, CardColor, CardNumber} from "../../Components/card/card.types";

@Component({
  selector: 'app-game-page',
  templateUrl: './game-page.component.html',
  styleUrls: ['./game-page.component.css']
})
export class GamePageComponent implements OnInit {

  public cards:Card[] = [
    {
      number: 1,
      color: "blue"
    },
    {
      number: 2,
      color: "green"
    },
    {
      number: 3,
      color: "red"
    },
    {
      number: 4,
      color: "yellow"
    },
    {
      number: 5,
      color: "red"
    },
    {
      number: 6,
      color: "green"
    },
    {
      number: 7,
      color: "blue"
    },
    {
      number: 8,
      color: "yellow"
    },
    {
      number: 9,
      color: "green"
    },
  ]

  constructor() { }

  ngOnInit(): void {
  }

}

