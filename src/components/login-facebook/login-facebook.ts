import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController, Platform } from 'ionic-angular';
import { Facebook } from '@ionic-native/facebook';
import { Storage } from '@ionic/storage';

import { HomePage } from '../../pages/home/home';

import * as Firebase from 'firebase';
let firebase = Firebase;

import { FirebaseProvider } from '../../providers/firebase/firebase';

import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'login-facebook',
  templateUrl: 'login-facebook.html'
})
export class LoginFacebookComponent {

  uid: any;
  loader: any;

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
    console.log("Authenticating");
    this.viaCordova(this.platform.is('cordova'))
    this.startLoader();
  }

  startLoader() {
    this.loader = this.loadingCtrl.create({
      content: 'Please Wait..'
    });
  }

  viaCordova(cordova) {
    if (cordova) {
      this.cordova();
    } else {
      this.browser();
    }
  }

  cordova() {
    console.log("Logging in with facebook cordova");
    this.facebook.login(['email', 'public_profile']).then((token) => {
      console.log("Got token");
      console.log(token);
      this.facebook.getAccessToken().then((accessToken) => {
        console.log("Facebook access token is "); 
        console.log(accessToken);
      })
    });
  }

  browser() {

  }

  unpackageCordovaToken(provider) {
    console.log("Unpackaging cordova");
    console.log(provider);
  }

  checkForExistingProfile(account) {
    console.log("Checking for existing account");
    console.log(account);
    this.requestProfile(this.uid).subscribe((profile)=> {
      console.log("Got profile");
      console.log(profile);
      if (profile) {
        console.log("Let's welcome this user")
        this.welcome();
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
    let path = '/users/' + this.uid;
    let profile = {
      "uid": account.uid,
      "name": account.name,
      "email": account.email,
      "photo": account.photo,
      "role": "contributor",
      "blocked": false
    }
    this.firebase.object(path).set(profile).then(()=>{
      this.welcome();
    })
  }
  
  welcome() {
    console.log("Welcoming user");
    this.endLoader();
    this.setRootHomePage();
  }

  endLoader() {
    this.loader.dismiss();
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
