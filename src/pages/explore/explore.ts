import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import moment from 'moment';

import { ProfilePage } from '../profile/profile';

import { mockStatements } from '../../../test-data/statements/mocks';

@IonicPage()
@Component({
  selector: 'page-explore',
  templateUrl: 'explore.html',
})
export class ExplorePage {

  rawDate: number;
  statements: any[];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.timestamp();
    this.setStatements();
  }

  timestamp() {
    let rawDateString = moment().format('YYYYMMDD');
    this.rawDate = parseInt(rawDateString);
  }

  setStatements() {
    this.statements = [];
    mockStatements.forEach((post) => {
        this.statements.push(post);
    });
  }

  refreshPage(refresh) {
    this.navCtrl.setRoot(this.navCtrl.getActive().component);
  }

  setRootProfilePage() {
    this.navCtrl.setRoot(ProfilePage);
  }
}
