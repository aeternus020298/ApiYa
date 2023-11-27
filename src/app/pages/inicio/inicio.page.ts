import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { FirebaseAuthService } from "src/app/services/firebase-auth.service";

@Component({
  selector: "app-inicio",
  templateUrl: "./inicio.page.html",
  styleUrls: ["./inicio.page.scss"],
})
export class InicioPage implements OnInit {
  currentUserId: string | null = null;
  menuType: string = "overlay";

  isModalOpen = false;
  nombreUsuario: string;
  apellido: string;

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }
  constructor(
    private router: Router,
    private authService: FirebaseAuthService
  ) {
    this.router.navigate(["inicio"]);
  }

  ngOnInit() {
    this.authService.ngFireAuth.authState.subscribe((user) => {
      if (user) {
        this.authService.getUserInfo(user.uid).subscribe((userInfo) => {
          console.log(userInfo);
          this.nombreUsuario = userInfo?.nombre;
          this.apellido = userInfo?.apellido;
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

  segmentChanged($event: any) {
    console.log($event);
    let direccion = $event.detail.value;
    this.router.navigate(["inicio/" + direccion]);
  }
}
