import { Component, ElementRef, ViewChild } from "@angular/core";
import { GoogleMap, Marker } from "@capacitor/google-maps";
import { PopoverController } from "@ionic/angular";
import { MarcadorPopoverComponent } from "src/app/components/marcador-popover/marcador-popover.component";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-localizacion",
  templateUrl: "./localizacion.page.html",
  styleUrls: ["./localizacion.page.scss"],
})
export class LocalizacionPage {
  @ViewChild("map") mapRef: ElementRef;
  map: GoogleMap;

  markers: Marker[] = [
    {
      // ID único agregado manualmente
      coordinate: { lat: -33.1, lng: -71.7 },
      title: "",
      snippet: "Prueba en donde agregar una wea",
    },
    {
      // ID único agregado manualmente
      coordinate: { lat: -33.3, lng: -71.9 },
      title: "Prueba 2",
      snippet: "Intento de prueba número 2",
    },
  ];

  constructor(private popoverController: PopoverController) {}

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
          lat: -33.020638,
          lng: -71.489153,
        },
        zoom: 8,
      },
    });
    this.addMarkers();
  }

  async addMarkers() {
    await this.map.addMarkers(this.markers);

    this.map.setOnMarkerClickListener(async (data) => {
      const marcadorSeleccionado = this.markers.find(
        (marker) =>
          marker.coordinate.lat === data.latitude &&
          marker.coordinate.lng === data.longitude
      );

      if (marcadorSeleccionado) {
        this.mostrarInfoMarcador(marcadorSeleccionado);
      }
    });
  }

  async mostrarInfoMarcador(marcador: Marker) {
    const popover = await this.popoverController.create({
      component: MarcadorPopoverComponent,
      componentProps: {
        titulo: marcador.title,
        descripcion: marcador.snippet,
      },
      translucent: true,
    });
    await popover.present();
  }
}
