import { Component } from '@angular/core';

import { IonicPage, NavController, NavParams, AlertController, Events } from 'ionic-angular';

import { Observable } from 'rxjs/Observable';
import moment from 'moment';

import { HomePage } from '../home/home';

import { FirebaseProvider } from '../../providers/firebase/firebase';

import { Pin } from '../../../test-data/pins/model';

@IonicPage()
@Component({
  selector: 'page-pin-creator',
  templateUrl: 'pin-creator.html',
})
export class PinCreatorPage {
  mondayForm: {
    title?: string
    link?: string,
  } = {};
  tuesdayForm: {
    title?: string,
    description?: string,
    link?: string,
  } = {};
  wedToSunForm: {
    title?: string;
    description?: string,
  } = {};
  pinId: string;
  pinImageUrl: string;
  pinName: string;
  imageRetrievalMethod: string;
  timestamp: number;
  displayTimestamp: string;
  selectedDay: any;
  displaySelectedDay: string;
  dayOfWeek: string;
  submitted = false;
  loadingImage = false;
  imageReady = false;
  monday = false;
  tuesday = false;
  wedToSun = false;

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private alertCtrl: AlertController,
    private events: Events,
    private firebase: FirebaseProvider
  ) {
  }

  ionViewDidLoad() {
    console.log("Pin Creator Page Loaded");
    this.selectedDay = this.navParams.get('selectedDay');
    this.displaySelectedDay = moment(this.selectedDay).format("MMM D YYYY").toUpperCase();
    this.timestampPage();
    this.listenForCanceledUpload();
  }

  timestampPage() {
    this.dayOfWeek = moment(this.selectedDay).format("dddd");
    this.selectedDay = moment(this.selectedDay).format()
    console.log("Selected Day is " + this.dayOfWeek);
    if (this.dayOfWeek == "Monday") this.monday = true;
    else if (this.dayOfWeek == "Tuesday") this.tuesday = true;
    else this.wedToSun = true;
    let timestampString = moment().format('YYYYMMDDhhmmss');
    this.timestamp = parseInt(timestampString);
    this.displayTimestamp = moment().format('L');
    this.setPinForm();
  }

  setPinForm() {
    console.log("Setting Pin Form");
    switch (this.dayOfWeek) {
      case 'Monday': this.setMondayForm();
        break;
      case 'Tuesday': this.setTuesdayForm();
        break;
      default: this.setWedToSunForm();
    }
  }

  setMondayForm() {
    console.log("Setting Monday Form");
    this.mondayForm.title = "Motivational Monday";
    this.mondayForm.link = "https://youtube.com/embed/";
    console.log(this.mondayForm);
  }

  setTuesdayForm() {
    console.log("Setting Tuesday Form");
    this.tuesdayForm.title = "Tuesday's Tune of the Day";
    this.tuesdayForm.link = "https://youtu.be/";
    console.log(this.tuesdayForm);
  }

  setWedToSunForm() {
    console.log("Setting Wednesday to Sunday Form");
    if (this.dayOfWeek == 'Wednesday') this.wedToSunForm.title = "Wise Words Wednesday";
    if (this.dayOfWeek == 'Thursday') this.wedToSunForm.title = "Treat Yourself Thursday";
    if (this.dayOfWeek == 'Friday') this.wedToSunForm.title = "Faith Over Fear Friday";
    if (this.dayOfWeek == 'Saturday') this.wedToSunForm.title = "Happy Saturday!";
    if (this.dayOfWeek == 'Sunday') this.wedToSunForm.title = "It's iShallBe Sunday";
    console.log(this.wedToSunForm);
  }

  loadImage() {
    console.log("Loading Image");
    this.imageRetrievalMethod = "pin";
    this.loadingImage = true;
  }

  setImage(image) {
    console.log("Setting Image");
    this.pinImageUrl = image.url;
    this.pinName = image.name;
    this.loadingImage = false;
    this.imageReady = true;
  }

  submit(form) {
    console.log("Submitting Form");
    console.log(form);
    this.submitted = true;
    this.checkFormFields(form);
  }

  checkFormFields(form) {
    console.log("Checking Form Fields");
    switch (this.dayOfWeek) {
      case 'Monday': {
        if (!this.imageReady) this.displayNotReadyAlert();
        else if (!form.title || !form.link) this.displayIncompleteFieldsAlert();
        else this.submitValidPin(form);
      }
        break;
      case 'Tuesday':  {
        if (!form.title || !form.description || !form.link) this.displayIncompleteFieldsAlert();
        else this.submitValidPin(form);
      }
        break;
      default: {
        if (!form.title || !form.description) this.displayIncompleteFieldsAlert();
        else this.submitValidPin(form);
      }
    }
  }

  submitValidPin(form) {
    this.buildPin(form).subscribe((pin) => {
      this.createPin(pin).then(() => {
        this.navCtrl.setRoot(HomePage);
      });
    });
  }

  buildPin(form) {
    return Observable.create((observer) => {
      console.log("Building Pin");
      this.pinId = this.firebase.afs.createId();
      const pin: Pin = {
        id: this.pinId,
        title: form.title,
        description: form.description,
        commentCount: 0,
        likeCount: 0,
        url: this.pinImageUrl,
        link: form.link,
        day: this.displaySelectedDay,
        filename: this.pinName,
        displayAffirmationDate: this.displaySelectedDay,
        affirmationDate: this.selectedDay,
        displayTimestamp: this.displayTimestamp,
        timestamp: this.timestamp,
        user: {
          uid: this.firebase.user.uid,
          name: this.firebase.user.name,
          photo: this.firebase.user.photo
        }
      }
      observer.next(pin);
    });
  }

  createPin(pin) {
    let pinPath = "/pins/" + this.pinId;
    return this.firebase.afs.doc(pinPath).set(pin);
  }

  displayNotReadyAlert() {
    let alert = this.alertCtrl.create({
      title: 'Almost There!',
      subTitle: "Please Add Image to Pin",
      buttons: ['OK']
    });
    alert.present();
  }

  displayIncompleteFieldsAlert() {
    let alert = this.alertCtrl.create({
      title: 'Almost There!',
      subTitle: 'Please Complete All Fields',
      buttons: ['OK']
    });
    alert.present();
  }

  listenForCanceledUpload() {
    this.events.subscribe('getImageCanceled', () => {
      this.pinImageUrl = null;
      this.imageReady = false;
      this.loadingImage = false;
    });
  }

  listenForUploadTimeout() {
    this.events.subscribe('timeout', () => {
      this.pinImageUrl = null;
      this.imageReady = false;
      this.loadingImage = false;
      let alert = this.alertCtrl.create({
        title: 'Upload Timeout',
        subTitle: 'Please Try Again',
        buttons: ['OK']
      });
      alert.present();
    });
  }
}