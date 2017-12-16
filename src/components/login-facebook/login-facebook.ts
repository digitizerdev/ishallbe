import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController, Platform } from 'ionic-angular';
import { Facebook } from '@ionic-native/facebook';
import * as firebase from 'firebase/app';
import { Storage } from '@ionic/storage';

import { HomePage } from '../../pages/home/home';

import { FirebaseProvider } from '../../providers/firebase/firebase';
import { SessionProvider } from '../../providers/session/session';

import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'login-facebook',
  templateUrl: 'login-facebook.html'
})
export class LoginFacebookComponent {

  error: any;
  token: any;
  photoURL: any;

  constructor(
    public firebase: FirebaseProvider,
    public session: SessionProvider,
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public platform: Platform,
    public facebook: Facebook,
    public storage: Storage
  ) {
  }

  authenticate() {
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
    this.facebook.login(['email', 'public_profile']).then((accessToken) => {
      this.unpackageCordovaToken(accessToken);  
    });
  }

  browser() {
    this.firebase.afa.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider()).then((token)=> {
      let photoURL = "https://graph.facebook.com/" + token.user.providerData[0].uid + "/picture?type=large";      
      let account = {
        "uid": token.user.uid,
        "name": token.user.displayName,
        "email": token.user.email,
        "photo": photoURL,   
      }
      this.checkForExistingProfile(account);
    });
  }

  unpackageCordovaToken(provider) {
    this.firebase.afa.auth.signInWithCredential(provider).then((token) => {  
      let photoURL = "https://graph.facebook.com/" + token.success.providerData[0].uid + "/picture?type=large";
      let account = {
        "uid": token.uid,
        "name": token.displayName,
        "email": token.email,
        "photo": photoURL,   
      }
      this.checkForExistingProfile(account);
    });
  }

  checkForExistingProfile(account) {
    this.requestProfile(account.uid).subscribe((profile)=> {
      if (profile) {
        this.welcome(profile);
      } else {
        this.presentEULA().subscribe((accepted) => {
          if (accepted) {
        this.createProfile(account);
          }
        });
      }
    })
  }

  requestProfile(uid) {
    let path = '/users/' + uid;
    return this.firebase.object(path)
  }

  presentEULA() {
    return Observable.create((observer:any) => {                  
    let alert = this.alertCtrl.create({
      title: 'Accept Terms of Service',
      message: 'Please confirm to continue',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
            observer.next(false);
          }
        },
        {
          text: 'Confirm',
          handler: () => {
            console.log('Confirm clicked');
            observer.next(true);
          }
        }
      ]
    });
    alert.present();
    });
  }

  createProfile(account) {
    let path = '/users/' + account.uid;
    let profile = {
      "uid": account.uid,
      "name": account.name,
      "email": account.email,
      "photo": account.photo,
      "role": "contributor",
      "blocked": false
    }
    this.firebase.setObject(path, profile).then(()=>{
      this.welcome(profile);
    })
  }
  
  welcome(profile) {
    let user = {
      loggedIn: true,
      role: profile.role,
      uid: profile.uid
    }
    this.session.start(user);
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
