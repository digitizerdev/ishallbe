import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController, Platform, Events } from 'ionic-angular';
import { Pro } from '@ionic/pro';
import { Facebook } from '@ionic-native/facebook';
import { Observable } from 'rxjs/Observable';
import moment from 'moment';

import { HomePage } from '../../pages/home/home';

import firebase from 'firebase';
import { FirebaseProvider } from '../../providers/firebase/firebase';

import { User } from '../../../test-data/users/model';

@Component({
  selector: 'login-facebook',
  templateUrl: 'login-facebook.html'
})
export class LoginFacebookComponent {

  uid: any;
  authToken: any;
  user: any;
  loader: any;
  registering = false;

  constructor(
    private firebase: FirebaseProvider,
    private navCtrl: NavController,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private events: Events,
    private platform: Platform,
    private facebook: Facebook,
  ) {
    console.log("Hello Facebook Login Component");
  }

  authenticate() {
    console.log("Authenticating");
    this.firebase.loggingInWithFacebook = true;
    console.log("Loggin In With Facebook")
    this.loader = this.loadingCtrl.create({ 
      spinner: 'bubbles',
      content: 'Loading...' 
    });
    this.loader.present();
    this.determineAuthType(this.platform.is('cordova'));
  }

  determineAuthType(cordova) {
    console.log("Determining Auth Type");
    if (cordova) {
      this.cordovaAuth();
    } else { this.browserAuth(); }
  }

  cordovaAuth() {
    console.log("Authenticating with Cordova");
    this.facebook.login(['email', 'public_profile']).then((token) => {
      this.facebook.getAccessToken().then((accessToken) => {
        let facebookProviderCredential = firebase.auth.FacebookAuthProvider.credential(accessToken);
        firebase.auth().signInWithCredential(facebookProviderCredential).then((token) => {
          this.unpackageCordovaAuthToken(token);
        }).catch((error) => { this.errorHandler(error) });;
      }).catch((error) => { this.errorHandler(error) });
    }).catch((error) => { this.errorHandler(error) });
  }

  unpackageCordovaAuthToken(token) {
    console.log("Unpackaging Cordova Auth Token");
    this.uid = token.uid;
    this.authToken = token.providerData[0];
    let photoURL = "https://graph.facebook.com/" + token.providerData[0].uid + "/picture?type=large";
    let data = {
      "name": token.providerData[0].displayName,
      "email": token.providerData[0].email,
      "photo": photoURL,
    }
    this.authToken = data;
    this.loadUser();
  }

  browserAuth() {
    console.log("Browser Authentication");
    firebase.auth().signInWithPopup(new firebase.auth.FacebookAuthProvider()).then((token) => {
      this.unpackageBrowserAuthToken(token);
    });
  }

  unpackageBrowserAuthToken(token) {
    console.log("Unpackaging Browser Auth Token");
    this.uid = token.user.uid;
    let photoURL = "https://graph.facebook.com/" + token.user.providerData[0].uid + "/picture?type=large";
    let data = {
      "name": token.user.displayName,
      "email": token.user.email,
      "photo": photoURL,
    }
    this.authToken = data;
    this.loadUser();
  }

  loadUser() {
    console.log("Loading User");
    this.checkForExistingUser().subscribe((user) => {
      this.user.unsubscribe;
      if (user) { this.login(); this.loader.dismiss() }
      else {
        this.registerUser().subscribe(() => {
          this.login(); this.loader.dismiss();
        }, error => {
          this.firebase.afa.auth.signOut();
          this.navCtrl.setRoot(this.navCtrl.getActive().component);
          this.loader.dismiss();
        })
      };
    });
  }

  login() {
    console.log("Logging In");
    this.firebase.loggingInWithFacebook = false;
    this.events.publish('user:login');
    this.navCtrl.setRoot(HomePage)
  }

  checkForExistingUser() {
    console.log("Checking for existing user");
    return Observable.create((observer) => {
      let path = '/users/' + this.uid;
      this.user = this.firebase.afs.doc(path);
      return this.user.valueChanges().subscribe((user) => {
        if (!this.registering) observer.next(user);
      })
    });
  }

  registerUser() {
    console.log("Registering User");
    this.registering = true;
    return Observable.create((observer) => {
      return this.presentEULA().subscribe((accepted) => {
        if (accepted) this.createUser().subscribe((newUserObject) => { 
          observer.next(); 
        });
        else observer.error();
      });
    });
  }

  presentEULA() {
    console.log("Presenting EULA");
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

  createUser() {
    console.log("Creating User");
    return Observable.create((observer) => {
      this.buildUser().subscribe((user) => {
        let path = 'users/' + this.uid;
        return this.firebase.afs.doc(path).set(user).then(() => {
          observer.next();
        });
      });
    });
  }

  buildUser() {
    console.log("Building User");
    return Observable.create((observer) => {
      if (!this.firebase.fcmToken) this.firebase.fcmToken = "0";
      let timestamp = moment().unix();
      console.log("Timestamp is " + timestamp);
      let displayTimestamp = moment().format('MMM D YYYY h:mmA');
      console.log("Display timestamp is " + displayTimestamp);
      const user: User = {
        uid: this.uid,
        fcmToken: this.firebase.fcmToken,
        name: this.authToken.name,
        bio: "",
        email: this.authToken.email,
        photo: this.authToken.photo,
        blocked: false,
        displayTimestamp: displayTimestamp,
        timestamp: timestamp,
        instagram: "",
        linkedin: "",
        twitter: "",
        contributor: true,
        editor: false
      }
      console.log(user);
      observer.next(user);
    });
  }

  errorHandler(error) {
    console.log("Handling Error");
    Pro.monitoring.exception(error);
    let alert = this.alertCtrl.create({
      title: 'Fail',
      subTitle: error.message,
      buttons: ['OK']
    });
    alert.present();
  }

}
