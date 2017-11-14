import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { NgForm } from '@angular/forms';

import { LoginPage } from '../login/login';
import { UserProvider } from '../../providers/user/user'

@Component({
  selector: 'page-forgot-password',
  templateUrl: 'forgot-password.html',
})
export class ForgotPasswordPage {
  reset: {email?: string, password?: string} = {};
  form: any;
  error = {
    "code": "",
    "message": ""
  }
  submitted = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public userData: UserProvider,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController

  ) {
    this.form = {
      email: ''
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AccountForgotPage');
  }

 onLogin() {
  this.navCtrl.setRoot(LoginPage);  
 }

}
