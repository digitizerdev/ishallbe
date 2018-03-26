import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

import moment from 'moment';
import { Observable } from 'rxjs';

import { FirebaseProvider } from '../../providers/firebase/firebase';

@IonicPage()
@Component({
  selector: 'page-post',
  templateUrl: 'post.html',
})
export class PostPage {
  id: string;
  postType: string;
  postPath: string;
  postDoc: any;
  post: any;
  mine = false;
  deleted = false;

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private alertCtrl: AlertController,
    private firebase: FirebaseProvider
  ) {
  }

  ionViewDidLoad() {
    console.log("Loaded Post Page");
    this.id = this.navParams.get("id");
    console.log("Post Id is " + this.id);
    this.postType = this.navParams.get("type");
    console.log("Post type is " + this.postType);
    this.loadPost();
  }

  loadPost() {
    console.log("Loading Post");
    this.postPath = this.postType + 's/' + this.id;
    console.log("Post path is " + this.postPath);
    this.postDoc = this.firebase.afs.doc(this.postPath);
    this.postDoc.valueChanges().subscribe((post) => {
      console.log("Got Post on Post Page");
      console.log(post);
      if (!this.deleted) {
        let date = moment.unix(post.timestamp);
        post.displayTimestamp = moment(date).fromNow();
          if (post.uid == this.firebase.uid) this.mine = true;
          this.post = post;
      }
    });
  }

  removePost() {
    console.log("Removing Post");
    this.confirmPostRemoval().subscribe((confirmed) => {
      if (confirmed) this.deletePost();
    });
  }

  confirmPostRemoval() {
    console.log("Confirming Post Removal")
    return Observable.create((observer) => {
      let alert = this.alertCtrl.create({
        title: 'Hold It!',
        message: 'Are you sure you want to delete this post?',
        buttons: [
          {
            text: 'NO',
            role: 'cancel',
            handler: () => {
              observer.next(false);
            }
          },
          {
            text: 'YES',
            handler: () => {
              observer.next(true);
            }
          }
        ]
      });
      alert.present();
    });
  }

  deletePost() {
    console.log("Deleting Post");
    console.log("Post path is " + this.postPath);
    this.deleted = true;
    this.firebase.afs.doc(this.postPath).delete().then(() => {
      this.navCtrl.pop();
    });
  }
}