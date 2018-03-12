import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController, LoadingController } from 'ionic-angular';
import { Pro } from '@ionic/pro';
import { Observable } from 'rxjs/Observable';
import moment from 'moment';

import { HomePage } from '../home/home';
import { LoginPage } from '../login/login';

import { FirebaseProvider } from '../../providers/firebase/firebase';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  signupForm: {
    name?: string
    email?: string,
    password?: string
  } = {};
  uid: string;
  profile: object;
  timestamp: number;
  displayTimestamp: string;
  submitted = false;

  constructor(
    private navCtrl: NavController,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private firebase: FirebaseProvider,
  ) {
  }

  ionViewDidLoad() {
    this.timeStampPage();
  }

  timeStampPage() {
    let timestampString = moment().format('YYYYMMDDhhmmss');
    this.timestamp = parseInt(timestampString);
    this.displayTimestamp = moment().format('MMM D YYYY h:mmA');
  }

  submit(signupForm) {
    this.submitted = true;
    if (signupForm.valid) {
      this.presentEULA().subscribe((accepted) => {
        if (accepted) {
          let loading = this.loadingCtrl.create({ 
            spinner: 'bubbles',
            content: 'Loading...' });
          loading.present();
          this.signup(signupForm).then(() => {
            this.navCtrl.setRoot(HomePage);
            loading.dismiss();
          }).catch((error) => { this.errorHandler(error); loading.dismiss() });
        }
      })
    };
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

  buildUser(signupForm) {
    this.signupForm = signupForm;
    this.profile = {
      name: signupForm.name,
      email: signupForm.email,
      photo: "assets/img/default-profile.png",
      blocked: false,
      uid: this.uid,
      displayTimestamp: this.displayTimestamp,
      timestamp: this.timestamp,
      roles: {
        contributor: true,
        editor: false
      }
    }
  }

  signup(signupForm) {
    return this.firebase.afa.auth.createUserWithEmailAndPassword(signupForm.email, signupForm.password).then((token) => {
      this.uid = token.uid
      this.buildUser(signupForm);
      return this.createUser().then(() => {
      }, (error) => { throw error });
    }, (error) => { throw error });
  }

  createUser() {
    let path = '/users/' + this.uid;
    return this.firebase.afs.doc(path).set(this.profile);
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

  setRootLoginPage() {
    this.navCtrl.setRoot(LoginPage);
  }
}