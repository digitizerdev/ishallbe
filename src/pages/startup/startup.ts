import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
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
  page: any;

  constructor
    (
    private navCtrl: NavController,
    private navParams: NavParams,
    private storage: Storage,
    private firebase: FirebaseProvider
    ) {
  }

  ionViewDidEnter() {
    this.loadView();
  }

  loadView() {
    this.requestSession().then((session) => {
      this.session = session;
      this.setView();
    });
  }

  requestSession() {
    return this.storage.ready().then(() => {
      return this.storage.get('session');
    });
  }

  setView() {
    if (this.session) {
      this.page = HomePage;
      this.navCtrl.setRoot(HomePage);
    } else {
      this.page = LoginPage
      this.navCtrl.setRoot(LoginPage);
    }
  }

}
