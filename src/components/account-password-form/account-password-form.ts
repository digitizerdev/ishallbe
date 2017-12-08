import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';

import { HomePage } from '../../pages/home/home';

import { FirebaseProvider } from '../../providers/firebase/firebase';

@Component({
  selector: 'account-password-form',
  templateUrl: 'account-password-form.html'
})
export class AccountPasswordFormComponent {

  submission: { 
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

  submit(submission) {
    this.submission = submission;
    this.submitted = true;
    this.send(submission.password);
    this.setRootHomePage();    
  }

  send(password) {
   this.firebase.changeAccountPassword(password)
    .catch((error)=> {
      this.errorHandler(error);
    });
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
