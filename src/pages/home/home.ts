import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, Platform, Events } from 'ionic-angular';
import { Push, PushObject, PushOptions } from '@ionic-native/push';
import { Storage } from '@ionic/storage';
import { Moment, lang } from 'moment';
import { Observable } from 'rxjs/Observable';
import moment from 'moment';

import { ProfilePage } from '../profile/profile';
import { PostPage } from '../post/post';
import { LoginPage } from '../login/login';

import { FirebaseProvider } from '../../providers/firebase/firebase';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  pins: any[] = [];
  posts: any[] = [];
  uid: any;
  refreshing: any;
  feedTimestamp: any;
  sunday: any;
  pinsQuery: any;
  postsQuery: any;
  loader: any;
  pinsLoaded: any;
  postLimit: any;
  postsLoaded: any;

  constructor(
    private platform: Platform,
    private navCtrl: NavController,
    private navParams: NavParams,
    private firebase: FirebaseProvider,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private events: Events,
    private storage: Storage,
    private push: Push
  ) {
  }

  ionViewDidLoad() {
  }

  setRootProfilePage() {
    this.navCtrl.setRoot(ProfilePage);
  }
}