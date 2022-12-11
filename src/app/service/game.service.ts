import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {GameInfo} from "./service";
import {distinctUntilChanged, interval, Observable, shareReplay, switchAll, switchMap} from "rxjs";
import {NamelixService} from "./namelix.service";
import {Card} from "../types/card.types";

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private get url(){
    return environment.url;
  }

  constructor(private requestinator:HttpClient, private namenator:NamelixService) {

  }
  public joinGame(id:number|string){
    return interval(1000).pipe(
      switchMap(_ => {
      return this.requestinator.get<GameInfo>(`${this.url}/game/${id}`,{headers: this.namenator.header})
      }),
      distinctUntilChanged(this.isEquals),
      shareReplay(1)
    )
  }

  private isEquals(a:GameInfo,b:GameInfo):boolean {
    return (a.card.color === b.card.color && a.card.number === b.card.number && a.is_your_turn === b.is_your_turn)
  }

  public playCard(id:number|string, card:optionalCard): Observable<any> {
    return this.requestinator.post<any>(`${this.url}/play/${id}`, card,{headers: this.namenator.header})
  }

}
type optionalCard = Card | {};
