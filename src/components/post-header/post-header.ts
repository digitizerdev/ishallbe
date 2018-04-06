import { Component, Input } from '@angular/core';

import { NavController } from 'ionic-angular';

import { ProfilePage } from '../../pages/profile/profile';

import { FirebaseProvider } from '../../providers/firebase/firebase';

@Component({
  selector: 'post-header',
  templateUrl: 'post-header.html'
})
export class PostHeaderComponent {
  @Input('postDoc') post;

  constructor(
    private navCtrl: NavController,
    private firebase: FirebaseProvider
  ) { }

  viewUser(uid) {
    if (uid !== this.firebase.user.uid)
      this.navCtrl.push(ProfilePage, { uid: uid});
  }
}

