import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';

import { Observable } from 'rxjs/Observable';

import { FirebaseProvider } from '../../providers/firebase/firebase';

@IonicPage()
@Component({
  selector: 'page-account-password',
  templateUrl: 'account-password.html',
})
export class AccountPasswordPage {

  updatePasswordForm: {
    password?: string
  } = {};
  submitted = false;
  user: any;


  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private firebase: FirebaseProvider
  ) {
  }

  submit(updatePasswordForm) {
    this.submitted = true;
    if (updatePasswordForm.valid) {
      let loading = this.loadingCtrl.create({ content: 'Please Wait..' });
      loading.present();
      return this.updatePassword(updatePasswordForm).subscribe(() => {
        this.navCtrl.pop();
        loading.dismiss();
        this.presentConfirmationAlert();
      }, error => {
        this.errorHandler(error); loading.dismiss();
      });
    };
  }

  updatePassword(updatePasswordForm) {
    return Observable.create((observer) => {
      return this.firebase.afa.auth.currentUser.updatePassword(updatePasswordForm.password).then(() => {
        observer.next();
      }, (error) => { observer.error(error) });
    });
  }

  presentConfirmationAlert() {
    let alert = this.alertCtrl.create({
      title: 'Success',
      subTitle: 'Your password has been updated',
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

}
