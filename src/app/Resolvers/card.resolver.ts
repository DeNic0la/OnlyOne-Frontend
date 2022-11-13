import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import {Card, CardColor, CardNumber} from "../types/card.types";
import {getRandomCard} from "../Util/card.util";

@Injectable({
  providedIn: 'root'
})
export class CardResolver implements Resolve<Card[]> {
  private amountOfCardsOnStart = 7;

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Card[]> {
    const startCards = Array.from({length: this.amountOfCardsOnStart}, getRandomCard)
    return of(startCards);
  }
}
