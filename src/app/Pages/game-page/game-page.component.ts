import {Component, OnDestroy, OnInit} from '@angular/core';
import {Card, CardColor, CardNumber} from "../../types/card.types";
import {ActivatedRoute, Router} from "@angular/router";
import {getRandomCard} from "../../Util/card.util";
import {catchError, delay, map, Observable, of, Subscription, tap} from "rxjs";
import {StackService} from "../../service/stack.service";
import {MessageService} from "primeng/api";
import {GameService} from "../../service/game.service";
import {TurnService} from "../../service/turn.service";
import {RoomService} from "../../service/room.service";
import {callError, callWarning} from "../../Util/error.util";


@Component({
  selector: 'app-game-page',
  templateUrl: './game-page.component.html',
  styleUrls: ['./game-page.component.css']
})
export class GamePageComponent implements OnInit, OnDestroy {

  public cards:Card[] = [];

  public isLoading:boolean = false;

  public hasDrawnCard:boolean = false;

  public isYourTurn:boolean = true;

  public id: string | undefined;

  public topCard:Card = {number: undefined, color: undefined};

  private subscription = new Subscription();


  /**
   * Draw a new card from the Stack
   */
  public drawCard(){
    this.cards = [...this.cards, getRandomCard()];
    this.hasDrawnCard = true;
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


    this.Game.playCard(this.id, cardToPlay).subscribe({
      next: ()=>{
        loadingCards.splice(index,1)
        this.cards = loadingCards;
        this.isLoading = false;
        this.hasDrawnCard = false;
        this.checkForWin();
      },
      error: (err:any)=>{
        this.isLoading = false;
        // Add card back to stack
        loadingCards[index] = cardToPlay;
        this.cards = loadingCards;
        console.log(err)
        callError(this.msg,"Die Karte konnte nicht gespielt werden","Möglicherweise ist es nicht dein Zug oder eine ungültige Karte")
      },

    })
  }

  private async goHome(): Promise<void> {
    await this.router.navigate(['/'])
  }

  private checkForWin(){
    if (this.cards.length === 0){
      this.msg.add({summary:"Du bist ein Gewinner",detail:"Du hast alle Karten gespielt und somit gewonnen",life:10000,severity:"success"})

      this.leaveLobby()
      this.goHome().then(value => {console.log("Win")})
    }
  }

  public endTurn(){
    if (this.id){
      this.Game.playCard(this.id, {}).subscribe(value => {
        this.hasDrawnCard = false;
      })
    }
    else {
      callError(this.msg,"You are not in a room","No valid room");
    }
  }

  private lobbyNotFoundCallback: ()=>void = ()=>{
    this.msg.add({summary: "Lobby nicht gefunden", detail: "Die angegebene Lobby wurde nicht gefunden",severity:"error",life:3000})
  }

  public quitLobby(){
    this.leaveLobby();
    this.goHome().then(value => {console.log("Leave")})
  }

  private leaveLobby(){
    if (this.id)
      this.roomService.leave(this.id).subscribe(value => {
        console.log(value);})
  }

  private checkForLose(err:any){
    this.isGameLose().subscribe({ next: value => {
      if (value){
        callWarning(this.msg,"You lost","Du hast das Spiel verloren");

      }
      else {
        callWarning(this.msg,"Möglicherweise liegt ein Problem vor", "Sollte diese Meldung mehrmals erscheinen liegt ein Problem mit der Netzwerkverbindung oder dem Server vor");
      }
    },
    error: err1 => {console.dir(err1)}
    })

  }

  /**
   * Checks if the game is lost, returns true if lost.
   * @private
   */
  private isGameLose():Observable<boolean>{
    if (this.id){
      return this.roomService.Room(this.id).pipe(
        map(value => {return (value.status === "finished")}),
        catchError(err => {return of(err.status === 404 ||err.status === "404")}),
      )
    }
    return of(false)

  }

  constructor(private activatedRoute: ActivatedRoute, private Stack:StackService, private route:ActivatedRoute, private router:Router,private msg:MessageService, private Game:GameService, private Turn:TurnService,private roomService:RoomService) { }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({cards})=>{
      this.cards = cards;
    });

    this.id = (this.route.snapshot.paramMap.get('id') || "");
    if (this.id.trim() === ""){
      this.goHome().then(this.lobbyNotFoundCallback)
    }

    let obs = this.Game.joinGame(this.id);

    this.subscription.add(
      this.Stack.getCardObs(obs).subscribe({
        next: value => this.topCard = value,
        error: err => this.checkForLose(err)
      })
    )

    this.subscription.add(
      this.Turn.getCardObs(obs).subscribe({
        next: value => this.isYourTurn = value,
        error: err => this.checkForLose(err)
      })
    )



  }

}

