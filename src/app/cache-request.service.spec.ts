import { TestBed, inject } from '@angular/core/testing';

import { CacheRequestService } from './cache-request.service';

describe('CacheRequestService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CacheRequestService]
    });
  });

  it('should be created', inject([CacheRequestService], (service: CacheRequestService) => {
    expect(service).toBeTruthy();
  }));
});
