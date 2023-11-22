import { TestBed } from '@angular/core/testing';

import { ProovedoresService } from './proovedores.service';

describe('ProovedoresService', () => {
  let service: ProovedoresService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProovedoresService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
