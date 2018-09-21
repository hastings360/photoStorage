import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

import { PhotoStr } from '../../photo-str.model';

@Component({
  selector: 'app-mini-pics',
  templateUrl: './mini-pics.component.html',
  styleUrls: ['./mini-pics.component.css']
})
export class MiniPicsComponent implements OnInit {

  @Input() photo: PhotoStr;

  @Output() previewPhoto: EventEmitter<PhotoStr> = new EventEmitter<PhotoStr>();

  public url: SafeResourceUrl;

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.url = this.sanitizer.bypassSecurityTrustResourceUrl('https://photos.larry-hastings.com/icons/mini-' + this.photo.imageName);
  }

  sendPreview(x) {
    this.previewPhoto.emit(x);
  }
}
