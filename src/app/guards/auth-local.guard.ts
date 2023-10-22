import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from "@angular/router";
import { NavController } from "@ionic/angular";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AuthLocalGuard implements CanActivate {
  constructor(private navController: NavController) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (localStorage.getItem("ingresado")) {
      return true;
    } else {
      this.navController.navigateRoot("login");
      return false;
    }
  }
}
