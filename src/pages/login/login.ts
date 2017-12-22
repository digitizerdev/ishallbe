import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs/Observable';

import { HomePage } from '../home/home';
import { RegisterPage } from '../register/register';
import { PasswordResetPage } from '../password-reset/password-reset';

import { FirebaseProvider } from '../../providers/firebase/firebase';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})

export class LoginPage {

  loginForm: {
    email?: string,
    password?: string
  } = {};
  submitted = false;
  loader: any;
  uid: any;

  constructor(
    private navCtrl: NavController,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private storage: Storage,
    private firebase: FirebaseProvider
  ) {
  }

  submit(loginForm) {
    this.submitted = true;
    if (loginForm.valid) {
      this.startLoader();
      return this.authenticate(loginForm).subscribe((token) => {
        this.confirmDelivery();   
      });
    }    
  }

  startLoader() {
    this.loader = this.loadingCtrl.create({
      content: 'Please Wait..'
    });
    this.loader.present();
  }

  authenticate(loginForm) {
    return Observable.create((observer) => {
      return this.firebase.logIn(loginForm).then((token)=> {
        this.uid = token.uid;              
        observer.next(token);
      }, (error) => {
        this.errorHandler(error);
      });
    });
  }

  confirmDelivery() {
    this.endLoader();
    this.presentConfirmationAlert();
    this.startSession();     
    this.setRootHomePage();
  }

  endLoader() {
    this.loader.dismiss();
  }

  presentConfirmationAlert() {
    let alert = this.alertCtrl.create({
      title: '',
      subTitle: 'Authenticated',
      buttons: ['OK']
    });
    alert.present();
  }

  startSession() {
    let uid = this.uid;
    this.storage.set('uid', uid);
    this.storage.set('session', true);
    this.setRootHomePage();
  }

  setRootHomePage() {
    this.navCtrl.setRoot(HomePage);
  }

  errorHandler(error) {
    this.endLoader();
    let alert = this.alertCtrl.create({
      title: 'Fail',
      subTitle: error.message,
      buttons: ['OK']
    });
    alert.present();
  }

  pushPasswordResetPage() {
    this.navCtrl.push(PasswordResetPage);
  }

  pushRegisterPage() {
    this.navCtrl.setRoot(RegisterPage);
  }

}
