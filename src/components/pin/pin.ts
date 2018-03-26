import { Component, Input } from '@angular/core';

import { Observable } from 'rxjs';

import { NavController } from 'ionic-angular';

import { PostPage } from '../../pages/post/post';

import { FirebaseProvider } from '../../providers/firebase/firebase';
import { AngularFirestoreDocument } from 'angularfire2/firestore';

import { Pin } from '../../../test-data/pins/model';

@Component({
  selector: 'pin',
  templateUrl: 'pin.html'
})
export class PinComponent {
  @Input('post') post;
  private pinDoc: AngularFirestoreDocument<Pin>;
  pin: any;
  image:string;
  imageLoaded = false;
  loaded = false;

  constructor(
    private navCtrl: NavController,
    private firebase: FirebaseProvider
  ) { }

  ngAfterViewInit() {
    this.loadPin();
  }

  loadPin() {
    let pinPath = "pins/" + this.post.id;
    this.pinDoc = this.firebase.afs.doc<Pin>(pinPath);
    this.pinDoc.valueChanges().subscribe((pin) => {
      this.pinLiked(pin).subscribe((pin) => {
        this.setImage(pin);
        this.pin = pin;
        this.loaded = true;
      });
    })
  }

  setImage(pin) {
    if (pin.day == 'Monday') this.image = pin.url;
    this.imageLoaded = true;
  }

  pinLiked(pin) {
    pin.liked = false;
    return Observable.create((observer) => {
      let pinLikePath = "pins/" + pin.id + "/likes/" + this.firebase.user.uid;
      this.firebase.afs.doc(pinLikePath).valueChanges().subscribe((like) => {
        if (!this.loaded) {
          if (like) pin.liked = true;
          observer.next(pin);
        }
      });
    });
  }

  viewPin() {
    this.navCtrl.push(PostPage, { 
      id: this.post.id,
      type: "pin"
     });
  }

}
