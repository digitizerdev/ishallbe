import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { PortfolioPage } from '../portfolio/portfolio';
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

  goToPortfolioPage() {
    this.navCtrl.push(PortfolioPage);
  }

  goToRegisterPage() {
    this.navCtrl.push(RegisterPage);
  }

  goToTeamPage() {
    this.navCtrl.push(TeamPage);
  }

}
