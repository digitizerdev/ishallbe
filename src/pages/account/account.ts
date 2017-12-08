import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { LoginPage } from '../login/login';
import { AccountEmailPage } from '../account-email/account-email';
import { AccountPasswordPage } from '../account-password/account-password';;
import { ProfilePage } from '../profile/profile';

import { SessionProvider } from '../../providers/session/session';

@IonicPage()
@Component({
  selector: 'page-account',
  templateUrl: 'account.html',
})
export class AccountPage {

  title = 'Account';

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public session: SessionProvider
  ) {
  }

  pushAccountEmailPage() {
    this.navCtrl.push(AccountEmailPage);
  }

  pushAccountPasswordPage() {
    this.navCtrl.push(AccountPasswordPage);
  }

  pushProfilePage () {
    this.navCtrl.push(ProfilePage);
  }

  logout() {
    this.session.end();
    this.setRootLoginPage();
  }

  setRootLoginPage() {
    this.navCtrl.setRoot(LoginPage);
  }

}
