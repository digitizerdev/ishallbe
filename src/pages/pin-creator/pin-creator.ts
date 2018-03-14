import { Component } from '@angular/core';

import { IonicPage, NavController, NavParams, AlertController, Events } from 'ionic-angular';

import { Observable } from 'rxjs/Observable';
import moment from 'moment';

import { PostManagerPage } from '../post-manager/post-manager';

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
  affirmationDate: number;
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
    this.affirmationDate = parseInt(moment(this.selectedDay).format("YYYYMMDD"));
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
    console.log(image);
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
        else if (form.link=='https://youtube.com/embed/') this.displayMissingYoutubeIdAlert();
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
    console.log("Submiting Valid Pin");
    this.buildPin(form).subscribe((pin) => {
      this.createPin(pin).then(() => {
        console.log("Pin Created");
        this.navCtrl.setRoot(PostManagerPage);
      }, (error) => {
        console.error("error");
        console.log(error);
      });
    });
  }

  buildPin(form) {
    return Observable.create((observer) => {
      console.log("Building Pin");
      this.pinId = this.firebase.afs.createId();
      let time = this.selectedDay.toISOString();
      if (this.monday) form.description = ""
      if (!this.monday) this.pinName = "";
      if (!this.monday) this.pinImageUrl = "";
      if (!this.monday) form.link = "";
      const pin: Pin = {
        id: this.pinId,
        title: form.title,
        description: form.description,
        commentCount: 0,
        likeCount: 0,
        url: this.pinImageUrl,
        link: form.link,
        day: this.dayOfWeek,
        filename: this.pinName,
        displayAffirmationDate: this.displaySelectedDay,
        affirmationDate: this.affirmationDate,
        displayTimestamp: this.displayTimestamp,
        timestamp: this.timestamp,
        startTime: time,
        endTime: time,
        user: {
          uid: this.firebase.user.uid,
          name: this.firebase.user.name,
          photo: this.firebase.user.photo
        }
      }
      console.log("Pin Built");
      console.log(pin);
      observer.next(pin);
    });
  }

  createPin(pin) {
    console.log("Creating Pin");
    let pinPath = "/pins/" + this.pinId;
    console.log("Pin path is " + pinPath);
    return this.firebase.afs.doc(pinPath).set(pin);
  }

  displayMissingYoutubeIdAlert() {
    console.log("Displaying Missing Youtube Id Alert");
    let alert = this.alertCtrl.create({
      title: 'Submission Error',
      subTitle: "Please Add Youtube Video ID",
      buttons: ['OK']
    });
    alert.present();
  }

  displayNotReadyAlert() {
    console.log("Displaying Not Ready Alert");
    let alert = this.alertCtrl.create({
      title: 'Submission Error',
      subTitle: "Please Add Image to Pin",
      buttons: ['OK']
    });
    alert.present();
  }

  displayIncompleteFieldsAlert() {
    console.log("Displaying Incomplete Fields Alert");
    let alert = this.alertCtrl.create({
      title: 'Submission Error',
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