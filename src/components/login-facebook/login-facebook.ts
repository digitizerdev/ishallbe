import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController, Platform } from 'ionic-angular';
import { Facebook } from '@ionic-native/facebook';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs/Observable';
import firebase from 'firebase';

import { HomePage } from '../../pages/home/home';

import { FirebaseProvider } from '../../providers/firebase/firebase';

@Component({
  selector: 'login-facebook',
  templateUrl: 'login-facebook.html'
})
export class LoginFacebookComponent {

  uid: any;
  loader: any;
  data: any;

  constructor(
    public firebase: FirebaseProvider,
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public platform: Platform,
    public facebook: Facebook,
    public storage: Storage,
  ) {
  }

  authenticate() {
    this.viaCordova(this.platform.is('cordova'))
    this.startLoader();
  }

  startLoader() {
    this.loader = this.loadingCtrl.create({
      content: 'Please Wait..'
    });
    this.loader.present();
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
      this.facebook.getAccessToken().then((accessToken) => {
        let facebookProviderCredential = firebase.auth.FacebookAuthProvider.credential(accessToken);
        firebase.auth().signInWithCredential(facebookProviderCredential).then((token) => {
          this.prepCordova(token);
        });
      })
    })
  }

  prepCordova(token) {
    this.uid = token.uid;
    this.data = token.providerData[0];
    let photoURL = "https://graph.facebook.com/" + token.providerData[0].uid + "/picture?type=large";      
    let data = {
      "name": token.providerData[0].displayName,
      "email": token.providerData[0].email,
      "photo": photoURL,   
    }
    this.data = data;    
    this.checkForExistingProfile();
  }

  browser() {
    firebase.auth().signInWithPopup(new firebase.auth.FacebookAuthProvider()).then((token)=> {
      this.prepBrowser(token);
    });
  }

  prepBrowser(token) {
    let photoURL = "https://graph.facebook.com/" + token.user.providerData[0].uid + "/picture?type=large";      
    let data = {
      "name": token.user.displayName,
      "email": token.user.email,
      "photo": photoURL,   
    }
    this.data = data; 
    this.uid = token.user.uid;
    this.checkForExistingProfile();
  }

  checkForExistingProfile() {
    this.requestProfile(this.uid).subscribe((profile) => {
      if (profile) {
        this.confirmDelivery();
      } else {
       this.registerUser(); 
      }
    })
  }

  registerUser() {
    this.presentEULA().subscribe((accepted) => {
      if (accepted) {
        this.createProfile();
      }
    });
  }

  requestProfile(uid) {
    let path = '/users/' + uid;
    return this.firebase.object(path)
  }

  presentEULA() {
    return Observable.create((observer: any) => {
      let alert = this.alertCtrl.create({
        title: 'Accept Terms of Service',
        message: 'Please confirm to continue',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            handler: () => {
              observer.next(false);
            }
          },
          {
            text: 'Confirm',
            handler: () => {
              observer.next(true);
            }
          }
        ]
      });
      alert.present();
    });
  }

  createProfile() {
    let path = '/users/' + this.uid;
    let profile = {
      "uid": this.uid,
      "name": this.data.name,
      "email": this.data.email,
      "photo": this.data.photo,
      "role": "contributor",
      "blocked": false
    }
    this.firebase.object(path).set(profile).then(() => {
      this.confirmDelivery();
    })
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
    let alert = this.alertCtrl.create({
      title: 'Fail',
      subTitle: error.message,
      buttons: ['OK']
    });
    alert.present();
  }
}
