import { Component, Input } from '@angular/core';

import { NavController } from 'ionic-angular';

import { ProfilePage } from '../../pages/profile/profile';

@Component({
  selector: 'post-header',
  templateUrl: 'post-header.html'
})
export class PostHeaderComponent {
  @Input('postDoc') post;

  constructor(
    private navCtrl: NavController
  ) { }

  viewUser(uid) {
    this.navCtrl.push(ProfilePage, { uid: uid});
  }
}

