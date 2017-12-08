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

  submission: { 
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

  submit(submission) {
    this.submission = submission;
    this.submitted = true;
    this.send(submission.email);
    this.setRootHomePage();    
  }

  send(email) {
   this.firebase.updateAccountEmail(email).then(()=> {
     this.confirm();
   })
    .catch(function (error) {
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
