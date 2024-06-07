import { Component } from '@angular/core';
import { Keyboard } from '@capacitor/keyboard';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private platform: Platform) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.setupKeyboardListeners();
    });
  }

  setupKeyboardListeners() {
    Keyboard.addListener('keyboardWillShow', () => {
      document.body.classList.add('tecladoVisible');
    });

    Keyboard.addListener('keyboardWillHide', () => {
      document.body.classList.remove('tecladoVisible');
    });
  }
}

