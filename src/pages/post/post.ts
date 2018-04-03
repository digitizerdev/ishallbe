import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, PopoverController, Events } from 'ionic-angular';

import moment from 'moment';
import { Observable } from 'rxjs';

import { FirebaseProvider } from '../../providers/firebase/firebase';

import { mockComments } from '../../../test-data/comments/mocks';

@IonicPage()
@Component({
  selector: 'page-post',
  templateUrl: 'post.html',
})
export class PostPage {
  id: string;
  collection: string;
  postPath: string;
  postDoc: any;
  post: any;
  video: any;
  comments: any;
  postManagerMenu = false;
  mine = false;
  audio = false;
  reported = false;
  private = false;
  loaded = false;
  editor = false;
  deleting = false;

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private popoverCtrl: PopoverController,
    private alertCtrl: AlertController,
    private events: Events,
    private firebase: FirebaseProvider
  ) {
  }

  ionViewDidLoad() {
    console.log("Loaded Post Page");
    this.id = this.navParams.get("id");
    console.log("Post Id is " + this.id);
    this.collection = this.navParams.get("type");
    console.log("Post type is " + this.collection);
    this.loadPost();
    this.loadComments();
  }

  loadPost() {
    console.log("Loading Post");
    this.postPath = this.collection + '/' + this.id;
    console.log("Post path is " + this.postPath);
    this.postDoc = this.firebase.afs.doc(this.postPath);
    this.postDoc.valueChanges().subscribe((post) => {
      console.log("Got Post on Post Page");
      console.log(post);
      let date = moment.unix(post.timestamp);
      post.displayTimestamp = moment(date).fromNow();
      if (post.uid == this.firebase.afa.auth.currentUser.uid) this.mine = true;
      if (post.day == 'Monday') this.video = post.link;
      if (this.collection == 'goals' && post.url) this.audio = true;
      this.editor = this.firebase.user.editor;
      this.private = post.private;
      this.reported = post.reported;
      this.post = post;
      this.loaded = true;
    });
  }

  loadComments() {
    console.log("Loading Comments");
    console.log(mockComments);
    this.comments = [];
    mockComments.forEach((comment) => {
      console.log("Pushing Comment");
      console.log(comment);
      this.comments.push(comment);
    });
    console.log(this.comments);
  }
  
  togglePostManagerMenu() {
    this.postManagerMenu = !this.postManagerMenu;
  }

  toggleReported() {
    console.log("Reporting Post");
    let action = 'report';
    if (this.reported) action = 'unreport';
    this.confirm(action).subscribe((confirmed) => {
      if (confirmed) {
        this.reported = !this.reported;
        this.firebase.afs.doc(this.postPath).update({ reported: this.reported });
      }
    });
  }

  togglePrivacy() {
    console.log("Toggling Privacy");
    console.log("Post private: " + this.private);
    this.private = !this.private;
    this.firebase.afs.doc(this.postPath).update({ private: this.private }).then(() => {
      this.navCtrl.pop();
    });
  }

  deletePost() {
    console.log("Deleting Post");
    this.deleting = true;
    this.confirm('delete').subscribe((confirmed) => {
      if (confirmed) {
        this.firebase.afs.doc(this.postPath).delete().then(() => {
          this.navCtrl.pop();
        });
      }
    });
  }

  confirm(action) {
    console.log("Confirming");
    return Observable.create((observer: any) => {
      let message = "Are you sure you want to " + action + " this post?";
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