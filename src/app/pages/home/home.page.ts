import { Component } from '@angular/core';
import { Boda } from '../../clases/boda';
import { NavigationExtras, Router } from '@angular/router';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite';
import { Platform, ToastController } from '@ionic/angular';
import { DbserviceService } from '../../services/dbservice.service';
import { ActivatedRoute } from '@angular/router';
import { ApicoctelesService } from '../../services/apicocteles.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

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
  
  isModalOpen = false;
  
  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  constructor(private router: Router, private servicioBD: DbserviceService, private api: ApicoctelesService) {
    this.router.navigate(['home/principal'])
  }

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

  // Función para cambiar de página según el valor del ion-segment
  // segmentChanged(event: any) {
  //   const selectedSegment = event.detail.value;
    
  //   if (selectedSegment === 'Boda') {
  //     // Redirige a la página "Boda"
  //     this.router.navigate(['/boda']);
  //   }
  // }

   segmentChanged($event: any){
     console.log($event);
     let direccion=$event.detail.value;
     this.router.navigate(['home/' + direccion])
   }

  // segmentChanged(event: any) {
  //   const selectedSegment = event.detail.value;
  //   if (selectedSegment === 'Boda') {
  //     this.router.navigate(['home/boda']);
  //   } else if (selectedSegment === 'Home') {
  //     this.router.navigate(['home/principal']);
  //   }
  // }
  
  
}
