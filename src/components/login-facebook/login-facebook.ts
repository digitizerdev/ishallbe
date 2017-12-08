import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController, Platform } from 'ionic-angular';
import { Facebook } from '@ionic-native/facebook';
import * as firebase from 'firebase/app';

import { HomePage } from '../../pages/home/home';

import { FirebaseProvider } from '../../providers/firebase/firebase';
import { SessionProvider } from '../../providers/session/session';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/finally';
import 'rxjs/add/operator/first';

@Component({
  selector: 'login-facebook',
  templateUrl: 'login-facebook.html'
})
export class LoginFacebookComponent {

  error: any;

  constructor(
    public firebase: FirebaseProvider,
    public session: SessionProvider,
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public platform: Platform,
    public facebook: Facebook
  ) {
  }

  loginFacebook() {
    this.viaCordova(this.platform.is('cordova'))
  }

  viaCordova(cordova) {
    if (cordova) {
      this.cordova();
    } else {
      this.browser();
    }
  }

  cordova() {
    this.facebook.login(['email', 'public_profile']).then((token) => {
      this.welcome(token);
    });
  }

  browser() {
    this.firebase.afa.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider()).then((token)=> 
    {
      this.welcome(token);      
    })
  }

  auth(token) {

  }
  
  welcome(user) {
    this.session.start(user);
    this.setRootHomePage();
  }

  welcomeEditor(user) {
    this.session.start(user);
    this.session.startEditor();
    this.setRootHomePage();
  }

  setRootHomePage() {
    this.navCtrl.setRoot(HomePage);
  }

  errorHandler(error) {
    this.error = error;
    let alert = this.alertCtrl.create({
      title: 'Fail',
      subTitle: error.message,
      buttons: ['OK']
    });
    alert.present();
  }

}
