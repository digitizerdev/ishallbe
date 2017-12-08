import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController } from 'ionic-angular';

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
  selector: 'register-form',
  templateUrl: 'register-form.html'
})
export class RegisterFormComponent {

  submission: { 
    name?: string,
    email?: string, 
    password?: string 
  } = {};
  submitted = false;
  error: any;

  constructor(
    public firebase: FirebaseProvider,
    public session: SessionProvider,
    public navCtrl: NavController,
    public alertCtrl: AlertController
  ) {
    
  }

  submit(submission) {
    this.submission = submission;
    this.submitted = true;
    this.createAccount(this.submission.email, this.submission.password);
  }

  createAccount(email, password) {
    this.firebase.afa.auth.createUserWithEmailAndPassword(email, password).then((token) => {
      this.createProfile(token.uid);
    });
  }

  createProfile(uid) {
    let profile = {
      uid: uid,
      name: this.submission.name,
      email: this.submission.email,
      photo: "https://ishallbe.co/wp-content/uploads/2017/09/generic-profile.png",
      blocked: false,
      role: "contributor"
    }
    this.firebase.createProfile(profile); 
    this.createUser(profile);
  }

  createUser(profile) {
    let user = {
      "loggedIn": true,
      "editor": false,
      "uid": profile.uid
    }
    this.welcome(user);
  }

  welcome(user) {
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
