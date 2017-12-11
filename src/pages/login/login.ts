import { Component } from '@angular/core';
import { IonicPage, NavController} from 'ionic-angular';

import { HomePage } from '../home/home';
import { RegisterPage } from '../register/register';
import { PasswordResetPage } from '../password-reset/password-reset';

import { SessionProvider } from '../../providers/session/session';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})

export class LoginPage {

  constructor(
    public navCtrl: NavController,
    public session: SessionProvider
  ) { 
    this.wakeUp();
  }

  wakeUp() {
    console.log("Waking up")
    this.session.loggedIn().subscribe((user)=>{
      console.log("Got user");
      console.log(user);
      if (user) {
        this.sessionFound();
      } else {
        console.log("Didn't get user");
      }
    })
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
