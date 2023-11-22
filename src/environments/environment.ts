// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  //apikey google maps.
  mapsKey: "AIzaSyBLr5NEUrcwZiMg-TSrBabZRbIGGMMkOZY",
  //Se agrega la configuracion SDK del firebase para Lagna.
  firebaseConfig: {
    apiKey: "AIzaSyC3LbeZkDIcbkEVJRMI3VJIR1-DLC6E7mQ",
    authDomain: "lagna-login-registro.firebaseapp.com",
    projectId: "lagna-login-registro",
    storageBucket: "lagna-login-registro.appspot.com",
    messagingSenderId: "395943183455",
    appId: "1:395943183455:web:2bceab02900119058e47ea",
    measurementId: "G-LDP5Z088B4",
  },
  baseUrl:
    "https://lagna-login-registro-default-rtdb.firebaseio.com/Proovedores.json",
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
