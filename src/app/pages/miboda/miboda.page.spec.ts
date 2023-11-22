import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MibodaPage } from './miboda.page';

describe('MibodaPage', () => {
  let component: MibodaPage;
  let fixture: ComponentFixture<MibodaPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(MibodaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
