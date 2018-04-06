import { Component } from '@angular/core';
import { AlertController, LoadingController, Platform } from 'ionic-angular';
import { Pro } from '@ionic/pro';
import { Facebook } from '@ionic-native/facebook';

import firebase from 'firebase';
import { FirebaseProvider } from '../../providers/firebase/firebase';

@Component({
  selector: 'login-facebook',
  templateUrl: 'login-facebook.html'
})
export class LoginFacebookComponent {

  uid: any;
  authToken: any;
  user: any;
  loader: any;
  loaded = false;

  constructor(
    private firebase: FirebaseProvider,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private platform: Platform,
    private facebook: Facebook,
  ) { }

  authenticate() {
    this.firebase.socialAuthentication = true;
    this.loader = this.loadingCtrl.create({
      spinner: 'bubbles',
      content: 'Loading...'
    });
    this.loader.present();
    this.determineAuthType(this.platform.is('cordova'));
  }

  determineAuthType(cordova) {
    if (cordova)
      this.cordovaAuth();
    else
      this.browserAuth();
  }

  cordovaAuth() {
    this.facebook.login(['email', 'public_profile']).then((token) => {
      this.facebook.getAccessToken().then((accessToken) => {
        let facebookProviderCredential = firebase.auth.FacebookAuthProvider.credential(accessToken);
        firebase.auth().signInWithCredential(facebookProviderCredential).then((token) => {
          this.loader.dismiss();
        }).catch((error) => { this.errorHandler(error) });;
      }).catch((error) => { this.errorHandler(error) });
    }).catch((error) => { this.errorHandler(error) });
  }

  browserAuth() {
    firebase.auth().signInWithPopup(new firebase.auth.FacebookAuthProvider()).then((token) => {
      this.loader.dismiss();
    });
  }

  errorHandler(error) {
    Pro.monitoring.exception(error);
    let alert = this.alertCtrl.create({
      title: 'Fail',
      subTitle: error.message,
      buttons: ['OK']
    });
    alert.present();
  }
}
