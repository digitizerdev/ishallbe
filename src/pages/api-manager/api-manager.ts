import { Component } from '@angular/core';

import { IonicPage } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';

import { HomePage } from '../home/home';

import { FirebaseProvider } from '../../providers/firebase/firebase';

@IonicPage()
@Component({
  selector: 'page-api-manager',
  templateUrl: 'api-manager.html',
})
export class ApiManagerPage {

  user: any;
  deployChannel = "";
  isBeta = false;
  editor = false;

  constructor(
    private firebase: FirebaseProvider,
    public iab: InAppBrowser
  ) {
  }

  ionViewDidLoad() {
    this.user = this.firebase.user;
  }

  openLink() {
    this.iab.create('https://tdct.io', '_system');
  }

  setRootHomePage() {
    this.navCtrl.setRoot(HomePage):
  }

}
