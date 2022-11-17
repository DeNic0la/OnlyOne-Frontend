import { Component, OnInit } from '@angular/core';
import {Card, CardColor, CardNumber} from "../../types/card.types";
import {ActivatedRoute} from "@angular/router";
import {getRandomCard} from "../../Util/card.util";
import {delay, of, tap} from "rxjs";
import {StackService} from "../../service/stack.service";

@Component({
  selector: 'app-game-page',
  templateUrl: './game-page.component.html',
  styleUrls: ['./game-page.component.css']
})
export class GamePageComponent implements OnInit {

  public cards:Card[] = [];

  public isLoading:boolean = false;

  public isYourTurn:boolean = true;

  public cardStack:Card[] = [];

  /**
   * Draw a new card from the Stack
   */
  public drawCard(){
    this.cards = [...this.cards, getRandomCard()];
  }

  get topCard():Card{
    return this.cardStack[0];
  }

  public playCard(index:number){
    const topCard = this.topCard;
    const cardToPlay = this.cards[index];
    console.log("TopCard:");
    console.log(topCard);
    console.log("CardToPlay:");
    console.log(cardToPlay);
    // if Card Number and Color doesnt match return
    if (topCard.number !== cardToPlay.number && topCard.color !== cardToPlay.color)
      return;

    this.isLoading = true;
    const loadingCards = this.cards;
    loadingCards[index] = {color: undefined,number: undefined};
    this.cards = loadingCards;
    // TODO make play Card here
    this.Stack.playCard(cardToPlay);
    of(cardToPlay).pipe(delay(1000),tap(value => {console.dir(value)})).subscribe(value => {
      loadingCards.splice(index,1)
      this.cards = loadingCards;
      this.isLoading = false;
    })
  }



  constructor(private activatedRoute: ActivatedRoute, private Stack:StackService) { }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({cards})=>{
      this.cards = cards;
    });
    this.Stack.cardStack.subscribe(value => this.cardStack = value);
    this.Stack.playCard(getRandomCard());
  }

}

