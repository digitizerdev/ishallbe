import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController } from 'ionic-angular';

import { LoginPage } from '../../pages/login/login';

import { FirebaseProvider } from '../../providers/firebase/firebase';
import { SessionProvider } from '../../providers/session/session';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/finally';
import 'rxjs/add/operator/first';
@Component({
  selector: 'reset-password-form',
  templateUrl: 'reset-password-form.html'
})
export class ResetPasswordFormComponent {

  submission: { 
    email?: string, 
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
    this.send(submission.email);
  }

  send(email) {
    this.firebase.afa.auth.sendPasswordResetEmail(email).then(()=>{
      this.confirm();
    })
      .catch((error) => {
        this.errorHandler(error);
      });
  }

  confirm() {
    this.confirmAlert();
    this.setRootLoginPage();      
  }

  confirmAlert() {
    let alert = this.alertCtrl.create({
      title: 'Success',
      subTitle: 'You will receive an email to reset your password shortly',
      buttons: ['OK']
    });
    alert.present();
  }

  setRootLoginPage() {
    this.navCtrl.setRoot(LoginPage);
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
