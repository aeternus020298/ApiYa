import { Component } from '@angular/core';
import { Boda } from '../../clases/boda';
import { NavigationExtras, Router } from '@angular/router';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite';
import { Platform, ToastController } from '@ionic/angular';
import { DbserviceService } from '../../services/dbservice.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  bodas: any = [
    {
      descripcion: "Escribe aqui datos de interés",
      lugar: "Escribe aqui el lugar de tu boda",
      fecha: "Escribe aqui la fecha de tu boda"
    }
  ]
  constructor(private router: Router, private servicioBD: DbserviceService) {}

  getItem($event: any){
    const valor = $event.target.value;
    console.log('valor del control: ' + valor);
  }

  editar(item: any){
    let navigationextras: NavigationExtras = {
      state : {
        idEnviado : item.id,
        descripcionEnviado : item.descripcion,
        lugarEnviado : item.lugar,
        fechaEnviado : item.fecha
      }
    }
    this.router.navigate(['/modboda'],navigationextras);
  }

  eliminar(item: any){
    this.servicioBD.deleteBoda(item.id);
    this.servicioBD.presentToast("Haz eliminado tu boda :( !!!")
  }
}
