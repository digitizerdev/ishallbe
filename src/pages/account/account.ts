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

  public deployChannel = "";
  public isBeta = false;
  public downloadProgress = 0;
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
    console.log("Loaded Account Page")
    this.user = this.firebase.user;
    if (this.user.roles.editor) {
      this.editor = true;
      if (this.platform.is('cordova')) {
        console.log("CORDOVA");
        this.checkChannel();
      } else console.log("NOT CORDOVA");
    }
  }

  async checkChannel() {
    try {
      const res = await Pro.deploy.info();
      this.deployChannel = res.channel;
      this.isBeta = (this.deployChannel === 'Beta')
    } catch (err) {
    }
  }


  toggleBeta() {
    console.log("Beta toggled");
    const config = {
      channel: (this.isBeta ? 'Beta' : 'Production')
    }
    console.log(config);
    Pro.deploy.init(config).then(() => {
      Pro.deploy.check().then((haveUpdate) => {
        Pro.deploy.download().then(() => {
          Pro.deploy.extract().then(() => {
            console.log("REDIRECTING");
            Pro.deploy.redirect();
          });
        })
      });
    })
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
