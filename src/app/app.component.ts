import { Component, OnInit } from '@angular/core';
//import * as firebase from 'firebase';
import * as firebase from 'firebase/app';
import 'firebase/auth'; // Importa módulos
import { LoginService } from './login/login.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  titulo = 'Listado de Personas';

  constructor(private loginService:LoginService) { }

  ngOnInit(): void {
    firebase.initializeApp({

      apiKey: "AIzaSyBvUjGPThPy2EpCQlN6Hr1B5Gs0eLei67k",
      authDomain: "listado-personas-f419e.firebaseapp.com",
    })
  }

  isAutenticado(){
       return this.loginService.isAutenticado();
  }

  salir(){
    this.loginService.logout();
    
  }

  

}
