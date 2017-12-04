import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

import { HomePage } from '../home/home';
import { RegisterPage } from '../register/register';
import { ForgotPasswordPage } from '../forgot-password/forgot-password';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})

export class LoginPage {
  form: { email?: string, password?: string } = {};
  formSubmitted = false;
  forgotPasswordButtonText = 'Forgot Password?';
  registerButtonText = 'REGISTER';
  loginButtonText = 'LOGIN';

  constructor(
    public navCtrl: NavController, 
  ) {
    this.form.email = 'test@tdct.io';
  }

  ionViewDidLoad() {
  }

  pushForgotPasswordPage() {
    this.navCtrl.push(ForgotPasswordPage);
  }

  setRootRegisterPage() {
    this.navCtrl.setRoot(RegisterPage);
  }

  submitLoginForm() {
    this.navCtrl.setRoot(HomePage);
  }



}
