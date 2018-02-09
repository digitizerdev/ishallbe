import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Pro } from '@ionic/pro';
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
    this.checkChannel();
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

 async checkChannel() {
   console.log("Checking for channel");
    try {
      const res = await Pro.deploy.info();
      this.deployChannel = res.channel;
      this.isStaging = (this.deployChannel === 'Staging');
    } catch (err) {
      console.error(err);
    }
  }

  async toggleStaging() {
    const config = {
      channel: (this.isStaging ? 'Staging' : 'Master')
    }
      console.log("Channel is " + config.channel);
    try {
      await Pro.deploy.init(config);
      await this.checkChannel();
      await this.performAutomaticUpdate();
    } catch (err) {
      console.error(err);
    }

  }

  async performAutomaticUpdate() {
    console.log("Performing automatic update");
    try {
      const resp = await Pro.deploy.checkAndApply(true, function(progress){
          this.downloadProgress = progress;
      });
      if (resp.update){
        console.log("UPDATE AVAILABLE");
      }else{
        console.log("NO UPDATE AVAILABLE");
      }
    } catch (err) {
      console.error(err);
    }
  }

  async performManualUpdate() {
    try {
      const haveUpdate = await Pro.deploy.check();
      if (haveUpdate){
        this.downloadProgress = 0;
        await Pro.deploy.download((progress) => {
          this.downloadProgress = progress;
        })
        await Pro.deploy.extract();
        await Pro.deploy.redirect();
      }
    } catch (err) {
    }
  }

}
