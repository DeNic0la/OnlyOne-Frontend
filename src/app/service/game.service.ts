import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {GameInfo} from "./service";
import {interval, Observable, shareReplay, switchAll, switchMap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private get url(){
    return environment.url;
  }

  constructor(private requestinator:HttpClient) {

  }
  public joinGame(id:number|string){
    return interval(1000).pipe(
      switchMap(_ => {
      return this.requestinator.get<GameInfo>(`${this.url}/game/${id}`)
      }),
      shareReplay(1)
    )
  }



}
