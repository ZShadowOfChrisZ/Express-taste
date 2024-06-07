import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  ruta: string ='https://expresstaste-775f8b0e148b.herokuapp.com/api/v1/registro-cliente'

  constructor(private http: HttpClient, private toastCtrl: ToastController) { }

  registrarse(nombre: string, ap_paterno: string, ap_materno: string, email: string, contrasena: string) {
    return this.http.post<any>(this.ruta, {
        "nombre": nombre,
        "ap_paterno": ap_paterno,
        "ap_materno": ap_materno,
        "email": email,
        "contrasena": contrasena
    }).pipe();
  }

  inicioSesion(email: string, contrasena: string): Observable<any> {
    return this.http.post<any>(this.ruta, {
        "email": email,
        "contrasena": contrasena
    }).pipe();
  }
}
