import { Component } from '@angular/core';

import { IonicPage, NavController, Platform } from 'ionic-angular';

import { HomePage } from '../../pages/home/home';
import { LoginPage } from '../../pages/login/login';

import { FirebaseProvider } from '../../providers/firebase/firebase';

@IonicPage()
@Component({
  selector: 'page-startup',
  templateUrl: 'startup.html',
})
export class StartupPage {

  constructor(
    private navCtrl: NavController,
    private platform: Platform,
    private firebase: FirebaseProvider
  ) { }

  ionViewDidLoad() {
    console.log("Loaded Startup Page");
    if (!this.platform.is('cordova')) {
      console.log("On Browser");
      if (this.firebase.session) this.navCtrl.setRoot(HomePage);
      else this.navCtrl.setRoot(LoginPage);
    } else {
      console.log("Cordova Platform");
    }
  }
}