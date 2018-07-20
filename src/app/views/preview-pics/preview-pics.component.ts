import { DbTalkerService } from './../../db-talker.service';
import { Component, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

import { PhotoStr } from '../../photo-str.model';

@Component({
  selector: 'app-preview-pics',
  templateUrl: './preview-pics.component.html',
  styleUrls: ['./preview-pics.component.css']
})
export class PreviewPicsComponent implements OnChanges {

  @Input() photo: PhotoStr;
  
  @Input() seePhoto: boolean = false;

  @Output() closePreview: EventEmitter<boolean> = new EventEmitter<boolean>();

  public url: SafeResourceUrl;
  public urlFull: SafeResourceUrl;

  public downloadable: boolean = false;

  constructor(private sanitizer: DomSanitizer,private dbTalker: DbTalkerService) { }

  ngOnChanges() {
    this.url = this.sanitizer.bypassSecurityTrustResourceUrl('https://photos.larry-hastings.com/previews/med-' + this.photo.imageName);
    this.urlFull = this.sanitizer.bypassSecurityTrustResourceUrl('https://photos.larry-hastings.com/' + this.photo.imageName);
    this.dbTalker.tokenVerify(localStorage.getItem('token'))
      .then(results =>{
        if(results.answer === "yes"){
         this.downloadable = true;
        }else{
          this.downloadable = false;
        }
      })
      .catch(error => console.log(error + ": Error verifying token--DbTalkerService"));
  }

  closePrev(){
    this.closePreview.emit(false);
  }
}
