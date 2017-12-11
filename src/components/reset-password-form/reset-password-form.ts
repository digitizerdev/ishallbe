import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController } from 'ionic-angular';

import { FirebaseProvider } from '../../providers/firebase/firebase';

@Component({
  selector: 'reset-password-form',
  templateUrl: 'reset-password-form.html'
})
export class ResetPasswordFormComponent {

  form: {
    email?: string,
  } = {};
  submitted = false;
  loader: any;

  constructor(
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public navCtrl: NavController,
    public firebase: FirebaseProvider,
  ) { }

  submit(form) {
    this.prepareRequest(form)
    this.makeRequest(form).then((profile) => {
      this.confirmDelivery();
    }).catch((error) => {
      this.errorHandler(error);
    });
  }

  prepareRequest(form) {
    this.buildData(form);
    this.startLoader();
  }

  buildData(form) {
    this.form = form;
    this.submitted = true;
  }

  startLoader() {
    this.loader = this.loadingCtrl.create({
      content: 'Please Wait..'
    });
  }

  makeRequest(form) {
    return this.requestPasswordResetEmail(form.email).then((token) => {
    }, (error) => { throw error });
  }

  requestPasswordResetEmail(email) {
    return this.firebase.resetPassword(email);
  }

  confirmDelivery() {
    this.endLoader();
    this.presentConfirmationAlert();
    this.popNav();
  }

  endLoader() {
    this.loader.dismiss();
  }

  presentConfirmationAlert() {
    let alert = this.alertCtrl.create({
      title: 'Success',
      subTitle: 'You will receive an email to update your email shortly',
      buttons: ['OK']
    });
    alert.present();
  }

  popNav() {
    this.navCtrl.pop();
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
