import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {ToolbarModule} from 'primeng/toolbar';
import { HomePageComponent } from './Pages/home-page/home-page.component';
import {CardModule} from 'primeng/card';
import {TableModule} from 'primeng/table';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RoomService} from "./service/room.service";
import {HttpClientModule} from "@angular/common/http";
import {ButtonModule} from 'primeng/button';
import {DialogModule} from 'primeng/dialog';
import {InputTextModule} from 'primeng/inputtext';
import {NAMELIX_PROVIDER, NamelixService} from "./service/namelix.service";
import {FormsModule} from "@angular/forms";





@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ToolbarModule,
    CardModule,
    TableModule,
    ButtonModule,
    HttpClientModule,
    DialogModule,
    InputTextModule,
    FormsModule
  ],
  providers: [RoomService,NAMELIX_PROVIDER],
  bootstrap: [AppComponent]
})
export class AppModule { }
