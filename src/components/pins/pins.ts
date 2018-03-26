import { ViewChild, Component } from '@angular/core';
import { NavController, Slides } from 'ionic-angular';

import { PostPage } from '../../pages/post/post';

import { FirebaseProvider } from '../../providers/firebase/firebase';

import { Observable } from 'rxjs';
import moment from 'moment';

@Component({
  selector: 'pins',
  templateUrl: 'pins.html'
})
export class PinsComponent {
  @ViewChild(Slides) slides: Slides;
  startDate: number;
  endDate: number;
  dayNumber: number;
  pins: any;
  pinsLoaded = false;

  constructor(
    private navCtrl: NavController,
    private firebase: FirebaseProvider
  ) {
  }
}
/* 
  ngAfterViewInit() {
    this.timestamp();
    this.loadPins().subscribe((pins) => {
      this.setPins(pins).subscribe(() => {
        setTimeout(() => {
          this.pinsLoaded = true;
          this.slides.slideTo(this.dayNumber);
        }, 500);
      })
    });
  }

  timestamp() {
    this.endDate = parseInt(moment().format('YYYYMMDD'));
    this.dayNumber = moment(this.endDate, 'YYYYMMDD').isoWeekday();
  }

  refreshPage(refresh) {
    this.navCtrl.setRoot(this.navCtrl.getActive().component);
  }

  loadPins() {
    return Observable.create((observer) => {
      this.startDate = this.endDate - this.dayNumber;
      let weeklyPins = this.firebase.afs.collection('pins', ref => ref.orderBy('affirmationDate').startAt(this.startDate).endAt(this.endDate));
      return weeklyPins.valueChanges().subscribe((pins) => {
        observer.next(pins);
      });
    });
  }

  setPins(pins) {
    return Observable.create((observer) => {
      this.pins = [];
      pins.forEach((pin) => {
        this.pins.push(pin);
      });
      observer.next();
    });
  }

  viewPin(id) {
    this.navCtrl.push(PostPage, { 
      id: id,
      type: "pin"
     });
  }
} */