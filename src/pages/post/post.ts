import { Component } from '@angular/core';
import { IonicPage, NavParams } from 'ionic-angular';

import { FirebaseProvider } from '../../providers/firebase/firebase';

@IonicPage()
@Component({
  selector: 'page-post',
  templateUrl: 'post.html',
})
export class PostPage {
  id: string;
  postType: string;
  postDoc: any;
  post: any;
  mine = false;

  constructor(
    private navParams: NavParams,
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
    let postPath = this.postType + 's/' + this.id;
    console.log("Post path is " + postPath);
    this.postDoc = this.firebase.afs.doc(postPath);
    this.postDoc.valueChanges().subscribe((post) => {
      console.log("Got Post");
      console.log(post);
      if (post.uid == this.firebase.uid) this.mine = true;
      this.post = post;
    });
  }

}