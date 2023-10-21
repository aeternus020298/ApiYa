import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BodaPage } from './boda.page';

describe('BodaPage', () => {
  let component: BodaPage;
  let fixture: ComponentFixture<BodaPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(BodaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
