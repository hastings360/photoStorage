import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing/';
import { TestBed, inject, getTestBed} from '@angular/core/testing';

import { DbTalkerService } from './db-talker.service';
import { PhotoStr } from './photo-str.model';

describe('DbTalkerService', () => {

  let injector: TestBed;
  let service: DbTalkerService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DbTalkerService]
    });
    injector = getTestBed();
    service = injector.get(DbTalkerService);
    httpMock = injector.get(HttpTestingController);
  });



  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  /*
  describe('#loadRecent30', () => {
    it('should return photo of type PhotoStr', () => {
      service.loadRecent30().subscribe(photos => {
        console.log(photos);
        expect(photos[0]).toEqual(jasmine.any(PhotoStr));
      });
    });
  });
  */

  /*afterEach(  () => {
    httpMock.verify();
  });*/
});
