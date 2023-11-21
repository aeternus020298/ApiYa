import { Component, OnInit } from "@angular/core";
import { FirebaseAuthService } from "../../services/firebase-auth.service";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AlertController, AnimationController } from "@ionic/angular";

@Component({
  selector: "app-restore",
  templateUrl: "./restore.page.html",
  styleUrls: ["./restore.page.scss"],
})
export class RestorePage implements OnInit {
  formRestore: FormGroup;

  constructor(
    public router: Router,
    public authService: FirebaseAuthService,
    private formBuilder: FormBuilder,
    private animationCtrl: AnimationController,
    public alertController: AlertController
  ) {
    this.formRestore = this.formBuilder.group({
      email: [
        "",
        [
          Validators.required,
          Validators.email,
          Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$"),
        ],
      ],
    });
  }

  ngOnInit() {}

  //Metodo necesario para poder realizar las validaciones en el formulario.
  get email() {
    return this.formRestore.get("email");
  }

  async resetPassword() {
    if (this.formRestore.valid) {
      const email = this.formRestore.value.email;
      this.authService
        .resetPassword(email)
        .then(() => {
          console.log("link enviado");
          this.presentSuccessAlert(
            "Revisa tu correo para cambiar tu contraseña"
          );
          this.router.navigate(["/login"]).then(() => {
            this.formRestore.reset(); // Restablece todos los controles del formulario a su valor por defecto
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  async presentSuccessAlert(message: string) {
    const enterAnimation = (baseEl: any) => {
      const backdropAnimation = this.animationCtrl
        .create()
        .addElement(baseEl.querySelector("ion-backdrop"))
        .fromTo("opacity", "0.01", "var(--backdrop-opacity)");

      const wrapperAnimation = this.animationCtrl
        .create()
        .addElement(baseEl.querySelector(".alert-wrapper"))
        .keyframes([
          { offset: 0, opacity: "0", transform: "scale(0)" },
          { offset: 1, opacity: "1", transform: "scale(1)" },
        ]);

      return this.animationCtrl
        .create()
        .addElement(baseEl)
        .easing("ease-out")
        .duration(500)
        .addAnimation([backdropAnimation, wrapperAnimation]);
    };

    const alert = await this.alertController.create({
      header: "Éxito",
      message: message,
      buttons: ["OK"],
      enterAnimation,
    });

    await alert.present();
  }

  //Alert controller para success.
  // async presentSuccessAlert(message: string) {
  //   const alert = await this.alertController.create({
  //     header: "Éxito",
  //     message: message,
  //     buttons: ["OK"],
  //   });

  //   await alert.present();
  // }
}
