import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { GoogleMap } from "@capacitor/google-maps";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-localizacion",
  templateUrl: "./localizacion.page.html",
  styleUrls: ["./localizacion.page.scss"],
})
export class LocalizacionPage {
  @ViewChild("map") mapRef: ElementRef;
  map: GoogleMap;

  constructor() {}

  ionViewDidEnter() {
    this.createMap();
  }

  async createMap() {
    this.map = await GoogleMap.create({
      id: "my-map",
      apiKey: environment.mapsKey,
      element: this.mapRef.nativeElement,
      config: {
        center: {
          lat: 33.6,
          lng: -117.9,
        },
        zoom: 8,
      },
    });
  }
}
