import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController, AlertController } from 'ionic-angular';

import { Observable } from 'rxjs/Observable';

import { FirebaseProvider } from '../../providers/firebase/firebase';

@IonicPage()
@Component({
  selector: 'page-password-reset',
  templateUrl: 'password-reset.html',
})
export class PasswordResetPage {

  passwordResetForm: {
    email?: string
  } = {};
  submitted = false;
  loader: any;

  constructor(
    private navCtrl: NavController,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private firebase: FirebaseProvider
  ) {
  }

  popToLoginPage() {
    this.navCtrl.pop();
  }

  submit(passwordResetForm) {
    this.submitted = true;
    if (passwordResetForm.valid) {
      this.startLoader();
      return this.resetPassowrd(passwordResetForm).subscribe(() => {
        this.confirmDelivery();   
      });
    }    
  }

  startLoader() {
    this.loader = this.loadingCtrl.create({
      content: 'Please Wait..'
    });
    this.loader.present();
  }

  resetPassowrd(passwordResetForm) {
    return Observable.create((observer) => {
      return this.firebase.sendPasswordResetEmail(passwordResetForm.email).then(()=> {
        observer.next();
      }, (error) => {
        this.errorHandler(error);
      });
    });
  }

  confirmDelivery() {
    this.endLoader();
    this.presentConfirmationAlert();
    this.popToLoginPage();     
  }

  endLoader() {
    this.loader.dismiss();
  }

  presentConfirmationAlert() {
    let alert = this.alertCtrl.create({
      title: 'Success',
      subTitle: 'You will receive an email to reset your password shortly',
      buttons: ['OK']
    });
    alert.present();
  }

  errorHandler(error) {
    this.endLoader();
    let alert = this.alertCtrl.create({
      title: 'Fail',
      subTitle: error.message,
      buttons: ['OK']
    });
    alert.present();
  }

}
