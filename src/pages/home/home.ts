import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, ModalController, Platform, Events } from 'ionic-angular';
import { Push, PushObject, PushOptions } from '@ionic-native/push';
import { Moment, lang } from 'moment';
import { Observable } from 'rxjs/Observable';
import moment from 'moment';

import { NotificationsPage } from '../../pages/notifications/notifications';

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
    private modalCtrl: ModalController,
    private events: Events,
    private push: Push
  ) {
  }

  ionViewDidLoad() {
  }

  showNotifications() {
    this.navCtrl.push(NotificationsPage);
  }
}