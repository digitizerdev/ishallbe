import { Component } from '@angular/core';

import { IonicPage, NavController, Events, AlertController } from 'ionic-angular';
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
  goal: object;
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
    private datePicker: DatePicker,
    private fileTransfer: FileTransfer,
    private media: Media,
    private firebase: FirebaseProvider
  ) {
    let timestampString = moment().format('YYYYMMDDhhmmss');
    this.timestamp = parseInt(timestampString);
    console.log("Timestamp is " + this.timestamp);
    this.displayTimestamp = moment().format('MMM D YYYY h:mmA');
    console.log("Display timestamp is " + this.displayTimestamp);
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
        this.buildGoal().subscribe((goal) => {
          this.createGoal(goal).subscribe(() => {
            console.log("Goal created");
            this.navCtrl.setRoot(HomePage);
          }, (error) => {
            console.log("There was an error");
            console.error(error);
          });
        });
      }
    }
  }

  buildGoal() {
    return Observable.create((observer) => {
      console.log("Building Goal");
      const goal: Goal = {
        id: "default",
        title: this.createGoalForm.title,
        description: this.createGoalForm.description,
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
        user: {
          uid: this.firebase.user.uid,
          name: this.firebase.user.name,
          photo: this.firebase.user.photo
        }
      }
      console.log("Goal created");
      console.log(goal);
      observer.next(goal);
    });
  }

  createGoal(goal) {
    return Observable.create((observer) => {
      console.log("Creating Goal");
      const goalsCollection = this.firebase.afs.collection<Goal>('goals');
      goalsCollection.add(goal).then((docData) => {
        console.log(docData);
        observer.next();
      }).catch((error) => {
        console.log("Error");
        console.error(error);
      });
    });
  }

  pickDate() {
    console.log("Picking date");
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
      console.log("Raw date is: " + date);
      let dueDateString = moment(date).format('YYYYMMDD');
      this.dueDate = parseInt(dueDateString);
      console.log("Raw Due Date is " + this.dueDate);
      this.displayDueDate = moment(date).fromNow();
      console.log("Display Due date is " + this.displayDueDate);
      this.formateDueDate();
    }, (err) => { console.error("Error: " + err); });
  }

  formateDueDate() {
    console.log("Formatting Due Date");
    if (this.dueDate == this.rawDate) this.dueToday = true;
    else if (this.dueDate < this.rawNextWeekDate) this.dueThisWeek = true;
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

  listenForCanceledUpload() {
    this.events.subscribe('getAudioCanceled', (message) => {
      console.log("Audio Upload Canceled");
      this.goal = null;
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

}