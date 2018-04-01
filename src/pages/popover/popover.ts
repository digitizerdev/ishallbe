import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController } from 'ionic-angular';

import { FirebaseProvider } from '../../providers/firebase/firebase';

@IonicPage()
@Component({
  selector: 'page-popover',
  templateUrl: 'popover.html',
})
export class PopoverPage {

  post: any;
  mine = false;

  constructor(
    private navParams: NavParams,
    private viewCtrl: ViewController,
    private firebase: FirebaseProvider
  ) {
  }

  ionViewDidLoad() {
    this.post = this.navParams.data;
    console.log("Popover loaded");
    console.log(this.post);
    if (this.post.uid == this.firebase.user.uid) this.mine = true;
  }

  close() {
    this.viewCtrl.dismiss();
  }
}
