import { Component } from '@angular/core';
import {
  trigger,
  style,
  transition,
  animate,
  query,
  keyframes,
  stagger
} from '@angular/animations';

import { IonicPage, NavController } from 'ionic-angular';

import { Observable } from 'rxjs/Observable';
import moment from 'moment';

import { PostPage } from '../post/post';
import { AboutPage } from '../about/about';

import { Pin } from '../../../test-data/pins/model';

import { AngularFirestoreCollection } from 'angularfire2/firestore';
import { FirebaseProvider } from '../../providers/firebase/firebase';
import 'rxjs/add/operator/take';

@IonicPage()
@Component({
  selector: 'page-ishallbetv',
  templateUrl: 'ishallbetv.html',
  animations: [

    trigger('listAnimation', [
      transition('* => *', [

        query(':enter', style({ opacity: 0 }), { optional: true }),

        query(':enter', stagger('300ms', [
          animate('1s ease-in', keyframes([
            style({ opacity: 0, transform: 'translateY(-75%)', offset: 0 }),
            style({ opacity: .5, transform: 'translateY(35px)', offset: 0.3 }),
            style({ opacity: 1, transform: 'translateY(0)', offset: 1.0 }),
          ]))]), { optional: true }),

        query(':leave', stagger('300ms', [
          animate('1s ease-in', keyframes([
            style({ opacity: 1, transform: 'translateY(0)', offset: 0 }),
            style({ opacity: .5, transform: 'translateY(35px)', offset: 0.3 }),
            style({ opacity: 0, transform: 'translateY(-75%)', offset: 1.0 }),
          ]))]), { optional: true })
      ])
    ]),
    trigger('explainerAnimation', [
      transition('* => *', [
        query('.col', style({ opacity: 0, transform: 'translateX(-40px)' })),

        query('.col', stagger('500ms', [
          animate('800ms 1.2s ease-out', style({ opacity: 1, transform: 'translateX(0)' })),
        ])),

        query('.col', [
          animate(1000, style('*'))
        ])

      ])
    ])
  ],
})
export class IshallbetvPage {

  pinsCollection: AngularFirestoreCollection<Pin>;
  currentMonday: number;
  lastVideopostDate: number;
  noMoreVideos = false;
  videos: any[] = [];

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
      this.pinsCollection = this.firebase.afs.collection('pins', ref =>
        ref.where('day', '==', 'Monday').
          orderBy('postDate', 'desc').
          startAfter(this.currentMonday).
          limit(5));
      this.pinsCollection.valueChanges().take(1).subscribe((videos) => {
        observer.next(videos);
      });
    });
  }

  setVideos(videos) {
    if (videos.length < 5 ) this.noMoreVideos = true;
    videos.forEach((video) => {
      if (video.day == 'Monday') {
        video.displayAffirmationDate = moment(video.displayAffirmationDate).fromNow();
        this.videos.push(video);
      }
    });
    let lastVideo = videos.pop();
    this.lastVideopostDate = lastVideo.postDate;
  }

  loadMoreVideos(event) {
    return new Promise((resolve) => {
      let videos = this.firebase.afs.collection('pins', ref =>
        ref.where('day', '==', 'Monday').
          orderBy('postDate', 'desc').
          limit(5).
          startAfter(this.lastVideopostDate));
      return videos.valueChanges().take(1).subscribe((videos) => {
        if (videos.length > 0) this.setVideos(videos);
        else this.noMoreVideos = true;
        resolve();
      });
    });
  }

  pushAboutPage() {
    this.navCtrl.push(AboutPage);
  }

  openPin(pin) {
    this.navCtrl.push(PostPage, {
      id: pin.id,
      type: "pins",
      opened: true
    });
  }

  refreshPage(refresh) {
    this.navCtrl.setRoot(this.navCtrl.getActive().component);
  }
}
