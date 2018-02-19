import { ViewChild, Component, Input, Output, EventEmitter } from '@angular/core';
import { Slides } from 'ionic-angular';

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
  ) {
    this.rawDate = this.inputDate;
    this.pins = [];
  }

  ngAfterViewInit() {
    this.setPins();
    setTimeout(() => {
      this.slides.slideTo(5);
    }, 500);
  }

  setPins() {
    mockPosts.forEach((post) => {
      if (post.pin) {
        this.pins.push(post);
      }
    });
  }
}
