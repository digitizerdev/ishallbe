import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { HomePage } from '../../pages/home/home';

@Component({
  selector: 'toolbar-logo',
  templateUrl: 'toolbar-logo.html'
})
export class ToolbarLogoComponent {

  constructor(
    private navCtrl: NavController
  ) {}

  setRootHomePage() {
    this.navCtrl.setRoot(HomePage);
  }

}
