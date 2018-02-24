import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController, AlertController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';

import { LoginPage } from '../login/login';

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

  constructor(
    private navCtrl: NavController, 
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private firebase: FirebaseProvider
  ) {
  }

  submit(passwordResetForm) {
    this.submitted = true;
    if (passwordResetForm.valid) {
      let loading = this.loadingCtrl.create({ content: 'Please Wait..' });
      loading.present();
      return this.resetPassword(passwordResetForm).subscribe(() => {
        this.navCtrl.pop();
        loading.dismiss();
        this.presentConfirmationAlert(); 
      }, error => { this.errorHandler(error); loading.dismiss(); 
      })};      
  }

  resetPassword(passwordResetForm) {
    return Observable.create((observer) => {
      return this.firebase.afa.auth.sendPasswordResetEmail(passwordResetForm.email).then(()=> {
        observer.next();
      }, (error) => {
        observer.error(error);
      });
    });
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
