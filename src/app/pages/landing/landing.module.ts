import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { LandingPageRoutingModule } from "./landing-routing.module";
import { LandingPage } from "./landing.page";
import { MatSliderModule } from "@angular/material/slider";
import { defineCustomElements } from "@teamhive/lottie-player/loader";

defineCustomElements(window);
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LandingPageRoutingModule,
    MatSliderModule,
  ],
  declarations: [LandingPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class LandingPageModule {}
