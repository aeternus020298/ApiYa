import { Component, OnInit } from "@angular/core";
import { NavigationExtras, Router } from "@angular/router";
import { DbserviceService } from "src/app/services/dbservice.service";
import { FirebaseAuthService } from "src/app/services/firebase-auth.service";

@Component({
  selector: "app-inicio",
  templateUrl: "./inicio.page.html",
  styleUrls: ["./inicio.page.scss"],
})
export class InicioPage implements OnInit {
  currentUserId: string | null = null;
  menuType: string = "overlay";
  bodas: any = [
    {
      descripcion: "Escribe aqui datos de interÃ©s",
      investrella: "Escribe aqui tu invitado especial",
      menuestrella: "Escribe aqui tu menu especial",
      tragoestrella: "Escribe aqui tu traguito especial",
      lugar: "Escribe aqui el lugar de tu boda",
      fecha: "Escribe aqui la fecha de tu boda",
    },
  ];

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
    this.router.navigate(["inicio"]);
    this.user = authService.getProfile();
  }

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
  //metodo eliminar la flag del guard
  cerrarSesion() {
    localStorage.removeItem("ingresado");
    this.router.navigate(["/login"]);
  }
  //metodo cerrar sesion firebase
  async logOut() {
    this.authService
      .signOut()
      .then(() => {
        this.router.navigate(["/landing"]);
      })
      .catch((error) => {
        console.log(error);
      });
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

  eliminar(item: any) {
    this.servicioBD.deleteBoda(item.id, item.userId);
    this.servicioBD.presentToast("Haz eliminado tu boda :( !!!");
  }

  segmentChanged($event: any) {
    console.log($event);
    let direccion = $event.detail.value;
    this.router.navigate(["inicio/" + direccion]);
  }
}