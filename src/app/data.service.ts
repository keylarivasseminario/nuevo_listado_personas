import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Persona } from './persona.model';
import { PersonasService } from './personas.service';
import { Observable, Subscriber } from 'rxjs';
import { LoginService } from './login/login.service';
@Injectable()
export class DataService {
  constructor(private httpClient: HttpClient,
              private loginService:LoginService) { }

  cargarPersona(): Observable<Persona[]> {
    const token=this.loginService.getIdToken();
    return this.httpClient.get('https://listado-personas-f419e-default-rtdb.firebaseio.com/datos.json?auth='+token) as Observable<Persona[]>
  }

  guardarPersonas(personas: Persona[]) {
    const token=this.loginService.getIdToken();
    this.httpClient.put('https://listado-personas-f419e-default-rtdb.firebaseio.com/datos.json?auth='+token, personas)
      .subscribe(
        response =>
          console.log("Resultado de guaedar personas : " + response),
          error => console.log("Error al Guardar Persona :" + error)
      );
  }

  modificarPersona(index:number, persona:Persona){
    const token=this.loginService.getIdToken();
      let url :string;
      url= 'https://listado-personas-f419e-default-rtdb.firebaseio.com/datos/' + index + '.json?auth='+token;
      this.httpClient.put(url,persona)
      .subscribe(
        Response=> console.log("Resultado Modificar Persona : " + Response),
        Error=> console.log("Error en Modificar Persona: " +  Error)
      )
  }

  eliminarPersona(index:number){
    const token=this.loginService.getIdToken();
    let url :string;
    url= 'https://listado-personas-f419e-default-rtdb.firebaseio.com/datos/' + index + '.json?auth='+token;
    this.httpClient.delete(url)
    .subscribe(
      Response=> console.log("Resultado eliminar Persona : " + Response),
      Error=> console.log("Error en eliminar Persona: " +  Error)
    )
  }
}
