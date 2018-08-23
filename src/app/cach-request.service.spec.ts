import { TestBed, inject } from '@angular/core/testing';

import { CachRequestService } from './cach-request.service';

describe('CachRequestService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CachRequestService]
    });
  });

  it('should be created', inject([CachRequestService], (service: CachRequestService) => {
    expect(service).toBeTruthy();
  }));
});
