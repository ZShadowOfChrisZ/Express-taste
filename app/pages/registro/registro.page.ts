import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  nombre: string = '';
  ap_paterno: string = '';
  ap_materno: string = '';
  email: string = '';
  contrasena: string = '';

  constructor(private apiService: ApiService, private toastCtrl: ToastController, private router: Router) { }

  ngOnInit() {
  }

  async registrarse() {
    if (!this.nombre || !this.ap_paterno || !this.ap_materno || !this.email || !this.contrasena) {
      const toast = await this.toastCtrl.create({
        message: 'Por favor, complete todos los campos',
        duration: 2000,
        position: 'top'
      });
      toast.present();
      return;
    }

    this.apiService.registrarse(this.nombre, this.ap_paterno, this.ap_materno, this.email, this.contrasena).subscribe(
      async (response) => {
        console.log('ET: Respuesta de la API:', response.registro);
        const toast = await this.toastCtrl.create({
          message: 'Registro exitoso',
          duration: 2000,
          position: 'top'
        });
        toast.present();
        this.router.navigate(['inicio-sesion']);
      },
      async (error) => {
        console.error('ET: Error en la API:', error.registro);
        const toast = await this.toastCtrl.create({
          message: 'Error en el registro: ' + error.message,
          duration: 2000,
          position: 'top'
        });
        toast.present();
      }
    );
  }
}
