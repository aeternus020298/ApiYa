import { ComponentFixture, TestBed, async } from "@angular/core/testing";
import { ModbodaPage } from "./modboda.page";

describe("ModbodaPage", () => {
  let component: ModbodaPage;
  let fixture: ComponentFixture<ModbodaPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ModbodaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
