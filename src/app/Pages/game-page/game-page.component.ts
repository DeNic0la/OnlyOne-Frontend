import { Component, OnInit } from '@angular/core';
import {Card, CardColor, CardNumber} from "../../types/card.types";
import {ActivatedRoute} from "@angular/router";
import {getRandomCard} from "../../Util/card.util";
import {delay, of, tap} from "rxjs";

@Component({
  selector: 'app-game-page',
  templateUrl: './game-page.component.html',
  styleUrls: ['./game-page.component.css']
})
export class GamePageComponent implements OnInit {

  public cards:Card[] = [];

  public isLoading:boolean = false;

  /**
   * Draw a new card from the Stack
   */
  public drawCard(){
    this.cards = [...this.cards, getRandomCard()];
  }

  public playCard(index:number){
    this.isLoading = true;
    const altCards = this.cards;
    const loadingCards = this.cards;
    loadingCards[index] = {color: undefined,number: undefined};
    this.cards = loadingCards;
    // TODO make play Card here
    of(altCards[index]).pipe(delay(1000),tap(value => {console.dir(value)})).subscribe(value => {
      altCards.splice(index,1)
      this.cards = altCards;
      this.isLoading = false;
    })
  }



  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({cards})=>{
      this.cards = cards;
    })
  }

}

