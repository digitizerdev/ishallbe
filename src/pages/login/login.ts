import { Component } from '@angular/core';
import { IonicPage, NavController} from 'ionic-angular';

import { HomePage } from '../home/home';
import { RegisterPage } from '../register/register';
import { PasswordResetPage } from '../password-reset/password-reset';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})

export class LoginPage {

  constructor(
    public navCtrl: NavController,
  ) { 
    this.wakeUp();
  }

  wakeUp() {
  }

  sessionFound() {
    this.navCtrl.setRoot(HomePage);
  }

  pushPasswordResetPage() {
    this.navCtrl.push(PasswordResetPage);
  }

  pushRegisterPage() {
    this.navCtrl.setRoot(RegisterPage);
  }

}
