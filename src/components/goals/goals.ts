import { Component } from '@angular/core';

import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
import { Media, MediaObject } from '@ionic-native/media';

import { FirebaseProvider } from '../../providers/firebase/firebase';

import moment from 'moment';
import { Observable } from 'rxjs/Observable';

declare var cordova: any;

import { mockGoals } from '../../../test-data/goals/mocks';

@Component({
  selector: 'goals',
  templateUrl: 'goals.html'
})
export class GoalsComponent {

  rawDate: number;
  rawNextWeekDate: number;
  goals: any[];

  constructor(
    private fileTransfer: FileTransfer,
    private media: Media
  ) {
    let rawDateString = moment().format('YYYYMMDD');
    this.rawDate = parseInt(rawDateString);
    this.rawNextWeekDate = this.rawDate + 7;
    this.setGoals();
  }

  setGoals() {
    this.goals = [];
    mockGoals.forEach((goal) => {
      if (!goal.complete) {
        goal.displayDueDate = moment(goal.dueDate, "YYYYMMDDhhmmss").fromNow();
        this.setDueDateWarningColor(goal).subscribe((goal) => {
          this.goals.push(goal);
        });
      }
    });
  }


/*   constructor(
    private fileTransfer: FileTransfer,
    private media: Media,
    private firebase: FirebaseProvider
  ) {
    console.log("Loaded Goals Component");
  }

  ngAfterViewInit() {
    console.log("View Initialized");
    this.timestamp();
    this.loadGoals().subscribe((goals) => {
      console.log("Got goals");
      console.log(goals);
      this.setGoals(goals);
    });
  } */

  timestamp() {
    console.log("Timestamping Page");
    this.rawDate = parseInt(moment().format('YYYYMMDD'));
    this.rawNextWeekDate = this.rawDate + 7;
  }

/*   loadGoals() {
    console.log("Loading Goals");
    return Observable.create((observer) => {
      console.log("My uid is " + this.firebase.user.uid);
      let myGoals = this.firebase.afs.collection('goals', ref => ref.where('uid', "==", this.firebase.user.uid));
      return myGoals.valueChanges().subscribe((goals) => {
        observer.next(goals);
      });
    });
  } */

/*   setGoals(goals) {
    console.log("Setting Goals");
    return Observable.create((observer) => {
      this.goals = [];
      goals.forEach((goal) => {
        if (!goal.complete) {
          goal.displayDueDate = moment(goal.dueDate, "YYYYMMDDhhmmss").fromNow();
          this.setDueDateWarningColor(goal).subscribe((goal) => {
            this.goals.push(goal);
          });
        }
      });
      console.log(this.goals);
      observer.next();
    });
  }
 */
  setDueDateWarningColor(goal) {
    console.log("Setting Due Date Warning Color");
    return Observable.create((observer) => {
      if (goal.dueDate < this.rawDate) goal.pastDue = true;
      else if (goal.dueDate < this.rawNextWeekDate) goal.dueInNextSevenDays = true;
      else goal.dueLater = true;
      observer.next(goal);
    });
  }

  playAudio(audioURL, audioName) {
    console.log("Playing Audio");
    const fileTransfer: FileTransferObject = this.fileTransfer.create();
    var destPath = (cordova.file.externalDataDirectory || cordova.file.dataDirectory) + audioName;
    fileTransfer.download(audioURL, destPath, ).then((entry) => {
      let rawAudioURI = entry.toURL();
      rawAudioURI = rawAudioURI.replace(/^file:\/\//, '/private');
      let downloadedAudio: MediaObject = this.media.create(rawAudioURI);
      downloadedAudio.play();
    }, (error) => {
    });
  }
}
