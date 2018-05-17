import { Component } from '@angular/core';

import { IonicPage, NavController, NavParams, AlertController, LoadingController, Events, Platform } from 'ionic-angular';

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
    description?: string
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
  postDate: number;
  displayPostDate: string;
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
  complete = false;

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private events: Events,
    private platform: Platform,
    private firebase: FirebaseProvider
  ) {
  }

  ionViewDidLoad() {
    console.log("Loaded Pin Creator Page");
    this.selectedDay = this.navParams.get('selectedDay');
    console.log("Selected Day: " + this.selectedDay);
    this.displaySelectedDay = moment(this.selectedDay).format("MMM D YYYY").toUpperCase();
    this.timestampPage();
    this.listenForCanceledUpload();
    this.checkForExistingPin();
  }

  checkForExistingPin() {
    console.log("Checking For Existing Pin");
    let today = parseInt(moment(this.selectedDay).format("YYYYMMDD"));
    let pinCol = this.firebase.afs.collection('pins', ref => ref.where('postDate', '==', today));
    return pinCol.valueChanges().subscribe((existingPin) => {
      console.log("Got existing pin");
      console.log(existingPin);
      this.pin = existingPin[0];
      if (existingPin.length == 1) this.setExistingPinFields();
    });
  }

  setExistingPinFields() {
    console.log("Setting Existing Pin Fields");
    console.log("Today is " + this.dayOfWeek);
    switch (this.dayOfWeek) {
      case 'Monday': {
        this.mondayForm.link = this.pin.link;
        this.pinImageUrl = this.pin.url;
        this.pinName = this.pin.filename;
        this.loadingImage = false;
        this.imageReady = true;
        this.mondayForm.description = this.pin.description;
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
    console.log("Timestamping Page");
    this.dayOfWeek = moment(this.selectedDay).format("dddd");
    this.postDate = parseInt(moment(this.selectedDay).format("YYYYMMDD"));
    this.displayPostDate = moment().format('MMM DD YYYY');
    if (this.dayOfWeek == "Monday") this.monday = true;
    else if (this.dayOfWeek == "Tuesday") this.tuesday = true;
    else this.wedToSun = true;
    this.timestamp = moment().unix();
    this.displayTimestamp = moment().format('L');
    this.setPinForm();
  }

  setPinForm() {
    console.log("Setting Pin Form");
    if (this.dayOfWeek == 'Monday') this.mondayForm.title = "Motivational Monday";
    if (this.dayOfWeek == 'Tuesday') this.tuesdayForm.title = "Tuesday's Tune of the Day";
    if (this.dayOfWeek == 'Wednesday') this.wedToSunForm.title = "Wise Words Wednesday";
    if (this.dayOfWeek == 'Thursday') this.wedToSunForm.title = "Treat Yourself Thursday";
    if (this.dayOfWeek == 'Friday') this.wedToSunForm.title = "Faith Over Fear Friday";
    if (this.dayOfWeek == 'Saturday') this.wedToSunForm.title = "Happy Saturday!";
    if (this.dayOfWeek == 'Sunday') this.wedToSunForm.title = "It's iShallBe Sunday!";
  }

  loadImage() {
    console.log("Loading Image");
    if (!this.platform.is('cordova')) this.imageRetrievalMethod = 'browser-image';
    else this.imageRetrievalMethod = "pin";
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
    this.submitted = true;
    this.checkFormFields(form);
  }

  checkFormFields(form) {
    console.log("Checking Form Fields");
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
    console.log("Submitting Valid Pin");
    let loading = this.loadingCtrl.create({
      spinner: 'bubbles',
      content: 'Loading...',
      cssClass: 'loading-hold'
    });
    loading.present();
    this.buildPin(form).subscribe((pin) => {
      this.createPin(pin).then(() => {
        this.complete = true;
        loading.dismiss();
      }, (error) => {
      });
    });
  }

  buildPin(form) {
    console.log("Building Pin");
    return Observable.create((observer) => {
      if (this.pin) this.pinId = this.pin.id;
      else this.pinId = this.firebase.afs.createId();
      let time = this.selectedDay.toISOString();
      if (!this.monday) this.pinName = "";
      if (!this.monday) this.pinImageUrl = "";
      if (!this.monday && !this.tuesday) form.link = "";
      let link = form.link;
      if (form.link.length !== 37) {
        let youtubeID = form.link.slice(17);
        link = "https://youtube.com/embed/" + youtubeID;
      }
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
        displayPostDate: this.displaySelectedDay,
        postDate: this.postDate,
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
    console.log("Creating Pin");
    let pinPath = "/pins/" + this.pinId;
    return this.firebase.afs.doc(pinPath).set(pin);
  }

  displaySubmissionErrorAlert(message) {
    console.log("Displaying Submission Error Alert");
    let alert = this.alertCtrl.create({
      title: 'Submission Error',
      subTitle: message,
      buttons: ['OK']
    });
    alert.present();
  }

  listenForCanceledUpload() {
    console.log("Listening for Canceled Upload");
    this.events.subscribe('getImageCanceled', () => {
      this.pinImageUrl = null;
      this.imageReady = false;
      this.loadingImage = false;
    });
  }

  listenForUploadTimeout() {
    console.log("Listening For Upload Timeout");
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
    console.log("Redoing Image Upload");
    this.pinImageUrl = null;
    this.imageReady = false;
    this.loadingImage = true;
    let contentType = 'pin';
    if (!this.platform.is('cordova'))
      contentType = 'browser-image';
    console.log("Content Type is " + contentType);
    this.events.publish('redoUpload', contentType, this.pinName);
  }
}