import { TestBed } from '@angular/core/testing';

import { SlotGenerateService } from './slot-generate.service';

describe('SlotGenerateService', () => {
  let service: SlotGenerateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SlotGenerateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
