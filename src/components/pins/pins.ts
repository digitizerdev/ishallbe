import { ViewChild, Component, Input } from '@angular/core';
import { NavController, Slides } from 'ionic-angular';

import { FirebaseProvider } from '../../providers/firebase/firebase';

import moment from 'moment';
import { Observable } from 'rxjs';

@Component({
  selector: 'pins',
  templateUrl: 'pins.html'
})
export class PinsComponent {

  @ViewChild(Slides) slides: Slides;
  @Input('pinsStartDate') inputDate;
  rawDate: number;
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
          this.slides.slideTo(5);
        }, 500);
      })
    });
  }

  timestamp() {
    this.rawDate = this.inputDate;
    console.log("Date is " + this.inputDate);
  }

  refreshPage(refresh) {
    console.log("Refreshing Page");
    this.navCtrl.setRoot(this.navCtrl.getActive().component);
  }

  loadPins() {
    console.log("Loading Pins");
    return Observable.create((observer) => {
      let weeklyPins = this.firebase.afs.collection('pins', ref => ref.orderBy('affirmationDate'));
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
        console.log("Pushing Pin");
        console.log(pin);
        this.pins.push(pin);
      });
      observer.next();
    });
  }
}
