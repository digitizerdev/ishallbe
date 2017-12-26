import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
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
  title = 'Support';

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private emailComposer: EmailComposer
  ) {
  }

  submit(supportForm) {
    return this.composeSupportEmail(supportForm).then(() => {
      this.confirmDelivery();
    });
  }

  composeSupportEmail(supportForm) {
    let email = {
      to: 'iShallBe17@gmail.com',
      subject: supportForm.subject,
      body: supportForm.body,
      isHtml: true
    };
    return this.emailComposer.open(email)
  }

  confirmDelivery() {
    this.setRootAccountPage();
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
