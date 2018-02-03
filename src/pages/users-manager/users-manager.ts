import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ProfilePage } from '../profile/profile';
import { AccountPage } from '../account/account';

import { FirebaseProvider } from '../../providers/firebase/firebase';

@IonicPage()
@Component({
  selector: 'page-users-manager',
  templateUrl: 'users-manager.html',
})
export class UsersManagerPage {

  title = 'Users Manager'
  thereAreBlockedUsers = false;
  users: any;
  blockedUsers: any;

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private firebase: FirebaseProvider
  ) {
  }

  ionViewDidLoad() {
  }
}