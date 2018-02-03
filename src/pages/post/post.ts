import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

import { ProfilePage } from '../profile/profile';
import { HomePage } from '../home/home';

import { FirebaseProvider } from '../../providers/firebase/firebase';

import moment from 'moment';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/take';
import { Storage } from '@ionic/storage/es2015/storage';

@IonicPage()
@Component({
  selector: 'page-post',
  templateUrl: 'post.html',
})
export class PostPage {

  commentForm: {
    comment?: string
  } = {};
  comments: any;
  likedPost: any;
  submitted: any;
  refreshing: any;
  loaded: any;
  loading: any;
  uid: any;
  profile: any;
  postID: string;
  post: any;
  postComment: any;
  mine: any;
  flagged = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public storage: Storage,
    public firebase: FirebaseProvider
  ) {
  }

  ionViewDidEnter() {
  }
}