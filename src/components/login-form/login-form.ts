import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController } from 'ionic-angular';

import { HomePage } from '../../pages/home/home';

import { FirebaseProvider } from '../../providers/firebase/firebase';
import { SessionProvider } from '../../providers/session/session';

import { Observable } from 'rxjs/Observable';


@Component({
  selector: 'login-form',
  templateUrl: 'login-form.html'
})
export class LoginFormComponent {

  form: { 
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

  submit(form) {
    this.form = form;
    this.submitted = true;
    this.authenticate(this.form.email, this.form.password);
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
      this.welcome(profile)
    })
  }
  
  welcome(profile) {
    let user = {
      loggedIn: true,
      role: profile.role,
      uid: profile. uid
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
