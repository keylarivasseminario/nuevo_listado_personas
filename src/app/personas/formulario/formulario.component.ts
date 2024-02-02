import { AfterViewInit, Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoggingService } from '../../LoggingService.service';
import { Persona } from '../../persona.model';
import { PersonasService } from '../../personas.service';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit{

  nombreInput: string;
  apellidoInput: string;
  index: number;
  modoEdicion:number;



  constructor(private personasService: PersonasService,
    private route: ActivatedRoute,
    private router:Router) {}

  ngOnInit()   {
    this.index = this.route.snapshot.params['id'];
    this.modoEdicion= +this.route.snapshot.queryParams['modoEdicion'];
    if (this.modoEdicion != null && this.modoEdicion===1 ) {
       let persona:Persona = this.personasService.encontrarPersona(this.index);
      this.nombreInput = persona.nombre;
      this.apellidoInput = persona.apellido;
    }

  }



  onGuardarPersona(): void {
    let persona1 = new Persona(this.nombreInput, this.apellidoInput);
    console.log('onGuardarPersona',this.personasService);
    if(this.modoEdicion != null && this.modoEdicion===1){
      this.personasService.modificarPersona(this.index, persona1)

    }else{
      this.personasService.agregarPersona(persona1);
    }

    this.router.navigate(['personas']);
  }

  eliminarPersona(){
    if(this.index!=null){
      this.personasService.eliminarPersona(this.index);

    }
    this.router.navigate(['personas']);
  }

}
