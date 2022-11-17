import {Injectable, OnInit} from '@angular/core';
import {Card} from "../types/card.types";
import {delay, map, mapTo, Observable, Subject, switchMap} from "rxjs";
import {getRandomCard} from "../Util/card.util";
import {GameInfo} from "./service";

@Injectable({
  providedIn: 'root'
})
export class StackService implements OnInit{


  public getCardObs(obs:Observable<GameInfo>){
    return obs.pipe(
      map((value) =>  { return value.card})
    )
  }

  constructor() { }

  ngOnInit(): void {
  }
}
