import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { LocalizacionPageRoutingModule } from "./localizacion-routing.module";

import { LocalizacionPage } from "./localizacion.page";
import { MarcadorPopoverComponent } from "src/app/components/marcador-popover/marcador-popover.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LocalizacionPageRoutingModule,
  ],
  declarations: [LocalizacionPage, MarcadorPopoverComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class LocalizacionPageModule {}
