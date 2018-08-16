import { TestBed, inject, fakeAsync, tick} from '@angular/core/testing';

import { DbTalkerService } from './db-talker.service';

describe('DbTalkerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DbTalkerService]
    });
  });

  it('should be created', inject([DbTalkerService], (service: DbTalkerService) => {
    expect(service).toBeTruthy();
  }));
});
