import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';

import { Observable } from 'rxjs/Observable';

import { EditProfilePage } from '../edit-profile/edit-profile';

import { FirebaseProvider } from '../../providers/firebase/firebase';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  user: any;
  mine = false;
  loaded = false;

  constructor(
    private navCtrl: NavController, 
    private navParams: NavParams,
    private firebase: FirebaseProvider
  ) {
  }

  ionViewDidLoad() {
    this.loadUser().subscribe(() => {
    });
  }

  loadUser() {
    return Observable.create((observer) => {
      let user = this.firebase.loadUser();
      return user.valueChanges().subscribe((user) => {
        this.user = user;
        if (this.user.uid == this.firebase.afa.auth.currentUser.uid) this.mine = true;
        this.loaded = true;
        observer.next();
      })
    });
  }

  pushEditProfilePage() {
    this.navCtrl.push(EditProfilePage);
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

}
