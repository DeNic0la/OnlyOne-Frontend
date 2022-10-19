import { Component } from '@angular/core';
import {NamelixService} from "./service/namelix.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'OnlyOneAngular';
  label = 'Benutzername Eingeben'
  public loginPopUpOpen:boolean = false;
  public username:string;
  constructor(private nameService:NamelixService) {
    this.username =  nameService.uName;
    if (this.username.length > 1) this.label = this.username;
  }
  public saveUsername(){
    if (this.username.length > 1){
      this.label = this.username;
      this.nameService.uName = this.username;
      this.loginPopUpOpen = false;
    }
    else {
      alert("You are such a idiot you dont even deserve a pretty error message");
    }

  }

}
