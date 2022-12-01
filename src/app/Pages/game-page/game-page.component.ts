import { Component, OnInit } from '@angular/core';
import {Card, CardColor, CardNumber} from "../../types/card.types";
import {ActivatedRoute, Router} from "@angular/router";
import {getRandomCard} from "../../Util/card.util";
import {delay, of, tap} from "rxjs";
import {StackService} from "../../service/stack.service";
import {MessageService} from "primeng/api";
import {GameService} from "../../service/game.service";
import {TurnService} from "../../service/turn.service";

@Component({
  selector: 'app-game-page',
  templateUrl: './game-page.component.html',
  styleUrls: ['./game-page.component.css']
})
export class GamePageComponent implements OnInit {

  public cards:Card[] = [];

  public isLoading:boolean = false;

  public isYourTurn:boolean = true;

  private id: string | undefined;

  public topCard:Card = {number: undefined, color: undefined};

  /**
   * Draw a new card from the Stack
   */
  public drawCard(){
    this.cards = [...this.cards, getRandomCard()];
  }

  public playCard(index:number){
    if (!this.id)
      return;
    const topCard = this.topCard;
    const cardToPlay = this.cards[index];

    // if Card Number and Color doesnt match return
    if (topCard.number !== cardToPlay.number && topCard.color !== cardToPlay.color)
      return;

    this.isLoading = true;
    const loadingCards = this.cards;
    loadingCards[index] = {color: undefined,number: undefined};
    this.cards = loadingCards;
    // TODO make play Card here
    //this.Stack.playCard(cardToPlay);

    this.Game.playCard(this.id, cardToPlay).subscribe({
      next: ()=>{
        loadingCards.splice(index,1)
        this.cards = loadingCards;
        this.isLoading = false;
      },
      error: ()=>{
        this.isLoading = false;
        // Add card back to stack
        loadingCards[index] = cardToPlay;
        this.cards = loadingCards;
        alert("AAAA") // TODO ERROR
      },
    })
  }

  private async goHome(): Promise<void> {
    await this.router.navigate(['/'])
  }

  private lobbyNotFoundCallback: ()=>void = ()=>{
    this.msg.add({summary: "Lobby nicht gefunden", detail: "Die angegebene Lobby wurde nicht gefunden",severity:"error",life:3000})
  }

  constructor(private activatedRoute: ActivatedRoute, private Stack:StackService, private route:ActivatedRoute, private router:Router,private msg:MessageService, private Game:GameService, private Turn:TurnService) { }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({cards})=>{
      this.cards = cards;
    });
    this.id = (this.route.snapshot.paramMap.get('id') || "");
    if (this.id.trim() === ""){
      this.goHome().then(this.lobbyNotFoundCallback)
    }

    let obs = this.Game.joinGame(this.id);

    obs.subscribe(value => console.dir(value))
    //TODO UNSUB
    this.Stack.getCardObs(obs).subscribe(value => this.topCard = value);

    this.Turn.getCardObs(obs).subscribe(value => this.isYourTurn = value);

  }

}

