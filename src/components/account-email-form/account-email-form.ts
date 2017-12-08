import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';

import { HomePage } from '../../pages/home/home';

import { FirebaseProvider } from '../../providers/firebase/firebase';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'account-email-form',
  templateUrl: 'account-email-form.html'
})
export class AccountEmailFormComponent {

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
    this.firebase.updateAccountEmail(email)
      .subscribe(() => {
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
      subTitle: 'You successfully updated your email',
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
