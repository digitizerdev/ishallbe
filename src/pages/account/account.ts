import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { LoginPage } from '../login/login';

import { SessionProvider } from '../../providers/session/session';

@IonicPage()
@Component({
  selector: 'page-account',
  templateUrl: 'account.html',
})
export class AccountPage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public session: SessionProvider
  ) {
  }

  logout() {
    this.session.end();
    this.setRootLoginPage();
  }

  setRootLoginPage() {
    this.navCtrl.setRoot(LoginPage);
  }

}
