import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Card} from "../../types/card.types";

@Component({
  selector: 'app-stack',
  templateUrl: './stack.component.html',
  styleUrls: ['./stack.component.css']
})
export class StackComponent implements OnInit, OnChanges {

  @Input() cardStack:Card[] = [];

  public topCard:Card = {color: undefined,number: undefined};

  ngOnChanges(changes: SimpleChanges) {
    const newCard = this.cardStack[0];
    this.topCard = newCard ? newCard : this.topCard;
  }

  constructor() { }

  ngOnInit(): void {
  }

}
