import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RestorePage } from './restore.page';

describe('RestorePage', () => {
  let component: RestorePage;
  let fixture: ComponentFixture<RestorePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(RestorePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
