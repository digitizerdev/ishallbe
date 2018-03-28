import { Component } from '@angular/core';

import { IonicPage, NavController } from 'ionic-angular';

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
    private firebase: FirebaseProvider
  ) { }

  ionViewDidLoad() {
    console.log("Startup Page");
    console.log("Session: " + this.firebase.session);
    if (this.firebase.session)
      this.navCtrl.setRoot(HomePage);
    else
      this.navCtrl.setRoot(LoginPage);
  }
}