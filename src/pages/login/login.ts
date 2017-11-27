import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ForgotPasswordPage } from '../forgot-password/forgot-password';
import { RegisterPage } from '../register/register';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  login: {email?: string, password?: string} = {};  

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  loginWithEmail() {
    console.log("Login with email clicked");
  }

  goToForgotPasswordPage() {
    console.log("Go to forgot password page clicked");
    this.navCtrl.push(ForgotPasswordPage);
  }

  goToRegisterPage() {
    console.log("Go to register page clicked");
    this.navCtrl.push(RegisterPage);
  }

  loginWithFacebook() {
    console.log("Login with Facebook clicked");
  }
  
  loginWithLinkedin() {
    console.log("Login with LinkedIn clicked");
  }

}
