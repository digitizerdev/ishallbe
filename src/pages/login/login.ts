import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { HomePage } from '../home/home';

import {}
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  login: {email?: string, password?: string} = {};
  submitted = false;
  loggedIn = false;  

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  logForm( email, password) {
    this.login.email = email;
    this.login.password = password;
    this.submitted = true;
    this.loggedIn = true;
    this.navCtrl.setRoot(HomePage);
  }



}
