import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController, Platform } from 'ionic-angular';
import { EmailComposer } from '@ionic-native/email-composer';
import { AccountPage } from '../account/account';

@IonicPage()
@Component({
  selector: 'page-support',
  templateUrl: 'support.html',
})
export class SupportPage {

  supportForm: {
    subject?: string;
    body?: string;
  } = {};
  submitted = false;

  constructor(
    private navCtrl: NavController,
    private alertCtrl: AlertController,
    private platform: Platform,
    private emailComposer: EmailComposer
  ) {
  }

  submit(supportForm) {
    this.submitted = true;
    if (supportForm.valid) {
      if (this.platform.is('cordova')) {
        return this.sendEmail(supportForm).then(() => {
          this.navCtrl.setRoot(AccountPage);
        }, error => {
          this.errorHandler(error);
        });
      } else {
        let path = "mailto:info@ishallbe.co?subject=" + supportForm.subject + "&body=" + supportForm.body;
        open(path)
      }
    }
  }

  sendEmail(supportForm) {
    let email = {
      to: 'info@ishallbe.co',
      subject: supportForm.subject,
      body: supportForm.body,
      isHtml: true
    };
    return this.emailComposer.open(email)
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
