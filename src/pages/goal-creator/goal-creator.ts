import { Component } from '@angular/core';

import { IonicPage, NavController, Events, AlertController, LoadingController, Platform } from 'ionic-angular';
import { DatePicker } from '@ionic-native/date-picker';
import { Media, MediaObject } from '@ionic-native/media';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';

import { Observable } from 'rxjs/Observable';
import moment from 'moment';

declare var cordova: any;

import { HomePage } from '../home/home';

import { FirebaseProvider } from '../../providers/firebase/firebase';

import { Goal } from '../../../test-data/goals/model';

@IonicPage()
@Component({
  selector: 'page-goal-creator',
  templateUrl: 'goal-creator.html',
})
export class GoalCreatorPage {
  createGoalForm: {
    title?: string;
    description?: string,
  } = {};
  goalId: string;
  contentMethod: string;
  timestamp: number;
  displayTimestamp: string;
  rawDate: number;
  rawNextWeekDate: number;
  dueDate: number;
  displayDueDate: string;
  audioUrl: string;
  audioName: string;
  audio: any;
  submitted = false;
  dateSelected = false;
  recording = false;
  audioReady = false;
  playingAudio = false;
  dueToday = false;
  dueThisWeek = false;
  dueLater = false;

  constructor(
    private navCtrl: NavController,
    private events: Events,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private platform: Platform,
    private datePicker: DatePicker,
    private fileTransfer: FileTransfer,
    private media: Media,
    private firebase: FirebaseProvider
  ) {
    this.timestamp = moment().unix();
    this.displayTimestamp = moment().format('MMM D YYYY h:mmA');
    let rawDateString = moment().format('YYYYMMDD');
    this.rawDate = parseInt(rawDateString);
    this.rawNextWeekDate = this.rawDate + 7;
    this.listenForUploadTimeout();
    this.listenForCanceledUpload();
  }

  submit(form) {
    console.log("Submitting Form");
    this.submitted = true;
    if (!this.audioReady || !this.dateSelected) this.displayNotReadyAlert();
    else {
      if (form.valid) {
        let loading = this.loadingCtrl.create({
          spinner: 'bubbles',
          content: 'Loading...'
        });
        loading.present();
        this.buildGoal(form).subscribe((goal) => {
          this.createGoal(goal).then(() => {
            this.navCtrl.setRoot(HomePage);
            loading.dismiss();
          }, (error) => {
          });
        });
      }
    }
  }

  buildGoal(form) {
    console.log("Building Goal");
    return Observable.create((observer) => {
      this.goalId = this.firebase.afs.createId();
      const goal: Goal = {
        id: this.goalId,
        title: form.title,
        description: form.description,
        commentCount: 0,
        likeCount: 0,
        private: true,
        complete: false,
        url: this.audioUrl,
        filename: this.audioName,
        displayDueDate: this.displayDueDate,
        dueDate: this.dueDate,
        displayTimestamp: this.displayTimestamp,
        timestamp: this.timestamp,
        uid: this.firebase.user.uid,
        name: this.firebase.user.name,
        face: this.firebase.user.photo
      }
      observer.next(goal);
    });
  }

  createGoal(goal) {
    console.log("Creating Goal");
    let goalPath = "/goals/" + this.goalId;
    return this.firebase.afs.doc(goalPath).set(goal);
  }

  pickDate() {
    console.log("Picking Date");
    this.dueToday = false;
    this.dueThisWeek = false;
    this.dueLater = false;
    this.displayDueDate = "";
    this.dueDate = 0;
    this.datePicker.show({
      date: new Date(),
      mode: 'datetime',
      allowOldDates: false,
      androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_DARK
    }).then((date) => {
      this.dueDate = moment(date).unix();
      this.displayDueDate = moment(date).fromNow();
      this.formateDueDate();
    }, (err) => { });
  }

  formateDueDate() {
    console.log("Formatting Due Date");
    if (this.dueDate == this.rawDate) this.dueToday = true;
    else if (this.dueDate < this.rawNextWeekDate) this.dueThisWeek = true;
    else this.dueLater = true;
    this.dateSelected = true;
  }

  listenToAudioEvents() {
    console.log("Listening Audio Events");
    this.audio.onStatusUpdate.subscribe(status => {
      if (status == 4 && this.playingAudio) {
        this.stopPlayback();
      }
    });
  }

  recordAudio() {
    console.log("Recording Audio");
    this.contentMethod = "audio";
    this.recording = true;
  }

  recorded(audio) {
    console.log("Audio Recorded");
    this.audioUrl = audio.url;
    this.audioName = audio.name;
    this.audioReady = true;
  }

  playAudio() {
    console.log("Playing Audio");
    this.playingAudio = true;
    const fileTransfer: FileTransferObject = this.fileTransfer.create();
    if (this.platform.is('ios')) var filepath = (cordova.file.externalDataDirectory || cordova.file.dataDirectory) + this.audioName;
    if (this.platform.is('android')) filepath = cordova.file.externalDataDirectory + this.audioName;
    console.log("File path is " + filepath);
    fileTransfer.download(this.audioUrl, filepath, ).then((entry) => {
      let rawAudioURI = entry.toURL();
      if (this.platform.is('ios')) rawAudioURI = rawAudioURI.replace(/^file:\/\//, '/private');
      console.log("Raw Audio URI is " + rawAudioURI);
      let audio: MediaObject = this.media.create(rawAudioURI);
      console.log(audio);
      this.audio = audio;
      console.log("This.audio ");
      console.log(this.audio);
      this.audio.play();
      this.listenToAudioEvents();
    }, (error) => {
    });
  }

  stopPlayback() {
    console.log("Stopping Playback");
    this.playingAudio = false;
    this.audio.stop();
  }

  redoRecording() {
    console.log("Redoing Recording");
    this.audioReady = false;
    this.contentMethod = "audio";
    this.recording = true;
    this.events.publish('redoUpload', 'audio', this.audioName);
    this.audio.release();
    this.audio = null;
    this.playingAudio = false;
  }

  displayNotReadyAlert() {
    console.log("Display Not Ready Alert");
    let alertMessage = "Please Speak Your Goal";
    if (!this.dateSelected) alertMessage = "Please Set a Goal Due Date";
    let alert = this.alertCtrl.create({
      title: 'Almost There!',
      subTitle: alertMessage,
      buttons: ['OK']
    });
    alert.present();
  }

  listenForCanceledUpload() {
    console.log("Listening for Canceled Upload");
    this.events.subscribe('getAudioCanceled', () => {
      this.goalId = null;
      this.audioUrl = null;
      this.audioName = null;
      this.recording = false;
      let alert = this.alertCtrl.create({
        title: 'Upload Error',
        subTitle: 'Please Try Again',
        buttons: ['OK']
      });
      alert.present();
    });
  }

  listenForUploadTimeout() {
    console.log("Listening for Upload Timeout ")
    this.events.subscribe('timeout', () => {
      console.log("Upload Component Timed Out");
      this.goalId = null;
      this.audioUrl = null;
      this.audioName = null;
      this.recording = false;
      let alert = this.alertCtrl.create({
        title: 'Upload Timeout',
        subTitle: 'Please Try Again',
        buttons: ['OK']
      });
      alert.present();
    });
  }

}