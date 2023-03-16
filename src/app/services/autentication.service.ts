import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AutenticationService {

  url: string = "http://localhost:8080/auth/login";
  currentUserSubject: BehaviorSubject<any>;

  constructor(private httpClient: HttpClient) {
    console.log("El Servicio de autenticacion esta corriendo");

    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(sessionStorage.getItem("currentUser") || "{}"));
  }

  login(nombreUsuario: string, contrasenia: string): Observable<any> {

    //let cabecera = new HttpHeaders().append('Access-Control-Allow-Origin', 'http://localhost:4200/login');
    // headers.append('Access-Control-Allow-Origin', 'http://localhost:8080/');

    return this.httpClient.post(this.url, {nombreUsuario, contrasenia}/*, {headers: cabecera}*/).pipe(map(data => {

      sessionStorage.setItem("currentUser", JSON.stringify(data));
      
      //if (data != null) {
        this.currentUserSubject.next(data);
      //}

      return data;
    }));
  }

  getUserAutenticated() {
    return this.currentUserSubject.value;
  }

}
