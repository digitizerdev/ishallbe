import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';

import { FirebaseProvider } from '../../providers/firebase/firebase';

import { Observable } from 'rxjs/Observable';

@IonicPage()
@Component({
  selector: 'page-account-password',
  templateUrl: 'account-password.html',
})
export class AccountPasswordPage {

  updatePasswordForm: {
    password?: string;
  } = {};
  submitted = false;
  loader: any;
  title = 'Update Password';

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
      this.startLoader();
      return this.updatePassword(updatePasswordForm).subscribe(() => {
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

  updatePassword(updatePasswordForm) {
    return Observable.create((observer) => {
      return this.firebase.account().updatePassword(updatePasswordForm.password).then(()=> {
        observer.next();
      }, (error) => { this.errorHandler(error); });
    });
  }

  confirmDelivery() {
    this.endLoader();
    this.presentConfirmationAlert();
    this.popToAccountPage();
  }

  endLoader() {
    this.loader.dismiss();
  }

  presentConfirmationAlert() {
    let alert = this.alertCtrl.create({
      title: 'Success',
      subTitle: 'Your password has been updated',
      buttons: ['OK']
    });
    alert.present();
  }

  popToAccountPage() {
    this.navCtrl.pop();
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
