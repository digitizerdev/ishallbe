import { ViewChild, Component, Input, Output, EventEmitter } from '@angular/core';
import { Slides } from 'ionic-angular';

@Component({
  selector: 'pins',
  templateUrl: 'pins.html'
})
export class PinsComponent {

  @ViewChild(Slides) slides: Slides;
  @Input('pinsStartDate') inputDate;
  rawDate: number;

  constructor(
  ) {
    console.log('Hello PinsComponent Component');
  }

  ngAfterViewInit() {
    this.rawDate = this.inputDate;
    console.log("Got input date");
    console.log("Raw date is " + this.rawDate);
    setTimeout(() => {
      this.slides.slideTo(2);
    }, 500);
  }
}
