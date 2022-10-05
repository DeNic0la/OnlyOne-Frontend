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
    TableModule
  ],
  providers: [RoomService],
  bootstrap: [AppComponent]
})
export class AppModule { }
