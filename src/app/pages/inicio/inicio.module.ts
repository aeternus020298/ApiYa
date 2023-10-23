import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { InicioPageRoutingModule } from "./inicio-routing.module";
import { InicioPage } from "./inicio.page";
import { MatSliderModule } from "@angular/material/slider";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { defineCustomElements } from "@teamhive/lottie-player/loader";
import { PrincipalComponent } from "src/app/components/principal/principal.component";
import { BodaComponent } from "src/app/components/boda/boda.component";
import { QrComponent } from "src/app/components/qr/qr.component";
import { BarcodeScanner } from "@awesome-cordova-plugins/barcode-scanner/ngx";
defineCustomElements(window);
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InicioPageRoutingModule,
    MatSliderModule,
  ],
  providers: [BarcodeScanner],
  declarations: [InicioPage, PrincipalComponent, BodaComponent, QrComponent],
})
export class InicioPageModule {}
