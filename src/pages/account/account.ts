import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, Platform, LoadingController } from 'ionic-angular';
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

  deployChannel = "";
  isBeta = false;
  downloadProgress = 0;
  user: any;
  editor = false;
  loader: any;

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private events: Events,
    private platform: Platform,
    private loadingCtrl: LoadingController,
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

  async toggleBeta() {
    const config = { channel: (this.isBeta ? 'Beta' : 'Production')}
    try {
      await Pro.deploy.init(config);
      await this.checkChannel();
      await this.deployUpdate();
    } catch (err) { console.log(err)};
  }

  async deployUpdate() {
    try {
      const resp = await Pro.deploy.checkAndApply(true, function(progress){ this.downloadProgress = progress; });
      if (resp.update) {
        console.log("UPDATE AVAILABLE");
        this.startLoading();
      } else {
        console.log("NO UPDATE AVAILABLE"):
      }
    } catch (err) { console.log(err)}''
  }

  startLoading() {
    console.log("Started Loading")
    this.loader =  this.loadingCtrl.create({
      spinner: 'dots',
      content: 'Deploying Update...'
    });
    this.loader.present();
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
