import { ComponentFixture, TestBed, async } from "@angular/core/testing";

import { MibodaPage } from "./miboda.page";

describe("MibodaPage", () => {
  let component: MibodaPage;
  let fixture: ComponentFixture<MibodaPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(MibodaPage);

    it("should create", () => {
      expect(component).toBeTruthy();
    });
  }));
});
