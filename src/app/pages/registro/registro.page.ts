import { Component, OnInit, ViewChildren, ElementRef, ViewChild, Inject } from '@angular/core';
import { IonCard, AnimationController } from '@ionic/angular';
import type {QueryList} from '@angular/core';
import type {Animation} from '@ionic/angular';
import type {LoadingController} from '@ionic/angular';
//se implementa los validadores y el form de angular
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit{
  //se declara el regForm 
  regForm: FormGroup | undefined;

  
  //se agrega el formbuilder, se agrego el inject, aunque no se muy bien para que aun.
  constructor(public formBuilder: FormBuilder, @Inject(String) LoadingCtrl: LoadingController, private animationController: AnimationController) {
  }

  ngOnInit(){
    this.regForm = this.formBuilder.group({
      nombre:['',[Validators.required]],
      apellido:['',[Validators.required]],
      fechaNac:['',[Validators.required]],
      email:['',[Validators.required, Validators.email, 
        Validators.pattern("[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$")]],
      password:['',[Validators.required, Validators.pattern("(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}")]]
      
    })
  }

  get errorControl(){
    return this.regForm?.controls;
  }

  ngAfterViewInit() {
    const animar1Animation = this.animationController
      
  }
}