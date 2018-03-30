import { Component } from '@angular/core';

import { IonicPage, NavController } from 'ionic-angular';

import { Observable } from 'rxjs/Observable';
import moment from 'moment';

import { PostPage } from '../post/post';

import { AboutPage } from '../about/about';

import { FirebaseProvider } from '../../providers/firebase/firebase';

@IonicPage()
@Component({
  selector: 'page-ishallbetv',
  templateUrl: 'ishallbetv.html',
})
export class IshallbetvPage {

  lastMonday: number;
  videos: any[];

  constructor(
    private navCtrl: NavController,
    private firebase: FirebaseProvider
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad IshallbetvPage');
    this.setLastMonday();
    this.loadVideos().subscribe((videos) => {
      this.setVideos(videos);
    });
  }

  setLastMonday() {
    console.log("Setting Last Monday");
    let today = moment().format('YYYYMMDD');
    console.log("Today is " + today);
    let dayNumber = moment().isoWeekday();
    console.log("Day Number is " + dayNumber);
  }

  loadVideos() {
    console.log("Loading Videos");
    return Observable.create((observer) => {
      let allVideos = this.firebase.afs.collection('pins', ref =>
        ref.orderBy('affirmationDate', 'desc'));
      allVideos.valueChanges().subscribe((videos) => {
        observer.next(videos);
      });
    });
  }

  setVideos(videos) {
    this.videos = [];
    videos.forEach((video) => {
      if (video.day == 'Monday') {
        console.log(video);
        video.displayAffirmationDate = moment(video.displayAffirmationDate).fromNow();
        this.videos.push(video);
      }
    });
  }

  pushAboutPage() {
    this.navCtrl.push(AboutPage);
  }

  openPin(pin) {
    this.navCtrl.push(PostPage, {
      id: pin.id,
      type: "pins"
    });
  }
}
