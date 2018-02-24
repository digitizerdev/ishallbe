import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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
    private firebase: FirebaseProvider
  ) {
  }

  ionViewDidLoad() {
    this.uid = this.navParams.get('uid');
    if (!this.uid) {
      this.user = this.firebase.user;
      console.log(this.user);
      this.mine = true;
      this.loaded = true;
    } else {
      this.loadUser();
    }
  }

  loadUser() {
    let path = "users/" + this.uid;
    this.user = this.firebase.afs.doc(path);
    this.user.valueChanges().subscribe((user) => {
      this.user = user;
      this.loaded = true;
    });
  }

  openSocial(socialNetwork) {
    if (socialNetwork == 'instagram') {
      let instagramLink = 'https://instagram.com/' + this.user.social.instagram;
      open(instagramLink);
    }
    if (socialNetwork == 'twitter') {
      let twitterLink = 'https://twitter.com/' + this.user.social.twitter;
      open(twitterLink);
    }
    if (socialNetwork == 'linkedin') {
      let linkedinLink = 'https://linkedin.com/in/' + this.user.social.linkedin;
      open(linkedinLink);
    }
  }

  segmentChanged() {
    console.log("Segment Changed");
    console.log(this.postType);
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
