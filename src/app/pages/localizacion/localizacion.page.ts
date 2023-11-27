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
      coordinate: { lat: -33.63869907867093, lng: -70.87506868186061 },
      title: "Slier",
      snippet: "Local de eventos",
    },
    {
      coordinate: { lat: -33.58921545091561, lng: -70.4613240450306 },
      title: "Casona San José",
      snippet: "Local de eventos",
    },
    {
      coordinate: { lat: -33.79702450995916, lng: -70.75813798920372 },
      title: "Parcela el Aromo",
      snippet: "Local de eventos",
    },
    {
      coordinate: { lat: -33.5825871499938, lng: -70.40502847386695 },
      title: "La morada del cajón",
      snippet: "Local de eventos",
    },
    {
      coordinate: { lat: -33.397894901773455, lng: -70.8725595450376 },
      title: "Las rocas de noviciado",
      snippet: "Local de eventos",
    },
    {
      coordinate: { lat: -33.63414824271745, lng: -70.87405164232769 },
      title: "Espacio Nehuen",
      snippet: "Local de eventos",
    },
    {
      coordinate: { lat: -33.71122665761049, lng: -70.85722937386234 },
      title: "Casona Lonquén",
      snippet: "Local de eventos",
    },
    {
      coordinate: { lat: -33.5398824593079, lng: -70.86597582519474 },
      title: "El nogalito",
      snippet: "Local de eventos",
    },
    {
      coordinate: { lat: -33.763725303533136, lng: -70.7911173757134 },
      title: "Hacienda los rosales",
      snippet: "Local de eventos",
    },
    {
      coordinate: { lat: -32.91433795341828, lng: -71.45849366225286 },
      title: "Raices Chilenas",
      snippet: "Local de eventos",
    },
    {
      coordinate: { lat: -33.0189001855495, lng: -71.56178881534463 },
      title: "Nogaró",
      snippet: "Restaurant",
      iconUrl: "assets/icon/restaurant-icon.png",
      iconSize: { width: 50, height: 50 },
      iconAnchor: { x: 25, y: 50 },
    },
    {
      coordinate: { lat: -33.46571143626737, lng: -70.65044022156938 },
      title: "Don camarón",
      snippet: "Restaurant",
      iconUrl: "assets/icon/restaurant-icon.png",
      iconSize: { width: 50, height: 50 },
      iconAnchor: { x: 25, y: 50 },
    },
    {
      coordinate: { lat: -18.366862228479228, lng: -70.21472818486946 },
      title: "Rancho Don Alejo",
      snippet: "Restaurant",
      iconUrl: "assets/icon/restaurant-icon.png",
      iconSize: { width: 50, height: 50 },
      iconAnchor: { x: 25, y: 50 },
    },
    {
      coordinate: { lat: -33.03955403918082, lng: -71.62811279238423 },
      title: "Abtao Restaurant Wine",
      snippet: "Restaurant",
      iconUrl: "assets/icon/restaurant-icon.png",
      iconSize: { width: 50, height: 50 },
      iconAnchor: { x: 25, y: 50 },
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
        zoom: 6,
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

      // if (marcadorSeleccionado) {
      //   this.mostrarInfoMarcador(marcadorSeleccionado);
      // }
    });
  }

  // async mostrarInfoMarcador(marcador: Marker) {
  //   const popover = await this.popoverController.create({
  //     component: MarcadorPopoverComponent,
  //     componentProps: {
  //       titulo: marcador.title,
  //       descripcion: marcador.snippet,
  //     },
  //     translucent: true,
  //   });
  //   await popover.present();
  // }
}
