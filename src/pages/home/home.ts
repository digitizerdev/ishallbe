import { Component } from '@angular/core';
import { NavController, LoadingController, Platform, AlertController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  constructor(
    public navCtrl: NavController, 
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public platform: Platform,
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  } 

}
