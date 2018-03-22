import { Component } from '@angular/core';

import { IonicPage, NavController } from 'ionic-angular';

import { LoginPage } from '../login/login';
import { HomePage } from '../home/home';

import { FirebaseProvider } from '../../providers/firebase/firebase';

@IonicPage()
@Component({
  selector: 'page-startup',
  templateUrl: 'startup.html',
})
export class StartupPage {

  loaded = false;

  constructor(
    private navCtrl: NavController, 
    private firebase: FirebaseProvider
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StartupPage');
    this.checkForSession();
  }

  checkForSession() {
    console.log("Checking For Session");
    if (this.firebase.session) this.navCtrl.setRoot(HomePage);
    else {
      this.firebase.sessionExists().subscribe((session) => {
        if (!this.loaded) {
          this.loaded = true;
          if (session) {
            console.log("Session Found");
            console.log("User ID is " + this.firebase.uid);
            this.navCtrl.setRoot(HomePage);
          } else {
            console.log("No Session Found");
            this.navCtrl.setRoot(LoginPage);
          }
        }
      });
    }
  }
}