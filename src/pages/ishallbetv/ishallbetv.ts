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

  currentMonday: number;
  videos: any[];

  constructor(
    private navCtrl: NavController,
    private firebase: FirebaseProvider
  ) {
  }

  ionViewDidLoad() {
    this.setLastMonday();
    this.loadVideos().subscribe((videos) => {
      this.setVideos(videos);
    });
  }

  setLastMonday() {
    let today = parseInt(moment().format('YYYYMMDD'));
    let dayNumber = moment().isoWeekday();
    this.currentMonday = today - dayNumber;
  }

  loadVideos() {
    return Observable.create((observer) => {
      let allVideos = this.firebase.afs.collection('pins', ref =>
        ref.where('day', '==', 'Monday').
          orderBy('postDate', 'desc').
            startAfter(this.currentMonday));
      allVideos.valueChanges().subscribe((videos) => {
        observer.next(videos);
      });
    });
  }

  setVideos(videos) {
    this.videos = [];
    videos.forEach((video) => {
      if (video.day == 'Monday') {
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
