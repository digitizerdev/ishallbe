import { Component } from '@angular/core';

import { IonicPage, NavController, AlertController, LoadingController, Events } from 'ionic-angular';

import { Observable } from 'rxjs/Observable';
import moment from 'moment';

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
  submitted = false;
  loader: any;

  constructor(
    private navCtrl: NavController,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private events: Events,
    private firebase: FirebaseProvider,
  ) { }

  submit(signupForm) {
    this.submitted = true;
    if (signupForm.valid) {
      this.loader = this.loadingCtrl.create({
        spinner: 'bubbles',
        content: 'Loading...'
      });
      this.loader.present();
      this.signup(signupForm);
    }
  };

  signup(signupForm) {
    this.firebase.name = signupForm.name
    this.firebase.afa.auth.createUserWithEmailAndPassword(signupForm.email, signupForm.password).then((token) => {
      this.loader.dismiss();
    }).catch((error) => {
      this.errorHandler(error);
      this.loader.dismiss()
    });
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