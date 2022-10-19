import { Component } from '@angular/core';
import {NamelixService} from "./service/namelix.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'OnlyOneAngular';
  public loginPopUpOpen:boolean = false;
  public username:string;
  constructor(private nameService:NamelixService) {
    this.username =  nameService.name;
  }

}
