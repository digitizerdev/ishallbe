import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { PostPage } from '../post/post';
import { ProfilePage } from '../profile/profile';
import { AccountPage } from '../account/account';

import { FirebaseProvider } from '../../providers/firebase/firebase';

@IonicPage()
@Component({
  selector: 'page-posts-manager',
  templateUrl: 'posts-manager.html',
})
export class PostsManagerPage {

  title = 'Posts Manager';
  flaggedPosts: any;
  thereAreFlaggedPosts = false;
  posts: any;
  queryParams: any;

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private firebase: FirebaseProvider
  ) {
  }

  ionViewDidLoad() {
    this.loadFlaggedPosts();
  }

  loadFlaggedPosts() {
    let path = 'flagged/posts';
    this.firebase.list(path).subscribe((flaggedPosts) => {
      if (flaggedPosts.length > 0) {
        this.flaggedPosts = flaggedPosts;
        this.thereAreFlaggedPosts = true;
      }
    })
  }

  restorePost(post) {
    post.onFeed = true;
    post.flagged = false;
    post.flaggedId = null;
    let path = 'posts/' + post.id
    this.firebase.object(path).update(post).then(() => {
      let path = 'flagged/posts/' + post.flaggedID
      this.firebase.object(path).remove().then(() => {
        this.navCtrl.setRoot(AccountPage);
      });
    });
  }

  getPosts(searchbar) {
    let search = searchbar.srcElement.value;
    this.firebase.queriedList('posts', 'title', search).subscribe((posts) => {
      if (posts.length > 0) {
        this.posts = []
        this.posts = posts;
      }
    });
  }

  viewPost(postID) {
    this.navCtrl.push(PostPage, { id: postID })
  }

  viewProfile(uid) {
    this.navCtrl.push(ProfilePage, { uid: uid })
  }

}
