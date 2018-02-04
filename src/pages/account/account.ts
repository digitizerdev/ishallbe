import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs/Observable';

import { LoginPage } from '../login/login';
import { HomePage } from '../home/home';
import { AccountEmailPage } from '../account-email/account-email';
import { AccountPasswordPage } from '../account-password/account-password';;
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
  name: any;
  email: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public firebase: FirebaseProvider,
  ) {
  }

  ionViewDidLoad() {
    this.loadUser();
  }

  loadUser() {
   this.user = this.firebase.loadUser()
   this.user.valueChanges().subscribe((user) => {
     this.name = user.name;
     this.email = user.email;
   })
  }

  pushAccountEmailPage() {
    this.navCtrl.push(AccountEmailPage);
  }

  pushAccountPasswordPage() {
    this.navCtrl.push(AccountPasswordPage);
  }

  setRootProfilePage() {
    this.navCtrl.setRoot(ProfilePage);
  }

  logout() {
    this.firebase.logOut();
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
