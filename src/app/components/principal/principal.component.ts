import { Component, OnInit } from "@angular/core";
import { Boda } from "src/app/clases/boda";
import { NavigationExtras, Router } from "@angular/router";
import { SQLite, SQLiteObject } from "@awesome-cordova-plugins/sqlite";
import { Platform, ToastController } from "@ionic/angular";
import { DbserviceService } from "src/app/services/dbservice.service";
import { ApicoctelesService } from "src/app/services/apicocteles.service";
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { FirebaseAuthService } from "src/app/services/firebase-auth.service";

@Component({
  selector: "app-principal",
  templateUrl: "./principal.component.html",
  styleUrls: ["./principal.component.scss"],
})
export class PrincipalComponent implements OnInit {
  
  constructor(private router: Router ) {}

  ngOnInit() {}
  getItem($event: any) {
    const valor = $event.target.value;
    console.log("valor del control: " + valor);
  }

  //Relacionado a segment y los componentes
  segmentChanged($event: any) {
    console.log($event);
    let direccion = $event.detail.value;
    this.router.navigate(["inicio/" + direccion]);
  }
}
