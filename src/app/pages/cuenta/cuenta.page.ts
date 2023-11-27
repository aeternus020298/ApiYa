import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FirebaseAuthService } from "src/app/services/firebase-auth.service";
import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";
import { AngularFireStorage } from "@angular/fire/compat/storage";

@Component({
  selector: "app-cuenta",
  templateUrl: "./cuenta.page.html",
  styleUrls: ["./cuenta.page.scss"],
})
export class CuentaPage implements OnInit {
  imagenPerfil: string;
  nombre: string;
  apellido: string;
  fechaNac: string;
  email: string;
  userId: string | null = null; // Almacenar el userId

  constructor(
    private router: Router,
    private authService: FirebaseAuthService
  ) {}

  async seleccionarImagen() {
    try {
      const imagen = await Camera.getPhoto({
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Prompt,
        quality: 90,
      });

      // Convertir la imagen a Blob para subirla
      const response = await fetch(imagen.dataUrl);
      const blob = await response.blob();

      // Convertir Blob a File
      const file = new File([blob], "profile-picture", {
        type: blob.type || "image/jpeg",
      });

      if (this.userId) {
        // Subir la imagen a Firebase y actualizar imagenPerfil
        await this.authService.uploadProfileImage(file, this.userId);
        this.imagenPerfil = imagen.dataUrl; // Actualizar imagenPerfil con la nueva imagen
      }
    } catch (error) {
      console.error("Error al seleccionar la imagen: ", error);
    }
  }

  ngOnInit() {
    this.authService.ngFireAuth.authState.subscribe((user) => {
      if (user) {
        this.userId = user.uid; // Guardar el userId para su uso posterior
        this.authService.getUserInfo(user.uid).subscribe((userInfo) => {
          this.nombre = userInfo?.nombre;
          this.apellido = userInfo?.apellido;
          this.fechaNac = userInfo?.fechaNac;
          this.email = userInfo?.email;
          this.imagenPerfil =
            userInfo?.photoURL || "../../../assets/imagenPrueba.png";
        });
      }
    });
  }
}
