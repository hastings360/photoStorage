
import {fromEvent as observableFromEvent} from 'rxjs';
import {debounceTime, filter, map} from 'rxjs/operators';
import { Component, OnInit, Output, EventEmitter, ElementRef } from '@angular/core';

import { DbTalkerService } from './../db-talker.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

@Output() query: EventEmitter<string> = new EventEmitter<string>();

  constructor(private dbTalker: DbTalkerService, private el: ElementRef) { console.log(el);}

  ngOnInit(): void { 
    observableFromEvent(this.el.nativeElement, 'keyup').pipe(
    map((input:any) => input.target.value),
    filter((inputData: string) => inputData.length > 0),
    debounceTime(250),)
    .subscribe(
      (inputData) => {this.query.emit(inputData)},
      (error) => {console.log(error);console.log("Error coming from search.component, Not grabbing Input");}
    )
  }
}
