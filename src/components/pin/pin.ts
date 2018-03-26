import { Component, Input } from '@angular/core';

import { NavController } from 'ionic-angular';

import { PostPage } from '../../pages/post/post';

@Component({
  selector: 'pin',
  templateUrl: 'pin.html'
})
export class PinComponent {
  @Input('post') pin;

  constructor(
    private navCtrl: NavController
  ) { }

  ngAfterViewInit() {
    console.log("Pin initialized");
    console.log(this.pin);
  }

  viewPin() {
    this.navCtrl.push(PostPage, { 
      id: this.pin.id,
      type: "pin"
     });
  }

}
