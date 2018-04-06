import { Component } from '@angular/core';

import { IonicPage, NavController, NavParams, AlertController, LoadingController, Events } from 'ionic-angular';

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
  pin: any;
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
    private loadingCtrl: LoadingController,
    private events: Events,
    private firebase: FirebaseProvider
  ) {
  }

  ionViewDidLoad() {
    this.selectedDay = this.navParams.get('selectedDay');
    this.displaySelectedDay = moment(this.selectedDay).format("MMM D YYYY").toUpperCase();
    this.timestampPage();
    this.listenForCanceledUpload();
    this.checkForExistingPin();
  }

  checkForExistingPin() {
    let today = parseInt(moment(this.selectedDay).format("YYYYMMDD"));
    let pinCol = this.firebase.afs.collection('pins', ref => ref.where('affirmationDate', '==', today));
    return pinCol.valueChanges().subscribe((existingPin) => {
      this.pin = existingPin[0];
      if (existingPin.length == 1) this.setExistingPinFields();
    });
  }

  setExistingPinFields() {
    switch (this.dayOfWeek) {
      case 'Monday': {
        this.mondayForm.link = this.pin.link;
        this.pinImageUrl = this.pin.url;
        this.pinName = this.pin.filename;
        this.loadingImage = false;
        this.imageReady = true;
      }
        break;
      case 'Tuesday': {
        this.tuesdayForm.description = this.pin.description;
        this.tuesdayForm.link = this.pin.link;
      }
        break;
      default: this.wedToSunForm.description = this.pin.description;
    }
  }

  timestampPage() {
    this.dayOfWeek = moment(this.selectedDay).format("dddd");
    this.affirmationDate = parseInt(moment(this.selectedDay).format("YYYYMMDD"));
    if (this.dayOfWeek == "Monday") this.monday = true;
    else if (this.dayOfWeek == "Tuesday") this.tuesday = true;
    else this.wedToSun = true;
    this.timestamp = moment().unix();
    this.displayTimestamp = moment().format('L');
    this.setPinForm();
  }

  setPinForm() {
    if (this.dayOfWeek == 'Monday') this.mondayForm.title = "Motivational Monday";
    if (this.dayOfWeek == 'Tuesday') this.tuesdayForm.title = "Tuesday's Tune of the Day";
    if (this.dayOfWeek == 'Wednesday') this.wedToSunForm.title = "Wise Words Wednesday";
    if (this.dayOfWeek == 'Thursday') this.wedToSunForm.title = "Treat Yourself Thursday";
    if (this.dayOfWeek == 'Friday') this.wedToSunForm.title = "Faith Over Fear Friday";
    if (this.dayOfWeek == 'Saturday') this.wedToSunForm.title = "Happy Saturday!";
    if (this.dayOfWeek == 'Sunday') this.wedToSunForm.title = "It's iShallBe Sunday!";
  }

  loadImage() {
    this.imageRetrievalMethod = "pin";
    this.loadingImage = true;
  }

  setImage(image) {
    this.pinImageUrl = image.url;
    this.pinName = image.name;
    this.loadingImage = false;
    this.imageReady = true;
  }

  submit(form) {
    this.submitted = true;
    this.checkFormFields(form);
  }

  checkFormFields(form) {
    switch (this.dayOfWeek) {
      case 'Monday': {
        if (!this.imageReady) this.displaySubmissionErrorAlert("Please Add Image to Pin");
        else if (!form.title || !form.link) this.displaySubmissionErrorAlert("Please Complete All Fields");
        else if (form.link == '') this.displaySubmissionErrorAlert("Please Add YouTube Link");
        else this.submitValidPin(form);
      }
        break;
      case 'Tuesday': {
        if (!form.title || !form.description || !form.link) this.displaySubmissionErrorAlert("Please Complete All Fields");
        else if (form.link == 'https://youtu.be/') this.displaySubmissionErrorAlert("Please Add YouTube Video ID");
        else this.submitValidPin(form);
      }
        break;
      default: {
        if (!form.title || !form.description) this.displaySubmissionErrorAlert("Please Complete All Fields");
        else this.submitValidPin(form);
      }
    }
  }

  submitValidPin(form) {
    let loading = this.loadingCtrl.create({
      spinner: 'bubbles',
      content: 'Loading...',
      cssClass: 'loading-hold'
    });
    loading.present();
    this.buildPin(form).subscribe((pin) => {
      this.createPin(pin).then(() => {
        this.navCtrl.setRoot(PostManagerPage);
        loading.dismiss();
      }, (error) => {
      });
    });
  }

  buildPin(form) {
    return Observable.create((observer) => {
      if (this.pin) this.pinId = this.pin.id;
      else this.pinId = this.firebase.afs.createId();
      let time = this.selectedDay.toISOString();
      if (this.monday) form.description = ""
      if (!this.monday) this.pinName = "";
      if (!this.monday) this.pinImageUrl = "";
      if (!this.monday && !this.tuesday) form.link = "";
      let youtubeID = form.link.slice(17);
      let link = "https://youtube.com/embed/" + youtubeID;
      const pin: Pin = {
        id: this.pinId,
        title: form.title,
        description: form.description,
        commentCount: 0,
        likeCount: 0,
        url: this.pinImageUrl,
        link: link,
        day: this.dayOfWeek,
        filename: this.pinName,
        collection: "pins",
        displayAffirmationDate: this.displaySelectedDay,
        affirmationDate: this.affirmationDate,
        displayTimestamp: this.displayTimestamp,
        timestamp: this.timestamp,
        startTime: time,
        endTime: time,
        uid: this.firebase.user.uid,
        name: this.firebase.user.name,
        face: this.firebase.user.photo
      }
      observer.next(pin);
    });
  }

  createPin(pin) {
    let pinPath = "/pins/" + this.pinId;
    return this.firebase.afs.doc(pinPath).set(pin);
  }

  displaySubmissionErrorAlert(message) {
    let alert = this.alertCtrl.create({
      title: 'Submission Error',
      subTitle: message,
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

  redoImageLoad() {
    this.pinImageUrl = null;
    this.imageReady = false;
    this.loadingImage = true;
    this.events.publish('redoUpload', 'pin', this.pinName);
  }
}