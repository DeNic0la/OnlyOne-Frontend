import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Card} from "../../types/card.types";

@Component({
  selector: 'app-stack',
  templateUrl: './stack.component.html',
  styleUrls: ['./stack.component.css']
})
export class StackComponent implements OnInit {

  @Input() topCard:Card = {color: undefined,number: undefined};

  constructor() { }

  ngOnInit(): void {
  }

}
