import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { AuthLocalGuard } from "./guards/auth-local.guard";
import { NoauthLocalGuard } from "./guards/noauth-local.guard";

const routes: Routes = [
  {
    path: "inicio",
    canActivate: [AuthLocalGuard],
    loadChildren: () =>
      import("./pages/inicio/inicio.module").then((m) => m.InicioPageModule),
  },
  //La pestaña por defecto que se abrira al momento de iniciar la aplicacion.
  {
    path: "",
    redirectTo: "landing",
    pathMatch: "full",
  },
  //Pestaña donde se hace el inicio de sesion
  {
    path: "login",
    canActivate: [NoauthLocalGuard],
    loadChildren: () =>
      import("./pages/login/login.module").then((m) => m.LoginPageModule),
  },
  //Pestaña que te permite recuperar la cuenta en caso de olvidar la contraseña.
  {
    path: "restore",
    canActivate: [NoauthLocalGuard],
    loadChildren: () =>
      import("./pages/restore/restore.module").then((m) => m.RestorePageModule),
  },
  //Pestaña que te permite registrarte en la aplicacion.
  {
    path: "registro",
    loadChildren: () =>
      import("./pages/registro/registro.module").then(
        (m) => m.RegistroPageModule
      ),
  },
  //Pestaña que te permite agregar los datos de una boda.
  {
    path: "addboda",
    canActivate: [AuthLocalGuard],
    loadChildren: () =>
      import("./pages/addboda/addboda.module").then((m) => m.AddbodaPageModule),
  },
  //Pestaña que te permite modificar los datos de una boda.
  {
    path: "modboda",
    canActivate: [AuthLocalGuard],
    loadChildren: () =>
      import("./pages/modboda/modboda.module").then((m) => m.ModbodaPageModule),
  },
  //Pestaña que se abre cuando se inicia por primera vez, es la que tiene actualmente almacenado el swipper
  {
    path: "landing",
    canActivate: [NoauthLocalGuard],
    loadChildren: () =>
      import("./pages/landing/landing.module").then((m) => m.LandingPageModule),
  },
  {
    path: "proveedores",
    loadChildren: () =>
      import("./pages/proveedores/proveedores.module").then(
        (m) => m.ProveedoresPageModule
      ),
  },

  {
    path: "localizacion",
    loadChildren: () =>
      import("./pages/localizacion/localizacion.module").then(
        (m) => m.LocalizacionPageModule
      ),
  },

  //Pestaña que redirecciona a 404 si es que no encuentra un path existente, siempre debe estar al ultimo, si no otorgara problemas.
  {
    path: "**",
    loadChildren: () =>
      import("./pages/error/error.module").then((m) => m.ErrorPageModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
