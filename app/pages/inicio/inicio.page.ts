import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { ScreenOrientation } from '@awesome-cordova-plugins/screen-orientation/ngx';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  constructor(
    private router: Router,
    private platform: Platform,
    private screenOrientation: ScreenOrientation
  ) {
    this.platform.ready().then(() => {
      this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
    });
  }

  ngOnInit() {
    this.platform.resize.subscribe(() => {
      if (this.platform.isLandscape()) {
        this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
      }
    });
  }

  navegarInicioSesion() {
    this.router.navigate(['inicio-sesion']);
  }

  navegarInvitado() {
    this.router.navigate(['invitado']);
  }
}
