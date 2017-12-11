import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Rx';

import { LoginPage } from '../login/login';
import { HomePage } from '../home/home';

import { AccountEmailPage } from '../account-email/account-email';
import { AccountPasswordPage } from '../account-password/account-password';;
import { ProfilePage } from '../profile/profile';

import { FirebaseProvider } from '../../providers/firebase/firebase';
import { SessionProvider } from '../../providers/session/session';

@IonicPage()
@Component({
  selector: 'page-account',
  templateUrl: 'account.html',
})
export class AccountPage {

  title = 'Account';
  uid: any;
  role: any;
  name: any;
  email: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public firebase: FirebaseProvider,
    public session: SessionProvider
  ) {
    this.requestUID();
    this.requestRole();
  }

  requestRole() {
    this.session.role().subscribe((role)=>{
      this.role = role;
    })
  }

  requestUID() {
    this.session.uid().subscribe((uid)=>{
      this.uid = uid;
      this.loadProfile(uid);
    })
  }

  loadProfile(uid) {
    this.requestProfile(uid).subscribe((profile) => {
      this.name = profile.name;
      this.email = profile.email;
    })
  }

  requestProfile(uid) {
    let path = '/users/' + uid;
    return this.firebase.object(path)
  }

  pushAccountEmailPage() {
    this.navCtrl.push(AccountEmailPage);
  }

  pushAccountPasswordPage() {
    this.navCtrl.push(AccountPasswordPage);
  }

  pushProfilePage() {
    this.navCtrl.push(ProfilePage);
  }

  logout() {
    this.session.end();
    this.setRootLoginPage();
  }

  setRootLoginPage() {
    this.navCtrl.setRoot(LoginPage);
  }

  setRootHomePage() {
    this.navCtrl.setRoot(HomePage);
  }

}
