import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController } from 'ionic-angular';

import { HomePage } from '../../pages/home/home';

import { FirebaseProvider } from '../../providers/firebase/firebase';
import { SessionProvider } from '../../providers/session/session';
import { NativeProvider } from '../../providers/native/native';

@Component({
  selector: 'support-form',
  templateUrl: 'support-form.html'
})
export class SupportFormComponent {

  form: { 
    subject?: string, 
    body?: string
  } = {};
  submitted = false;
  loader: any;

  constructor(
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public navCtrl: NavController,
    public firebase: FirebaseProvider,
    public session: SessionProvider,
    public native: NativeProvider
  ) {
  }

  submit(form) {
    this.prepareRequest(form)
    this.makeRequest(form).then(() => {
      this.confirmDelivery();
    }).catch((error) => {
      this.errorHandler(error);
    }); 
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
    let email = {
      to: 'iShallBe17@gmail.com',
      subject: form.subject,
      body: form.body,
      isHtml: true
    };

    return this.requestEmailComposerToSendEmail(email).then((token) => {
    }, (error) => { throw error });
  }

  requestEmailComposerToSendEmail(email) {
    return this.native.composeEmail(email);
  }

  confirmDelivery() {
    this.endLoader();
    this.presentConfirmationAlert();
    this.setRootHomePage();
  }

  endLoader() {
    this.loader.dismiss();
  }

  presentConfirmationAlert() {
    let alert = this.alertCtrl.create({
      title: 'Success',
      subTitle: 'Sent Email',
      buttons: ['OK']
    });
    alert.present();
  }

  setRootHomePage() {
    this.navCtrl.setRoot(HomePage);
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
