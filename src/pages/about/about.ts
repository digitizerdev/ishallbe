import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';

@IonicPage()
@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
})
export class AboutPage {

  constructor(
    private navCtrl: NavController, 
    private navParams: NavParams,
    public iab: InAppBrowser
  ) {
  }

  openLink(){
    this.iab.create('https://iShallBe.co', '_system');
  }
  
}
