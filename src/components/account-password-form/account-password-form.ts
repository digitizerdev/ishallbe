import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';


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
    this.request(form.password);
  }

  request(password) {
    this.firebase.updateAccountPassword(password)
      .subscribe(() => {
        this.confirm();
      }, (error) => {
        this.errorHandler(error);
      });
  }

  confirm() {
    this.confirmAlert();
  }

  confirmAlert() {
    let alert = this.alertCtrl.create({
      title: 'Success',
      subTitle: 'You successfully updated your password',
      buttons: ['OK']
    });
    alert.present();
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
