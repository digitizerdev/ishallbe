import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ComponentsModule } from '../../components/components.module';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
  ) {
    this.syncHome();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }

  syncHome() {
  }

}
