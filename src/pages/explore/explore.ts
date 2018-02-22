import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import moment from 'moment';

import { ProfilePage } from '../profile/profile';

import { mockPosts } from '../../../test-data/posts/mocks';

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
    console.log('ionViewDidLoad ExplorePage');
    this.timestamp();
    this.setStatements();
  }

  timestamp() {
    let rawDateString = moment().format('YYYYMMDD');
    this.rawDate = parseInt(rawDateString);
    console.log("Raw date is " + this.rawDate);
  }

  setStatements() {
    this.statements = [];
    mockPosts.forEach((post) => {
      if (post.statement) {
        console.log("Pushing statement");
        this.statements.push(post);
      }
    });
    console.log("Finished pushing statements");
    console.log(this.statements);
  }

  refreshPage(refresh) {
    this.navCtrl.setRoot(this.navCtrl.getActive().component);
  }
}
