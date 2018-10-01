import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing/';
import { TestBed, getTestBed} from '@angular/core/testing';

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
});
