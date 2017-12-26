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
    console.log("Authenticating");
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
    console.log(cordova);
    if (cordova) {
      console.log("This platform is cordova");
      this.cordova();
    } else {
      this.browser();
    }
  }

  cordova() {
    console.log("About to authenticate with cordova")
    this.facebook.login(['email', 'public_profile']).then((token) => {
      this.facebook.getAccessToken().then((accessToken) => {
        let facebookProviderCredential = firebase.auth.FacebookAuthProvider.credential(accessToken);
        console.log("About to authenticate");
        console.log(facebookProviderCredential);
        firebase.auth().signInWithCredential(facebookProviderCredential).then((finalToken) => {
          console.log("Got final token");
          console.log(finalToken);
          this.uid = finalToken[0].uid;
          this.data = finalToken[0].providerData;
          console.log(this.uid);
          console.log(this.data);
          console.log("About to check for existing profile");
          this.checkForExistingProfile();
        });
      })
    })
  }

  browser() {

  }


  checkForExistingProfile() {
    console.log("Checking for existing profile");
    console.log("UID is " + this.uid);
    console.log("Facebook data is ");
    console.log(this.data);
    this.requestProfile(this.uid).subscribe((profile) => {
      console.log("Got profile");
      console.log(profile);
      if (profile) {
        console.log("Let's welcome this user")
        this.welcome();
      } else {
        this.presentEULA().subscribe((accepted) => {
          if (accepted) {
            this.createProfile();
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
    return Observable.create((observer: any) => {
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

  createProfile() {
    let path = '/users/' + this.uid;
    let profile = {
      "uid": this.uid,
      "name": this.data.displayName,
      "email": this.data.email,
      "photo": this.data.photo,
      "role": "contributor",
      "blocked": false
    }
    this.firebase.object(path).set(profile).then(() => {
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
