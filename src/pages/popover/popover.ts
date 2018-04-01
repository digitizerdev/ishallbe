import { Component } from '@angular/core';
import { IonicPage, NavParams, NavController } from 'ionic-angular';

import { StartupPage } from '../startup/startup';

import { FirebaseProvider } from '../../providers/firebase/firebase';

@IonicPage()
@Component({
  selector: 'page-popover',
  templateUrl: 'popover.html',
})
export class PopoverPage {

  post: any;
  postPath: any;
  private = false;
  mine = false;

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private firebase: FirebaseProvider
  ) {
  }

  ionViewDidLoad() {
    this.post = this.navParams.data;
    console.log("Popover loaded");
    console.log(this.post);
    this.private = this.post.private;
    this.postPath = this.post.collection + "/" + this.post.id;
    console.log("Post path is " + this.postPath);
    if (this.post.uid == this.firebase.user.uid) this.mine = true;
  }

  togglePrivacy() {
    console.log("Toggling Privacy");
    console.log("Post private: " + this.private);
    if (!this.private) this.private = true;
    if (this.private) this.private = false;
    this.firebase.afs.doc(this.postPath).update({ private: this.private}).then(() => {
      this.navCtrl.pop();
    });
  }

  deletePost() {
    console.log("Deleting Post");
    this.firebase.afs.doc(this.postPath).delete().then(() => {
      this.navCtrl.pop();
    });
  }

  reportPost() {
    console.log("Reporting Post");
    let reportedPath = "reported/" + this.post.id;
    this.firebase.afs.doc(reportedPath).set(this.post).then(() => {
      this.firebase.afs.doc(this.postPath).delete().then(() => {
        this.navCtrl.pop();
      });
    });
  }
}
