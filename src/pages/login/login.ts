import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

import { HomePage } from '../home/home';
import { RegisterPage } from '../register/register';
import { PasswordResetPage } from '../password-reset/password-reset';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})

export class LoginPage {
  submission: { email?: string, password?: string } = {};
  submitted = false;
  forgotPasswordButtonText = 'Forgot Password?';
  registerButtonText = 'REGISTER';
  loginButtonText = 'LOGIN';

  constructor(
    public navCtrl: NavController, 
  ) {
  }

  ionViewDidLoad() {
  }

  pushPasswordResetPage() {
    this.navCtrl.push(PasswordResetPage);
  }

  setRootRegisterPage() {
    this.navCtrl.setRoot(RegisterPage);
  }

  submitLoginForm() {
    this.navCtrl.setRoot(HomePage);
  }



}
