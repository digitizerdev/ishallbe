import { ViewChild, Component, Input, Output, EventEmitter } from '@angular/core';
import { NavController, Slides } from 'ionic-angular';

import { mockPosts } from '../../../test-data/posts/mocks';

@Component({
  selector: 'pins',
  templateUrl: 'pins.html'
})
export class PinsComponent {

  @ViewChild(Slides) slides: Slides;
  @Input('pinsStartDate') inputDate;
  rawDate: number;
  pins: any[];

  constructor(
    private navCtrl: NavController
  ) {
    this.rawDate = this.inputDate;
  }

  ngAfterViewInit() {
    this.setPins();
    setTimeout(() => {
      this.slides.slideTo(5);
    }, 500);
  }

  refreshPage(refresh) {
    this.navCtrl.setRoot(this.navCtrl.getActive().component);
  }


  setPins() {
    this.pins = [];
    mockPosts.forEach((post) => {
      if (post.pin) {
        this.pins.push(post);
      }
    });
  }
}
