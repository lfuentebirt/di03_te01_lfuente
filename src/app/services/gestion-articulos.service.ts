import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { IArticulo,  RootObject } from 'src/interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class GestionArticulosService {
  private articulos: IArticulo[] = [];
  private articulosLeer: IArticulo[] = [];
  private articulosLeerBorrados: IArticulo[] = [];
  private articulo$  = new Subject<IArticulo[]>();


  constructor(private leerFichero: HttpClient) {
      this.getArticulosFichero();
  }
  
  getArticulosFichero(): IArticulo[]{
    let datosFichero: Observable<RootObject>;
    // no me detecta correctamente el objeto IArticulo en la siguiente línea y he tenido
    // que utilizar RootObject
    datosFichero = this.leerFichero.get<RootObject>("/assets/articulos.json");
    
    datosFichero.subscribe(datos => {
      //console.log(datos);
      //this.articulos = datos.articles;
      this.articulos.push(...datos.articles); 
      //console.log(this.articulos);
    });
    //console.log(this.articulos);
    return this.articulos;
    
  }
  
  setArticulosLeer(arti: IArticulo): IArticulo[]{
    // cargamos el articulo seleccionado en el array de lectura o lo quitamos si se ha deseleccionado
    if(this.articulosLeer.includes(arti)) {
      
      this.articulosLeer = this.articulosLeer.filter((value)=>value!=arti);

    } else if (!this.articulosLeerBorrados.includes(arti)) {
      this.articulosLeer.push(arti);
    } else if(this.articulosLeerBorrados.includes(arti) && this.articulosLeer.includes(arti)){
      this.deleteArticulo(arti);
    }else if (!this.articulosLeerBorrados.includes(arti)){//nuevo
      this.articulosLeerBorrados.push(arti);
      let indice: number = this.articulosLeer.indexOf(arti);
      this.articulosLeer.splice(indice, 1);
    }else if(this.articulosLeerBorrados.includes(arti) && !this.articulosLeer.includes(arti)){
      let indice: number = this.articulosLeerBorrados.indexOf(arti);
      this.articulosLeerBorrados.splice(indice, 1);
    }
    this.articulo$.next(this.articulosLeer);
    return this.articulosLeer;
  }
  // para pasar los articulos a leer a la vista de lectura
  getArticulosLeer(): IArticulo[]{
    return this.articulosLeer;
    console.log(this.articulosLeer);
  }

  getArticulos$(): Observable<IArticulo[]> {
    return this.articulo$.asObservable();
  }
  // eliminamos el articulo de los seleccionados
  deleteArticulo(articuloBorrar: IArticulo){
    let indice: number = this.articulosLeer.indexOf(articuloBorrar);
    this.articulosLeer.splice(indice, 1);
    this.articulosLeerBorrados.push(articuloBorrar);

    console.log("Borrado");
  }
  
}


