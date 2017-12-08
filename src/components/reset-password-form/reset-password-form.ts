import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';

import { HomePage } from '../../pages/home/home';

import { FirebaseProvider } from '../../providers/firebase/firebase';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'reset-password-form',
  templateUrl: 'reset-password-form.html'
})
export class ResetPasswordFormComponent {

  form: {
    email?: string,
  } = {};
  submitted = false;
  error: any;

  constructor(
    public alertCtrl: AlertController,
    public navCtrl: NavController,
    public firebase: FirebaseProvider,
  ) {
  }

  submit(form) {
    this.form = form;
    this.submitted = true;
    this.request(form.email);
    this.setRootHomePage();
  }

  request(email) {
    this.firebase.afa.auth.sendPasswordResetEmail(email)
      .then(() => {
        this.confirm();
      }, function (error) {
        this.errorHandler(error);
      });
  }

  confirm() {
    this.confirmAlert();
    this.setRootHomePage();
  }

  confirmAlert() {
    let alert = this.alertCtrl.create({
      title: 'Success',
      subTitle: 'You will receive an email to reset your password shortly',
      buttons: ['OK']
    });
    alert.present();
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
