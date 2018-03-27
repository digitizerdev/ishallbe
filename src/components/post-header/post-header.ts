import { Component, Input } from '@angular/core';

import { NavController } from 'ionic-angular';

import { ProfilePage } from '../../pages/profile/profile';

@Component({
  selector: 'post-header',
  templateUrl: 'post-header.html'
})
export class PostHeaderComponent {
  @Input('postDoc') postDoc;
  post: any;
  loaded: any;

  constructor(
    private navCtrl: NavController
  ) {
  }

  viewUser(uid) {
    this.navCtrl.push(ProfilePage, { uid: uid});
  }

  ngOnChanges() {
    if (!this.loaded) {
      this.loaded = true;
      this.post = this.postDoc;
    }
  }
}

