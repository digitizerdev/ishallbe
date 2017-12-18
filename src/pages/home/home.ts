import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

import { ProfilePage } from '../profile/profile';
import { PostPage } from '../post/post';
import { UserPage } from '../user/user';
import { LoginPage } from '../login/login';
import { StatementPage } from '../statement/statement';
import { PinPage } from '../pin/pin'

import { FirebaseProvider } from '../../providers/firebase/firebase';
import { SessionProvider } from '../../providers/session/session';

import { Observable } from 'rxjs/Observable';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  pins: any[] = [];  
  posts: any[] = [];
  uid: any;
  refreshing: any;
  day: any;
  saturday: any;
  sunday: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public firebase: FirebaseProvider,
    public session: SessionProvider,
    public alertCtrl: AlertController
  ) {
  }

  ionViewDidEnter() {
    console.log("Entered home");
    this.loadHome('');
  }

  loadHome(refresh) {
    this.setDay();
    this.loadPins();    
    this.loadPosts(refresh);
  }

  setDay() {
    var d = new Date();
    var weekday = new Array(7);
    weekday[0] =  "Sunday";
    weekday[1] = "Monday";
    weekday[2] = "Tuesday";
    weekday[3] = "Wednesday";
    weekday[4] = "Thursday";
    weekday[5] = "Friday";
    weekday[6] = "Saturday";
    this.day = weekday[d.getDay()];
    if (this.day == 'Saturday') {
      this.saturday = true;
    }
    if (this.day == 'Sunday') {
      this.sunday = true;
    }
    let dayNumber = d.getDay();
  }

  loadPins() {
    return this.requestPins().first().subscribe((pins) => {
      this.presentPins(pins);
    });
  }

  requestPins() {
    let path = '/pins/';
    return this.firebase.orderList(path, 'date');
  }

  presentPins(pins) {
    this.pins = [];
    pins.forEach((pin) => {
      this.requestPinUserLikerObject(pin).first().subscribe((liker) => {
        if (liker[0]) {
          pin.userLiked = true;
        } else {
          pin.userLiked = false;
        }
        this.pins.push(pin);
      });
    });
  }

  requestPinUserLikerObject(pin) {
    let path = 'pins/' + pin.id + '/likers/';
    return this.firebase.query(path, 'uid', this.uid);
  }

  togglePinLike(pin) {
    if (pin.userLiked) {
      this.requestPinUserLikerObject(pin).subscribe((liker) => {
        this.removePinLikerObject(liker[0], pin).then(() => {
          if (pin.likeCount == 1) {
            this.unflagPinLike(pin);
          }
          this.unlikePin(pin);
        });
      });
    } else {
      this.likePin(pin).subscribe(() => {
        this.pushPinLikerObject(pin).then((pinLikeProps) => {
          let pinLikerID = pinLikeProps.key;
          this.addIDToPinLikerObject(pinLikerID, pin);
        });
      });
    }
  }

  removePinLikerObject(liker, pin) {
    let path = 'pins/' + pin.id + '/likers/' + liker.id;
    return this.firebase.removeObject(path);
  }

  unlikePin(myPin) {
    myPin.userLiked = false;
    let likeCount = --myPin.likeCount;
    let pin = {
      "likeCount": likeCount
    }
    let path = 'pins/' + myPin.id;
    return this.firebase.updateObject(path, pin);
  }

  unflagPinLike(myPin) {
    let pin = {
      "liked": false,
    }
    let path = 'pins/' + myPin.id;
    return this.firebase.updateObject(path, pin);
  }

  pushPinLikerObject(myPin) {
    let path = 'pins/' + myPin.id + '/likers/';
    let likerObject = {
      "pin": myPin.id,
      "uid": this.uid
    }
    return this.firebase.push(path, likerObject);
  }

  addIDToPinLikerObject(pinLikerID, myPin) {
    let path = '/pins/' + myPin.id + '/likers/' + pinLikerID;
    let liker = {
      id: pinLikerID
    }
    return this.firebase.updateObject(path, liker);
  }

  likePin(myPin) {
    return Observable.create((observer) => {
      myPin.liked = true;
      myPin.userLiked = true;
      let likeCount = ++myPin.likeCount;
      let liked = true;
      let pin = {
        "likeCount": likeCount,
        "liked": liked
      }
      let path = 'pins/' + myPin.id;
      return this.firebase.updateObject(path, pin).then((obj) => {
        observer.next(obj)
      });
    });
  }

  loadPosts(refresh) {
    console.log("Loading posts");
    this.startRefresh(refresh);
    return this.requestUID().subscribe((uid) => {
      console.log("Got UID");
      console.log(uid);
      this.uid = uid
      return this.requestProfile().subscribe((profile) => {
        if (profile.blocked) {
          this.handleBlocked();
        }
        return this.requestPosts().first().subscribe((posts) => {
          console.log("Got posts");
          console.log(posts);
          this.presentPosts(posts);
          this.endRefresh(refresh);
        });
      });
    });
  }

  startRefresh(refresh) {
    if (refresh) {
      this.refreshing = true;
    }
  }

  endRefresh(refresh) {
    if (refresh) {
      refresh.complete();
    }
  }

  requestUID() {
    console.log("Requesting UID");
    return this.session.uid();
  }

  requestProfile() {
    let uid = this.uid;
    return this.firebase.profile(uid);
  }

  handleBlocked() {
    this.session.end();
    this.navCtrl.setRoot(LoginPage);
    this.presentBlocked();
  }

  presentBlocked() {
    let alert = this.alertCtrl.create({
      title: 'Fail',
      message: 'This account has been blocked',
      buttons: [
        {
          text: 'Okay',
        }
      ]
    });
    alert.present();
  }

  requestPosts() {
    let path = "/posts/"
    return this.firebase.orderList(path, 'rawTime');
  }

  presentPosts(posts) {
    this.posts = [];
    posts.forEach((post) => {
      this.requestPostUserLikerObject(post).first().subscribe((liker) => {
        if (liker[0]) {
          post.userLiked = true;
        } else {
          post.userLiked = false;
        }
        this.posts.push(post);
      });
    });
  }

  requestPostUserLikerObject(post) {
    let path = 'posts/' + post.id + '/likers/';
    return this.firebase.query(path, 'uid', this.uid);
  }

  togglePostLike(post) {
    if (post.userLiked) {
      this.requestPostUserLikerObject(post).subscribe((liker) => {
        this.removePostLikerObject(liker[0], post).then(() => {
          if (post.likeCount == 1) {
            this.unflagPostLike(post);
          }
          this.unlikePost(post);
        });
      });
    } else {
      this.likePost(post).subscribe(() => {
        this.pushPostLikerObject(post).then((postLikeProps) => {
          let postLikerID = postLikeProps.key;
          this.addIDToPostLikerObject(postLikerID, post);
        });
      });
    }
  }

  removePostLikerObject(liker, post) {
    let path = 'posts/' + post.id + '/likers/' + liker.id;
    return this.firebase.removeObject(path);
  }

  unlikePost(myPost) {
    myPost.userLiked = false;
    let likeCount = --myPost.likeCount;
    let post = {
      "likeCount": likeCount
    }
    let path = 'posts/' + myPost.id;
    return this.firebase.updateObject(path, post);
  }

  unflagPostLike(myPost) {
    let post = {
      "liked": false,
    }
    let path = 'posts/' + myPost.id;
    return this.firebase.updateObject(path, post);
  }

  pushPostLikerObject(myPost) {
    let path = 'posts/' + myPost.id + '/likers/';
    let likerObject = {
      "post": myPost.id,
      "uid": this.uid
    }
    return this.firebase.push(path, likerObject);
  }

  addIDToPostLikerObject(postLikerID, myPost) {
    let path = '/posts/' + myPost.id + '/likers/' + postLikerID;
    let liker = {
      id: postLikerID
    }
    return this.firebase.updateObject(path, liker);
  }

  likePost(myPost) {
    return Observable.create((observer) => {
      myPost.liked = true;
      myPost.userLiked = true;
      let likeCount = ++myPost.likeCount;
      let liked = true;
      let post = {
        "likeCount": likeCount,
        "liked": liked
      }
      let path = 'posts/' + myPost.id;
      return this.firebase.updateObject(path, post).then((obj) => {
        observer.next(obj)
      });
    });
  }


  viewPost(postID) {
    this.navCtrl.push(PostPage, { id: postID })
  }

  viewPin(pinID) {
    this.navCtrl.push(PinPage, { id: pinID });
  }

  goToProfilePage() {
    this.navCtrl.setRoot(ProfilePage);
  }

  viewUser(uid) {
    this.navCtrl.push(UserPage, { uid: uid })
  }

  openLink(url) {
    open(url)
  }
  
  goToStatementPage() {
    this.navCtrl.setRoot(StatementPage);
  }

}
