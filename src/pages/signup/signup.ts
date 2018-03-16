import { Component } from '@angular/core';

import { IonicPage, NavController, AlertController, LoadingController } from 'ionic-angular';

import { Observable } from 'rxjs/Observable';
import moment from 'moment';

import { HomePage } from '../home/home';
import { LoginPage } from '../login/login';

import { FirebaseProvider } from '../../providers/firebase/firebase';

import { User } from '../../../test-data/users/model';

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
  timestamp: number;
  displayTimestamp: string;
  loader: any;
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
    this.timestamp = moment().unix();
    this.displayTimestamp = moment().format('MMM D YYYY h:mmA');
  }

  submit(signupForm) {
    this.submitted = true;
    if (signupForm.valid) {
      this.presentEULA().subscribe((accepted) => {
        if (accepted) {
          this.loader = this.loadingCtrl.create({
            spinner: 'bubbles',
            content: 'Loading...'
          });
          this.loader.present();
          this.signup(signupForm).subscribe(() => {
            this.navCtrl.setRoot(HomePage);
            this.loader.dismiss();
          });
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
    return Observable.create((observer) => {
      const user: User = {
        uid: this.uid,
        name: signupForm.name,
        bio: "",
        email: signupForm.email,
        photo: "assets/img/default-profile.png",
        blocked: false,
        displayTimestamp: this.displayTimestamp,
        timestamp: this.timestamp,
        social: {
          instagram: "",
          linkedin: "",
          twitter: ""
        },
        roles: {
          contributor: true,
          editor: false
        },
      }
      observer.next(user);
    });
  }

  signup(signupForm) {
    return Observable.create((observer) => {
      return this.firebase.afa.auth.createUserWithEmailAndPassword(signupForm.email, signupForm.password).then((token) => {
        this.uid = token.uid
        return this.buildUser(signupForm).subscribe((user) => {
          return this.createUser(user).then(() => {
            observer.next();
          }).catch((error) => { this.errorHandler(error); this.loader.dismiss() });
        });
      }).catch((error) => { this.errorHandler(error); this.loader.dismiss() });
    });
  }

  createUser(user) {
    let path = '/users/' + this.uid;
    return this.firebase.afs.doc(path).set(user);
  }

  errorHandler(error) {
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