import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, Platform } from 'ionic-angular';
import { Pro } from '@ionic/pro';

import { Observable } from 'rxjs/Observable';

import { LoginPage } from '../login/login';
import { HomePage } from '../home/home';
import { EmailUpdatePage } from '../email-update/email-update';
import { PasswordUpdatePage } from '../password-update/password-update';;
import { ProfilePage } from '../profile/profile';
import { SupportPage } from '../support/support';

import { FirebaseProvider } from '../../providers/firebase/firebase';

@IonicPage()
@Component({
  selector: 'page-account',
  templateUrl: 'account.html',
})
export class AccountPage {

  user: any;
  editor = false;

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private events: Events,
    private platform: Platform,
    private firebase: FirebaseProvider,
  ) {
  }

  ionViewDidLoad() {
    this.user = this.firebase.user;
    if (this.user.roles.editor) {
      this.editor = true;
      if (this.platform.is('cordova')) {
        this.initDeploy().then(() => {
          this.checkForBetaUpdate();
        });
      }
    }
  }

  initDeploy() {
    console.log("Initializing Deploy");
    const config = {
      'appId': '69d144ed',
      'channel': 'Beta'
    }
    return Pro.deploy.init(config);
  }

  checkForBetaUpdate() {
    return Observable.create((observer) => {
      console.log("Deploying auto update");
      Pro.deploy.check().then((haveUpdate) => {
        if (haveUpdate) {
          console.log("UPDATE AVAILABLE");
          /*           Pro.deploy.download().then(() => {
                      Pro.deploy.extract().then(() => {
                        console.log("REDIRECTING");
                        Pro.deploy.redirect();
                      });
                    }) */
        } else {
          console.log("NO UPDATE AVAILABLE");
          observer.next();
        }
      });
    });
  }

  pushEmailUpdatePage() {
    this.navCtrl.push(EmailUpdatePage);
  }

  pushPasswordUpdatePage() {
    this.navCtrl.push(PasswordUpdatePage);
  }

  setRootProfilePage() {
    this.navCtrl.setRoot(ProfilePage);
  }

  logout() {
    this.events.publish('logout');
    this.firebase.afa.auth.signOut();
    this.firebase.hasSeenTutorial = true;
    this.navCtrl.setRoot(LoginPage);
  }

  setRootLoginPage() {
    this.navCtrl.setRoot(LoginPage);
  }

  setRootHomePage() {
    this.navCtrl.setRoot(HomePage);
  }

  pushSupportPage() {
    this.navCtrl.push(SupportPage);
  }
}
