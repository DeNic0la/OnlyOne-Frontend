import {Component, Input, OnInit} from '@angular/core';
import {Card} from "../card/card.types";

@Component({
  selector: 'app-card-holder',
  templateUrl: './card-holder.component.html',
  styleUrls: ['./card-holder.component.css']
})
export class CardHolderComponent implements OnInit {

  /**
   * Cards in the Holder
   */
  @Input() cards:Card[] = [];

  public index:number = -3;

  constructor() { }

  ngOnInit(): void {
  }

  itemClass(index:number) {
    return {
      'le-card': true,
      'over-next': this.index - 2 === index || this.index + 2 === index,
      'next': this.index - 1 === index || this.index + 1 === index,
      'selected': this.index === index,
    };
  }

}
