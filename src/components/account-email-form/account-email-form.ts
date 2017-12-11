import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController } from 'ionic-angular';

import { AccountPage } from '../../pages/account/account';
import { FirebaseProvider } from '../../providers/firebase/firebase';
import { SessionProvider } from '../../providers/session/session';
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
  loader: any;
  profile: {
    email?: string,
    uid?: string,
    blocked?: boolean,
    name?: string,
    role?: string,
    photo?: string
  }

  constructor(
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public navCtrl: NavController,
    public firebase: FirebaseProvider,
    public session: SessionProvider
  ) {
    this.loadProfile();
  }

  loadProfile() {
    return this.requestUID().subscribe((uid) => {
      return this.requestProfile(uid).subscribe((profile) => {
        this.profile = profile;
      });
    });
  }

  requestUID() {
    return this.session.uid();
  }

  requestProfile(uid) {
    return this.firebase.profile(uid);
  }

  submit(form) {
    this.prepareRequest(form)
    this.makeRequests(form).then(() => {
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
    this.profile.email = form.email;
  }

  startLoader() {
    this.loader = this.loadingCtrl.create({
      content: 'Please Wait..'
    });
  }

  makeRequests(form) {
    return this.requestAccountEmailUpdate(form.email).then(() => {
      return this.requestProfileEmailUpdate(this.profile).then(() => {
      }, (error) => { throw error });
    }, (error) => { throw error });
  }

  requestAccountEmailUpdate(email) {
    return this.firebase.updateAccountEmail(email);
  }

  requestProfileEmailUpdate(profile) {
    let path = '/users/' + profile.uid;
    return this.firebase.setObject(path, profile);
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
      subTitle: 'Your email has been updated',
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
