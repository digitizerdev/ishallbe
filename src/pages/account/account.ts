import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs/Rx';

import { LoginPage } from '../login/login';
import { HomePage } from '../home/home';
import { AccountEmailPage } from '../account-email/account-email';
import { AccountPasswordPage } from '../account-password/account-password';;
import { ProfilePage } from '../profile/profile';

import { FirebaseProvider } from '../../providers/firebase/firebase';

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
    public storage: Storage
  ) {
    this.loadProfile();
  }

  loadProfile() {
    this.requestUID().then((uid) => {
      this.uid = uid;
      this.requestProfile().subscribe((profile) => {
        this.name = profile.name;
        this.email = profile.email;
      });
    });
  }

  requestUID() {
    return this.storage.ready().then(() => {
      return this.storage.get(('uid'));      
    });
  }

  requestProfile() {
    let path = '/users/' + this.uid;
    return this.firebase.object(path)
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
    this.storage.clear();
    this.setRootLoginPage();
  }

  setRootLoginPage() {
    this.navCtrl.setRoot(LoginPage);
  }

  setRootHomePage() {
    this.navCtrl.setRoot(HomePage);
  }

}
