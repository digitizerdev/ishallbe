import { Component } from '@angular/core';

import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { InAppBrowser } from '@ionic-native/in-app-browser';

import { HomePage } from '../home/home';
import { ProfileUpdatePage } from '../profile-update/profile-update';
import { AccountPage } from '../account/account';

import { FirebaseProvider } from '../../providers/firebase/firebase';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  uid: any;
  user: any;
  mine = false;
  loaded = false;
  postType = "goals";

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private inAppBrowser: InAppBrowser,
    private firebase: FirebaseProvider
  ) {
    this.uid = "mQ2XaUVS46fKKJDo0u8ldPQdmnB3"
  }

  ionViewDidLoad() {
      this.user = this.firebase.user;
      this.mine = true;
      this.loaded = true;
      this.loadUser();
  }

  loadUser() {
    let path = "users/" + this.uid;
    this.user = this.firebase.afs.doc(path);
    this.user.valueChanges().subscribe((user) => {
      this.user = user;
      this.loaded = true;
    });
  }

  openLink(link) {
    let hyperlink = "https://" + link;
    this.inAppBrowser.create(hyperlink, '_system');
  }

  refreshPage(refresh) {
    this.navCtrl.setRoot(this.navCtrl.getActive().component);
  }

  pushProfileUpdatePage() {
    this.navCtrl.push(ProfileUpdatePage);
  }

  pushAccountPage() {
    this.navCtrl.push(AccountPage);
  }

  setRootHomePage() {
    this.navCtrl.setRoot(HomePage);
  }

}
