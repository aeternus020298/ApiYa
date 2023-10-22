import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NavigationExtras, Router } from "@angular/router";
import { LoadingController, ToastController } from "@ionic/angular";
import { FirebaseAuthService } from "src/app/services/firebase-auth.service";
@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"],
})
export class LoginPage {
  //se inicializa el formgroup
  loginForm: FormGroup;

  //constructores para el login (igual que en el registro)
  constructor(
    public formBuilder: FormBuilder,
    public loadingCtrl: LoadingController,
    public router: Router,
    public authService: FirebaseAuthService,
    private toastController: ToastController
  ) {
    this.loginForm = this.formBuilder.group({
      email: [
        "",
        [
          Validators.required,
          Validators.email,
          Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$"),
        ],
      ],
      password: ["", [Validators.required, Validators.pattern(".{8,}")]],
    });
  }

  get errorControl() {
    return this.loginForm?.controls;
  }
  // flag para el ingresar.
  async ingresar() {
    localStorage.setItem("ingresado", "true");
  }

  // flag para quitar el ingresado.
  async olvidar() {
    localStorage.removeItem("ingresado");
  }

  async loginIn() {
    const loading = await this.loadingCtrl.create();
    await loading.present();

    try {
      if (this.loginForm.valid) {
        const user = await this.authService.loginUser(
          this.loginForm.value.email,
          this.loginForm.value.password
        );

        if (user) {
          loading.dismiss();
          this.router.navigate(["/home"]);
        } else {
          loading.dismiss();
          // Credenciales incorrectas
          this.presentErrorToast("Credenciales incorrectas");
        }
      } else {
        loading.dismiss();
        // Formulario no válido
        this.presentErrorToast("No se encontro el usuario");
      }
    } catch (error) {
      console.error(error);
      loading.dismiss();

      // Error general
      this.presentErrorToast("Ocurrió un error durante el inicio de sesión");
    }
  }

  async presentErrorToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: "middle",
    });

    await toast.present();
  }
}
