import {Component, Input, OnInit} from '@angular/core';
import {CardColor, CardNumber} from "./card.types";

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  @Input() color:CardColor|undefined;
  @Input() number:CardNumber|undefined;
  @Input() cardWidth:number|undefined = 300;

  get cardColorClass():string {
    return `card-col-${ this.color }`;
  }

  constructor() { }

  ngOnInit(): void {
  }

}
