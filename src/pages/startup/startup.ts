import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';

import { HomePage } from '../home/home';
import { LoginPage } from '../login/login';

import { FirebaseProvider } from '../../providers/firebase/firebase';

@IonicPage()
@Component({
  selector: 'page-startup',
  templateUrl: 'startup.html',
})
export class StartupPage {

  session = false;

  public deployChannel = "";
  public isStaging = false;
  public downloadProgress = 0;

  constructor
    (
    private navCtrl: NavController,
    private navParams: NavParams,
    private firebase: FirebaseProvider
    ) {
  }

  ionViewDidEnter() {
    console.log("Entered Startup Page")
    this.checkForUserSession();
  }

  checkForUserSession() {
    if (this.firebase.session) this.inSession();
     else {
      this.firebase.sessionExists().subscribe((session) => {
        if (session) this.inSession();
          else this.navCtrl.setRoot(LoginPage);
      });
    }
  }

  inSession() {
    this.session = true;
    this.navCtrl.setRoot(HomePage);
  }
}