import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { CollabsPage } from '../collabs/collabs';
import { RegisterPage } from '../register/register';
import { TeamPage } from '../team/team';

@IonicPage()
@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
})
export class AboutPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AboutPage');
  }

  goToCollabsPage() {
    this.navCtrl.push(CollabsPage);
  }

  goToTeamPage() {
    this.navCtrl.push(TeamPage);
  }

}
