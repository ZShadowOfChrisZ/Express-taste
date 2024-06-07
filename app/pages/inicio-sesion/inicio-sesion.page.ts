import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { ToastController } from '@ionic/angular';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.page.html',
  styleUrls: ['./inicio-sesion.page.scss'],
})
export class InicioSesionPage implements OnInit {

  email: string = '';
  contrasena: string = '';

  constructor(private router: Router, private apiService: ApiService, private toastCtrl: ToastController, private platform: Platform) { }

  ngOnInit() {
    this.platform.keyboardDidShow.subscribe(() => {
      document.body.classList.add('tecladoVisible');
    });
    this.platform.keyboardDidHide.subscribe(() => {
      document.body.classList.remove('tecladoVisible');
    });
  }

  navegarRegistro(){
    this.router.navigate(['registro']);
  }

  async inicioSesion() {
    if (!this.email || !this.contrasena) {
      const toast = await this.toastCtrl.create({
        message: 'Por favor, complete todos los campos',
        duration: 2000,
        position: 'top'
      });
      toast.present();
      return;
    }

    this.apiService.inicioSesion(this.email, this.contrasena).subscribe(
      async (response) => {
        console.log('ET: Respuesta de la API:', response.inicio);
        if (response.exito) {
          const toast = await this.toastCtrl.create({
            message: 'Inicio de sesión exitoso',
            duration: 2000,
            position: 'top'
          });
          toast.present();
          this.router.navigate(['principal']);
          
        } else {
          const toast = await this.toastCtrl.create({
            message: 'Credenciales incorrectas',
            duration: 2000,
            position: 'top'
          });
          toast.present();
        }
      },
      async (error) => {
        console.log('ET: Respuesta de la API:', error.registro);
        const toast = await this.toastCtrl.create({
          message: 'Error en el inicio de sesión. Intente de nuevo.',
          duration: 2000,
          position: 'top'
        });
        toast.present();
      }
    );
  }

}
