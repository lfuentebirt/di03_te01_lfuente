import { Component, OnInit } from '@angular/core';
import { AlertController, Platform } from '@ionic/angular';
import { Observable } from 'rxjs';
import { GestionArticulosService } from 'src/app/services/gestion-articulos.service';
import { IArticulo } from 'src/interfaces/interfaces';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{
  // inicializamos las  variables para almacenar los articulos del fichero JSON y los que se quieren leer
  articulosLeer: IArticulo[] = []; 
  articulos$!: Observable<IArticulo[]>;

  constructor(private gestionArticulos: GestionArticulosService, private alertaControl: AlertController, private platform: Platform) {} // inyectamos el servicio
  
  ngOnInit(){
    // cargamos los articulos desde el servicio Angular
    this.articulosLeer = this.gestionArticulos.getArticulosLeer();
    console.log(this.articulosLeer);
    this.articulos$ = this.gestionArticulos.getArticulos$();
    this.articulos$.subscribe(articulos => {this.articulosLeer = articulos});
  }

  borrarArticulo(arti: IArticulo){
      this.mostrarAlerta(arti);

  }

  async mostrarAlerta(arti: IArticulo){
    const alert = await this.alertaControl.create({
      header: 'Confirmar',
      message:'¿Borrar noticia?',
      buttons: [
        {
          text:'Cancel',
          role:'cancel',
          cssClass:'secondary',
          handler: () => {
            console.log('Cancel clicked');
            },
          },
          {
            text:'Okay',
            role:'okay',
            cssClass:'secondary',
            handler: () => {
              this.gestionArticulos.deleteArticulo(arti);
            }
          }
     ]});
     await alert.present();
  }
  refrescarPagina() {
    this.platform.ready().then(() => {
      window.location.reload();
    });
  }
}
