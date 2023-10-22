import { TestBed } from '@angular/core/testing';

import { NoauthLocalGuard } from './noauth-local.guard';

describe('NoauthLocalGuard', () => {
  let guard: NoauthLocalGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(NoauthLocalGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
