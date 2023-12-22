import { IArticulo } from './../../../interfaces/interfaces';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { GestionArticulosService } from 'src/app/services/gestion-articulos.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  // inicializamos las  variables para almacenar los articulos del fichero JSON y los que se quieren leer
  articulos: IArticulo[] = [];
  articulosSeleccionados: IArticulo[] = [];
  articulos$!: Observable<IArticulo[]>;

  constructor(private gestionArticulos: GestionArticulosService) {} // inyectamos el servicio

  ngOnInit(){
    // cargamos los articulos desde el servicio Angular
    this.articulos = this.gestionArticulos.getArticulosFichero();
    this.articulos$ = this.gestionArticulos.getArticulos$();
    this.articulos$.subscribe(articulos => {this.articulosSeleccionados = articulos});
  }
  //actualizamos la lista de articulos a leer
  ckSeleccion(arti: IArticulo){
    console.log(this.articulosSeleccionados);
    this.articulosSeleccionados = this.gestionArticulos.setArticulosLeer(arti);
    console.log(this.articulosSeleccionados);
    
  }
}

