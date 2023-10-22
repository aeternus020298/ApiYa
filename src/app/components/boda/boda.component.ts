import { Component, OnInit } from '@angular/core';
import { Boda } from '../../clases/boda';
import { NavigationExtras, Router } from '@angular/router';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite';
import { Platform, ToastController } from '@ionic/angular';
import { DbserviceService } from '../../services/dbservice.service';

@Component({
  selector: 'app-boda',
  templateUrl: './boda.component.html',
  styleUrls: ['./boda.component.scss'],
})
export class BodaComponent {

  bodas: any = [
    {
      descripcion: "Escribe aqui datos de interés",
      investrella: "Escribe aqui tu invitado especial",
      menuestrella: "Escribe aqui tu menu especial",
      tragoestrella: "Escribe aqui tu traguito especial",
      lugar: "Escribe aqui el lugar de tu boda",
      fecha: "Escribe aqui la fecha de tu boda"
    }
  ]
  constructor(private router: Router, private servicioBD: DbserviceService) { }

  ngOnInit(){
    this.servicioBD.dbState().subscribe((res: any) =>{
      if(res){
        this.servicioBD.fetchBodas().subscribe((item: any) =>{
          this.bodas = item;
        })
      }
      //this.servicioBD.presentAlert("4");
    });
  }
  
  getItem($event: any){
    const valor = $event.target.value;
    console.log('valor del control: ' + valor);
  }

  editar(item: any){
    let navigationextras: NavigationExtras = {
      state : {
        idEnviado : item.id,
        descripcionEnviado : item.descripcion,
        investrella: item.investrella,
        menuestrella: item.menuestrella,
        tragoestrella: item.tragoestrella,
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

