import { Component, OnInit } from "@angular/core";
import { NavigationExtras, Router } from "@angular/router";
import { DbserviceService } from "src/app/services/dbservice.service";
import { InfiniteScrollCustomEvent } from "@ionic/angular";
import { FirebaseAuthService } from "src/app/services/firebase-auth.service";
import { Boda } from "src/app/clases/boda";

@Component({
  selector: "app-miboda",
  templateUrl: "./miboda.page.html",
  styleUrls: ["./miboda.page.scss"],
})
export class MibodaPage implements OnInit {
  currentUserId: string | null = null;
  menuType: string = "overlay";
  items = [];
  //POSIBLEMENTE HAYA QUE AJUSTAR ESTO PARA QUE SE LOGRE VER LA IMAGEN Y TEXTO DE LOTTIFILES
  bodas: Boda[] = [];

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
    console.log("Id el usuario: ", this.currentUserId);

    // Cargar las bodas del usuario desde Firestore
    if (this.currentUserId) {
      this.servicioBD
        .cargarBodas(this.currentUserId)
        .subscribe((bodas: Boda[]) => {
          this.bodas = bodas; // Actualizar la lista de bodas
        });
    }
  }

  getItem($event: any) {
    const valor = $event.target.value;
    console.log("valor del control: " + valor);
  }

  editar(item: Boda) {
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

  eliminar(item: Boda) {
    console.log(
      "Eliminando boda con ID: ",
      item.id,
      "y userID: ",
      this.currentUserId
    );
    if (!item.id || !this.currentUserId) {
      this.servicioBD.presentToast("ID de boda o usuario no definidos");
      return;
    }

    this.servicioBD
      .deleteBoda(item.id, this.currentUserId)
      .then(() => {
        this.servicioBD.presentToast("Boda eliminada correctamente");
        // Aquí podrías agregar lógica para actualizar tu lista de bodas
      })
      .catch((err) => {
        this.servicioBD.presentToast("Error al eliminar la boda: " + err);
      });
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
