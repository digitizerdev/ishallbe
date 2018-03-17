import { Component, Input } from '@angular/core';

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
  @Input('userUid') uid;

  rawDate: number;
  rawNextWeekDate: number;
  goals: any[];

  constructor(
    private fileTransfer: FileTransfer,
    private media: Media,
    private firebase: FirebaseProvider
  ) {
    console.log("Loaded Goals Component");
  }

  ngAfterViewInit() {
    console.log("Goals View Initialized");
    console.log("Got uid");
    console.log(this.uid);
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
      console.log("My uid is " + this.uid);
      let myGoals = this.firebase.afs.collection('goals', ref => ref.where('uid', "==", this.uid));
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
          let date = moment.unix(goal.dueDate);
          goal.displayDueDate = moment(date).fromNow();
          console.log("Goal Display Due Date is " + goal.displayDueDate);
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
    var destPath = (cordova.file.externalDataDirectory || cordova.file.dataDirectory) + goal.filename;
    fileTransfer.download(goal.url, destPath, ).then((entry) => {
      let rawAudioURI = entry.toURL();
      rawAudioURI = rawAudioURI.replace(/^file:\/\//, '/private');
      let downloadedAudio: MediaObject = this.media.create(rawAudioURI);
      downloadedAudio.play();
    }, (error) => {
    });
  }
}
