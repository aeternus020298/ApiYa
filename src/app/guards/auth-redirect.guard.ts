import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { FirebaseAuthService } from "../services/firebase-auth.service"; // Asegúrate de importar tu servicio de autenticación

@Injectable({
  providedIn: "root",
})
export class AuthRedirectGuard implements CanActivate {
  constructor(
    private authService: FirebaseAuthService, // Inyecta tu servicio de autenticación
    private router: Router
  ) {}

  canActivate(): boolean {
    if (this.authService.isLoggedIn()) {
      // Si el usuario está autenticado, redirige a la página "home"
      this.router.navigate(["/home"]);
      return false;
    }

    return true; // Permite el acceso a la ruta si el usuario no está autenticado
  }
}
