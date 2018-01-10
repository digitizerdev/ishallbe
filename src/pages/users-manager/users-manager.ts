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
    this.loadBlockedUsers();
  }

  loadBlockedUsers() {
    let path = 'flagged/users';
    this.firebase.list(path).subscribe((users) => {
      console.log("Got blocked users");
      console.log(users);
      if (users.length > 0) {
        this.blockedUsers= users
        this.thereAreBlockedUsers = true;
      }
    });
  }

  unblockUser(user) {
    user.blocked = false;
    user.flaggedId = null;
    let path = 'users/' + user.uid
    this.firebase.object(path).update(user).then(() => {
      let path = 'flagged/users/' + user.flaggedID
      this.firebase.object(path).remove().then(() => {
        this.navCtrl.setRoot(AccountPage);
      });
    });
  }

  viewProfile(uid) {
    this.navCtrl.push(ProfilePage, { uid: uid })
  }

  getUsers(searchbar) {
    let search = searchbar.srcElement.value;
    this.firebase.queriedList('users', 'email', search).subscribe((users) => {
      if (users.length > 0) {
        this.users = []
        this.users = users;
      }
    });
  }



}
