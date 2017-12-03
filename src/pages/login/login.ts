import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { HomePage } from '../home/home';
import { RegisterPage } from '../register/register';
import { ForgotPasswordPage } from '../forgot-password/forgot-password';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})

export class LoginPage {
  loginForm: { email?: string, password?: string } = {};
  loginFormSubmitted = false;
  forgotPasswordButtonText = 'Forgot Password?';
  registerButtonText = 'Register';

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams
  ) {
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
