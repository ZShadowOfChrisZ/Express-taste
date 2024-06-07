import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Barcode, BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-invitado',
  templateUrl: './invitado.page.html',
  styleUrls: ['./invitado.page.scss'],
})
export class InvitadoPage implements OnInit {

  isSupported = false;
  barcodes: Barcode[] = [];

  constructor(private router: Router, private alertController: AlertController) { }

  ngOnInit() {
    console.log('ngOnInit called');
    BarcodeScanner.isSupported().then((result) => {
      this.isSupported = result.supported;
      console.log('BarcodeScanner isSupported:', this.isSupported);
    }).catch((error) => {
      console.error('Error checking if BarcodeScanner is supported:', error);
    });
  }

  async scan(): Promise<void> {
    console.log('Scan button clicked');
    
    const ress = await BarcodeScanner.isGoogleBarcodeScannerModuleAvailable();
    console.log('Google Barcode Scanner Module Available:', ress.available);

    if (!ress.available) {
      console.log('Installing Google Barcode Scanner Module...');
      await BarcodeScanner.installGoogleBarcodeScannerModule();
    }

    // Solicitar permisos de cámara
    const granted = await this.requestPermissions();
    console.log('Camera permission granted:', granted);

    if (!granted) {
      console.log('Permission not granted, showing alert');
      this.presentAlert();
      return;
    }

    try {
      const scanResult = await BarcodeScanner.scan();
      console.log('Barcodes scanned:', scanResult.barcodes);
      this.barcodes.push(...scanResult.barcodes);
    } catch (error) {
      console.error('Error during scan:', error);
    }
  }

  async requestPermissions(): Promise<boolean> {
    try {
      const { camera } = await BarcodeScanner.requestPermissions();
      console.log('Camera permission response:', camera);
      return camera === 'granted' || camera === 'limited';
    } catch (error) {
      console.error('Error requesting permissions:', error);
      return false;
    }
  }

  async presentAlert(): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Permission denied',
      message: 'Please grant camera permission to use the barcode scanner.',
      buttons: ['OK'],
    });
    await alert.present();
  }

  navegarPrincipal(){
    this.router.navigate(['principal']);
  }
}
