import { Component } from '@angular/core';

import { IonicPage, Events, AlertController } from 'ionic-angular';
import { DatePicker } from '@ionic-native/date-picker';
import { Media, MediaObject } from '@ionic-native/media';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';

import { Observable } from 'rxjs/Observable';
import moment from 'moment';

declare var cordova: any;

import { FirebaseProvider } from '../../providers/firebase/firebase';

import { goal1 } from '../../../test-data/goals/mocks';

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
  goal: any;
  contentMethod: string;
  rawDate: number;
  rawNextWeekDate: number;
  rawDueDate: number;
  displayDueDate: string;
  audio: any;
  audioUrl: string;
  audioName: string;
  submitted = false;
  dateSelected = false;
  recording = false;
  audioReady = false;
  playingAudio = false;
  dueToday = false;
  dueThisWeek = false;
  dueLater = false;

  constructor(
    private events: Events,
    private alertCtrl: AlertController,
    private datePicker: DatePicker,
    private fileTransfer: FileTransfer,
    private media: Media,
    private firebase: FirebaseProvider
  ) {
    let rawDateString = moment().format('YYYYMMDD');
    this.rawDate = parseInt(rawDateString);
    console.log("Raw date is " + this.rawDate);
    this.rawNextWeekDate = this.rawDate + 7;
    console.log("Raw next week date is " + this.rawNextWeekDate);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GoalCreatorage');
  }

  submit(form) {
    this.submitted = true;
    console.log("Submitting Form");
    console.log(form);
    console.log("Due Date Selected: " + this.dateSelected);
    console.log("Audio Ready: " + this.audioReady);
    if (!this.audioReady || !this.dateSelected) this.displayNotReadyAlert();
    else {
      if (form.valid) {
        console.log("Ready to create firebase goal");
        this.buildGoal().subscribe(() => {
          this.createGoal().then((docData) => {
            console.log("Goal created");
            console.log(docData);
          });
        });
      }
    }
  }

  buildGoal() {
    console.log("Building goal");
    return Observable.create((observer) => {
      this.goal = goal1
      this.goal.title = this.createGoalForm.title;
      this.goal.description = this.createGoalForm.description;
      this.goal.contentUrl = this.audioUrl;
      this.goal.dueDate = this.rawDueDate;
      this.goal.timestamp = this.audioName;
      this.goal.user.uid = this.firebase.user.uid;
      this.goal.user.name = this.firebase.user.name;
      this.goal.user.photo = this.firebase.user.photo;
      console.log("Goal Object is " );
      console.log(this.goal);
      observer.next();
    });
  }

  createGoal() {
    return this.firebase.afs.collection("posts").add(this.goal)
  }

  displayNotReadyAlert() {
    console.log("Displaying Not Ready Alert");
    let alertMessage = "Please Speak Your Goal";
    if (!this.dateSelected) alertMessage = "Please Set a Goal Due Date";
    let alert = this.alertCtrl.create({
      title: 'Almost There!',
      subTitle: alertMessage,
      buttons: ['OK']
    });
    alert.present();
  }

  pickDate() {
    console.log("Picking date");
    this.dueToday = false;
    this.dueThisWeek = false;
    this.dueLater = false;
    this.displayDueDate = "";
    this.rawDueDate = 0;
    this.datePicker.show({
      date: new Date(),
      mode: 'datetime',
      allowOldDates: false,
      androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_DARK
    }).then((date) => {
      console.log("Raw date is: " + date);
      let dueDateString = moment(date).format('YYYYMMDD');
      this.rawDueDate = parseInt(dueDateString);
      console.log("Raw Due Date is " + this.rawDueDate);
      this.displayDueDate = moment(date).fromNow();
      console.log("Display Due date is " + this.displayDueDate);
      this.formateDueDate();
    }, (err) => { console.error("Error: " + err); });
  }

  formateDueDate() {
    console.log("Formatting Due Date");
    if (this.rawDueDate == this.rawDate) this.dueToday = true;
    else if (this.rawDueDate < this.rawNextWeekDate) this.dueThisWeek = true;
    else this.dueLater = true;
    this.dateSelected = true;
  }

  listenToAudioEvents() {
    console.log("Listening To Audio Events");
    this.audio.onStatusUpdate.subscribe(status => {
      console.log("Status of this.audio updated");
      console.log(status);
      if (status == 4 && this.playingAudio) {
        console.log("Time to stop playback")
        this.stopPlayback();
      }
    });
  }

  recordAudio() {
    console.log("Recording Audio")
    this.contentMethod = "audio";
    this.recording = true;
  }

  recorded(audio) {
    console.log("Recorded");
    console.log(audio);
    this.audioUrl = audio.url;
    this.audioName = audio.name;
    this.audioReady = true;
  }

  playAudio() {
    console.log("Playing Audio");
    this.playingAudio = true;
    const fileTransfer: FileTransferObject = this.fileTransfer.create();
    var destPath = (cordova.file.externalDataDirectory || cordova.file.dataDirectory) + this.audioName;
    fileTransfer.download(this.audioUrl, destPath, ).then((entry) => {
      let rawAudioURI = entry.toURL();
      rawAudioURI = rawAudioURI.replace(/^file:\/\//, '/private');
      let audio: MediaObject = this.media.create(rawAudioURI);
      this.audio = audio;
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
    console.log("This audio name is " + this.audioName);
    this.audioReady = false;
    this.contentMethod = "audio";
    this.recording = true;
    this.events.publish('redoUpload', 'audio', this.audioName);
    this.audio.release();
    this.audio = null;
    this.playingAudio = false;
  }
}