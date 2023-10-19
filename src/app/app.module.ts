import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
//Se agrega plugin de awesome cordova para ser reconocido
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
//se agrega el plugin de angular fire
import { AngularFireModule } from '@angular/fire/compat';
//Se agrega el plugin de angular para la auth
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { environment } from 'src/environments/environment';

//NOTA: se agrega 'SQLite' a providers
@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, AngularFireModule, AngularFireAuthModule, AngularFireModule.initializeApp(environment.firebaseConfig)], 
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },SQLite],
  bootstrap: [AppComponent],
})
export class AppModule {}
