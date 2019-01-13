import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { HomePage } from '../../pages/home/home';

@Component({
  selector: 'brand-header',
  templateUrl: 'brand-header.html'
})
export class BrandHeaderComponent {

  constructor(
    private navCtrl: NavController
  ) {
  }

  setRootHomePage() {
    this.navCtrl.setRoot(HomePage);
  }

}
