import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

import { ProfilePage } from '../profile/profile';

import { FirebaseProvider } from '../../providers/firebase/firebase';

import moment from 'moment';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/take';
import { Storage } from '@ionic/storage/es2015/storage';

@IonicPage()
@Component({
  selector: 'page-pin',
  templateUrl: 'pin.html',
})
export class PinPage {

  commentForm: {
    comment?: string
  } = {};
  comments: any;
  likedPin: any;
  submitted: any;
  refreshing: any;
  loaded: any;
  loading: any;
  uid: any;
  profile: any;
  pinID: string;
  pin: any;
  pinComment: any;
  title: any;
  mine: any;
  video: any;

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