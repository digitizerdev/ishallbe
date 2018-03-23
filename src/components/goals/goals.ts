import { Component, Input } from '@angular/core';

import { Platform } from 'ionic-angular';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
import { Media, MediaObject } from '@ionic-native/media';

import moment from 'moment';
import { Observable } from 'rxjs/Observable';

declare var cordova: any;

import { FirebaseProvider } from '../../providers/firebase/firebase';


@Component({
  selector: 'goals',
  templateUrl: 'goals.html'
})
export class GoalsComponent {
  @Input('mine') myGoals;

  rawDate: number;
  rawNextWeekDate: number;
  goals: any[];

  constructor(
    private platform: Platform,
    private fileTransfer: FileTransfer,
    private media: Media,
    private firebase: FirebaseProvider
  ) {
    console.log("Loaded Goals Component");
  }

  ngAfterViewInit() {
    console.log("Goals View Initialized");
    console.log("My Goals: " + this.myGoals);
    this.timestamp();
    this.loadGoals().subscribe((goals) => {
      console.log("Got goals");
      console.log(goals);
      this.setGoals(goals);
    });
  }

  timestamp() {
    console.log("Timestamping Page");
    this.rawDate = parseInt(moment().format('YYYYMMDD'));
    this.rawNextWeekDate = this.rawDate + 7;
  }

  loadGoals() {
    console.log("Loading Goals");
    return Observable.create((observer) => {
      let myGoals = this.firebase.afs.collection('goals');
      return myGoals.valueChanges().subscribe((goals) => {
        observer.next(goals);
      });
    });
  }

  setGoals(goals) {
    console.log("Setting Goals");
      this.goals = [];
      goals.forEach((goal) => {
        if (!goal.complete) {
          console.log("This goal is not complete");
          let dueDate = moment.unix(goal.dueDate);
          goal.displayDueDate = moment(dueDate).fromNow().toUpperCase();
          console.log("Goal Display Due Date is " + goal.displayDueDate);
          let timestamp = moment.unix(goal.timestamp);
          goal.displayTimestamp= moment(timestamp).fromNow();
          console.log("Goal Timestamp is " + goal.displayTimestamp);
          this.setDueDateWarningColor(goal).subscribe((goal) => {
            console.log("Pushing Goal");
            console.log(goal);
            this.goals.push(goal);
          });
        }
      });
      console.log(this.goals);
  }

  setDueDateWarningColor(goal) {
    console.log("Setting Due Date Warning Color");
    return Observable.create((observer) => {
      if (goal.dueDate < this.rawDate) goal.pastDue = true;
      else if (goal.dueDate < this.rawNextWeekDate) goal.dueInNextSevenDays = true;
      else goal.dueLater = true;
      observer.next(goal);
    });
  }

  playAudio(goal) {
    console.log("Playing Audio");
    console.log(goal);
    const fileTransfer: FileTransferObject = this.fileTransfer.create();
    if (this.platform.is('ios')) var filepath = (cordova.file.externalDataDirectory || cordova.file.dataDirectory) + goal.filename;
    if (this.platform.is('android')) filepath = cordova.file.externalDataDirectory + goal.filename;    
    fileTransfer.download(goal.url, filepath, ).then((entry) => {
      let rawAudioURI = entry.toURL();
      if (this.platform.is('ios')) rawAudioURI = rawAudioURI.replace(/^file:\/\//, '/private');
      console.log("Raw Audio URI is " + rawAudioURI);
      let downloadedAudio: MediaObject = this.media.create(rawAudioURI);
      downloadedAudio.play();
    }, (error) => {
    });
  }
}
