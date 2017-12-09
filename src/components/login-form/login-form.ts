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
  selector: 'login-form',
  templateUrl: 'login-form.html'
})
export class LoginFormComponent {

  submission: { 
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
    this.authenticate(this.submission.email, this.submission.password);
  }

  authenticate(email, password) {
    this.firebase.afa.auth.signInWithEmailAndPassword(email, password).then((token) => {
      this.requestProfile(token.uid);
    }).catch((error) => {
        this.errorHandler(error);
      });
  }

  requestProfile(uid) {
    let path = '/users/' + uid;
    let request = this.firebase.object(path).subscribe((profile)=>{
      this.chooseSession(profile);
    })
  }

  chooseSession(profile) {
    if (profile.role == 'editor') {
      let user = {
        "loggedIn": true,
        "editor": true,
        "uid": profile.uid
      }
      this.welcomeEditor(user);
    } else {
      let user = {
        "loggedIn": true,
        "editor": false,
        "uid": profile.uid
      }
      this.welcome(user);
    }
  }
  
  welcome(user) {
    this.session.start(user);
    this.setRootHomePage();
  }

  welcomeEditor(user) {
    this.session.start(user);
    this.session.startEditor();
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
