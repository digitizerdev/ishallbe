import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController } from 'ionic-angular';

import { AccountPage } from '../../pages/account/account';
import { FirebaseProvider } from '../../providers/firebase/firebase';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'account-password-form',
  templateUrl: 'account-password-form.html'
})
export class AccountPasswordFormComponent {

  form: {
    password?: string,
  } = {};
  loader: any;
  submitted = false;

  constructor(
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public navCtrl: NavController,
    public firebase: FirebaseProvider,
  ) {
  }

  submit(form) {
    this.prepareRequest(form);
    this.makeRequest(form).then(() => {
      this.confirmDelivery();
    }).catch((error)=> {
      this.errorHandler(error);
    })
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
    return this.requestAccountPasswordUpdate(form.password);
  }

  requestAccountPasswordUpdate(password) {
    return this.firebase.updateAccountPassword(password);    
  }

  confirmDelivery() {
    this.endLoader();
    this.presentConfirmationAlert();
    this.setRootAccountPage();
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

  setRootAccountPage() {
    this.navCtrl.setRoot(AccountPage);
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
