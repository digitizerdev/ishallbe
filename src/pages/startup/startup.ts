import { Component } from '@angular/core';

import { IonicPage, NavController, Events } from 'ionic-angular';

import { LoginPage } from '../../pages/login/login';
import { HomePage } from '../../pages/home/home';

import { FirebaseProvider } from '../../providers/firebase/firebase';

@IonicPage()
@Component({
  selector: 'page-startup',
  templateUrl: 'startup.html',
})
export class StartupPage {

  constructor(
    private navCtrl: NavController,
    private events: Events,
    private firebase: FirebaseProvider
  ) { }

  ionViewDidLoad() {
    console.log("Startup Page");
    if (this.firebase.session) this.navCtrl.setRoot(HomePage);
    else this.navCtrl.setRoot(LoginPage);
  }
}