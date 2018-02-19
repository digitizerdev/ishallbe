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
  posts: any[];
  pins: any[];

  constructor(
  ) {
    this.posts = [];
    this.pins = [];
    console.log('Hello PinsComponent Component');
  }

  ngAfterViewInit() {
    this.rawDate = this.inputDate;
    console.log("Got input date");
    console.log("Raw date is " + this.rawDate);
    this.posts = mockPosts;
    console.log("Got posts");
    console.log(this.posts);
    this.setPins();
    setTimeout(() => {
      this.slides.slideTo(5);
    }, 500);
  }

  setPins() {
    console.log("Setting Pins");
    this.posts.forEach((post) => {
      if (post.pin) {
        console.log("Pushing Pin");
        console.log(post);
        this.pins.push(post);
      }
    });
    console.log("Finished setting pins");
    console.log(this.pins);
  }
}
