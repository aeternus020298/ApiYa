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
export class LoginPage implements OnInit {
  //se inicializa el formgroup
  loginForm: FormGroup;

  //constructores para el login (igual que en el registro)
  constructor(
    public formBuilder: FormBuilder,
    public loadingCtrl: LoadingController,
    public router: Router,
    public authService: FirebaseAuthService
  ) {}

  ngOnInit() {
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

  async loginIn() {
    const loading = await this.loadingCtrl.create();
    await loading.present();
    if (this.loginForm?.valid) {
      const user = await this.authService
        .loginUser(this.loginForm.value.email, this.loginForm.value.password)
        .catch((error) => {
          console.log(error);
          loading.dismiss();
        });

      if (user) {
        loading.dismiss();
        this.router.navigate(["/home"]);
      } else {
        console.log("Ingresar valores validos.");
      }
    }
  }
}
