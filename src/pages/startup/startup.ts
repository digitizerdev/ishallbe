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
    this.listenToContributorPermissionEvents();
  }

  listenToContributorPermissionEvents() {
    console.log("Listening to Contributor Permission Events");
    this.events.subscribe('contributor permission granted', () => {
      console.log("Setting Root to HomePage");
      this.navCtrl.setRoot(HomePage);
    });
    this.events.subscribe('contributor permission not granted', () => {
      console.log("Setting Root to LoginPage");
      this.navCtrl.setRoot(LoginPage);
    });
  }
}