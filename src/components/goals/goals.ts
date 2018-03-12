import { Component } from '@angular/core';

import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
import { Media, MediaObject } from '@ionic-native/media';

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
    console.log("Raw date is " + this.rawDate);
    this.rawNextWeekDate = this.rawDate + 7;
    console.log("Raw next week date is " + this.rawNextWeekDate);
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

  setDueDateWarningColor(goal) {
    return Observable.create((observer) => {
      if (goal.dueDate < this.rawDate) goal.pastDue = true;
      else if (goal.dueDate < this.rawNextWeekDate) goal.dueInNextSevenDays = true;
      else goal.dueLater = true;
      observer.next(goal);
    });
  }

  playAudio(audioURL, audioName) {
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
