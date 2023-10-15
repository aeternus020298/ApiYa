import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddbodaPage } from './addboda.page';

describe('AddbodaPage', () => {
  let component: AddbodaPage;
  let fixture: ComponentFixture<AddbodaPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AddbodaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
