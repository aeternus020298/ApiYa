import { TestBed } from '@angular/core/testing';

import { AuthLocalGuard } from './auth-local.guard';

describe('AuthLocalGuard', () => {
  let guard: AuthLocalGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthLocalGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
