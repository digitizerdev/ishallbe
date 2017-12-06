import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

import { HomePage } from '../home/home';
import { RegisterPage } from '../register/register';
import { PasswordResetPage } from '../password-reset/password-reset';

import { SessionProvider } from '../../providers/session/session';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})

export class LoginPage {
  submission: { email?: string, password?: string } = {};
  submitted = false;

  constructor(
    public navCtrl: NavController,
    public session: SessionProvider
  ) { }

  pushPasswordResetPage() {
    this.navCtrl.push(PasswordResetPage);
  }

  setRootRegisterPage() {
    this.navCtrl.setRoot(RegisterPage);
  }

  submitLoginForm() {
    this.session.loginEditor();
    let user = {
      contributor: true,
      editor: true      
    }
    this.navCtrl.setRoot(HomePage);
  }

}
