import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

import { LoginPage } from '../login/login';

@IonicPage()
@Component({
  selector: 'page-password-reset',
  templateUrl: 'password-reset.html',
})
export class PasswordResetPage {

  constructor(
    public navCtrl: NavController
  ) {
  }

  pushLoginPage() {
    this.navCtrl.push(LoginPage);
  }

}
