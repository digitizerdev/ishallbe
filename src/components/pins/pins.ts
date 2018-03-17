import { ViewChild, Component, Input } from '@angular/core';
import { NavController, Slides } from 'ionic-angular';

import { FirebaseProvider } from '../../providers/firebase/firebase';

import { Observable } from 'rxjs';
import moment from 'moment';

@Component({
  selector: 'pins',
  templateUrl: 'pins.html'
})
export class PinsComponent {

  @ViewChild(Slides) slides: Slides;
  @Input('pinsStartDate') inputDate;
  startDate: number;
  endDate: number;
  dayNumber: number;
  pins: any;
  pinsLoaded = false;

  constructor(
    private navCtrl: NavController,
    private firebase: FirebaseProvider
  ) {
    console.log("Loaded Pins Component");
  }

  ngAfterViewInit() {
    console.log("View Initialized");
    this.timestamp();
    this.loadPins().subscribe((pins) => {
      console.log("Got Pins");
      console.log(pins);
      this.setPins(pins).subscribe(() => {
        console.log("Pins set");
        console.log(this.pins);
        setTimeout(() => {
          this.pinsLoaded = true;
          this.slides.slideTo(this.dayNumber);
        }, 500);
      })
    });
  }

  timestamp() {
    console.log("Date is " + this.inputDate);
    this.endDate = parseInt((moment.unix(this.inputDate).format('YYYYMMDD')));
    this.dayNumber = moment(this.inputDate).isoWeekday();
    console.log("Day Number is " + this.dayNumber);
  }

  refreshPage(refresh) {
    console.log("Refreshing Page");
    this.navCtrl.setRoot(this.navCtrl.getActive().component);
  }

  loadPins() {
    console.log("Loading Pins");
    return Observable.create((observer) => {
      this.startDate = this.endDate - this.dayNumber;
      console.log("Input Date is " + this.startDate);
      console.log("End Date is " + this.endDate);
      let weeklyPins = this.firebase.afs.collection('pins', ref => ref.orderBy('affirmationDate').endAt(this.endDate));
      return weeklyPins.valueChanges().subscribe((pins) => {
        observer.next(pins);
      });
    });
  }

  setPins(pins) {
    console.log("Setting Pins");
    return Observable.create((observer) => {
      this.pins = [];
      pins.forEach((pin) => {
        this.pins.push(pin);
      });
      observer.next();
    });
  }
}