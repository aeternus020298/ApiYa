import { ComponentFixture, TestBed } from '@angular/core/testing';
<<<<<<<< HEAD:src/app/pages/miboda/miboda.page.spec.ts
import { MibodaPage } from './miboda.page';

describe('MibodaPage', () => {
  let component: MibodaPage;
  let fixture: ComponentFixture<MibodaPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(MibodaPage);
========
import { ProveedoresPage } from './proveedores.page';

describe('ProveedoresPage', () => {
  let component: ProveedoresPage;
  let fixture: ComponentFixture<ProveedoresPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ProveedoresPage);
>>>>>>>> main:src/app/pages/proveedores/proveedores.page.spec.ts
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
