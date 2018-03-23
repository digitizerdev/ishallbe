import { Component } from '@angular/core';

import { IonicPage, NavController } from 'ionic-angular';

import { Observable } from 'rxjs/Observable';
import moment from 'moment';

import { AboutPage } from '../about/about';

import { FirebaseProvider } from '../../providers/firebase/firebase';

@IonicPage()
@Component({
  selector: 'page-ishallbetv',
  templateUrl: 'ishallbetv.html',
})
export class IshallbetvPage {

  videos: any[];

  constructor(
    private navCtrl: NavController,
    private firebase: FirebaseProvider
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad IshallbetvPage');
    this.loadVideos().subscribe((videos) => {
      this.setVideos(videos);
    });
  }

  loadVideos() {
    console.log("Loading Videos");
    return Observable.create((observer) => {
      let allVideos = this.firebase.afs.collection('pins', ref => 
        ref.orderBy('affirmationDate'));
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
}
