import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from "@angular/router";
import { Observable, map } from "rxjs";
import { FirebaseAuthService } from "../services/firebase-auth.service";
@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: FirebaseAuthService, // Reemplaza con tu servicio de autenticación
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree | Observable<boolean | UrlTree> {
    return this.authService.isLoggedIn().pipe(
      map((isLoggedIn) => {
        if (isLoggedIn) {
          return true; // El usuario está autenticado y puede acceder a la ruta
        } else {
          // Redirige al usuario a la página de inicio de sesión
          return this.router.parseUrl("/login");
        }
      })
    );
  }
}
