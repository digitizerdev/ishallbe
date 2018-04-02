import { Component } from '@angular/core';
import { IonicPage, NavParams, NavController, AlertController, ViewController, Events } from 'ionic-angular';

import { Observable } from 'rxjs';

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
  deleting = false;

  constructor(
    private navCtrl: NavController,
    private viewCtrl: ViewController,
    private alertCtrl: AlertController,
    private navParams: NavParams,
    private events: Events,
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

  reportPost() {
    console.log("Reporting Post");
    this.confirm(false).subscribe((confirmed) => {
      if (confirmed) {
        this.viewCtrl.dismiss();
        this.firebase.afs.doc(this.postPath).update({ reported: true });
      }
    });
  }

  togglePrivacy() {
    console.log("Toggling Privacy");
    console.log("Post private: " + this.private);
    if (!this.private) this.private = true;
    if (this.private) this.private = false;
    this.viewCtrl.dismiss();
    this.firebase.afs.doc(this.postPath).update({ private: this.private }).then(() => {
      this.navCtrl.setRoot(StartupPage)
    });
  }

  deletePost() {
    console.log("Deleting Post");
    this.deleting = true;
    this.confirm(this.deleting).subscribe((confirmed) => {
      if (confirmed) {
        this.viewCtrl.dismiss();
        this.events.publish('post deleted', this.post);
      }
    });
  }

  confirm(deleting) {
    console.log("Confirming");
    return Observable.create((observer: any) => {
      let message = "Are you sure you want to delete this post?"
      if (!deleting) message = "Are you sure you report this post?"
      let alert = this.alertCtrl.create({
        title: 'Hold It!',
        message: message,
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            handler: () => {
              observer.next(false);
            }
          },
          {
            text: 'Confirm',
            handler: () => {
              observer.next(true);
            }
          }
        ]
      });
      alert.present();
    });
  }
}