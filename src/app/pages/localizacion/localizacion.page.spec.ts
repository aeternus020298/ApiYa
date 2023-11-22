import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LocalizacionPage } from './localizacion.page';

describe('LocalizacionPage', () => {
  let component: LocalizacionPage;
  let fixture: ComponentFixture<LocalizacionPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(LocalizacionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
