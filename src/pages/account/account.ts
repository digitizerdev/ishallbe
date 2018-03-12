import { Component } from '@angular/core';
import { IonicPage, Events, NavController } from 'ionic-angular';

import { LoginPage } from '../login/login';
import { HomePage } from '../home/home';
import { EmailUpdatePage } from '../email-update/email-update';
import { PasswordUpdatePage } from '../password-update/password-update';;
import { ProfilePage } from '../profile/profile';
import { SupportPage } from '../support/support';

import { FirebaseProvider } from '../../providers/firebase/firebase';

@IonicPage()
@Component({
  selector: 'page-account',
  templateUrl: 'account.html',
})
export class AccountPage {

  user: any;
  editor = false;

  constructor(
    private navCtrl: NavController,
    private events: Events,
    private firebase: FirebaseProvider,
  ) {
  }

  ionViewDidLoad() {
    this.user = this.firebase.user;
  }

  pushEmailUpdatePage() {
    this.navCtrl.push(EmailUpdatePage);
  }

  pushPasswordUpdatePage() {
    this.navCtrl.push(PasswordUpdatePage);
  }

  setRootProfilePage() {
    this.navCtrl.setRoot(ProfilePage);
  }

  logout() {
    this.events.publish('logout');
    this.firebase.afa.auth.signOut();
    this.firebase.hasSeenTutorial = true;
    this.navCtrl.setRoot(LoginPage);
  }

  setRootLoginPage() {
    this.navCtrl.setRoot(LoginPage);
  }

  setRootHomePage() {
    this.navCtrl.setRoot(HomePage);
  }

  pushSupportPage() {
    this.navCtrl.push(SupportPage);
  }
}
