import { Component, OnChanges, Input, Output, EventEmitter} from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { PhotoStr } from '../photo-str.model';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnChanges {

  @Input() photos = new BehaviorSubject<PhotoStr[]>([]);

  @Output() previewPhoto: EventEmitter<PhotoStr> = new EventEmitter<PhotoStr>();

  public noResults: boolean = false;
  public databaseError: boolean = false;

  constructor() {
    
  }

  /*AfterViewInit(){
    let container = document.querySelector('.grid');

    let masonry = new Masonry(container,{
      columnWidth: 50,
      itemSelector: '.grid-item'
    })
  }*/

  

  ngOnChanges(){
    this.photos.subscribe(
      (photoArray) => {
            if(photoArray.length < 1 ){
              this.noResults = true;
            }
            else{
              this.noResults = false;
            }
      },
      (error) => {
            console.log(error);
            console.log("Error getting photo length on search-results-component");
            this.databaseError = true;
      })
  }

  sendPreview(x){
    this.previewPhoto.emit(x);
  }

}