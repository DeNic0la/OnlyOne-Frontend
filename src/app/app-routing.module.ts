import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AppComponent} from "./app.component";
import {HomePageComponent} from "./Pages/home-page/home-page.component";
import {LobbyPageComponent} from "./Pages/lobby-page/lobby-page.component";
import {GamePageComponent} from "./Pages/game-page/game-page.component";
import {CardResolver} from "./Resolvers/card.resolver";

//This is my case
const routes: Routes = [
  {
    path: '',
    component: HomePageComponent
  },
  {
    path: 'lobby/:id',
    component: LobbyPageComponent
  },
  {
    path: 'game/:id',
    component: GamePageComponent,
    resolve: {
      cards: CardResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
