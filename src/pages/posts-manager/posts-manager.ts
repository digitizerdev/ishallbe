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
  }
}