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
  submitted = false;
  title = 'Support';
  loader: any;

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private emailComposer: EmailComposer
  ) {
  }

  submit(supportForm) {
    this.submitted = true;
    this.startLoader();
    return this.composeSupportEmail(supportForm).then(() => {
      this.confirmDelivery();
    });
  }

  startLoader() {
    this.loader = this.loadingCtrl.create({
      content: 'Please Wait..'
    });
    this.loader.present();
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
    this.endLoader();
    this.setRootAccountPage();
  }

  endLoader() {
    this.loader.dismiss();
  }

  setRootAccountPage() {
    this.navCtrl.setRoot(AccountPage);
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
