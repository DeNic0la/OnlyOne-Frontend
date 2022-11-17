import {Injectable, OnInit} from '@angular/core';
import {Card} from "../types/card.types";
import {delay, Observable, Subject} from "rxjs";
import {getRandomCard} from "../Util/card.util";

@Injectable({
  providedIn: 'root'
})
export class StackService implements OnInit{
  /**
   * This function just is here until se Backend wörks
   * @param card
   */
  public playCard(card:Card){
    this.internalCardStack = [card, ...this.internalCardStack];
    this.cardStackSubject.next(this.internalCardStack)
  }

  private cardStackSubject:Subject<Card[]> = new Subject();

  public cardStack:Observable<Card[]> = this.cardStackSubject./*Mock*/pipe(delay(1000));

  private internalCardStack:Card[] = [getRandomCard()];

  constructor() { }

  ngOnInit(): void {
    this.cardStackSubject.next(this.internalCardStack);
  }
}
