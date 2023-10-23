import { TestBed } from '@angular/core/testing';

import { ApicoctelesService } from './apicocteles.service';

describe('ApicoctelesService', () => {
  let service: ApicoctelesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApicoctelesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
