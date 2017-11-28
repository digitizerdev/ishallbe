import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { LoginPage } from '../login/login';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  register: {
    username?: string;
    email?: string, 
    password?: string,
  } = {};    

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  registerWithEmail() {
    console.log("Register with email clicked");
  }

  goToLoginPage() {
    console.log("Go to register page clicked");
    this.navCtrl.setRoot(LoginPage);
  }

  loginWithFacebook() {
    console.log("Login with Facebook clicked");
  }
  
  loginWithLinkedin() {
    console.log("Login with LinkedIn clicked");
  }

}
