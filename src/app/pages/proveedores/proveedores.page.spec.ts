import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProveedoresPage } from './proveedores.page';

describe('ProveedoresPage', () => {
  let component: ProveedoresPage;
  let fixture: ComponentFixture<ProveedoresPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ProveedoresPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
