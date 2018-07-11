import { Component, OnInit, Output, EventEmitter, ElementRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/switch';

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
    Observable.fromEvent(this.el.nativeElement, 'keyup')
    .map((input:any) => input.target.value)
    .filter((inputData: string) => inputData.length > 0)
    .debounceTime(250)
    .subscribe(
      (inputData) => {this.query.emit(inputData)},
      (error) => {console.log(error);console.log("Error coming from search.component, Not grabbing Input");}
    )
  }
  /*keyUp(event){
   
    this.query.emit(event.target.value);
  }*/

}

/*

import { YouTubeSearchService } from './you-tube-search.service';
import { SearchResult } from './search-result.model';

@Component({
  selector: 'app-search-box',
  template: `
    <input type="text" class="form-control" placeholder="Search" autofocus>


  ngOnInit(): void {
    // convert the `keyup` event into an observable stream
    Observable.fromEvent(this.el.nativeElement, 'keyup')
      .map((e: any) => e.target.value) // extract the value of the input
      .filter((text: string) => text.length > 1) // filter out if empty
      .debounceTime(250)                         // only once every 250ms
      .do(() => this.loading.emit(true))         // enable loading
      // search, discarding old events if new input comes in
      .map((query: string) => this.youtube.search(query))
      .switch()
      // act on the return of the search
      .subscribe(
        (results: SearchResult[]) => { // on sucesss
          this.loading.emit(false);
          this.results.emit(results);
        },
        (err: any) => { // on error
          console.log(err);
          this.loading.emit(false);
        },
        () => { // on completion
          this.loading.emit(false);
        }
      );
  }
}
*/