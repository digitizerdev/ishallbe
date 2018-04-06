import { Component } from '@angular/core';

import { IonicPage, NavController } from 'ionic-angular';

import { ProfilePage } from '../../pages/profile/profile';

import { FirebaseProvider } from '../../providers/firebase/firebase';

@IonicPage()
@Component({
  selector: 'page-user-manager',
  templateUrl: 'user-manager.html',
})
export class UserManagerPage {

  usersBlocked = false;
  usersCol: any;
  users: any;
  
  constructor(
    private navCtrl: NavController,
    private firebase: FirebaseProvider
  ) {}

  ionViewDidEnter() {
    this.loadBlockedUsers();
  }

  loadBlockedUsers() {
    this.usersCol = this.firebase.afs.collection('users', ref => ref.
    where('blocked', '==', true));
    this.usersCol.valueChanges().subscribe((users) => {
      if (users.length > 0) {
        this.usersBlocked = true;
        this.users = users;
      }
    });
  }

  viewUser(user) {
    this.navCtrl.push(ProfilePage, { uid: user.uid});
  }
}
