import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Card} from "../../types/card.types";

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

  @Input() isLoading:boolean = false;

  @Input() isYourTurn:boolean = false;

  @Output() playCard = new EventEmitter<number>()

  public index:number = -3;

  public onCardClick(index:number){
    if (this.isLoading || !this.isYourTurn){
      alert("AAA");
      return;
    }
    this.playCard.emit(index)
  }

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
