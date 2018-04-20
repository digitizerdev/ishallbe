import { Component, Input } from '@angular/core';

import { NavController } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';

import { PostPage } from '../../pages/post/post';

@Component({
  selector: 'pin',
  templateUrl: 'pin.html'
})
export class PinComponent {
  @Input('post') pin;

  constructor(
    private navCtrl: NavController,
    private iab: InAppBrowser
  ) {}

  viewPin() {
    this.navCtrl.push(PostPage, { 
      id: this.pin.id,
      type: "pins"
     });
  }

  openLink() {
    this.iab.create(this.pin.link, '_system');
  }
}
