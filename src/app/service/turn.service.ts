import { Injectable } from '@angular/core';
import {distinctUntilChanged, map, Observable, shareReplay} from "rxjs";
import {GameInfo} from "./service";

@Injectable({
  providedIn: 'root'
})
export class TurnService {

  public getCardObs(obs:Observable<GameInfo>):Observable<boolean>{
    return obs.pipe(
      map((value) =>  { return value.is_your_turn }),
      distinctUntilChanged(),
      shareReplay(1)
    )
  }

  constructor() { }
}
