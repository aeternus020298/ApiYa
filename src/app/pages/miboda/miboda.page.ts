import { Component, OnInit } from "@angular/core";
import { NavigationExtras, Router } from "@angular/router";
import { SQLite, SQLiteObject } from "@awesome-cordova-plugins/sqlite";
import { Platform, ToastController } from "@ionic/angular";
import { DbserviceService } from "src/app/services/dbservice.service";
import { ApicoctelesService } from "src/app/services/apicocteles.service";
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { FirebaseAuthService } from "src/app/services/firebase-auth.service";

@Component({
  selector: 'app-miboda',
  templateUrl: './miboda.page.html',
  styleUrls: ['./miboda.page.scss'],
})
export class MibodaPage implements OnInit {
  currentUserId: string | null = null;
  menuType: string = "overlay";
  items = [];
  //POSIBLEMENTE HAYA QUE AJUSTAR ESTO PARA QUE SE LOGRE VER LA IMAGEN Y TEXTO DE LOTTIFILES
  bodas: any = [
    {
      descripcion: "Escribe aqui datos de interés",
      investrella: "Escribe aqui tu invitado especial",
      menuestrella: "Escribe aqui tu menu especial",
      tragoestrella: "Escribe aqui tu traguito especial",
      lugar: "Escribe aqui el lugar de tu boda",
      fecha: "Escribe aqui la fecha de tu boda",
    },
  ];

  //BORRAR DESPUÉS
  isModalOpen = false;
  user: any;

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }
  constructor(
    private router: Router,
    private servicioBD: DbserviceService,
    private authService: FirebaseAuthService
  ) {
    this.router.navigate(["miboda/funciones"]);
    this.user = authService.getProfile();
  }
  //SE UTILIZA USERID
  async ngOnInit() {
    this.currentUserId = await this.authService.getUserId();
    this.servicioBD.dbState().subscribe((res: any) => {
      if (res) {
        this.servicioBD.fetchBodas(this.currentUserId).subscribe((item: any) => {
          this.bodas = item;
        });
      }
    });
  }

  getItem($event: any) {
    const valor = $event.target.value;
    console.log("valor del control: " + valor);
  }

  editar(item: any) {
    let navigationextras: NavigationExtras = {
      state: {
        idEnviado: item.id,
        descripcionEnviado: item.descripcion,
        investrella: item.investrella,
        menuestrella: item.menuestrella,
        tragoestrella: item.tragoestrella,
        lugarEnviado: item.lugar,
        fechaEnviado: item.fecha,
      },
    };
    this.router.navigate(["/modboda"], navigationextras);
  }

  eliminar(item: any, userId: any) {
    this.servicioBD.deleteBoda(item.id, userId);
    this.servicioBD.presentToast("Haz eliminado tu boda :( !!!");
  }
  
  segmentChanged($event: any) {
    console.log($event);
    let direccion = $event.detail.value;
    this.router.navigate(["miboda/" + direccion]);
  }
  
  //codgio ts relacionado a infinite scroll
  private generateItems() {
    const count = this.items.length + 1;
    for (let i = 0; i < 50; i++) {
      this.items.push(`Item ${count + i}`);
    }
  }
  onIonInfinite(ev) {
    this.generateItems();
    setTimeout(() => {
      (ev as InfiniteScrollCustomEvent).target.complete();
    }, 500);
  }

}
