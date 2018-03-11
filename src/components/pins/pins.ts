import { ViewChild, Component, Input } from '@angular/core';
import { NavController, Slides } from 'ionic-angular';

import { mockPins } from '../../../test-data/pins/mocks';

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
    mockPins.forEach((pin) => {
        this.pins.push(pin);
    });
  }
}
