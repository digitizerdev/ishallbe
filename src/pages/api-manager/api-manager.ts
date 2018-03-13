import { Component } from '@angular/core';

import { IonicPage, Platform, LoadingController } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { Pro } from '@ionic/pro';

import { FirebaseProvider } from '../../providers/firebase/firebase';

@IonicPage()
@Component({
  selector: 'page-api-manager',
  templateUrl: 'api-manager.html',
})
export class ApiManagerPage {

  user: any;
  deployChannel = "";
  isBeta = false;
  editor = false;

  constructor(
    private platform: Platform,
    private loadingCtrl: LoadingController,
    private firebase: FirebaseProvider,
    public iab: InAppBrowser
  ) {
  }

  ionViewDidLoad() {
    this.user = this.firebase.user;
    if (this.user.roles.editor) {
      this.editor = true;
      if (this.platform.is('cordova')) { this.checkChannel(); } 
    }
  }

  async checkChannel() {
    try {
      const res = await Pro.deploy.info();
      this.deployChannel = res.channel;
      this.isBeta = (this.deployChannel === 'Beta')
    } catch (err) { Pro.monitoring.exception(err)};
  }

  async toggleBeta() {
    const config = { channel: (this.isBeta ? 'Beta' : 'Production')}
    try {
      await Pro.deploy.init(config);
      await this.checkChannel();
      await this.deployUpdate();
    } catch (err) { Pro.monitoring.exception(err)};
  }

  async deployUpdate() {
    try {
      const resp = await Pro.deploy.checkAndApply(true, function(progress){ this.downloadProgress = progress; });
      if (resp.update) {
        let loading = this.loadingCtrl.create({
          content: "Deploying Update..."
        });
        loading.present();
      }
    } catch (err) { Pro.monitoring.exception(err)};
  }

  openLink() {
    this.iab.create('https://tdct.io', '_system');
  }

}
