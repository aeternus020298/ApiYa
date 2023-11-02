import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { RestorePageRoutingModule } from "./restore-routing.module";
import { RestorePage } from "./restore.page";
import { defineCustomElements } from "@teamhive/lottie-player/loader";
import { MatSliderModule } from "@angular/material/slider";

defineCustomElements(window);
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatSliderModule,
    IonicModule,
    RestorePageRoutingModule,
  ],
  declarations: [RestorePage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class RestorePageModule {}
